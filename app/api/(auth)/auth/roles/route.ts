import { NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const roles = await prisma.roles.findMany();

    return NextResponse.json({
      response: roles,
      message: "Successfully fetched roles",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
