export const formatEmail = (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 20px; background-color: #f6f6f6; font-family: Arial, sans-serif;">
          <table cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td style="background-color: #00150f; padding: 30px 40px; text-align: center;">
                <h1 style="color: #DAA520; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                  Received on ${new Date().toLocaleString("en-UK", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
              </td>
            </tr>
  
            <!-- Content -->
            <tr>
              <td style="padding: 40px;">
                <!-- Contact Information -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #00150f; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #DAA520;">
                    Contact Information
                  </h2>
                  <p style="margin: 0 0 10px 0; font-size: 16px;">
                    <strong style="color: #666666;">Name:</strong> 
                    <span style="color: #000000;">${name}</span>
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 16px;">
                    <strong style="color: #666666;">Email:</strong> 
                    <span style="color: #000000;">${email}</span>
                  </p>
                </div>
  
                <!-- Subject -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #00150f; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #DAA520;">
                    Subject
                  </h2>
                  <p style="margin: 0 0 10px 0; font-size: 16px; color: #000000;">
                    ${subject}
                  </p>
                </div>
  
                <!-- Message -->
                <div style="margin-bottom: 30px;">
                  <h2 style="color: #00150f; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #DAA520;">
                    Message
                  </h2>
                  <div style="margin: 0; font-size: 16px; color: #000000; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-left: 4px solid #DAA520; border-radius: 4px;">
                    ${message.replace(/\n/g, "<br>")}
                  </div>
                </div>
              </td>
            </tr>
  
            <!-- Footer -->
            <tr>
              <td style="background-color: #f8f8f8; padding: 20px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                <p style="margin: 0; color: #666666; font-size: 14px;">
                  This is an automated message from your website's contact form.
                </p>
                <p style="margin: 10px 0 0 0; color: #666666; font-size: 14px;">
                  Please respond to this inquiry at your earliest convenience by replying to this email.
                </p>
                <div style="margin-top: 20px;">
                  <span style="display: inline-block; width: 30px; height: 4px; background-color: #DAA520; border-radius: 2px; margin: 0 3px;"></span>
                  <span style="display: inline-block; width: 30px; height: 4px; background-color: #00150f; border-radius: 2px; margin: 0 3px;"></span>
                  <span style="display: inline-block; width: 30px; height: 4px; background-color: #DAA520; border-radius: 2px; margin: 0 3px;"></span>
                </div>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
};
