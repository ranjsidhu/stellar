import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { withAdminOrRecruiterProtection } from "@/app/api/utils/routeProtection";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  try {
    const { reference } = await params;
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

export const PUT = withAdminOrRecruiterProtection(async (
  req: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) => {
  try {
    const { reference } = await params;
    const body = await req.json();
    const job = await prisma.jobs.update({
      where: { reference_number: reference },
      data: { ...body, updated_at: new Date().toISOString() },
    });
    return NextResponse.json({
      message: `Successfully updated job ${reference}`,
      response: job,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
})

export const DELETE = withAdminOrRecruiterProtection(async (
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
})
