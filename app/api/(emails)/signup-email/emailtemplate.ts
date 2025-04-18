export const formatEmail = (fullName: string, email: string) => {
  return `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New User Sign-up Notification</title>
          </head>
          <body style="margin: 0; padding: 20px; background-color: #f6f6f6; font-family: Arial, sans-serif;">
            <table cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background-color: #00150f; padding: 30px 40px; text-align: center;">
                  <h1 style="color: #DAA520; margin: 0; font-size: 24px;">New User Sign-up</h1>
                  <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                    Account created on ${new Date().toLocaleString("en-UK", {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </p>
                </td>
              </tr>
    
              <!-- Content -->
              <tr>
                <td style="padding: 40px;">
                  <!-- User Information -->
                  <div style="margin-bottom: 30px;">
                    <h2 style="color: #00150f; font-size: 18px; margin: 0 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #DAA520;">
                      User Information
                    </h2>
                    <p style="margin: 0 0 10px 0; font-size: 16px;">
                      <strong style="color: #666666;">Full Name:</strong> 
                      <span style="color: #000000;">${fullName}</span>
                    </p>
                    <p style="margin: 0 0 10px 0; font-size: 16px;">
                      <strong style="color: #666666;">Email:</strong> 
                      <span style="color: #000000;">${email}</span>
                    </p>
  
                  </div>
  
                  <!-- Action Buttons -->
                  <div style="margin-bottom: 30px; text-align: center;">
                    <!-- TODO - add link to user profile -->
                    <!-- <a href="${`{{viewProfileUrl}}`}" style="display: inline-block; background-color: #00150f; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-weight: bold; margin-right: 10px;">
                      View User Profile
                    </a> -->
                    <a href="https://www.stellar-recruitment.co.uk/admin" style="display: inline-block; background-color: #DAA520; color: #00150f; text-decoration: none; padding: 12px 20px; border-radius: 4px; font-weight: bold;">
                      Go to Admin Dashboard
                    </a>
                  </div>
                </td>
              </tr>
    
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8f8f8; padding: 20px 40px; text-align: center; border-top: 1px solid #eeeeee;">
                  <p style="margin: 0; color: #666666; font-size: 14px;">
                    This is an automated notification about a new user registration.
                  </p>
                  <p style="margin: 10px 0 0 0; color: #666666; font-size: 14px;">
                    Please review this account at your earliest convenience.
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
