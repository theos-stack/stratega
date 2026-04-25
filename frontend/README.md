# Stratega AI Frontend

A Next.js + TypeScript frontend for the FastAPI backend.

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Default backend URL:

```env
NEXT_PUBLIC_API_BASE_URL=https://stratega.neurarank.uk
```

## 3. Run the frontend

```bash
npm run dev
```

Open `http://localhost:3000`

## 4. Run the backend

For local development, set `NEXT_PUBLIC_API_BASE_URL` explicitly in `.env.local` or `.env` to whichever backend origin you want to use. The app does not silently fall back to localhost.

## Deploy to Vercel

When deploying this app to Vercel, import the repo and set the root directory to `frontend`.

Required environment variables:

```env
NEXT_PUBLIC_API_BASE_URL=https://stratega.neurarank.uk
NEXT_PUBLIC_BUILDER_PORTFOLIO_URL=https://your-portfolio-url
```

## Features

- Backend health check
- Structured content generation form
- Generate button with loading state
- Error handling
- Result stats
- Spreadsheet download button
- Copy-ready AI prompt panels
- Responsive layout
