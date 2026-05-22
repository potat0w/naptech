# Naptec frontends

Three separate Next.js apps, one shared API (`backend/`).

| App | Folder | Local URL | Deploy as |
|-----|--------|-----------|-----------|
| Public site & clients | `web/` | http://localhost:3000 | Main marketing domain |
| Admin portal | `admin/` | http://localhost:3001 | `admin.yourdomain.com` |
| Caregiver portal | `caregiver/` | http://localhost:3002 | `care.yourdomain.com` |

## Setup

```bash
cp frontends/web/.env.example frontends/web/.env.local
cp frontends/admin/.env.example frontends/admin/.env.local
cp frontends/caregiver/.env.example frontends/caregiver/.env.local
```

All frontends share one API:

```env
NEXT_PUBLIC_API_URL=https://naptech-1.onrender.com/v1
```

In production, set the three `NEXT_PUBLIC_*_APP_URL` values to each frontend’s public URL so login redirects work across apps.

## Run locally

From repo root (with workspaces):

```bash
npm install
npm run dev:api
npm run dev:web
npm run dev:admin
npm run dev:caregiver
```

Or from each folder: `cd frontends/web && npm run dev`.

## Backend CORS

Add every frontend origin to `CORS_ORIGIN` in `backend/.env` (comma-separated):

```env
CORS_ORIGIN=https://naptec.care,https://admin.naptec.care,https://care.naptec.care
```

## Routes

- **Web:** `/`, `/book`, `/login`, marketing pages
- **Admin:** `/dashboard`, `/bookings`, `/caregivers`, … (no `/admin` prefix)
- **Caregiver:** `/dashboard`, `/tasks`, `/reports`, `/profile`
