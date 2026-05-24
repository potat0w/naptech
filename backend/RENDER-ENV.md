# Render environment variables

Set these on **Render → naptech-1 → Environment** (not only in local `.env`).

## Three frontend URLs (emails + links)

```
WEB_APP_URL=https://www.naptechealthcareservices.co.uk
ADMIN_APP_URL=https://admin.naptechealthcareservices.co.uk
CAREGIVER_APP_URL=https://caregiver.naptechealthcareservices.co.uk
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
Web app URL: https://www.naptechealthcareservices.co.uk
Admin app URL: https://admin.naptechealthcareservices.co.uk
Caregiver app URL: https://caregiver.naptechealthcareservices.co.uk
```

## Vercel (each frontend project)

Each web, admin, and caregiver project needs:

```
NEXT_PUBLIC_API_URL=https://naptech-1.onrender.com/v1
NEXT_PUBLIC_WEB_APP_URL=https://www.naptechealthcareservices.co.uk
NEXT_PUBLIC_ADMIN_APP_URL=https://admin.naptechealthcareservices.co.uk
NEXT_PUBLIC_CAREGIVER_APP_URL=https://caregiver.naptechealthcareservices.co.uk
```

Redeploy all three after changing env vars.
