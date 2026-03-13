# Contributing to DocNear Platform

Thanks for contributing. This repo is a Turborepo + pnpm workspace monorepo.

## Branch strategy

- `develop` → active development (feature branches merge here first)
- `staging` → QA/staging validation (PRs from `develop` land here after review/testing)
- `main` → production (merge from `staging` after final review/testing)
- `feat/*` → new features
- `fix/*` → bug fixes
- `chore/*` → tooling / refactors / maintenance

## Local setup

### Prerequisites

- Node: see `.nvmrc`
- pnpm: see root `package.json` `packageManager`

### Install

```bash
pnpm install
```

## Development workflows

### Run everything

```bash
pnpm dev
```

### Run individual apps

```bash
pnpm dev:backend
pnpm dev:patient
pnpm dev:doctor
pnpm dev:admin
```

### Quality gates (same as CI)

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Commit conventions

We enforce Conventional Commits via commitlint.

Recommended:

```bash
pnpm commit
```

Examples:

- `feat(auth): add otp login`
- `fix(appointments): prevent double booking`
- `docs(readme): update setup steps`

## Pull request flow

Before opening a PR:

- Ensure `pnpm lint`, `pnpm typecheck`, `pnpm test` pass locally
- Keep changes focused and small when possible
- Update docs when behavior changes
- Update `backend/.env.example` if you add env vars

PR checklist:

- **Description**: what changed and why
- **Screenshots**: for UI changes
- **Test plan**: how to verify manually

### Recommended merge flow

- **Feature work**: `feat/*` / `fix/*` → PR into `develop`
- **Staging**: PR from `develop` → `staging` (QA + regression)
- **Production**: PR from `staging` → `main`

## Repository conventions

### Environment variables

- Never commit secrets
- Update `.env.example` when adding a new variable

### Database / Prisma

- Prefer `@prisma/client` imports for application code
- Keep schema changes reviewed and tested
