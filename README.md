# BookNear

Production-ready Turborepo starter for BookNear.

BookNear will be an online booking platform for parlour, salon, and spa services.

## Monorepo structure

```txt
booknear-app/
|- .github/workflows/
|- backend/
|  |- src/main.ts
|  `- package.json
|- frontend/
|  |- app/page.tsx
|  `- package.json
|- packages/
|  `- types/
|- package.json
|- turbo.json
|- pnpm-workspace.yaml
`- .gitignore
```

## Getting started

```bash
pnpm install
pnpm dev
```

## Useful commands

```bash
# run full dev with turbo
pnpm dev

# run only one app
pnpm dev:frontend
pnpm dev:backend

# quality gates
pnpm lint
pnpm typecheck
pnpm test

# production builds
pnpm build
```

## Included workflows

- Turbo task orchestration for `dev`, `build`, `lint`, `typecheck`, `test`
- GitHub Actions CI on push and pull requests
- Shared workspace package `@booknear/types` for cross-app domain contracts
- Husky hooks for pre-commit, commit-msg, and pre-push checks
- Dependabot for npm and GitHub Actions dependency updates

## Git hooks

- `pre-commit`: runs `lint-staged`
- `commit-msg`: runs `commitlint`
- `pre-push`: runs full `pnpm check`

## Dependency bot

- Dependabot config: `.github/dependabot.yml`
- Weekly updates for npm workspace dependencies and GitHub Actions
