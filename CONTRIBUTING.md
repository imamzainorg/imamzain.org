# Contributing to imamzain.org

> **Arabic version available:** [CONTRIBUTING.ar.md](CONTRIBUTING.ar.md) — recommended for team members more comfortable in Arabic; includes a beginner-friendly recovery section and a Git glossary.

This document is the source of truth for how we ship code on this project. Read it once, keep it open during your first few PRs, then it should fade into muscle memory.

If something here is wrong or unclear, fix it in the same PR as your code change — this file is the team's working agreement, not stone tablets.

---

## TL;DR — the rules of the road

> Repo admins: see [docs/branch-protection.md](docs/branch-protection.md) to enforce these rules via GitHub's branch protection (blocks direct pushes, force-pushes, and merges without CI / review).

1. **Never push directly to `main` or `dev`.** Open a PR.
2. **Branch from `dev`** for features/fixes/chores. Branch from `main` only for hotfixes.
3. **Use Conventional Commit messages.** `feat: ...`, `fix(scope): ...`, etc. See [§ Commit messages](#commit-messages).
4. **One PR = one logical change.** Don't bundle a refactor with a bugfix with a dependency bump.
5. **Squash-merge into `dev`.** Merge-commit `dev → main`. Squash-merge hotfixes into `main`, then PR the same fix into `dev`.
6. **Releases live on `main`.** Tags are created by `bun run release` — never by hand.
7. **Delete your branch** after merge.

---

## Branches

| Branch | Purpose | Who pushes | How |
|---|---|---|---|
| `main` | Production. What's live on imamzain.org. Always tagged. | Nobody directly | PR from `dev` (release) or `hotfix/*` (emergency) |
| `dev` | Integration / staging. What goes out in the next release. | Nobody directly | PR from short-lived branches |
| `feat/<slug>` | New feature, page, or section | You | Branch off `dev`, PR back to `dev` |
| `fix/<slug>` | Bug fix that isn't urgent (next release is fine) | You | Branch off `dev`, PR back to `dev` |
| `perf/<slug>` | Performance improvement | You | Branch off `dev`, PR back to `dev` |
| `refactor/<slug>` | Code restructuring, no behavior change | You | Branch off `dev`, PR back to `dev` |
| `chore/<slug>` | Tooling, configs, deps, cleanup | You | Branch off `dev`, PR back to `dev` |
| `docs/<slug>` | Docs only | You | Branch off `dev`, PR back to `dev` |
| `hotfix/<slug>` | **Production is broken right now.** | You | Branch off `main`, PR to `main` AND `dev` |
| `release/<x.y.z>` | Optional. Use only for big releases with extra QA. | Release captain | Branch off `dev`, PR to `main` |

**Branch naming:** kebab-case, descriptive. `fix/swiper-prototype-pollution` good; `fix/bug` bad; `dhiaa-fix` bad.

**Lifetime:** keep branches under a week. If a feature is bigger than a week, break it into smaller PRs that ship behind a flag or in incomplete-but-safe states.

---

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). The release script reads these to decide version bumps and generate the changelog, so they're not cosmetic.

### Format

```text
<type>(<scope>): <subject>

[optional body — wrap at ~72 chars]

[optional footer, e.g. BREAKING CHANGE: ..., Refs #123]
```

### Types

| Type | When | Bumps |
|---|---|---|
| `feat` | New user-visible feature, page, or capability | **minor** |
| `fix` | Bug fix | patch |
| `perf` | Performance improvement (no behavior change) | patch |
| `refactor` | Code restructuring (no behavior change) | patch |
| `style` | Formatting only (whitespace, semicolons) — almost never used; Prettier handles this | patch |
| `docs` | Docs / comments / README | patch |
| `test` | Adding or fixing tests | patch |
| `build` | Build system, bundler, deps that affect build | patch |
| `ci` | CI/workflow changes | patch |
| `chore` | Tooling, configs, content, anything that doesn't fit above | patch |
| `revert` | Reverting a previous commit | patch |

**Breaking change:** add `!` after the type/scope, or a `BREAKING CHANGE:` footer. Bumps **major**.

```text
feat(routes)!: move /library/* into /knowledge-base/*

BREAKING CHANGE: old /library URLs now 301 to /knowledge-base.
External links to /library should be updated.
```

### Scope

Optional, but encouraged. Use a folder or feature name: `header`, `api`, `library`, `research`, `security`, `images`, `isr`, etc. One word, lowercase.

### Good vs bad — real examples from this repo

| Good | Bad | Why |
|---|---|---|
| `fix(security): restore SSRF hostname check in /api/download` | `feat: update header component and audio types` | "update" tells you nothing |
| `perf(isr): wrap 5 client routes in server-component shells with revalidate=300` | `Implement feature X to enhance user experience and fix bug Y in module Z` | Placeholder text — never commit literal X/Y/Z |
| `chore(header): replace 1824 typo with dynamic copyright year` | `hotfix:"test"` | Not a hotfix, no scope, useless |
| `fix(a11y): finish H1 audit deferred from P0-6` | `merge branch dev` | Lowercase, redundant, says nothing |

If you find yourself writing "update X" or "fix bug" — stop, think about what *actually* changed, and rewrite. The commit message is read more often than it's written.

---

## Day-in-the-life workflows

### I'm adding a feature

```bash
git checkout dev
git pull
git checkout -b feat/contests-leaderboard

# ...do work, commit as you go...
git commit -m "feat(contests): add leaderboard component"
git commit -m "feat(contests): wire leaderboard to /api/contests/scores"
git commit -m "test(contests): cover leaderboard sort edge cases"

git push -u origin feat/contests-leaderboard
# Open PR → base: dev
```

