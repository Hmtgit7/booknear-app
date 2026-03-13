type Env = Record<string, string | undefined>;

function requireEnv(env: Env, key: string): string {
  const value = env[key]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function parsePort(env: Env, key: string, fallback: number): number {
  const raw = env[key];
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${key}: expected a positive integer, received "${raw}"`);
  }
  return parsed;
}

export function validateEnv(env: Env): Env {
  requireEnv(env, 'DATABASE_URL');
  requireEnv(env, 'JWT_SECRET');
  requireEnv(env, 'JWT_REFRESH_SECRET');

  parsePort(env, 'PORT', 5000);
  parsePort(env, 'REDIS_PORT', 6379);

  return env;
}
