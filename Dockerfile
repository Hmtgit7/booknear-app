FROM node:22-alpine AS base
WORKDIR /repo
RUN corepack enable

FROM base AS deps
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
COPY packages/types/package.json packages/types/package.json
RUN pnpm install --frozen-lockfile

FROM deps AS build
COPY . .
RUN pnpm --filter backend build
RUN pnpm --filter frontend build

FROM node:22-alpine AS backend
WORKDIR /app
RUN corepack enable
COPY --from=build /repo/backend/dist ./dist
COPY --from=build /repo/backend/package.json ./package.json
COPY --from=build /repo/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --prod --frozen-lockfile
EXPOSE 4000
CMD ["node", "dist/main"]

FROM node:22-alpine AS frontend
WORKDIR /app
RUN corepack enable
COPY --from=build /repo/frontend/.next ./.next
COPY --from=build /repo/frontend/public ./public
COPY --from=build /repo/frontend/package.json ./package.json
COPY --from=build /repo/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --prod --frozen-lockfile
EXPOSE 3000
CMD ["pnpm", "start"]
