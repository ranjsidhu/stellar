// __mocks__/next-auth-providers.ts
export const Google = jest.fn(() => ({
  id: "google",
  name: "Google",
  type: "oauth" as const,
  clientId: "test-client-id",
  clientSecret: "test-client-secret",
}));

export const Credentials = jest.fn(() => ({
  id: "credentials",
  name: "Credentials",
  type: "credentials" as const,
  credentials: {},
  authorize: jest.fn(),
}));
