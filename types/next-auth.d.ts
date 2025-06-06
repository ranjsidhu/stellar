/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
