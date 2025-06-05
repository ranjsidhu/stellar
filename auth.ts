import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@/generated/prisma";
import { hashPassword, verifyPassword } from "@/app/utils/password";

const prisma = new PrismaClient();

interface Credentials {
  email: string;
  password: string;
}

// eslint-disable-next-line import/no-unused-modules
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const typedCredentials = credentials as Credentials;

        const user = await prisma.users.findUnique({
          where: {
            email: typedCredentials.email,
          },
          include: {
            roles: true,
          },
        });

        // If user doesn't exist, create a new one with hashed password
        if (!user) {
          const hashedPassword = await hashPassword(typedCredentials.password);
          const newUser = await prisma.users.create({
            data: {
              email: typedCredentials.email,
              first_name: typedCredentials.email.split("@")[0],
              password: hashedPassword,
              role_id: 3,
            },
            include: {
              roles: true,
            },
          });

          return {
            id: newUser.id.toString(),
            email: newUser.email,
            name: newUser.first_name + " " + newUser.last_name,
            role: newUser.roles?.name ?? "user",
          };
        }

        // At this point, we know user exists and has a password
        const isPasswordValid = await verifyPassword(
          typedCredentials.password,
          user.password as string
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.first_name + " " + user.last_name,
          role: user.roles?.name ?? "user",
        };
      },
    }),
  ],
  pages: {
    // signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;

      try {
        // Upsert user based on email
        const dbUser = await prisma.users.upsert({
          where: { email: user.email },
          update: {
            first_name: user.name?.split(" ")[0] ?? undefined,
            last_name: user.name?.split(" ")[1] ?? undefined,
          },
          create: {
            email: user.email,
            first_name: user.name?.split(" ")[0] ?? "",
            last_name: user.name?.split(" ")[1] ?? "",
            role_id: 3,
          },
          include: {
            roles: true,
          },
        });

        // If user exists with Google auth but trying credentials, prevent login
        if (account?.type === "credentials" && !dbUser.password) {
          return false;
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role?.toString();
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
