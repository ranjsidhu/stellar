import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const creds = { email: body.email, password: body.password };
    const { error } = await supabase.auth.signInWithPassword(creds);

    await supabase.auth.refreshSession();

    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    return NextResponse.json({
      message: `Email sent to ${body.email}`,
    });
  } catch (error: any) {
    if (error.message === "Invalid login credentials") {
      return NextResponse.json(
        { message: "User does not exist or password is incorrect" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
