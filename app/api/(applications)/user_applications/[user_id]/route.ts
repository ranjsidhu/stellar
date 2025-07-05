import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { validateUserIdMatch } from "@/app/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
    const validation = await validateUserIdMatch(user_id);
    if (!validation.isAuthorized) {
      return validation.response;
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
