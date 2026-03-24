# Backend (Native HTTP + PostgreSQL)

## 1) Environment

Copy `backend/.env.example` values into your shell or `.env` strategy.

## 2) Database

Run SQL in order:

1. `backend/db/migrations/001_init.sql`
2. `backend/db/seeds/001_seed.sql`

## 3) Start API

From project root:

- Dev watch mode: `npm run dev:server`
- Normal mode: `npm run start:server`

Server default URL: `http://localhost:4000`

## 4) Frontend switch (next phase)

When API integration testing starts, use:

- `VITE_USE_MOCK_API=false`
- `VITE_API_BASE_URL=http://localhost:4000/api`

## 5) Public API Endpoints

- `GET /api/solutions`
- `GET /api/solutions/:slug`
- `GET /api/references`
- `GET /api/seo`
- `GET /api/content/sections/:sectionKey`
- `POST /api/forms`
