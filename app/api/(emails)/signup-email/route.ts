import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../emailUtils";
import { config } from "@/app/utils/config";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    const html = formatEmail(name, email);
    await sendEmail(config.adminEmail, "New Sign Up", html);

    return NextResponse.json({ message: "Successfully sent sign up email" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
