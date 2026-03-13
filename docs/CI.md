# CI Notes

The repo uses GitHub Actions for validation (lint, typecheck, test, build) and security scanning.

## What CI runs

Workflow: `.github/workflows/ci.yml`

- `pnpm install --frozen-lockfile`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm --filter backend test:e2e`
- `pnpm build`
- Docker build for all root `Dockerfile` targets (backend + frontend)

## Prisma generation

Backend lint/typecheck/build require a generated Prisma client. The backend package scripts run `prisma generate` automatically before those commands.

## Turbo remote cache (optional)

Remote cache is **optional**. If/when you want it:

1. Create a Turbo account and team.
2. Add repository secrets:
   - `TURBO_TOKEN`
   - `TURBO_TEAM` (or whichever identifier your Turbo setup uses)
3. Update CI to pass these env vars to Turbo commands.

This is not required for correctness—only for speeding up CI.

## Deployment note

Frontend app is deployed on **Vercel** currently. Backend deployment automation will be added later (no AWS pipeline at this stage).
