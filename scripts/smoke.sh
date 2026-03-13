#!/usr/bin/env bash
# Smoke test: start backend + infra via docker-compose, hit health endpoint, then down.
# Usage: chmod u+x scripts/smoke.sh && ./scripts/smoke.sh

set -euo pipefail

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'
log_ok() { echo -e "${GREEN}[OK]${NC} $1"; }
log_err() { echo -e "${RED}[ERR]${NC} $1"; }
log_info() { echo -e "${YELLOW}[INFO]${NC} $1"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT"

COMPOSE="docker compose -f docker-compose.app.yml"
HEALTH_URL="http://localhost:5000/api/v1/health/ready"
MAX_WAIT=60

log_info "Starting backend + infra (with fresh backend build)..."
$COMPOSE up -d --build backend

log_info "Waiting for backend to be ready (max ${MAX_WAIT}s)..."
for i in $(seq 1 "$MAX_WAIT"); do
  if curl -sf "$HEALTH_URL" > /dev/null 2>&1; then
    log_ok "Backend health check passed"
    break
  fi
  if [ "$i" -eq "$MAX_WAIT" ]; then
    log_err "Backend did not become ready in time"
    $COMPOSE logs backend
    $COMPOSE down
    exit 1
  fi
  sleep 1
done

log_ok "Smoke test passed"
log_info "Stopping stack..."
$COMPOSE down
log_ok "Done"
