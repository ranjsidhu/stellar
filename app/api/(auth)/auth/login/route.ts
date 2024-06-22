import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";
import { access } from "fs";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const body = await req.json();

    const creds = { email: body.email, password: body.password };
    const { error } = await supabase.auth.signInWithPassword(creds);

    const { data } = await supabase.auth.refreshSession();
    const { session, user } = data;

    if (error) throw new Error(error.message);
    revalidatePath("/", "layout");
    return NextResponse.json({
      message: `Email sent to ${body.email}`,
      access_token: session?.access_token,
      refresh_token: session?.refresh_token,
      user_id: user?.id,
    });
  } catch (error: any) {
    // TODO - define login error handling
    if (error.message === "Invalid login credentials") {
      return NextResponse.json(
        { message: "User does not exist or password is incorrect" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
