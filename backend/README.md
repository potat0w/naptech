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
| `CORS_ORIGIN` | Yes (e.g. `http://localhost:3000`) |
| `PORT` | Optional (default `4000`) |
| `AI_PROVIDER` | `gemini` or `rules` (default `rules`) |
| `GEMINI_API_KEY` | Required when `AI_PROVIDER=gemini` |
| `GEMINI_MODEL` | Optional (default `gemini-2.5-flash`) |

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
