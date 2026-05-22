# Naptec Backend

Express + Prisma + PostgreSQL API.

## Setup

```bash
cp .env.example .env
npm install
npx prisma generate
npm run db:push
npm run db:seed
npm run dev
```

API base URL: `http://localhost:4000/v1`

## Environment

| Variable | Required |
|----------|----------|
| `DATABASE_URL` | Yes |
| `JWT_ACCESS_SECRET` | Yes |
| `JWT_REFRESH_SECRET` | Yes |
| `CORS_ORIGIN` | `*` to allow any frontend origin, or comma-separated URLs (e.g. `https://naptech-web.vercel.app,https://naptech-admin.vercel.app`) |
| `CORS_ALLOW_ALL` | Optional — set `true` instead of `CORS_ORIGIN=*` |
| `PORT` | Optional (default `4000`) |
| `AI_PROVIDER` | `gemini` or `rules` (default `rules`) |
| `GEMINI_API_KEY` | Required when `AI_PROVIDER=gemini` |
| `GEMINI_MODEL` | Optional (default `gemini-2.5-flash`) |
| `SMTP_HOST` | Brevo: `smtp-relay.brevo.com` |
| `SMTP_PORT` | Usually `587` |
| `SMTP_USER` / `SMTP_PASS` | Brevo SMTP credentials |
| `MAIL_FROM` | Verified sender in Brevo |
| `ADMIN_EMAIL` | Receives enquiry & booking alerts |

## Deploy on Render

1. Create a **Web Service** from this repo.
2. Set **Root Directory** to `backend` (required — `dist/` is not committed).
3. **Build Command:** `npm install && npm run build`
4. **Start Command:** `npm run render:start` (runs migrations, then `node dist/index.js`)
5. Add env vars from `.env.example` (`DATABASE_URL`, JWT secrets, `CORS_ORIGIN`, etc.).

Or connect the repo with **Blueprint** using the root `render.yaml`.

If start fails with `Cannot find module .../dist/index.js`, the build step did not run or Root Directory is not `backend`.

## Scripts

- `npm run dev` — development server
- `npm run build` / `npm start` — production
- `npm run db:push` — sync schema to database
- `npm run db:seed` — seed demo users
- `npm run db:studio` — Prisma Studio

## Main routes

- `POST /v1/auth/register` — client signup
- `POST /v1/auth/login` — returns `accessToken`, sets refresh cookie
- `GET /v1/auth/me` — Bearer token required
- `POST /v1/inquiries` — public enquire form
- `POST /v1/recruitment/applications` — JSON with `cvDriveUrl`
- `GET /v1/clients/me/bookings` — client bookings
- `POST /v1/clients/me/bookings` — create care request
- `GET /v1/admin/dashboard` — admin stats
- `GET /v1/admin/bookings` — client booking requests (`?status=pending`)
- `POST /v1/admin/bookings/:id/match` — assign caregiver to a booking
- `GET /v1/caregiver/assignments` — caregiver shifts
