#!/usr/bin/env bash
# Apply branch protection rules to `main` and `dev` via the GitHub REST API.
# Requires `gh` CLI installed and authenticated (`gh auth login`).
#
# Usage:
#   bash scripts/setup-branch-protection.sh
#
# Env vars:
#   DEV_REVIEWERS    Number of approvals required on dev (default: 1)
#                    Set to 0 for the "pragmatic" mode where solo work isn't blocked.
#   REPO             Repo in owner/name form (default: read from `gh repo view`)
#   CI_CHECK_NAME    Name of the required status check (default: ci, from predeploy.yml)
#
# Re-running this script is safe: it overwrites the same protection rules.

set -euo pipefail

# --- Preflight ----------------------------------------------------------------

if ! command -v gh >/dev/null 2>&1; then
	echo "error: 'gh' CLI not found. Install from https://cli.github.com" >&2
	exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
	echo "error: not authenticated. Run 'gh auth login' first." >&2
	exit 1
fi

REPO="${REPO:-$(gh repo view --json nameWithOwner -q .nameWithOwner)}"
CI_CHECK_NAME="${CI_CHECK_NAME:-ci}"
DEV_REVIEWERS="${DEV_REVIEWERS:-1}"

if ! [[ "$DEV_REVIEWERS" =~ ^[0-9]+$ ]]; then
	echo "error: DEV_REVIEWERS must be a non-negative integer (got '$DEV_REVIEWERS')" >&2
	exit 1
fi

echo "Applying branch protection to: $REPO"
echo "  Required status check: $CI_CHECK_NAME"
echo "  Required approvals on main: 1"
echo "  Required approvals on dev: $DEV_REVIEWERS"
echo

# --- Helper to apply rules ---------------------------------------------------
#
# GitHub's branch-protection API takes a JSON body. We build two slightly
# different bodies — `main` permits merge commits (linear=false), `dev`
# enforces linear history (we squash-merge into it).

apply_protection() {
	local branch="$1"
	local approvals="$2"
	local linear="$3"  # "true" or "false"

	local payload
	payload=$(cat <<EOF
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["$CI_CHECK_NAME"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "dismiss_stale_reviews": true,
    "require_code_owner_reviews": false,
    "required_approving_review_count": $approvals,
    "require_last_push_approval": false
  },
  "restrictions": null,
  "required_linear_history": $linear,
  "allow_force_pushes": false,
  "allow_deletions": false,
  "block_creations": false,
  "required_conversation_resolution": true,
  "lock_branch": false,
  "allow_fork_syncing": false
}
EOF
)

	echo "→ Applying rules to '$branch' (approvals=$approvals, linear=$linear)..."
	echo "$payload" | gh api \
		--method PUT \
		-H "Accept: application/vnd.github+json" \
		"repos/$REPO/branches/$branch/protection" \
		--input - \
		>/dev/null
	echo "  ✓ '$branch' protected."
}

# --- Apply -------------------------------------------------------------------

apply_protection "main" 1 "false"
apply_protection "dev" "$DEV_REVIEWERS" "true"

echo
echo "Done. To verify in the UI:"
echo "  https://github.com/$REPO/settings/branches"
echo
echo "To test: try 'git push origin main' or 'git push origin dev'."
echo "Both should be rejected with 'GH006: Protected branch update failed'."
