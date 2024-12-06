import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("email", params.email)
      .limit(1);

    if (error) throw new Error(error.message);

    return NextResponse.json({ response: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
