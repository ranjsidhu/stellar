import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

const {
  NEXT_PUBLIC_CV_BUCKET,
  NODE_ENV,
  NEXT_PUBLIC_DEV_API_URL,
  NEXT_PUBLIC_PROD_API_URL,
} = process.env;

const baseURL =
  NODE_ENV === "development"
    ? NEXT_PUBLIC_DEV_API_URL
    : NEXT_PUBLIC_PROD_API_URL;

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
    const response = await supabase
      .from("file_types")
      .select()
      .eq("name", "CV");
    if (response.error) {
      throw new Error(response.error.message);
    }
    const cv_file_type_id = response.data[0].id;

    // Call the user_documents route to update the user's CV
    const userDocumentsResponse = await fetch(`${baseURL}/user_documents`, {
      method: "POST",
      body: JSON.stringify({
        file_id: fullFilename,
        file_type_id: cv_file_type_id,
        filename,
        user_id,
      }),
    }).catch((error: any) => {
      throw new Error(error.message);
    });

    if (!userDocumentsResponse.ok) {
      const errorData = await userDocumentsResponse.json();
      throw new Error(errorData.message || "Failed to update user documents");
    }

    const userDocumentsData = await userDocumentsResponse.json();

    return NextResponse.json({
      message: "File uploaded sucessfully",
      id: userDocumentsData.response[0].id,
      file_id: userDocumentsData.response[0].file_id,
      filename: userDocumentsData.response[0].filename,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "File upload failed" },
      { status: 500 }
    );
  }
}
