// __tests__/redisMiddleware.test.ts
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

jest.mock("@upstash/redis", () => ({
  Redis: {
    fromEnv: jest.fn(),
  },
}));

jest.mock("next/server", () => {
  const headersMap = () => {
    const map = new Map();
    return {
      set: (k: string, v: string) => map.set(k, v),
      get: (k: string) => map.get(k),
    };
  };
  return {
    NextResponse: {
      next: jest.fn(() => ({ headers: headersMap() })),
      json: jest.fn((body, init) => ({
        body,
        status: init?.status,
        headers: headersMap(),
      })),
    },
    NextRequest: jest
      .fn()
      .mockImplementation((url: string, headers: any = {}) => ({
        nextUrl: new URL(url, "http://localhost"),
        headers: {
          get: (key: string) => headers[key.toLowerCase()] ?? null,
        },
      })),
  };
});

describe("redisMiddleware", () => {
  const mockPipeline = {
    zremrangebyscore: jest.fn().mockReturnThis(),
    zadd: jest.fn().mockReturnThis(),
    zcard: jest.fn().mockReturnThis(),
    expire: jest.fn().mockReturnThis(),
    exec: jest.fn(),
  };
  const redisInstance = { pipeline: () => mockPipeline };

  beforeEach(() => {
    jest.clearAllMocks();
    (Redis.fromEnv as jest.Mock).mockReturnValue(redisInstance);
  });

  const getMiddleware = () =>
    require("@/app/api/utils/redisMiddleware").middleware;
  const makeReq = (path: string, headers: any = {}) =>
    new (require("next/server").NextRequest as any)(path, headers);

  it("skips non-API routes", async () => {
    const middleware = getMiddleware();
    await middleware(makeReq("/not-api"));
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("skips excluded rule", async () => {
    const middleware = getMiddleware();
    await middleware(makeReq("/api/auth/session"));
    expect(NextResponse.next).toHaveBeenCalled();
  });

  it("allows request under limit", async () => {
    mockPipeline.exec.mockResolvedValue([null, null, 1]);
    const middleware = getMiddleware();
    const res = await middleware(
      makeReq("/api/auth/login", { "x-forwarded-for": "1.2.3.4" })
    );
    expect(NextResponse.next).toHaveBeenCalled();
    expect(res.headers.get("X-RateLimit-Limit")).toBeDefined();
  });

  it("blocks request over limit", async () => {
    mockPipeline.exec.mockResolvedValue([null, null, 999]);
    const middleware = getMiddleware();
    await middleware(
      makeReq("/api/admin/test", { "x-forwarded-for": "5.6.7.8" })
    );
    expect(NextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Admin API rate limit exceeded",
        retryAfter: expect.any(Number),
      }),
      expect.objectContaining({ status: 429 })
    );
  });

  it("fails open when redis throws", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockPipeline.exec.mockRejectedValue(new Error("Redis down"));

    const middleware = getMiddleware();
    await middleware(makeReq("/api/user/123/path"));

    expect(NextResponse.next).toHaveBeenCalled();
    spy.mockRestore();
  });
});
