import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../emailUtils";
import { emailEvent } from "@/app/api/utils/logging";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const { name, email, subject, message } = await req.json();

    const html = formatEmail(name, email, subject, message);
    await sendEmail(email, "New Contact Form Submission", html);

    const responseTime = Date.now() - startTime;

    // Log successful email sending with response time
    emailEvent.contact(email, name, subject, true, { responseTime });

    return NextResponse.json({ message: "Successfully sent enquiry" });
  } catch (error: any) {
    const responseTime = Date.now() - startTime;

    // Log email sending failure with response time
    emailEvent.contact(
      req.body ? (await req.json()).email : "unknown",
      req.body ? (await req.json()).name : "unknown",
      req.body ? (await req.json()).subject : "unknown",
      false,
      { responseTime }
    );

    // Log email error
    emailEvent.error("contact_form", error);

    return NextResponse.json({ error: error.message });
  }
}
