import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withUserProtection } from "@/app/api/utils/routeProtection";
import { removeUndefined } from "@/app/utils/auth";
import { applicationEvent, databaseEvent } from "@/app/api/utils/logging";

export const POST = withUserProtection(async (req: NextRequest) => {
  const startTime = Date.now();
  let userId: string | undefined;
  let body: any;

  try {
    body = await req.json();
    userId = body.user_id?.toString();

    // Log the application submission attempt
    applicationEvent.submitted(
      userId || "unknown",
      body.job_id,
      "Job Application", // We could fetch the job title if needed
      true,
      { jobId: body.job_id, documentId: body.user_document_id }
    );

    const userApplication = await prisma.user_applications.create({
      data: removeUndefined({
        user_id: body.user_id,
        job_id: body.job_id,
        user_document_id: body.user_document_id,
        application_status_id: body.application_status_id,
      }),
    });

    // Log successful database creation
    databaseEvent.create("user_applications", userApplication.id, userId, {
      jobId: body.job_id,
      statusId: body.application_status_id,
    });

    const responseTime = Date.now() - startTime;

    // Log successful application submission with response time
    applicationEvent.submitted(
      userId || "unknown",
      body.job_id,
      "Job Application",
      true,
      {
        jobId: body.job_id,
        documentId: body.user_document_id,
        responseTime,
      }
    );

    return NextResponse.json({
      message: "Successfully created user application",
      response: userApplication,
    });
  } catch (error: any) {
    const responseTime = Date.now() - startTime;

    // Log application submission failure with response time
    applicationEvent.submitted(
      userId || "unknown",
      body?.job_id || 0,
      "Job Application",
      false,
      { error: error.message, responseTime }
    );

    // Log database error
    databaseEvent.error("create", "user_applications", error, userId);

    return NextResponse.json({ error: error.message });
  }
});
