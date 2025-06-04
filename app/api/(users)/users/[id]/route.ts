import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (!id) {
      throw new Error("The id is undefined");
    }
    const user = await prisma.users.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json({
      message: "Successfully updated user",
      response: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
