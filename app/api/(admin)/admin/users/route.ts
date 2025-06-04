import { NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        last_logged_in: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
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
