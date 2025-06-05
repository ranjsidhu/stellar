import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    return NextResponse.json({ response: user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
