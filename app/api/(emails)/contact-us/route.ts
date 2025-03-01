import { type NextRequest, NextResponse } from "next/server";
import { formatEmail } from "./emailtemplate";
import { sendEmail } from "../emailUtils";
import { SendEmailCommandInput } from "@aws-sdk/client-sesv2";

const { SENDER_EMAIL, ADMIN_DESTINATION_EMAIL } = process.env;

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    const html = formatEmail(name, email, subject, message);

    const input: SendEmailCommandInput = {
      FromEmailAddress: SENDER_EMAIL!,
      Destination: {
        ToAddresses: [ADMIN_DESTINATION_EMAIL!],
      },
      ReplyToAddresses: [email],
      FeedbackForwardingEmailAddress: ADMIN_DESTINATION_EMAIL!,
      Content: {
        Simple: {
          Subject: {
            Data: "New Contact Form Submission",
          },
          Body: {
            Html: {
              Data: html,
            },
          },
        },
      },
    };

    await sendEmail(input);

    return NextResponse.json({ message: "Successfully sent enquiry" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
