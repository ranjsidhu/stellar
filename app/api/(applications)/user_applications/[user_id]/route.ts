import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
    if (!user_id) {
      throw new Error("The user_id is undefined");
    }
    const userApplications = await prisma.user_applications.findMany({
      where: { user_id: Number(user_id) },
      include: {
        jobs: true,
        application_status: true,
      },
    });
    return NextResponse.json({
      message: "Successfully fetched user applications",
      response: userApplications,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
