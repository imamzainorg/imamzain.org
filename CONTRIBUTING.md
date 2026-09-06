# Contributing to imamzain.org

> **Arabic version available:** [CONTRIBUTING.ar.md](CONTRIBUTING.ar.md) — recommended for team members more comfortable in Arabic; includes a beginner-friendly recovery section and a Git glossary.

This document is the source of truth for how we ship code on this project. Read it once, keep it open during your first few PRs, then it should fade into muscle memory.

If something here is wrong or unclear, fix it in the same PR as your code change — this file is the team's working agreement, not stone tablets.

---

## TL;DR — the rules of the road

> Repo admins: see [docs/branch-protection.md](docs/branch-protection.md) and the JSON files in [docs/rulesets/](docs/rulesets/) for the enforcement config (blocks direct pushes, force-pushes, and merges without CI / review).

1. **Never push directly to `main`.** Open a PR.
2. **Branch from `main`** for every change. Feature branches are short-lived (days, not weeks).
3. **Use Conventional Commit messages.** `feat: ...`, `fix(scope): ...`, etc. See [§ Commit messages](#commit-messages).
4. **One PR = one logical change.** Don't bundle a refactor with a bugfix with a dependency bump.
5. **Squash-merge into `main`.** The PR title becomes the squash commit message.
6. **Releases live on `main`.** Tags + the GitHub Release + `CHANGELOG.md` updates are created by [release-please](https://github.com/googleapis/release-please) — never by hand. Cutting a release = merging the open `release: vX.Y.Z` PR that the bot keeps open.
7. **Delete your branch** after merge.

This is **GitHub Flow**: one long-lived branch (`main`), short-lived feature branches off it, Vercel preview deployments on every PR as your staging environment. No `dev`/`staging` branch — we don't need one.

---

## Branches

| Branch | Purpose | Who pushes | How |
|---|---|---|---|
| `main` | Production. What's live on imamzain.org. Always tagged. | Nobody directly | PR from a short-lived branch |
| `feat/<slug>` | New feature, page, or section | You | Branch off `main`, PR back to `main` |
| `fix/<slug>` | Bug fix (urgent or not — production fixes use the same prefix, just merge faster) | You | Branch off `main`, PR back to `main` |
| `perf/<slug>` | Performance improvement | You | Branch off `main`, PR back to `main` |
| `refactor/<slug>` | Code restructuring, no behavior change | You | Branch off `main`, PR back to `main` |
| `chore/<slug>` | Tooling, configs, deps, cleanup | You | Branch off `main`, PR back to `main` |
| `docs/<slug>` | Docs only | You | Branch off `main`, PR back to `main` |
| `release-please--branches--main` | release-please bot's auto-managed release PR branch. **Don't touch.** | The release-please GitHub App | Auto-created/updated by the bot |

**Branch naming:** kebab-case, descriptive. `fix/swiper-prototype-pollution` good; `fix/bug` bad; `dhiaa-fix` bad. Enforced server-side by [`docs/rulesets/branch-naming.json`](docs/rulesets/branch-naming.json).

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
| `chore(header): replace 1824 typo with dynamic copyright year` | `hotfix:"test"` | "hotfix" isn't a Conventional Commits type, no scope, useless |
| `fix(a11y): finish H1 audit deferred from P0-6` | `merge branch main` | Lowercase, redundant, says nothing |

If you find yourself writing "update X" or "fix bug" — stop, think about what *actually* changed, and rewrite. The commit message is read more often than it's written.

---

## Day-in-the-life workflows

### I'm adding a feature (or fix, perf, refactor, chore, docs)

```bash
git checkout main
git pull --ff-only
git checkout -b feat/contests-leaderboard

# ...do work, commit as you go...
git commit -m "feat(contests): add leaderboard component"
git commit -m "feat(contests): wire leaderboard to /api/contests/scores"
git commit -m "test(contests): cover leaderboard sort edge cases"

git push -u origin feat/contests-leaderboard
# Open PR → base: main
```

When the PR is approved and CI is green:

- **Squash-merge** in the GitHub UI (it's the only option allowed by the `main` ruleset, so you can't get this wrong).
- Make sure the squash commit title is exactly the PR title — that's what lands on `main` and what release-please will read.
- Delete the branch.

### Production is broken — fast fix

Same flow as above, just with `fix/<slug>` and a sense of urgency:

```bash
git checkout main
git pull --ff-only
git checkout -b fix/audio-download-403

# minimum viable fix only — no refactoring, no adjacent cleanup
git commit -m "fix(api): restore allowed-hostname check in /api/download"

git push -u origin fix/audio-download-403
# Open PR → base: main
```

Get it reviewed, merge it. Vercel deploys to production within minutes of the merge. release-please will pick up the `fix:` and add it to its open release PR for the next patch release — merge that whenever you want to tag the version.

There's no special "hotfix" branch prefix or process. The speed comes from how fast the team reviews and merges, not from a different workflow.

### I'm cutting a release (release captain)

Releases are automated by [release-please](https://github.com/googleapis/release-please). Workflow: [`.github/workflows/release-please.yml`](.github/workflows/release-please.yml), config: [`release-please-config.json`](release-please-config.json), manifest: [`.release-please-manifest.json`](.release-please-manifest.json).

The flow:

1. As `feat:`, `fix:`, `perf:`, etc. PRs land on `main`, release-please keeps an **open PR titled `release: vX.Y.Z`** automatically updated with the new commits.
2. When you're ready to release, look at that PR. The body lists every commit by section (Features, Bug Fixes, etc.) and is your changelog preview. The diff shows the `package.json` version bump and the new `CHANGELOG.md` section. Look it over.
3. **Squash-merge** the release PR. The action then:
   - Tags the merge commit `vX.Y.Z`.
   - Creates the GitHub Release page with the generated notes.
4. Vercel deploys the new tag.

That's it. **You never run a command locally to release.** If you find yourself typing `npm version` or `git tag v...` — stop. The bot does it.

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
- [ ] Branch is up to date with `main` (the `main` ruleset enforces this — GitHub will prompt you to "Update branch" with one click).
- [ ] `bun run lint` passes.
- [ ] `bun run build` passes.
- [ ] You actually opened the affected page(s) in the Vercel preview and clicked around. CI doesn't catch visual regressions.
- [ ] For UI changes: include a screenshot or short clip in the PR body.
- [ ] PR description has a **Test plan** section that a reviewer can follow.
- [ ] No leftover `console.log`, `// TODO from me`, or commented-out code.

---

## Anti-patterns — don't do these

Drawn from real history on this repo. Each one cost someone time.

- ❌ **Direct push to `main`.** Even for a one-line fix. Open the PR; the CI run + the Vercel preview alone are worth it. Blocked server-side anyway.
- ❌ **`merge branch main` commits.** These come from `git pull` on a diverged local branch. Use `git pull --rebase` instead, or set `pull.rebase = true` globally.
- ❌ **Placeholder commit messages.** `Implement feature X to enhance user experience and fix bug Y in module Z` is on the record forever. Write the real subject.
- ❌ **One PR fixing six unrelated things.** Reviewer can't reason about it, and one revert blows away five good changes.
- ❌ **Refactoring while bugfixing.** Ship the fix on its own; open the refactor PR after.
- ❌ **Long-lived feature branches.** Branches older than ~1 week rarely merge cleanly because `main` has moved underneath them. Either land in pieces behind flags or kill it.
- ❌ **Manual `package.json` version bumps** or hand-edited tags. release-please owns version + tag — let it.
- ❌ **Closing release-please's open release PR.** It'll re-open on the next push to `main`, but you lose any accumulated body edits. If the PR is wrong, fix it in place (edit the description, add a `Release-As:` footer) or push a corrective commit.
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
4. Squash-merging that PR triggers the action again, which:
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
- **Release PR CI didn't run / App auth failing?** The workflow uses the `imamzain-release-please` GitHub App (App ID + private key are stored as repo secrets `RELEASE_PLEASE_APP_ID` and `RELEASE_PLEASE_APP_PRIVATE_KEY`). If the App is uninstalled from the repo, the secrets are removed, or the private key is revoked, the workflow fails with a clear auth error. Re-install the App at org Settings → GitHub Apps and re-grant access to this repo, then re-run the workflow.

---

## Media uploads (R2 / CDN)

All site media lives in the `imamzain-media` R2 bucket behind `cdn.imamzain.org`. Every upload **must** set these HTTP headers on the object at upload time:

- `Cache-Control: public, max-age=31536000, immutable` (all objects)
- `Content-Disposition: attachment; filename*=UTF-8''<url-encoded basename>` (downloadable types: pdf, mp3, mp4, wav, zip, docx)

The site's `/api/download` route just 302-redirects to the CDN, so the saved filename comes from this metadata, not from the app. If a batch was uploaded without the headers, backfill with `bun scripts/r2-set-metadata.ts` (see the header comment in that script for credentials and a `--dry-run` mode).

---

## Questions / changes to this doc

Open a PR. This file is `docs`-typed, so just:

```text
docs: clarify release PR merge instructions
```
