# Rulesets — source of truth

The JSON files in this directory are the authoritative copies of the GitHub Rulesets enforced on this repo. If you change a rule in the GitHub UI, **also update the file here in the same PR** — diff reviewers can't see UI changes.

## Files

| File | Targets | Purpose |
|---|---|---|
| [`main.json`](main.json) | `~DEFAULT_BRANCH` (i.e. `main`) | PR required, squash-merge only, linear history, `ci`+`lint` required, no force-push, no deletion |
| [`branch-naming.json`](branch-naming.json) | all branches **except** `main` | Branch names must match a Conventional-Commits-style prefix (`feat/`, `fix/`, …) or the release-please bot's `release-please--branches--*` |

## Importing into GitHub (admin)

1. Repo → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **Import a ruleset**.
2. Paste the file contents → **Save**.
3. Repeat for each file.

If a ruleset with the same name already exists, **delete the old one first** to avoid duplicates / double enforcement.

## Exporting from GitHub (after a UI edit)

1. Repo → **Settings** → **Rules** → **Rulesets** → click the ruleset → **Export ruleset**.
2. Paste the exported JSON into the matching file here.
3. Commit in a PR with a `chore:` title.

## Why no bypass actors?

- Releases go through PRs via [release-please](https://github.com/googleapis/release-please) authenticated through the `imamzain-release-please` GitHub App. The App's PRs target `main` like any other PR and pass through the same required checks.
- No human or other bot pushes directly to `main`.
- Adding a bypass actor would be a permanent escape hatch we don't currently need. If you do add one later (e.g. an emergency override for a release captain), document **why** in this README before merging the change.
