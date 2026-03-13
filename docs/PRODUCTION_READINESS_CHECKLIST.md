# Production Readiness Checklist

This checklist captures the remaining steps before go-live for the current DocNear monorepo setup.

## Backend (NestJS)

- [x] Add `helmet` and `compression` middleware in `backend/src/main.ts`.
- [x] Add API rate limiting baseline (global `/api` limiter).
- [x] Add request ID propagation for logs and tracing.
- [x] Add health endpoints (`/health/live`, `/health/ready`) for container orchestration.
- [x] Add structured logging output (JSON) for production collectors.
- Ensure secrets come from secret manager (not `.env` in prod).
- [x] Keep only one exception filter implementation and remove unused duplicates.

## Database + Prisma

- Run migration strategy review (for Mongo deployment flow).
- Add backup/restore runbook for MongoDB.
- Add index audit for frequently queried fields.

## RxDB (`@docnear/db`)

- Encrypt local collections containing sensitive PHI/PII.
- Add background/foreground sync hooks and reconnect handling at app layer.
- Add conflict resolution strategy on server replication endpoints.
- Add telemetry around sync failures and lag.
- Add E2E tests for offline queue replay and conflict cases.

## Zustand Stores (`@docnear/store`)

- Keep auth tokens in secure cookies only.
- Add persisted store versioning + migration for future schema changes.
- Add unit tests for hydration behavior and logout flow.

## UI / shadcn (`@docnear/ui`)

- Add visual regression baseline for token changes.
- Add accessibility pass (contrast, keyboard navigation, focus order).
- Add theme switch persistence policy and SSR-safe initialization in the frontend app.

## Infra / Delivery

- [x] CI pipeline for lint + typecheck + tests + Docker build (`.github/workflows/ci.yml`)
- [x] Security workflow: dependency-review, CodeQL (`.github/workflows/security.yml`)
- [x] Smoke script for Docker backend (`pnpm smoke`)
- Add staging deployment with smoke tests before production promotion
- Add error monitoring (Sentry/OpenTelemetry) and alerting

## Release Gate

- Run `pnpm check` from monorepo root with all tests green
- Run `pnpm smoke` for Docker backend smoke test (or manual compose run)
- Validate env variables against the backend validation contract

## Done (Initial Release)

- [x] Repository-level CI (lint, typecheck, test, Docker build)
- [x] Smoke script for `docker-compose.app.yml` (`pnpm smoke`)
- [x] Three-branch flow: develop → staging → main
- [x] Shared tsconfig, CONTRIBUTING, backend deployment docs
