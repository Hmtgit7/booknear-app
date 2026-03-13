# Backend Deployment (NestJS API)

This document describes how to deploy the `backend` service independently of the frontend Vercel deployment.

## What you deploy

- **Service**: NestJS API (`backend/`)
- **Database**: MongoDB (see `backend/prisma/schema.prisma`)
- **Cache/Queue**: Redis (optional, if enabled via env)

## Environment variables

Copy and fill:

- `backend/.env.example` → `backend/.env`

Minimum required in production:

- **NODE_ENV**: `production`
- **PORT**: API port (e.g. `5000`)
- **DATABASE_URL**: MongoDB connection string
- **JWT_SECRET**: 32+ chars
- **REDIS_URL**: Redis connection string (if used)

Other integrations (optional depending on features):

- AWS S3 keys + buckets
- MSG91 OTP keys
- Razorpay keys

## Docker (recommended)

The repo root `Dockerfile` supports a `backend` target.

### Build

```bash
docker build -t docnear-backend --target backend .
```

### Run

```bash
docker run --rm -p 5000:5000 --env-file backend/.env docnear-backend
```

### Production notes

- Run behind a reverse proxy (Nginx / Caddy) with TLS
- Set `NODE_ENV=production`
- Configure proper logging and monitoring

## Compose (infra + backend)

For local-like deployments, use `docker-compose.app.yml`:

```bash
docker compose -f docker-compose.app.yml up -d backend
```

## Health and verification

After deployment:

- Confirm the container is healthy and listening on `PORT`
- Verify DB connectivity (Prisma connection established)
- Run a smoke test against key endpoints (auth, profile, appointment flow)

## CI/CD note

Currently deployments are done manually (frontend on Vercel). When the backend deployment target is finalized, we can add automated CI/CD for backend image builds and deployments.
