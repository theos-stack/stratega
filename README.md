# Stratega AI

This project has:

- `backend/`: FastAPI API that generates and formats the Excel content calendar
- `frontend/`: Next.js app for the client-facing UI

## Local Run

### Backend

```powershell
cd backend
..\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

### Frontend

```powershell
cd frontend
npm run dev
```

## Environment Variables

### Backend

Create `backend/.env` from `backend/.env.example` and set:

- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `ALLOWED_ORIGINS`

### Frontend

Create `frontend/.env.local` from `frontend/.env.example` and set:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_BUILDER_PORTFOLIO_URL`

Production frontend setting:

```env
NEXT_PUBLIC_API_BASE_URL=https://stratega.neurarank.uk
```

If you use `frontend/.env` instead of `frontend/.env.local`, keep the same value there as well.

## Deploy

### Backend on AWS Lightsail

The backend is prepared for a Lightsail container deployment with:

- `backend/Dockerfile`
- `backend/lightsail-deployment.json`

Typical flow:

```powershell
cd backend
docker build -t content-calendar-backend .
```

Then push the image to your Lightsail container service and create a deployment using `lightsail-deployment.json`.

Official references:

- https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-creating-container-images.html
- https://docs.aws.amazon.com/lightsail/latest/userguide/amazon-lightsail-container-services-deployments.html
- https://docs.aws.amazon.com/en_us/lightsail/latest/userguide/amazon-lightsail-pushing-container-images.html

### Frontend on Vercel

Import the repo into Vercel and set the project root directory to `frontend`.

Set:

- `NEXT_PUBLIC_API_BASE_URL=https://stratega.neurarank.uk`
- `NEXT_PUBLIC_BUILDER_PORTFOLIO_URL=https://your-portfolio-url`

Official references:

- https://vercel.com/docs/frameworks/nextjs
- https://vercel.com/docs/monorepos
