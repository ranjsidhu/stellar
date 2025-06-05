import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userApplication = await prisma.user_applications.create({
      data: body,
    });
    return NextResponse.json({
      message: "Successfully created user application",
      response: userApplication,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
