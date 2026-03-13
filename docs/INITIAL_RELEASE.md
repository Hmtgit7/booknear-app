# Initial Release — Production-Ready Checklist

Use this before your first production deploy or initial public commit.

## Pre-commit verification

```bash
pnpm check          # lint + typecheck + test
pnpm build          # full monorepo build
pnpm smoke          # optional: Docker backend smoke test (requires Docker, bash)
```

## Branch & CI

- [ ] `develop`, `staging`, `main` exist; CI runs on all three
- [ ] Branch protection rules configured (optional for initial)

## Secrets & environment

- [ ] No `.env` or secrets committed (`.env` is gitignored)
- [ ] `backend/.env.example` documents all required vars
- [ ] Production secrets stored in secret manager / Vercel env (not in repo)

## Deployment targets

- **Frontend**: Vercel (see `docs/VERCEL_MONOREPO.md`)
- **Backend**: Docker image or PaaS (see `docs/BACKEND_DEPLOYMENT.md`)

## Quick commands

| Command       | Purpose                          |
| ------------- | -------------------------------- |
| `pnpm dev`    | Run backend + frontend           |
| `pnpm check`  | Lint + typecheck + test          |
| `pnpm build`  | Build all packages               |
| `pnpm smoke`  | Docker backend smoke test        |
| `pnpm commit` | Conventional commit (commitizen) |

## After initial commit

- Configure Vercel project for frontend app (`frontend`)
- Deploy backend (Docker/ECS/App Runner/etc.)
- Set up error monitoring (e.g. Sentry)
- Add staging deployment + smoke tests before production
