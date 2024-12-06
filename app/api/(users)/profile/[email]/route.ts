import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const supabase = await createClient();
    const { email } = await params;

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", email)
      .limit(1);

    if (error) throw new Error(error.message);

    return NextResponse.json({ response: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
