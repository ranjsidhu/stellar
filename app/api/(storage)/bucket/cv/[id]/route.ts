import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/utils/prisma-utils";
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

    const userDocs = await prisma.user_documents.findFirst({
      where: { file_id: id },
      select: { filename: true },
    });

    const filename = userDocs?.filename ?? id;

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${id}"`,
        "Content-Length": fileBuffer.byteLength.toString(),
        "X-Filename": filename,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) throw new Error("No file id provided");
    const { id: dbID } = await req.json();
    const supabase = await createClient();
    const userDoc = await prisma.user_documents.delete({
      where: { id: dbID },
    });
    const { error } = await supabase.storage
      .from(NEXT_PUBLIC_CV_BUCKET!)
      .remove([id]);

    if (error) throw new Error(error.message);

    return NextResponse.json({
      message: "Document deleted successfully",
      response: userDoc,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
