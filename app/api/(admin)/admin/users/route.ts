import { NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withAdminProtection } from "@/app/api/utils/routeProtection";

async function handler() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        last_logged_in: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        first_name: "asc",
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      full_name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      last_logged_in: user.last_logged_in,
      role: user?.roles?.name ?? "Candidate",
    }));

    return NextResponse.json({
      response: formattedUsers,
      message: "Successfully fetched users",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const GET = withAdminProtection(handler);
