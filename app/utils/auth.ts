import { NextResponse } from "next/server";
import { getSession } from "./session";
import { prisma } from "../api/utils/prisma-utils";
import { config } from "./config";

type AuthResult = {
  isAuthorized: boolean;
  response: NextResponse | null;
  user?: { id: number; role: string };
};

type UserValidationResult = {
  isAuthorized: boolean;
  response: NextResponse | null;
  userId?: number;
};

async function getAuthenticatedUser(): Promise<AuthResult> {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return {
        isAuthorized: false,
        response: NextResponse.json(
          { error: "Unauthorized: No session found" },
          { status: 401 }
        ),
      };
    }

    const user = await prisma.users.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        roles: { select: { name: true } },
      },
    });

    if (!user?.roles?.name) {
      return {
        isAuthorized: false,
        response: NextResponse.json(
          { error: "Unauthorized: User not found or has no role" },
          { status: 401 }
        ),
      };
    }

    return {
      isAuthorized: true,
      response: null,
      user: { id: user.id, role: user.roles.name },
    };
  } catch (error: any) {
    console.error("Auth check error:", error);
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      ),
    };
  }
}

async function checkUserRole(allowedRoles: string[]): Promise<AuthResult> {
  try {
    const authResult = await getAuthenticatedUser();

    if (!authResult.isAuthorized || !authResult.user) {
      return authResult;
    }

    const isAuthorized = allowedRoles.includes(authResult.user.role);
    return {
      isAuthorized,
      user: authResult.user,
      response: isAuthorized
        ? null
        : NextResponse.json(
            {
              error: `Unauthorized: ${allowedRoles.join(
                " or "
              )} access required`,
            },
            { status: 403 }
          ),
    };
  } catch (error) {
    console.error("Auth check error:", error);
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      ),
    };
  }
}

export async function checkAdminAccess(): Promise<AuthResult> {
  return checkUserRole([config.adminRoleName]);
}

export async function checkRecruiterAccess(): Promise<AuthResult> {
  return checkUserRole([config.recruiterRoleName]);
}

export async function checkAdminOrRecruiterAccess(): Promise<AuthResult> {
  return checkUserRole([config.adminRoleName, config.recruiterRoleName]);
}

export function removeUndefined(obj: Record<string, any>) {
  return Object.fromEntries(
    Object.entries(obj).filter(
      // eslint-disable-next-line no-unused-vars
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );
}

export async function validateUserIdMatch(
  userId: string | undefined
): Promise<UserValidationResult> {
  const authResult = await getAuthenticatedUser();

  if (!authResult.isAuthorized || !authResult.user) {
    return {
      isAuthorized: false,
      response: authResult.response,
    };
  }

  if (!userId) {
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { error: "User ID parameter is required" },
        { status: 400 }
      ),
    };
  }

  const userIdNumber = Number(userId);

  if (userIdNumber !== authResult.user.id) {
    return {
      isAuthorized: false,
      response: NextResponse.json(
        { error: "Unauthorized: User ID does not match session" },
        { status: 403 }
      ),
    };
  }

  return {
    isAuthorized: true,
    response: null,
    userId: userIdNumber,
  };
}
