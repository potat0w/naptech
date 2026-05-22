export function buildPasswordResetOtpHtml(otp: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>Your Naptec password reset code</title>
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #faf8f4; }
    .main { max-width: 600px; margin: 0 auto; width: 100%; }
    .otp-code { font-size: 32px; letter-spacing: 8px; }
    @media only screen and (max-width: 620px) {
      .outer-pad { padding: 24px 12px !important; }
      .header-pad { padding: 24px 20px !important; }
      .body-pad { padding: 28px 20px !important; }
      .footer-pad { padding: 20px 20px !important; }
      .headline { font-size: 20px !important; }
      .logo { width: 140px !important; max-width: 140px !important; }
      .otp-code { font-size: 26px !important; letter-spacing: 5px !important; }
      .otp-cell { padding: 16px 20px !important; }
    }
    @media only screen and (max-width: 380px) {
      .otp-code { font-size: 22px !important; letter-spacing: 4px !important; }
      .otp-cell { padding: 14px 12px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;width:100%;background-color:#faf8f4;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Your Naptec password reset code is valid for 15 minutes.
  </div>
  <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#faf8f4;">
    <tr>
      <td class="outer-pad" align="center" style="padding:40px 16px;">
        <table class="main" width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;border:1px solid #ede9f3;">
          <tr>
            <td class="header-pad" align="center" style="background-color:#3f2d62;padding:28px 24px;">
              <img class="logo" src="https://res.cloudinary.com/dw1n6qugv/image/upload/v1779202191/logo1_ctw4rm.png" alt="Naptec Health Care Services" width="160" style="display:block;margin:0 auto 16px;width:160px;max-width:160px;height:auto;" />
              <p class="headline" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;color:#ffffff;">Your password reset code</p>
            </td>
          </tr>
          <tr>
            <td class="body-pad" align="center" style="padding:36px 32px;color:#404040;">
              <p style="margin:0 0 8px;font-size:16px;line-height:1.6;color:#404040;text-align:center;">
                Use the code below to reset your Naptec client account password on the Book care page.
              </p>
              <p style="margin:0 0 28px;font-size:14px;line-height:1.5;color:#6b6560;text-align:center;">
                This code is valid for <strong style="color:#3f2d62;">15 minutes</strong>.
              </p>
              <table cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin:0 auto;">
                <tr>
                  <td class="otp-cell otp-code" align="center" style="padding:18px 36px;font-size:32px;letter-spacing:8px;font-weight:bold;background-color:#f5f2f8;border:2px solid #ede9f3;border-radius:12px;color:#3f2d62;font-family:'Courier New',Courier,monospace;">${otp}</td>
                </tr>
              </table>
              <p style="margin:28px 0 0;font-size:13px;line-height:1.5;color:#6b6560;text-align:center;">
                If you did not request this, you can safely ignore this email. Your password will not change.
              </p>
            </td>
          </tr>
          <tr>
            <td class="footer-pad" align="center" style="background-color:#f5f2f8;padding:24px 32px;border-top:1px solid #ede9f3;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:bold;color:#3f2d62;">Naptec Care</p>
              <p style="margin:0 0 12px;font-size:12px;line-height:1.5;color:#6b6560;">
                Unit 2, Walnut Tree Business Centre, Walnut Tree Farm,<br />
                Lower Stretton, Warrington, Cheshire WA4 4PG
              </p>
              <p style="margin:0;font-size:12px;color:#6b6560;">
                <a href="mailto:info@naptec.co.uk" style="color:#644596;text-decoration:none;font-weight:bold;">info@naptec.co.uk</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
