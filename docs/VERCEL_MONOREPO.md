# Deploying the monorepo on Vercel

This repository now has a single Next.js app at `frontend`.

## Vercel project setup

1. In Vercel: **Add New** -> **Project** -> import this Git repo.
2. Set **Root Directory** to `frontend`.
3. Keep the framework preset as Next.js.
4. Set environment variables for the frontend app (for example `NEXT_PUBLIC_API_URL`).
5. Deploy.

## Why root directory matters

Vercel builds the folder configured in **Root Directory**. Setting it to `frontend` ensures only the frontend app is built and deployed.

## Summary

| Vercel project | Root Directory | Domain (example) |
| -------------- | -------------- | ---------------- |
| docnear-web    | `frontend`     | docnear.in       |
