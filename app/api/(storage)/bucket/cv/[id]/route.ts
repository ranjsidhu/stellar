import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    //   TODO - cross reference db table with id in params to get file by name - need filetype in the download param to get the file
    const { id } = params;
    const supabase = createClient();
    const { data } = await supabase.storage
      .from("stellar-cv-docs")
      .download(id);

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
