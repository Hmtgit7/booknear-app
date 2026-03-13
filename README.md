# DocNear Platform

> Verified doctor discovery & appointment booking — India 🇮🇳

This repository uses a `pnpm` workspace managed by `Turborepo`.

📋 **Initial release**: see [docs/INITIAL_RELEASE.md](docs/INITIAL_RELEASE.md) for production-ready checklist.

## Structure

```
docnear-platform/
├── backend/              ← NestJS API  (api.docnear.in)
├── frontend/             ← Next.js app (docnear.in)
├── pnpm-workspace.yaml
└── package.json
```

## First Time Setup

```bash
# 1. Install pnpm if you don't have it
npm install -g pnpm@10

# 2. Use correct Node version
nvm use

# 3. Run fresh install (cleans + installs + sets up husky)
chmod u+x fresh.sh && ./fresh.sh
```

## Daily Dev

```bash
# Full monorepo dev (backend + frontend)
pnpm dev

# Backend only (NestJS)
pnpm dev:backend

# Frontend only (Next.js)
pnpm dev:frontend

# Monorepo tasks
pnpm build
pnpm lint
pnpm test
pnpm check    # lint + typecheck + test
pnpm smoke   # Docker backend smoke test (requires Docker + bash)
```

## Committing

```bash
git add .
pnpm commit        # commitizen interactive prompt (recommended)

# or manually — must follow format:
git commit -m "feat(auth): add otp login"
git commit -m "fix(appointments): handle double booking"
```

### Valid commit types

`feat` · `fix` · `hotfix` · `docs` · `style` · `refactor` · `perf` · `test` · `build` · `ci` · `chore` · `revert`

## Branch Strategy

```
develop   → active development (feature branches merge here first)
staging   → QA/staging validation (merge from develop after review/testing)
main      → production (merge from staging after final review/testing)
feat/*    → new features
fix/*     → bug fixes
```

## Docker (Local Build Targets)

The repository includes a root `Dockerfile` with separate runtime targets:

- `backend`
- `frontend`

Build examples:

```bash
docker build -t docnear-backend --target backend .
docker build -t docnear-frontend --target frontend .
```

Run examples:

```bash
docker run --rm -p 5000:5000 --env-file backend/.env docnear-backend
docker run --rm -p 3000:3000 docnear-frontend
```

## Docker Compose (App Stack)

Use `docker-compose.app.yml` when you want infra + backend + frontend together.

```bash
# infra + backend only
docker compose -f docker-compose.app.yml up -d backend

# with frontend
docker compose -f docker-compose.app.yml --profile frontend up -d

# stop stack
docker compose -f docker-compose.app.yml down
```
