import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../emailUtils";

const { ADMIN_DESTINATION_EMAIL } = process.env;

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    const html = formatEmail(name, email);
    await sendEmail(ADMIN_DESTINATION_EMAIL!, "New Sign Up", html);

    return NextResponse.json({ message: "Successfully sent sign up email" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
