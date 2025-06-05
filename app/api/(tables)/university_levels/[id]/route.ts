import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      throw new Error("The id is undefined");
    }
    const universityLevel = await prisma.university_levels.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json({
      message: `Successfully fetched university level`,
      response: universityLevel,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
