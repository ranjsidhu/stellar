// app/utils/supabase/__tests__/server.test.ts
import { createClient } from "../server";

jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(),
}));

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

describe("createClient", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_DB_URL = "test-url";
    process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "test-key";
  });

  it("creates supabase client with correct params and cookie methods", async () => {
    // Mock cookieStore with getAll and set methods
    const mockGet = jest.fn();
    const mockSet = jest.fn();

    const mockCookieStore = Promise.resolve({
      getAll: mockGet,
      set: mockSet,
    });

    (cookies as jest.Mock).mockReturnValue(mockCookieStore);

    (createServerClient as jest.Mock).mockReturnValue("supabase-client");

    const client = await createClient();

    expect(cookies).toHaveBeenCalled();

    expect(createServerClient).toHaveBeenCalledWith("test-url", "test-key", {
      cookies: {
        getAll: expect.any(Function),
        setAll: expect.any(Function),
      },
    });

    // Test cookies.getAll calls cookieStore.getAll correctly
    await (createServerClient as jest.Mock).mock.calls[0][2].cookies.getAll();
    expect(mockGet).toHaveBeenCalled();

    // Test cookies.setAll calls cookieStore.set correctly
    const setAllFunc = (createServerClient as jest.Mock).mock.calls[0][2]
      .cookies.setAll;
    const cookiesToSet = [
      { name: "a", value: "1", options: { path: "/" } },
      { name: "b", value: "2", options: { path: "/" } },
    ];

    await setAllFunc(cookiesToSet);
    expect(mockSet).toHaveBeenCalledTimes(2);
    expect(mockSet).toHaveBeenCalledWith("a", "1", { path: "/" });
    expect(mockSet).toHaveBeenCalledWith("b", "2", { path: "/" });

    expect(client).toBe("supabase-client");
  });
});
