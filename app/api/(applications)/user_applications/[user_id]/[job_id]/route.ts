import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { validateUserIdMatch } from "@/app/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ user_id: string; job_id: string }> }
) {
  try {
    const { user_id, job_id } = await params;

    if (!user_id) {
      throw new Error("The user_id is undefined");
    }

    const validation = await validateUserIdMatch(user_id);
    if (!validation.isAuthorized) {
      return validation.response;
    }

    if (!job_id) {
      throw new Error("The job_id is undefined");
    }

    const userApplication = await prisma.user_applications.findFirst({
      where: { user_id: Number(user_id), job_id: Number(job_id) },
    });

    if (!userApplication) {
      return NextResponse.json({
        message: "User has not applied for this job",
        applied: false,
      });
    }

    return NextResponse.json({
      message: "User has already applied for this job",
      applied: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
