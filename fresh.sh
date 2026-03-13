#!/usr/bin/env bash
# Fresh install - removes node_modules and reinstalls
# Usage: chmod u+x fresh.sh && ./fresh.sh

set -euo pipefail

GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m'
log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Node version
if command -v nvm &> /dev/null; then
  log_info "Switching Node version via nvm..."
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm use || nvm install
fi

# Check pnpm
if ! command -v pnpm &> /dev/null; then
  log_warn "pnpm not found. Installing..."
  npm install -g pnpm@10
fi

log_info "Cleaning node_modules..."
rm -rf node_modules backend/node_modules frontend/node_modules frontend/.next

log_info "Installing all dependencies..."
pnpm install

log_info "Setting up Husky..."
pnpm exec husky

log_info "Generating Prisma client..."
pnpm --filter backend prisma:generate

log_info "✅ Done! Start with: pnpm dev (all) or pnpm dev:backend / pnpm dev:frontend"
