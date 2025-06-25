import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { JobRequest } from "@/app/types";
import { withAdminOrRecruiterProtection } from "../../utils/routeProtection";

export const POST = withAdminOrRecruiterProtection(async (req: NextRequest) => {
  try {
    const body: JobRequest = await req.json();
    const job = await prisma.jobs.create({
      data: body,
    });
    return NextResponse.json({
      message: "Successfully created job",
      response: job,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
)