import { type NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/app/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const body = await req.json();
    const response = {
      message: "Successfully logged in",
      user: null,
      response: {},
    };

    const creds = { email: body.email, password: body.password };
    const { error, data } = await supabase.auth.signInWithPassword(creds);

    if (error) throw new Error(error.message);
    response.response = data;
    const session = data.session;

    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("email", creds.email)
        .limit(1);

      if (error) throw new Error(error.message);

      response.user = data[0];
    } catch (error) {
      throw new Error("User does not exist or password is incorrect");
    }

    await supabase.auth.setSession(session);
    await supabase.auth.refreshSession();

    revalidatePath("/", "layout");

    return NextResponse.json({
      ...response,
      session,
    });
  } catch (error: any) {
    if (error.message === "Invalid login credentials") {
      return NextResponse.json(
        { message: "User does not exist or password is incorrect" },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: error.message }, { status: 403 });
  }
}
