import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
import { createClient } from "@/app/utils/supabase/server";
import { fileEvent, databaseEvent } from "@/app/api/utils/logging";

const { NEXT_PUBLIC_CV_BUCKET } = process.env;

// Type guard to check if value is a string
const ensureString = (value: FormDataEntryValue | null): string => {
  if (value === null) return "";
  if (typeof value === "string") return value;
  return "";
};

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let user_id: string = "";
  let filename: string = "";
  let type: string = "";

  try {
    const supabase = await createClient();
    const body = await req.formData();
    const id = ensureString(body.get("id"));
    filename = ensureString(body.get("filename"));
    const file = body.get("file") as Blob;
    type = ensureString(body.get("type"));
    user_id = ensureString(body.get("user_id"));

    const fullFilename = `${id}.${type}`;

    // Log file upload attempt
    fileEvent.upload(user_id, fullFilename, filename, type, true, {
      fileSize: file.size,
    });

    // Upload CV to the bucket
    const { error } = await supabase.storage
      .from(NEXT_PUBLIC_CV_BUCKET!)
      .upload(fullFilename, file);

    if (error) {
      // Log upload failure
      fileEvent.upload(user_id, fullFilename, filename, type, false, {
        error: error.message,
      });

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

    // Log successful database creation
    databaseEvent.create("user_documents", userDocument.id, user_id, {
      fileId: fullFilename,
      fileType: "CV",
    });

    const responseTime = Date.now() - startTime;

    // Log successful file upload with response time
    fileEvent.upload(user_id, fullFilename, filename, type, true, {
      fileSize: file.size,
      responseTime,
    });

    return NextResponse.json({
      message: "File uploaded sucessfully",
      id: userDocument.id,
      file_id: userDocument.file_id,
      filename: userDocument.filename,
    });
  } catch (error: any) {
    const responseTime = Date.now() - startTime;

    // Log file operation error with response time
    fileEvent.error("upload", user_id || "unknown", error, {
      filename,
      type,
      responseTime,
    });

    // Log database error if it occurred during document creation
    databaseEvent.error("create", "user_documents", error, user_id);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
