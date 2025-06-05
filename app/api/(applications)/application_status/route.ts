import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "../../utils/prisma-utils";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (name) {
      const application_status = await prisma.application_status.findFirst({
        where: { name },
      });
      if (!application_status) throw new Error("Application status not found");
      return NextResponse.json({
        message: "Successfully fetched application status",
        response: application_status,
      });
    } else {
      const application_statuses = await prisma.application_status.findMany({
        where: { is_deleted: false },
        orderBy: { id: "asc" },
      });
      return NextResponse.json({
        message: "Successfully fetched application statuses",
        response: application_statuses,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const application_status = await prisma.application_status.create({
      data: { ...body },
    });
    return NextResponse.json({
      message: "Successfully created application status",
      response: { ...application_status },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    delete body.id;
    const application_status = await prisma.application_status.update({
      where: { id },
      data: { ...body },
    });
    return NextResponse.json({
      message: "Successfully updated application status",
      response: { ...application_status },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const application_status = await prisma.application_status.delete({
      where: { id },
    });
    return NextResponse.json({
      message: "Successfully deleted application status",
      response: { ...application_status },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
