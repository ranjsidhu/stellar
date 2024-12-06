import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = await createClient();
    const { data, error }: { data: any; error: any } = await supabase
      .from("users")
      .select(`*, roles (name)`)
      .eq("email", body.email)
      .single();

    if (error) throw new Error(error.message);
    if (!data || !data.roles) throw new Error("Role not found");

    return NextResponse.json({ ...data });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 403 });
  }
}