When the PR is approved:

- **Squash-merge** in the GitHub UI.
- Edit the squash commit message before confirming — it becomes a single line on `dev`. Make it good: `feat(contests): add leaderboard with sort + pagination`.
- Delete the branch.

### I'm fixing a non-urgent bug

Same as above with `fix/<slug>`. It rides along on the next regular release.

### Production is broken — hotfix

```bash
git checkout main
git pull
git checkout -b hotfix/audio-download-403

# minimum viable fix only — no refactoring, no adjacent cleanup
git commit -m "fix(api): restore allowed-hostname check in /api/download"

git push -u origin hotfix/audio-download-403
# Open PR #1 → base: main
```

Once that PR is merged to `main`:

1. Run `bun run release` from `main` — it'll cut a patch (e.g. `v0.4.1 → v0.4.2`).
2. **Open PR #2** from a `hotfix/audio-download-403-to-dev` branch → base: `dev`. This keeps the fix from being lost when the next `dev → main` PR opens. (Or, after the release is tagged, simply merge `main` into `dev` — but the PR route gets a review.)

### I'm cutting a release (release captain)

1. Make sure `dev` is green (CI passing, manual smoke check on the Vercel preview).
2. Open a PR titled `release: vX.Y.Z` from `dev` → `main`. Body: bullet list of headline changes.
3. Wait for review + CI. **Use the "Create a merge commit" button** (not squash, not rebase) so PR-by-PR boundaries survive into the changelog.
4. `git checkout main && git pull`
5. `bun run release` — confirm the auto-detected bump, watch it tag and publish a GitHub Release.
6. Verify Vercel deployed the new tag to production.
7. Open a follow-up PR from `main` → `dev` to sync the release commit back to `dev` (the `chore(release): vX.Y.Z` commit). Or fast-forward locally and push if your branch protection allows it.

---

## Versioning rules for this site

Because we ship a website (not a library), SemVer translates as:

- **MAJOR (X.0.0)** — visible redesign, top-level navigation overhaul, URL/route structure change that breaks external links, auth model change, dropping a whole section.
- **MINOR (0.X.0)** — adding a new page or section, new feature on an existing page that's prominent enough to mention in marketing.
- **PATCH (0.0.X)** — bug fix, content typo, performance improvement, dependency bump, style tweak, anything invisible-to-mostly-invisible to users.

The release script auto-detects from your commits: any `feat:` triggers MINOR, any `!` or `BREAKING CHANGE` footer triggers MAJOR, otherwise PATCH. Override with `--major | --minor | --patch` if the auto-detection is wrong (rare).

---

## PR checklist

Before requesting review:

- [ ] Title follows Conventional Commit format (it'll become the squash commit message).
- [ ] Branch is up to date with `dev` (or `main` for hotfixes).
- [ ] `bun run lint` passes.
- [ ] `bun run build` passes.
- [ ] You actually opened the affected page(s) in a browser and clicked around. CI doesn't catch visual regressions.
- [ ] For UI changes: include a screenshot or short clip in the PR body.
- [ ] PR description has a **Test plan** section that a reviewer can follow.
- [ ] No leftover `console.log`, `// TODO from me`, or commented-out code.

---

## Anti-patterns — don't do these

Drawn from real history on this repo. Each one cost someone time.

- ❌ **Direct push to `dev`.** Even for a one-line fix. Open the PR; the CI run alone is worth it.
- ❌ **`merge branch dev` commits.** These come from `git pull` on a diverged local branch. Use `git pull --rebase` instead, or set `pull.rebase = true` globally.
- ❌ **Placeholder commit messages.** `Implement feature X to enhance user experience and fix bug Y in module Z` is on the record forever. Write the real subject.
- ❌ **One PR fixing six unrelated things.** Reviewer can't reason about it, and one revert blows away five good changes.
- ❌ **Refactoring while bugfixing.** Ship the fix on its own; open the refactor PR after.
- ❌ **Long-lived feature branches** (looking at you, `feature/project-restructure`). Either land it in pieces behind flags or kill it. Branches older than 2 weeks rarely merge cleanly.
- ❌ **Manual `package.json` version bumps** or hand-edited tags. Use `bun run release`.
- ❌ **Pushing tags before pushing the release commit.** The script does this in the right order — don't reorder it.
- ❌ **Editing released sections of `CHANGELOG.md`.** Fix forward. The history matters.

---

## Releasing — script reference

The script lives at [`scripts/release.mjs`](scripts/release.mjs). Run it from the repo root, on the `main` branch, with a clean working tree.

```bash
# Standard release: auto-detect bump from commits since last tag
bun run release

# Preview without writing anything
bun run release -- --dry-run

# Force a specific bump
bun run release -- --major
bun run release -- --minor
bun run release -- --patch

# Skip the interactive y/n confirmation
bun run release -- --yes

# Don't push the tag (useful for testing)
bun run release -- --skip-push

# Don't create the GitHub Release page (just tag locally and push)
bun run release -- --skip-gh
```

The script will:

1. Verify you're on `main`, clean, in sync with `origin/main`.
2. Find the last `vX.Y.Z` tag, scan commits since.
3. Categorize commits by type, decide the bump.
4. Show you a preview of the new version + changelog section.
5. On confirm: update `package.json`, prepend to `CHANGELOG.md`, commit, tag, push, create GitHub Release.

If `gh` CLI isn't installed, the GitHub Release step is skipped with a warning — the tag still pushes, and you can create the Release manually in the UI.

---

## Questions / changes to this doc

Open a PR. This file is `docs/`-typed, so just:

```text
docs: clarify hotfix-to-dev sync step
```
