#!/usr/bin/env bash
# FleetSeek one-line installer
# Usage: curl -s https://orboh.jp/install | bash
set -euo pipefail

REPO_URL="https://github.com/Orboh/Fleetseek.git"
FLEETSEEK_DIR="$HOME/FleetSeek"
API_URL="https://robonet-api-production.up.railway.app"
WEB_URL="https://web-ebon-zeta-33.vercel.app"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

step() { echo -e "\n${BLUE}▶ $1${NC}"; }
ok()   { echo -e "${GREEN}✓ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }
fail() { echo -e "${RED}✗ $1${NC}"; exit 1; }

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  FleetSeek — Robot Knowledge Network"
echo "  Setup for G1 developers"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# --- Dependency check ---
if ! command -v node &>/dev/null; then
  fail "Node.js is required. Install it from https://nodejs.org (v18+)"
fi
NODE_VER=$(node -e "process.stdout.write(process.version.slice(1).split('.')[0])")
if [ "$NODE_VER" -lt 18 ]; then
  fail "Node.js v18+ required (found v$NODE_VER)"
fi
if ! command -v git &>/dev/null; then
  fail "git is required but not installed."
fi

# --- Step 1: Clone or update repo ---
step "Fetching FleetSeek..."
if [ -d "$FLEETSEEK_DIR/.git" ]; then
  git -C "$FLEETSEEK_DIR" pull --quiet 2>/dev/null && ok "Updated existing installation at $FLEETSEEK_DIR"
else
  git clone "$REPO_URL" "$FLEETSEEK_DIR" --quiet
  ok "Cloned to $FLEETSEEK_DIR"
fi

# --- Step 2: Install CLI ---
step "Installing FleetSeek CLI..."
npm install --prefix "$FLEETSEEK_DIR/packages/cli" --silent
if npm link --prefix "$FLEETSEEK_DIR/packages/cli" 2>/dev/null; then
  ok "fleetseek command linked"
else
  warn "Retrying with sudo..."
  sudo npm link --prefix "$FLEETSEEK_DIR/packages/cli"
  ok "fleetseek command linked (sudo)"
fi

# --- Step 3: Build MCP server ---
step "Building MCP server..."
npm install --prefix "$FLEETSEEK_DIR/packages/mcp-server" --silent
npm run build --prefix "$FLEETSEEK_DIR/packages/mcp-server" --silent
ok "MCP server built at $FLEETSEEK_DIR/packages/mcp-server/dist/index.js"

# --- Step 4: X OAuth login ---
step "Sign in with X (Twitter)"
echo ""
echo "  Opening: $WEB_URL/auth/login"
echo ""
echo "  1. Sign in with your X account"
echo "  2. Go to Settings → copy your API key (starts with robonet_)"
echo ""
(xdg-open "$WEB_URL/auth/login" 2>/dev/null \
  || open "$WEB_URL/auth/login" 2>/dev/null \
  || true) &
sleep 1

# Run fleetseek auth login with production URL as default
FLEETSEEK_API_URL="$API_URL" fleetseek auth login
ok "Authenticated"

# --- Step 5: Register robot ---
step "Register your robot"
fleetseek robot register
ok "Robot registered"

# --- Step 6: Auto-configure MCP for Claude Code ---
step "Configuring Claude Code MCP server..."

MCP_DIR="$HOME/.claude"
MCP_PATH="$MCP_DIR/mcp_servers.json"
MCP_SERVER_JS="$FLEETSEEK_DIR/packages/mcp-server/dist/index.js"

mkdir -p "$MCP_DIR"

python3 - <<PYEOF
import json, os, sys

# Read FleetSeek config written by conf package
# conf (projectName='fleetseek', projectSuffix='') → ~/.config/fleetseek/config.json on Linux
import platform
if platform.system() == "Darwin":
    cfg_path = os.path.expanduser("~/Library/Preferences/fleetseek/config.json")
else:
    cfg_path = os.path.expanduser("~/.config/fleetseek/config.json")

if not os.path.exists(cfg_path):
    print(f"Warning: Config not found at {cfg_path}. Run 'fleetseek auth login' manually.", file=sys.stderr)
    sys.exit(0)

with open(cfg_path) as f:
    cfg = json.load(f)

api_key  = cfg.get("api_key", "")
api_url  = cfg.get("api_url", "$API_URL")
robot_id = cfg.get("robot_id", "")

if not api_key:
    print("Warning: API key not found in config.", file=sys.stderr)
    sys.exit(0)

fleetseek_entry = {
    "command": "node",
    "args": ["$MCP_SERVER_JS"],
    "env": {
        "FLEETSEEK_API_URL": api_url,
        "FLEETSEEK_API_KEY": api_key,
        "FLEETSEEK_ROBOT_ID": robot_id
    }
}

mcp_path = "$MCP_PATH"
existing = {}
if os.path.exists(mcp_path):
    with open(mcp_path) as f:
        try:
            existing = json.load(f)
        except json.JSONDecodeError:
            pass

existing["fleetseek"] = fleetseek_entry

with open(mcp_path, "w") as f:
    json.dump(existing, f, indent=2)
    f.write("\n")

print(f"Written to {mcp_path}")
PYEOF

ok "~/.claude/mcp_servers.json configured"

# --- Done ---
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}  FleetSeek setup complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Next steps:"
echo ""
echo "  1. Restart Claude Code to activate MCP"
echo "  2. In Claude Code, say:"
echo "       'Search FleetSeek for arm oscillation'"
echo "  3. When you solve a G1 bug, say:"
echo "       'Share this debug to FleetSeek'"
echo ""
echo "  Every fix you share saves hours for your team."
echo ""
