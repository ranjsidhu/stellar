// app/utils/__tests__/password.test.ts
import { hashPassword, verifyPassword } from "../password";

describe("password utils", () => {
  const mockCryptoSubtle = {
    importKey: jest.fn(),
    deriveBits: jest.fn(),
  };

  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    global.crypto = {
      getRandomValues: jest.fn().mockImplementation((arr) => {
        for (let i = 0; i < arr.length; i++) arr[i] = i + 1;
        return arr;
      }),
      subtle: mockCryptoSubtle as unknown as SubtleCrypto,
    } as unknown as Crypto;
  });

  describe("hashPassword", () => {
    it("returns a base64 string combining salt and hash", async () => {
      // Arrange: mock importKey and deriveBits to return dummy values
      mockCryptoSubtle.importKey.mockResolvedValue("mockKey");
      const fakeHashBuffer = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]).buffer;
      mockCryptoSubtle.deriveBits.mockResolvedValue(fakeHashBuffer);

      // Act
      const result = await hashPassword("myPassword");

      // Assert
      expect(result).toEqual(expect.any(String));
      // Base64 string should be longer than salt (16 bytes) + hash (8 bytes)
      const decoded = Buffer.from(result, "base64");
      expect(decoded.length).toBe(16 + 8);

      // Check mocks called correctly
      expect(mockCryptoSubtle.importKey).toHaveBeenCalledWith(
        "raw",
        expect.any(Uint8Array),
        "PBKDF2",
        false,
        ["deriveBits"]
      );
      expect(mockCryptoSubtle.deriveBits).toHaveBeenCalledWith(
        {
          name: "PBKDF2",
          salt: expect.any(Uint8Array),
          iterations: 100000,
          hash: "SHA-256",
        },
        "mockKey",
        256
      );
    });
  });

  describe("verifyPassword", () => {
    it("returns true if password matches hash", async () => {
      // Setup a hash with known salt and derived bits matching
      mockCryptoSubtle.importKey.mockResolvedValue("mockKey");
      const expectedHash = new Uint8Array([10, 20, 30, 40, 50, 60, 70, 80]);
      const salt = new Uint8Array(16).fill(1);
      const combined = new Uint8Array([...salt, ...expectedHash]);
      const base64Hash = Buffer.from(combined).toString("base64");

      mockCryptoSubtle.deriveBits.mockResolvedValue(expectedHash.buffer);

      const result = await verifyPassword("password", base64Hash);

      expect(result).toBe(true);
      expect(mockCryptoSubtle.importKey).toHaveBeenCalled();
      expect(mockCryptoSubtle.deriveBits).toHaveBeenCalled();
    });

    it("returns false if hash lengths differ", async () => {
      mockCryptoSubtle.importKey.mockResolvedValue("mockKey");
      const salt = new Uint8Array(16).fill(1);
      const storedHash = new Uint8Array([1, 2, 3]);
      const combined = new Uint8Array([...salt, ...storedHash]);
      const base64Hash = Buffer.from(combined).toString("base64");

      // Return a longer hash to simulate mismatch length
      const longerHash = new Uint8Array([1, 2, 3, 4, 5]);
      mockCryptoSubtle.deriveBits.mockResolvedValue(longerHash.buffer);

      const result = await verifyPassword("password", base64Hash);

      expect(result).toBe(false);
    });

    it("returns false if hashes differ", async () => {
      mockCryptoSubtle.importKey.mockResolvedValue("mockKey");
      const salt = new Uint8Array(16).fill(1);
      const storedHash = new Uint8Array([1, 2, 3, 4]);
      const combined = new Uint8Array([...salt, ...storedHash]);
      const base64Hash = Buffer.from(combined).toString("base64");

      // Return a different hash (differs by at least one byte)
      const differentHash = new Uint8Array([1, 2, 3, 5]);
      mockCryptoSubtle.deriveBits.mockResolvedValue(differentHash.buffer);

      const result = await verifyPassword("password", base64Hash);

      expect(result).toBe(false);
    });

    it("catches errors and returns false", async () => {
      mockCryptoSubtle.importKey.mockRejectedValue(new Error("fail"));

      const result = await verifyPassword("password", "invalidhash");

      expect(result).toBe(false);
    });
  });
});
