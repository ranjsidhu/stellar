import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../utils/prisma-utils";
import { withAdminOrRecruiterProtection } from "../../utils/routeProtection";

export const GET = async () => {
  try  {
    const job_statuses = await prisma.job_status.findMany({
      where: { is_deleted: false },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({
      message: "Successfully fetched job statuses",
      response: job_statuses,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

const postHandler = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const job_status = await prisma.job_status.create({
      data: { ...body },
    });
    return NextResponse.json({
      message: "Successfully created job status",
      response: { ...job_status },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

const putHandler = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id } = body;
    delete body.id;
    const job_status = await prisma.job_status.update({
      where: { id },
      data: { ...body },
    });
    return NextResponse.json({
      message: "Successfully updated job status",
      response: { ...job_status },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

const deleteHandler = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id } = body;
    const job_status = await prisma.job_status.delete({
      where: { id },
    });
    return NextResponse.json({
      message: "Successfully deleted job status",
      response: { ...job_status },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}


export const POST = withAdminOrRecruiterProtection(postHandler);
export const PUT = withAdminOrRecruiterProtection(putHandler);
export const DELETE = withAdminOrRecruiterProtection(deleteHandler);