import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";

export async function GET() {
  try {
    const fileTypes = await prisma.file_types.findMany({
      where: { is_deleted: false },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({
      message: "Successfully fetched file types",
      response: fileTypes,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fileType = await prisma.file_types.create({
      data: body,
    });
    return NextResponse.json({
      message: "Successfully created file type",
      response: fileType,
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
    const fileType = await prisma.file_types.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json({
      message: "Successfully updated file type",
      response: fileType,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    const fileType = await prisma.file_types.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({
      message: "Successfully deleted file type",
      response: fileType,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
