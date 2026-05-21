# Branch Protection — Setup Guide

> Arabic version below: [النسخة العربية](#إعداد-حماية-الفروع-بالعربي)

This guide locks down the repo so:

- Nobody can push directly to `main` — every change goes through a PR with passing CI.
- Branches must follow the naming conventions in [CONTRIBUTING.md](../CONTRIBUTING.md) — `feat/*`, `fix/*`, etc. Anything else is rejected at push time.
- PR titles must follow Conventional Commits (since we squash-merge, the PR title is the commit message on `main`).
- Force pushes and deletions on `main` are blocked.
- Releases on `main` are merged via PRs by [release-please](https://github.com/googleapis/release-please), not by direct push.

**Authoritative source of truth: the JSON files in [`docs/rulesets/`](rulesets/).** If you change a rule in the GitHub UI, also update the matching JSON file in the same PR. Otherwise the repo and the running config drift.

## How to import / re-import

1. Repo → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **Import a ruleset**.
2. Paste the contents of [`docs/rulesets/main.json`](rulesets/main.json) → **Save**. (If a ruleset with the same name already exists, delete the old one first.)
3. Repeat for [`docs/rulesets/branch-naming.json`](rulesets/branch-naming.json).

---

## Recommended rules summary

### `main` (production) — see [`rulesets/main.json`](rulesets/main.json)

| Setting | Value |
|---|---|
| Require a pull request before merging | **✓ ON** |
| Require approvals | **✗ OFF** |
| Dismiss stale pull request approvals when new commits are pushed | **✓ ON** |
| Require status checks to pass | **✓ ON** — `ci` (from `predeploy.yml`) + `lint` (from `pr-title.yml`) |
| Require branches to be up to date before merging | **✓ ON** (strict — feature branches must be rebased onto latest `main` before merge) |
| Require conversation resolution before merging | **✓ ON** |
| Require linear history | **✓ ON** (we squash-merge everything) |
| Allowed merge methods | **squash only** |
| Allow force pushes | **✗ OFF** |
| Allow deletions | **✗ OFF** |
| Bypass actors | **none** (release-please's PRs go through the same review path; no one pushes to `main` directly) |

### `branch-naming` (all other branches) — see [`rulesets/branch-naming.json`](rulesets/branch-naming.json)

Branches whose names don't match the allowed prefixes are rejected at push time, before they ever land on the remote.

**Allowed prefixes (regex-enforced):**

```text
feat/*
fix/*
perf/*
refactor/*
chore/*
docs/*
test/*
build/*
ci/*
release/*
release-please--branches--*
```

> The `release-please--branches--*` pattern exists so the [release-please](https://github.com/googleapis/release-please) bot can create its release PR branch on `main` (e.g. `release-please--branches--main`). The pattern is hard-coded by `release-please-action`; we can't shorten it to `release/*`. If you ever migrate off release-please, drop this line.

---

## Verify

After importing both rulesets, try the smoke tests below. All three should fail with a `GH013` / `GH006` error.

### `main` is locked

```bash
git checkout main
git commit --allow-empty -m "test"
git push origin main
# Expected: remote: error: GH006: Protected branch update failed for refs/heads/main.
git reset --hard origin/main   # roll back the local test commit
```

### Bad branch names are rejected

```bash
git checkout -b bad-name
git commit --allow-empty -m "test"
git push -u origin bad-name
# Expected: remote: error: GH013: Repository rule violations found for refs/heads/bad-name.
git checkout main
git branch -D bad-name
```

### Force pushes are blocked

```bash
git checkout -b feat/test-protection
git commit --allow-empty -m "test"
git push -u origin feat/test-protection
git commit --amend -m "test amend"
git push --force origin feat/test-protection
# Expected: remote: error: GH013 ... non_fast_forward
git checkout main
git push --delete origin feat/test-protection
git branch -D feat/test-protection
```

---

## After setup — what changes for the team

- `git push origin main` will **fail**. This is correct.
- Everyone must work on a feature branch and open a PR.
- The PR cannot be merged until:
  1. CI (`ci` + `lint`) is green
  2. All review threads are resolved
  3. The branch is up to date with `main` (one-click "Update branch" in the PR UI)
- Releases on `main` happen through release-please's auto-generated `release: vX.Y.Z` PR. The bot pushes to a `release-please--branches--main` branch (allowed by the branch-naming ruleset) and opens a PR — same review path as anything else.
- **No bypass actors.** If you ever need an escape hatch, edit the ruleset's bypass list explicitly via PR (update [`rulesets/main.json`](rulesets/main.json) and re-import). Document the reason in the same PR.

---

## Emergency bypass

If a hotfix is blocked by a failing CI check that's clearly broken (e.g., a flaky test, or a check renamed and now permanently red), the right call is **not** to bypass — it's to:

1. Open a `fix(ci):` PR that fixes or removes the broken check.
2. Once it's green, the hotfix PR becomes mergeable again.

If the ruleset itself is genuinely broken (e.g., references a check that no longer exists), an admin can edit the ruleset in Settings → Rules → Rulesets and update the required checks list. Push the equivalent change to [`rulesets/main.json`](rulesets/main.json) in the same hour, and reference the why in the commit.

---

## إعداد حماية الفروع (بالعربي)

> النسخة الإنجليزية أعلاه: [English version above](#branch-protection--setup-guide)
>
> **المصدر الرسمي للقواعد هو ملفات JSON في [`docs/rulesets/`](rulesets/).** لاستيراد القواعد إلى GitHub انظر التعليمات في أعلى الملف بالإنجليزية.

هذا الدليل يقفل `main` بحيث:

- لا أحد يقدر يدفع (push) مباشرة على `main` — كل تغيير يمر بـ PR مع CI ناجح.
- أسماء الفروع يجب أن تتبع اتفاقية التسمية في [CONTRIBUTING.ar.md](../CONTRIBUTING.ar.md) — `feat/*`, `fix/*`, إلخ.
- عناوين الـ PR يجب أن تتبع Conventional Commits (لأننا نستخدم squash-merge، فعنوان الـ PR يصبح رسالة الـ commit على `main`).
- لا يُسمح بـ force push ولا حذف `main`.
- إصدارات `main` تتم عبر PR من [release-please](https://github.com/googleapis/release-please)، وليس بـ push مباشر.

### القواعد بصورة مختصرة

**لفرع `main`:**

- يتطلب PR قبل الدمج: نعم
- يتطلب نجاح `ci` و `lint`
- يتطلب أن يكون الفرع محدّثاً مع `main` (strict)
- يتطلب linear history (squash-merge فقط)
- يمنع force push
- يمنع الحذف
- لا يوجد bypass actors

**لباقي الفروع (branch-naming):**

اسم الفرع يجب أن يبدأ بإحدى البادئات المسموح بها (مفصّلة في القسم الإنجليزي أعلاه). أي اسم آخر يُرفض عند الـ push.

### التحقق

كرّر اختبارات Verify أعلاه — جميعها يجب أن تفشل برسالة `GH006` أو `GH013`. إذا فشلت كما هو متوقع، فالحماية مفعّلة.

### Bypass طارئ

لا تعطّل الـ ruleset لـ "إصلاح طارئ". بدلاً من ذلك:

1. افتح PR من نوع `fix(ci):` يصلح الـ check المكسور.
2. بمجرد ما يصير أخضر، الـ hotfix PR يصير قابلاً للدمج.

إذا الـ ruleset نفسه مكسور (مثلاً يشير إلى check لم يعد موجوداً)، admin يقدر يعدّله من Settings → Rules → Rulesets. ادفع نفس التغيير إلى [`rulesets/main.json`](rulesets/main.json) في نفس الساعة، واذكر السبب في commit.
