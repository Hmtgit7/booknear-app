# Frontend Setup (Single App)

This project now uses one Next.js frontend app in `frontend/`.

## Goal

Keep all UI, state, and offline logic inside the same app codebase while preserving module boundaries.

## Suggested module boundaries inside `frontend/`

- `components/` and `components/ui/` for reusable UI primitives.
- `stores/` for Zustand stores.
- `lib/db/` and `lib/schemas/` for RxDB setup and schemas.
- `types/` for domain types and API contracts.

## Working conventions

1. Prefer feature-level folders under `modules/` for business flows.
2. Keep cross-feature primitives in `components/`, `hooks/`, `utils/`, and `types/`.
3. Keep browser-only data layers (RxDB) in client-safe modules.
4. Use explicit imports and avoid broad wildcard exports where possible.

## Dev commands

From repo root:

```bash
pnpm dev:frontend
pnpm --filter frontend build
pnpm --filter frontend lint
```

## Notes after migration

- Remove assumptions about separate apps (`patient-web`, `doctor-web`, `admin-web`).
- Route-level separation should now be handled in a single app via route groups or top-level segments such as `app/admin` and `app/doctor`.
