# Naptec

Care platform: three Next.js frontends + one Express API + PostgreSQL.

## Project structure

```
Naptec/
├── backend/              # Express API (deploy once)
└── frontends/
    ├── web/              # Public site + client booking
    ├── admin/            # Admin portal
    └── caregiver/        # Caregiver portal
```

See [frontends/README.md](frontends/README.md) for per-app URLs and env vars.

## Run locally

**API**

```bash
cd backend
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
`
**Frontends** (three terminals)

```bash
cd frontends/web && cp .env.example .env.local && npm install && npm run dev
cd frontends/admin && cp .env.example .env.local && npm install && npm run dev
cd frontends/caregiver && cp .env.example .env.local && npm install && npm run dev
```

| App | URL |
|-----|-----|
| Web | http://localhost:3000 |
| Admin | http://localhost:3001 |
| Caregiver | http://localhost:3002 |
