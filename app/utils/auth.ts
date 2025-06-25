import { NextResponse } from "next/server";
import { getSession } from "./session";
import { prisma } from "../api/utils/prisma-utils";
import { config } from "./config";

type RoleCheckResult = {
  isAuthorized: boolean;
  response: NextResponse | null;
};

async function checkUserRole(allowedRoles: string[]): Promise<RoleCheckResult> {
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
        roles: {
          select: {
            name: true,
          },
        },
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

    const isAuthorized = allowedRoles.includes(user.roles.name);

    return {
      isAuthorized,
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

export async function checkAdminAccess(): Promise<RoleCheckResult> {
  return checkUserRole([config.adminRoleName]);
}

export async function checkRecruiterAccess(): Promise<RoleCheckResult> {
  return checkUserRole([config.recruiterRoleName]);
}

export async function checkAdminOrRecruiterAccess(): Promise<RoleCheckResult> {
  return checkUserRole([config.adminRoleName, config.recruiterRoleName]);
}

export async function checkValidSession() {
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
      roles: {
        select: {
          name: true,
        },
      },
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

  return { isAuthorized: true, id: user.id }
}
