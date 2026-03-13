# Turbo Repo Review — DocNear Platform

> Architecture status after migration to a single Next.js frontend app.

## Executive Summary

**Verdict: Healthy baseline for development.**

The workspace is aligned to:

- `backend` (NestJS API)
- `frontend` (single Next.js app)

Root Turborepo scripts, CI, Docker targets, and deployment docs now point to this structure.

## Current Workspace Layout

- `backend/`
- `frontend/`

`pnpm-workspace.yaml` includes only these package roots.

## Turbo Pipeline Notes

- Build graph remains `dependsOn: ["^build"]`.
- `dev` tasks remain uncached and persistent.
- Outputs remain appropriate for Next (`.next/**`) and Nest (`dist/**`).

## CI/CD Notes

- CI validates lint, typecheck, tests, build.
- Docker build step validates targets:
  - `backend`
  - `frontend`

## Docker Notes

- Root `Dockerfile` now builds and runs a single frontend target.
- `docker-compose.app.yml` now provides one optional `frontend` profile with infra + backend.

## Recommended Follow-ups

1. If any old lockfile entries remain from removed apps, run a clean install to regenerate lockfiles.
2. Remove or migrate any leftover references to legacy package aliases (`@docnear/*`) if those packages are no longer part of the workspace.
3. Keep Vercel root directory fixed to `frontend` for all production/staging frontend deployments.
