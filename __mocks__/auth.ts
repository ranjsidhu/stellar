// __mocks__/auth.ts
export const auth = jest.fn(() =>
  Promise.resolve({
    user: {
      email: "test@example.com",
      name: "Test User",
    },
  })
);

export const handlers = {
  GET: jest.fn(),
  POST: jest.fn(),
};

export const signIn = jest.fn();
export const signOut = jest.fn();

const mockAuth = {
  auth,
  handlers,
  signIn,
  signOut,
};

export default mockAuth;
