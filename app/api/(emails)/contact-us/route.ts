import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../emailUtils";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const html = formatEmail(name, email, subject, message);
    await sendEmail(email, "New Contact Form Submission", html);

    return NextResponse.json({ message: "Successfully sent enquiry" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
