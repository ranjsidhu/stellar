// __mocks__/next-auth.ts
const NextAuth = jest.fn(() => ({
  auth: jest.fn(() =>
    Promise.resolve({
      user: {
        email: "test@example.com",
        name: "Test User",
      },
    })
  ),
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

export default NextAuth;
