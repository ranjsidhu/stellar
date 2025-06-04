import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const user = await prisma.users.create({
      data: body,
    });

    return NextResponse.json({
      message: "Successfully created user",
      response: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
