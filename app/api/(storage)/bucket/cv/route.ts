import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { createClient } from "@/app/utils/supabase/server";

const { NEXT_PUBLIC_CV_BUCKET } = process.env;

// Type guard to check if value is a string
const ensureString = (value: FormDataEntryValue | null): string => {
  if (value === null) return "";
  if (typeof value === "string") return value;
  return "";
};

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await req.formData();
    const id = ensureString(body.get("id"));
    const filename = ensureString(body.get("filename"));
    const file = body.get("file") as Blob;
    const type = ensureString(body.get("type"));
    const user_id = ensureString(body.get("user_id"));

    const fullFilename = `${id}.${type}`;

    // Upload CV to the bucket
    const { error } = await supabase.storage
      .from(NEXT_PUBLIC_CV_BUCKET!)
      .upload(fullFilename, file);

    if (error) {
      return NextResponse.json(
        { message: "File upload failed" },
        { status: 500 }
      );
    }

    // Find the file type ID for CV
    const fileType = await prisma.file_types.findFirst({
      where: {
        name: "CV",
      },
    });
    if (!fileType) {
      throw new Error("CV file type not found");
    }
    const cv_file_type_id = fileType.id;

    const userDocument = await prisma.user_documents.create({
      data: {
        file_id: fullFilename,
        file_type_id: cv_file_type_id,
        filename,
        user_id: Number(user_id),
      },
    });

    return NextResponse.json({
      message: "File uploaded sucessfully",
      id: userDocument.id,
      file_id: userDocument.file_id,
      filename: userDocument.filename,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
