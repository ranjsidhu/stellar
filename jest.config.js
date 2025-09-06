// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "node",
  collectCoverage: true,
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],

  collectCoverageFrom: [
    "app/**/*.{ts,tsx,js,jsx}",
    "!app/**/*.d.ts",
    "!app/**/__tests__/**",
    "!app/**/*.test.{ts,tsx,js,jsx}",
    "!app/**/*.spec.{ts,tsx,js,jsx}",
    "!app/**/layout.tsx",
    "!app/**/page.tsx",
    "!app/**/loading.tsx",
    "!app/**/error.tsx",
    "!app/**/not-found.tsx",
    "!app/\\(pages\\)/**", // <-- exclude (pages) directory
    "!app/types/**",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/vendor/**",
  ],

  // Transform ESM modules - this is critical for next-auth
  transformIgnorePatterns: [
    "node_modules/(?!(next-auth|@auth|@panva|preact-render-to-string|preact|jose|openid-client|oauth4webapi|uuid)/)",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // Mock the auth modules
    "^@/auth$": "<rootDir>/__mocks__/auth.ts",
    "^next-auth$": "<rootDir>/__mocks__/next-auth.ts",
    "^next-auth/providers/google$":
      "<rootDir>/__mocks__/next-auth-providers.ts",
    "^next-auth/providers/credentials$":
      "<rootDir>/__mocks__/next-auth-providers.ts",
  },

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};

// Export using the Next.js config creator
module.exports = createJestConfig(customJestConfig);
