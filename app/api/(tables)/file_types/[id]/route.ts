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
    const fileType = await prisma.file_types.findUnique({
      where: { id: Number(id) },
    });
    if (!fileType) {
      throw new Error("File type not found");
    }

    return NextResponse.json({
      message: `Successfully fetched file type`,
      response: fileType,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
