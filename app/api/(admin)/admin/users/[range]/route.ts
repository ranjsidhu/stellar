import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withAdminProtection } from "@/app/api/utils/routeProtection";

async function handler(req: NextRequest) {
  try {
    const range = req.nextUrl.pathname.split("/").pop();
    if (!range) {
      throw new Error("The range is undefined");
    }
    const MIN = Number(range) * 10 - 10;
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
      skip: MIN,
      take: 10,
    });

    const count = await prisma.users.count();

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
      count,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export const GET = withAdminProtection(handler);
