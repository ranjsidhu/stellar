import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withUserProtection } from "@/app/api/utils/routeProtection";
import { removeUndefined } from "@/app/utils/auth";

export const POST = withUserProtection(async (req: NextRequest) => {
  try {
    const body = await req.json();
    const userApplication = await prisma.user_applications.create({
      data: removeUndefined({
        user_id: body.user_id,
        job_id: body.job_id,
        user_document_id: body.user_document_id,
        application_status_id: body.application_status_id,
      }),
    });
    return NextResponse.json({
      message: "Successfully created user application",
      response: userApplication,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
});
