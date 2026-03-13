# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@10.31.0 --activate
WORKDIR /repo

# Install all workspace dependencies once.
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN pnpm install --frozen-lockfile

# Backend build.
FROM deps AS build-backend
COPY . .
RUN pnpm --filter backend prisma:generate && pnpm --filter backend build

# Frontend app build.
FROM deps AS build-frontend
COPY . .
RUN pnpm --filter frontend build

# Runtime image: backend API.
FROM base AS backend
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=deps /repo/backend/node_modules ./backend/node_modules
COPY --from=build-backend /repo/backend/package.json ./backend/package.json
COPY --from=build-backend /repo/backend/dist ./backend/dist
COPY --from=build-backend /repo/backend/generated ./backend/generated
COPY --from=build-backend /repo/backend/generated ./backend/dist/generated
EXPOSE 5000
CMD ["node", "backend/dist/src/main.js"]

# Runtime image: frontend web.
FROM base AS frontend
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --from=deps /repo/node_modules ./node_modules
COPY --from=build-frontend /repo/frontend ./frontend
EXPOSE 3000
CMD ["pnpm", "--dir", "frontend", "start"]
