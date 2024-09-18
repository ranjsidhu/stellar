import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

const { NEXT_PUBLIC_CV_BUCKET } = process.env;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const body = await req.formData();
    const id = body.get("id");
    const file = body.get("file") as Blob;
    const type = body.get("type");

    const filename = id;

    // Upload CV to the bucket
    const { data, error } = await supabase.storage
      .from(NEXT_PUBLIC_CV_BUCKET!)
      .upload(`${filename}.${type}`, file);

    if (error) {
      return NextResponse.json(
        { message: "File upload failed" },
        { status: 500 }
      );
    }

    // TODO -  Update the user's CV in the database

    return NextResponse.json({
      message: "File uploaded sucessfully",
      id: data.id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "File upload failed" },
      { status: 500 }
    );
  }
}

// TODO - DB design
/**
 * Files table?
 *  - File type -> cv, profile pic, id, etc
 *  - in files table -> user_id, file_id, file_type_id, filename
 * cv_id col in users table?
 */
