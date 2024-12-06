import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

const { NEXT_PUBLIC_CV_BUCKET } = process.env;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) throw new Error("No file id provided");
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from(NEXT_PUBLIC_CV_BUCKET!)
      .download(id);

    if (error) throw new Error(error.message);

    const fileBuffer = await data?.arrayBuffer();
    const contentType = data?.type || "application/octet-stream";

    const { data: userDocsData, error: userDocsError } = await supabase
      .from("user_documents")
      .select("filename")
      .eq("file_id", id);

    if (userDocsError) throw new Error(userDocsError.message);

    const filename = userDocsData?.[0]?.filename || id;

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${id}"`,
        "Content-Length": fileBuffer!.byteLength.toString(),
        "X-Filename": filename,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
