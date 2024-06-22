import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const data = { email: body.email, password: body.password };
    const { error } = await supabase.auth.signUp(data);

    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    return NextResponse.json({ message: `Successfully registered` });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
