# Naptec

Care platform: Next.js frontend + Express API + PostgreSQL.

## Project structure

```
Naptec/
├── backend/     # Express API, Prisma, PostgreSQL
└── frontend/    # Next.js app
```

## Run locally

**Terminal 1 — API**

```bash
cd backend
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

API: http://localhost:4000/v1

**Terminal 2 — Frontend**

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

App: http://localhost:3000

## Seed accounts

| Email | Password | Role |
|-------|----------|------|
| admin@naptec.care | ChangeMe123! | admin |
| caregiver@naptec.care | ChangeMe123! | caregiver |
| james.okonkwo@naptec.care | ChangeMe123! | caregiver |
| priya.sharma@naptec.care | ChangeMe123! | caregiver |
| emma.walsh@naptec.care | ChangeMe123! | caregiver |
| client@naptec.care | ChangeMe123! | client |

See [backend/README.md](backend/README.md) for API routes and database scripts.
