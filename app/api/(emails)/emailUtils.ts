import {
  SESv2Client,
  SendEmailCommand,
  type SendEmailCommandInput,
} from "@aws-sdk/client-sesv2";

const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;

const client = new SESv2Client({
  region: AWS_REGION!,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY!,
    secretAccessKey: AWS_SECRET_ACCESS_KEY!,
  },
});

const sendEmail = async (input: SendEmailCommandInput) => {
  try {
    const command = new SendEmailCommand(input);
    await client.send(command);
  } catch (error: any) {
    console.log("Error sending email:", error.message);
  }
};

export { sendEmail };
