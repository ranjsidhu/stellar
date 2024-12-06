import { NextResponse } from "next/server";
import { createClient } from "@/app/utils/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return NextResponse.json({ message: "Sign out successful" });
  } catch (error: any) {
    return NextResponse.redirect("/");
  }
}
