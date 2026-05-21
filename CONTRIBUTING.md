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
6. **Releases live on `main`.** Tags + the GitHub Release + `CHANGELOG.md` updates are created by [release-please](https://github.com/googleapis/release-please) — never by hand. Cutting a release = merging the open release PR on `main`.
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

We follow [Conventional Commits](https://www.conventionalcommits.org/). [release-please](https://github.com/googleapis/release-please) reads these to decide version bumps and generate the changelog, so they're not cosmetic.

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
| `release` | release-please's auto-generated release PR. **Never write this by hand.** | none |

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

1. **release-please will automatically pick up the `fix:` commit** and open (or update) a release PR on `main` titled `release: vX.Y.Z`. Merging that PR cuts the patch release. See [§ I'm cutting a release](#im-cutting-a-release-release-captain).
2. **Open PR #2** from a `hotfix/audio-download-403-to-dev` branch → base: `dev`. This keeps the fix from being lost when the next `dev → main` PR opens. (Or, after the release is tagged, simply merge `main` into `dev` — but the PR route gets a review.)

### I'm cutting a release (release captain)

Releases are automated by [release-please](https://github.com/googleapis/release-please). Workflow: [`.github/workflows/release-please.yml`](.github/workflows/release-please.yml), config: [`release-please-config.json`](release-please-config.json), manifest: [`.release-please-manifest.json`](.release-please-manifest.json).

The flow:

1. Make sure `dev` is green (CI passing, manual smoke check on the Vercel preview).
2. Open a PR titled `chore: rollup dev → main for next release` (or a similar `chore:`/`ci:` title) from `dev` → `main`. **Do not use a `release:` title here** — `release:` is reserved for release-please's auto-generated PR on `main`.
3. Wait for review + CI. **Use the "Create a merge commit" button** (not squash, not rebase) so PR-by-PR boundaries survive into the changelog release-please will generate.
4. When the merge lands on `main`, the `release-please` workflow runs and either **opens** or **updates** a PR titled `release: vX.Y.Z` against `main`. The body lists every commit by section (Features, Bug Fixes, etc.) and is the changelog preview. Look it over.
5. Merge that release PR — **with "Create a merge commit"**, same as step 3. The action then:
   - Tags the merge commit `vX.Y.Z`.
   - Creates the GitHub Release with the generated notes.
   - Bumps `package.json` (in a prior commit, made when the release PR was opened/updated).
   - Prepends a new section to `CHANGELOG.md` (same prior commit).
6. Verify Vercel deployed the new tag to production.
7. Open a follow-up PR from `main` → `dev` to sync the release-please commits (version bump + CHANGELOG) back to `dev`. Title it `chore: sync vX.Y.Z release commits back to dev`.

**You never run a command locally to release.** If you find yourself typing `npm version` or `git tag v...` — stop. The bot does it.

---

## Versioning rules for this site

Because we ship a website (not a library), SemVer translates as:

- **MAJOR (X.0.0)** — visible redesign, top-level navigation overhaul, URL/route structure change that breaks external links, auth model change, dropping a whole section.
- **MINOR (0.X.0)** — adding a new page or section, new feature on an existing page that's prominent enough to mention in marketing.
- **PATCH (0.0.X)** — bug fix, content typo, performance improvement, dependency bump, style tweak, anything invisible-to-mostly-invisible to users.

release-please auto-detects from your commits: any `feat:` triggers MINOR, any `!` or `BREAKING CHANGE` footer triggers MAJOR, otherwise PATCH. To force a specific bump (e.g. mark a `feat:` as MAJOR), add a `Release-As: X.Y.Z` footer to the commit body, or amend the open release PR's description with a `Release-As:` footer.

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
- ❌ **Manual `package.json` version bumps** or hand-edited tags. release-please owns version + tag — let it.
- ❌ **Closing release-please's open release PR.** It'll re-open on the next push to `main`, but you lose the accumulated body edits. If the PR is wrong, fix it in place (edit the description, add a `Release-As:` footer) or push a corrective commit.
- ❌ **Editing released sections of `CHANGELOG.md`.** Fix forward. The history matters.

---

## Releasing — release-please reference

We use [release-please](https://github.com/googleapis/release-please) (Google) to automate releases. There is no local release command — everything happens through the bot reacting to commits on `main`.

### How it works

1. The workflow [`.github/workflows/release-please.yml`](.github/workflows/release-please.yml) runs on every push to `main`.
2. It scans Conventional Commits since the last `v*.*.*` tag.
3. It opens (or updates) a single PR on `main` titled `release: vX.Y.Z` with:
   - A version bump to `package.json` and `.release-please-manifest.json`.
   - A prepended section in `CHANGELOG.md` grouping commits by type.
4. Merging that PR with **"Create a merge commit"** triggers the action again, which:
   - Tags the merge commit `vX.Y.Z`.
   - Creates the GitHub Release page with the generated notes.
5. Vercel deploys the tag automatically.

### Configuration

- [`release-please-config.json`](release-please-config.json) — release type (`node`), PR title pattern (`release: v${version}`), which commit types appear in the changelog and under which section heading.
- [`.release-please-manifest.json`](.release-please-manifest.json) — the *current* version. release-please writes here on every release; you should never edit it by hand.

### Forcing a specific bump

The default is feat→minor, fix/perf/refactor/etc.→patch, `!`/`BREAKING CHANGE`→major. To override:

- **Per-commit:** add a `Release-As: 1.2.0` footer to the commit message body.
- **Per release PR:** edit the open release PR's description and add `Release-As: 1.2.0` on its own line. Push any commit to `main` (even a no-op) to refresh.

### Common pitfalls

- **Release PR not opening?** No releasable commits since the last tag. Only `feat` / `fix` / `perf` / `refactor` / `revert` / breaking-change commits trigger one. A run of only `chore`/`docs`/`ci`/`style` commits is silently ignored, by design.
- **Release PR shows the wrong version?** Check the commit types since the last tag — a missed `BREAKING CHANGE:` footer or stray `feat:` can flip the bump.
- **Release PR CI didn't run?** Known limitation: PRs opened by the default `GITHUB_TOKEN` don't trigger other workflows. Either accept it (the PR title format is enforced by the config, and the diff is just version bumps + CHANGELOG) or switch the workflow to a PAT — see release-please-action's docs.

---

## Questions / changes to this doc

Open a PR. This file is `docs/`-typed, so just:

```text
docs: clarify hotfix-to-dev sync step
```
