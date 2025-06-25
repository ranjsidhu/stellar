import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withAdminOrRecruiterProtection } from "@/app/api/utils/routeProtection";

export const  GET = withAdminOrRecruiterProtection(async (
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) => {
  try {
    const { reference } = await params;
    const job = await prisma.jobs.findUnique({
      where: { reference_number: reference },
      include: {
        job_status: true,
        user_applications: {
          include: {
            users: true,
          },
        },
      },
    });
    if (!job) throw new Error("Job not found");
    return NextResponse.json({
      message: `Successfully retrieved job ${reference}`,
      response: job,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})