import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withAdminProtection } from "@/app/api/utils/routeProtection";

async function handler(req: NextRequest) {
  try {
    const role = req.nextUrl.pathname.split("/").pop();
    if (!role) {
      throw new Error("The role is undefined");
    }
    const MIN = Number(1) * 10 - 10;
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
      where: {
        roles: {
          name: role,
        },
      },
      skip: MIN,
      take: 10,
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
      message: `Successfully fetched ${users.length} users`,
      response: formattedUsers,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export const GET = withAdminProtection(handler);
