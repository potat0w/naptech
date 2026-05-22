export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const LOGO_URL =
  "https://res.cloudinary.com/dw1n6qugv/image/upload/v1779202191/logo1_ctw4rm.png";

const responsiveStyles = `
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    .wrapper { width: 100%; table-layout: fixed; background-color: #faf8f4; }
    .main { max-width: 600px; margin: 0 auto; width: 100%; }
    @media only screen and (max-width: 620px) {
      .outer-pad { padding: 24px 12px !important; }
      .header-pad { padding: 24px 20px !important; }
      .body-pad { padding: 24px 20px !important; }
      .footer-pad { padding: 20px 20px !important; }
      .headline { font-size: 20px !important; }
      .logo { width: 140px !important; max-width: 140px !important; }
      .detail-cell { display: block !important; width: 100% !important; padding-bottom: 12px !important; }
      .btn { display: block !important; width: 100% !important; box-sizing: border-box !important; }
    }
`;

export function wrapEmailHtml(options: {
  title: string;
  preheader: string;
  headerBg: string;
  headline: string;
  body: string;
}) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <title>${escapeHtml(options.title)}</title>
  <style type="text/css">${responsiveStyles}</style>
</head>
<body style="margin:0;padding:0;width:100%;background-color:#faf8f4;font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(options.preheader)}
  </div>
  <table class="wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#faf8f4;">
    <tr>
      <td class="outer-pad" align="center" style="padding:40px 16px;">
        <table class="main" width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:600px;background-color:#ffffff;border-radius:16px;border:1px solid #ede9f3;">
          <tr>
            <td class="header-pad" align="center" style="background-color:${options.headerBg};padding:28px 24px;">
              <img class="logo" src="${LOGO_URL}" alt="Naptec Health Care Services" width="160" style="display:block;margin:0 auto 16px;width:160px;max-width:160px;height:auto;" />
              <p class="headline" style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;line-height:1.3;color:#ffffff;">${options.headline}</p>
            </td>
          </tr>
          <tr>
            <td class="body-pad" style="padding:32px 28px;color:#404040;">
              ${options.body}
            </td>
          </tr>
          <tr>
            <td class="footer-pad" align="center" style="background-color:#f5f2f8;padding:24px 28px;border-top:1px solid #ede9f3;">
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

export function detailRow(label: string, value: string) {
  return `<tr>
    <td class="detail-cell" style="padding:10px 0;border-bottom:1px solid #ede9f3;vertical-align:top;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:0.04em;color:#6b6560;">${escapeHtml(label)}</p>
      <p style="margin:0;font-size:15px;line-height:1.45;color:#171717;">${escapeHtml(value)}</p>
    </td>
  </tr>`;
}

export function ctaButton(label: string, href: string) {
  return `<table cellpadding="0" cellspacing="0" role="presentation" align="center" style="margin:28px auto 0;">
    <tr>
      <td align="center" style="border-radius:12px;background-color:#644596;">
        <a class="btn" href="${href}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:12px;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}
