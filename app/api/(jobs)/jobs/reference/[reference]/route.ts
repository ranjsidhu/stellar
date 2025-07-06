import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withAdminOrRecruiterProtection } from "@/app/api/utils/routeProtection";
import { removeUndefined } from "@/app/utils/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
    if (!reference) {
      throw new Error("The reference is undefined");
    }
    const job = await prisma.jobs.findUnique({
      where: { reference_number: reference },
      include: {
        job_status: true,
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
}

export const PUT = withAdminOrRecruiterProtection(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ reference: string }> }
  ) => {
    try {
      const { reference } = await params;
      const body = await req.json();
      const job = await prisma.jobs.update({
        where: { reference_number: reference },
        data: removeUndefined({
          role_name: body.role_name,
          location: body.location,
          salary_range: body.salary_range,
          description: body.description,
          status_id: body.status_id,
          updated_at: new Date().toISOString(),
        }),
      });
      return NextResponse.json({
        message: `Successfully updated job ${reference}`,
        response: job,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);

export const DELETE = withAdminOrRecruiterProtection(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ reference: string }> }
  ) => {
    try {
      const { reference } = await params;
      const job = await prisma.jobs.delete({
        where: { reference_number: reference },
      });
      return NextResponse.json({
        message: `Successfully deleted job ${reference}`,
        response: job,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
