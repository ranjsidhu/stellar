// client.test.ts
import { createClient } from "@supabase/supabase-js";

// Mock the supabase-js module
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("Supabase client", () => {
  const mockClient = { some: "client" };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.NEXT_PUBLIC_DB_URL = "http://example.com";
    process.env.NEXT_PUBLIC_DB_API_ANON_KEY = "anon-key";
    (createClient as jest.Mock).mockReturnValue(mockClient);
  });

  it("should call createClient with environment variables and export the client", () => {
    // Import after setting up mocks so the client is created with mock data
    const { client } = require("../db-client");

    expect(createClient).toHaveBeenCalledWith("http://example.com", "anon-key");
    expect(client).toBe(mockClient);
  });
});
