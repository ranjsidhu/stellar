import { type NextRequest, NextResponse } from "next/server";
import { client } from "../../utils/db-client";
import { prisma } from "../../utils/prisma-utils";

const { NEXT_PUBLIC_CV_BUCKET } = process.env;

export async function GET() {
  try {
    const userDocuments = await prisma.user_documents.findMany();
    return NextResponse.json({
      message: "Successfully fetched user documents",
      response: userDocuments,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userDocument = await prisma.user_documents.create({
      data: body,
    });
    return NextResponse.json({
      message: "Successfully created user document",
      response: userDocument,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) throw new Error("The id is undefined");
    const userDocument = await prisma.user_documents.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json({
      message: "Successfully updated user document",
      response: userDocument,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { file_id } = body;
    if (!file_id) throw new Error("The file_id is undefined");
    const { error } = await client.storage
      .from(NEXT_PUBLIC_CV_BUCKET)
      .remove([file_id]);
    if (error) throw new Error(error.message);
    return NextResponse.json({
      message: "Successfully deleted user document",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
