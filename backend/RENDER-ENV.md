# Render environment variables

Set these on **Render → naptech-1 → Environment** (not only in local `.env`).

## Three frontend URLs (emails + links)

```
WEB_APP_URL=https://naptech-web.vercel.app
ADMIN_APP_URL=https://naptech-admin.vercel.app
CAREGIVER_APP_URL=https://naptech-caregiver.vercel.app
```

`APP_URL` can match `WEB_APP_URL` for backward compatibility.

Assignment emails link to `CAREGIVER_APP_URL/tasks`.  
Enquiry notifications link to `ADMIN_APP_URL/inquiries`.

## Email (Brevo SMTP)

```
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=ac29b9001@smtp-brevo.com
SMTP_PASS=<brevo-smtp-key>
MAIL_FROM=kahonbintezaman@gmail.com
MAIL_FROM_NAME=Naptec Care
ADMIN_EMAIL=kahonbintezaman@gmail.com
NODE_ENV=production
```

`MAIL_FROM` must be **Verified** in Brevo → Senders.

After deploy, logs should show:

```
SMTP verify: connection to Brevo OK
Web app URL: https://naptech-web.vercel.app
Admin app URL: https://naptech-admin.vercel.app
Caregiver app URL: https://naptech-caregiver.vercel.app
```

## Vercel (each frontend project)

Each of `naptech-web`, `naptech-admin`, `naptech-caregiver` needs:

```
NEXT_PUBLIC_API_URL=https://naptech-1.onrender.com/v1
NEXT_PUBLIC_WEB_APP_URL=https://naptech-web.vercel.app
NEXT_PUBLIC_ADMIN_APP_URL=https://naptech-admin.vercel.app
NEXT_PUBLIC_CAREGIVER_APP_URL=https://naptech-caregiver.vercel.app
```

Redeploy all three after changing env vars.
