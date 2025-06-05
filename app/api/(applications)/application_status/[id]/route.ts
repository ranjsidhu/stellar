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
    const application_status = await prisma.application_status.findUnique({
      where: { id: parseInt(id) },
    });
    if (!application_status) {
      throw new Error("Application status not found");
    }

    return NextResponse.json({
      message: `Successfully fetched application status`,
      response: application_status,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
