// app/utils/__tests__/storage.test.ts
import { getUserId, getUserEmail } from "../storage";
import * as sessionModule from "../session";

jest.mock("../session");

jest.mock("@/auth", () => ({
  auth: jest.fn().mockResolvedValue({
    user: {
      id: "mock-id",
      email: "mock@example.com",
    },
  }),
}));

describe("storage utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getUserId", () => {
    it("returns user id from session", async () => {
      (sessionModule.getSession as jest.Mock).mockResolvedValue({
        user: { id: "user-123" },
      });
      const result = await getUserId();
      expect(result).toBe("user-123");
      expect(sessionModule.getSession).toHaveBeenCalled();
    });

    it("returns undefined if session or user id missing", async () => {
      (sessionModule.getSession as jest.Mock).mockResolvedValue(null);
      const result = await getUserId();
      expect(result).toBeUndefined();
    });

    it("returns null and logs error if getSession throws", async () => {
      const error = new Error("fail");
      (sessionModule.getSession as jest.Mock).mockRejectedValue(error);
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await getUserId();
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(error);

      consoleSpy.mockRestore();
    });
  });

  describe("getUserEmail", () => {
    it("returns user email from session", async () => {
      (sessionModule.getSession as jest.Mock).mockResolvedValue({
        user: { email: "test@example.com" },
      });
      const result = await getUserEmail();
      expect(result).toBe("test@example.com");
      expect(sessionModule.getSession).toHaveBeenCalled();
    });

    it("returns null if session is null", async () => {
      (sessionModule.getSession as jest.Mock).mockResolvedValue(null);
      const result = await getUserEmail();
      expect(result).toBeNull();
    });

    it("returns null and logs error if getSession throws", async () => {
      const error = new Error("fail");
      (sessionModule.getSession as jest.Mock).mockRejectedValue(error);
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const result = await getUserEmail();
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(error);

      consoleSpy.mockRestore();
    });
  });
});
