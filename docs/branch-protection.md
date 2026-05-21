# Branch Protection — Setup Guide

> Arabic version below: [النسخة العربية](#إعداد-حماية-الفروع-بالعربي)

This guide locks down the repo so:

- Nobody can push directly to `main` or `dev` — every change goes through a PR with passing CI.
- Branches must follow the naming conventions in [CONTRIBUTING.md](../CONTRIBUTING.md) — `feat/*`, `fix/*`, etc. Anything else is rejected at push time.
- PR titles must follow Conventional Commits (since we squash-merge, the PR title is the commit message on `dev`).
- Force pushes and deletions are blocked.
- Releases on `main` are merged via PRs by [release-please](https://github.com/googleapis/release-please), not by direct push.

**Authoritative source of truth: the JSON files in [`docs/rulesets/`](rulesets/).** Sections (A) and (B) below describe the *classic* branch protection approach and are kept for reference only — the active config is the Rulesets imported from those JSONs.

If you change a rule in the GitHub UI, also update the matching JSON file in the same PR. Otherwise the repo and the running config drift.

## How to import / re-import

1. Repo → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **Import a ruleset**.
2. Paste the contents of [`docs/rulesets/main.json`](rulesets/main.json) → **Save**. (If a ruleset with the same name already exists, delete the old one first.)
3. Repeat for [`docs/rulesets/dev.json`](rulesets/dev.json) and [`docs/rulesets/branch-naming.json`](rulesets/branch-naming.json).

---

## Recommended rules summary

### `main` (production) — see [`rulesets/main.json`](rulesets/main.json)

| Setting | Value |
|---|---|
| Require a pull request before merging | **✓ ON** |
| Require approvals | **✗ OFF** |
| Dismiss stale pull request approvals when new commits are pushed | **✓ ON** |
| Require status checks to pass | **✓ ON** — `ci` (from `predeploy.yml`) + `lint` (from `pr-title.yml`) |
| Require branches to be up to date before merging | **✓ ON** |
| Require conversation resolution before merging | **✓ ON** |
| Allowed merge methods | **merge commit only** (preserves `dev → main` PR boundaries for release-please) |
| Allow force pushes | **✗ OFF** |
| Allow deletions | **✗ OFF** |
| Bypass actors | **none** (releases use PRs, no human or bot pushes here) |

### `dev` (integration) — see [`rulesets/dev.json`](rulesets/dev.json)

| Setting | Value |
|---|---|
| Require a pull request before merging | **✓ ON** |
| Require approvals | **✗ OFF** |
| Dismiss stale approvals on new commits | **✓ ON** |
| Require status checks to pass | **✓ ON** — `ci` + `lint` |
| Require linear history | **✓ ON** (we squash-merge into dev) |
| Allowed merge methods | **squash only** |
| Allow force pushes | **✗ OFF** |
| Allow deletions | **✗ OFF** |
| Bypass actors | **none** |

---

## (A) [Legacy — for reference only] Setup via GitHub Web UI

> ⚠ This section documents the older "classic" Branch Protection approach. We've migrated to **Rulesets** — see the import instructions at the top of this file and the JSON in [`docs/rulesets/`](rulesets/). The steps below are kept so you can recognize/clean up old rules.

You need **admin permission** on the `imamzainorg/imamzain.org` repo.

### Step 1 — Open branch protection settings

1. Go to <https://github.com/imamzainorg/imamzain.org>
2. Click **Settings** (top right of the repo, not your profile settings).
3. In the left sidebar, click **Branches**.
4. Under "Branch protection rules", click **Add branch protection rule**.

### Step 2 — Protect `main`

Fill in:

- **Branch name pattern:** `main`
- Check **Require a pull request before merging**
  - Check **Dismiss stale pull request approvals when new commits are pushed**
- Check **Require status checks to pass before merging**
  - Check **Require branches to be up to date before merging**
  - In the search box, type `ci` and select the check that appears (it comes from `.github/workflows/predeploy.yml`)
  - ⚠ If `ci` doesn't appear, the workflow may not have run yet on this branch. Push a dummy PR first to register the check, then come back to this step.
- Check **Require conversation resolution before merging**
- Leave **Require linear history** unchecked (we use merge commits for releases)
- **Restrict who can push to matching branches:** leave unchecked (the PR requirement already handles this)
- Check **Do not allow bypassing the above settings** (this is "Include administrators")
- Leave **Allow force pushes** and **Allow deletions** unchecked

Click **Create**.

### Step 3 — Protect `dev`

Repeat Step 2 with these differences:

- **Branch name pattern:** `dev`
- Check **Require linear history** (we squash-merge into dev, so linear history is correct here)

Click **Create**.

### Step 4 — Verify

Try to push directly:

```bash
git checkout main
git commit --allow-empty -m "test"
git push origin main
```

You should see:

```text
remote: error: GH006: Protected branch update failed for refs/heads/main.
```

If you do — protection is working. Delete the test commit:

```bash
git reset --hard HEAD~1
```

---

## (B) [Legacy — for reference only] Setup via `gh` CLI script

> ⚠ Same caveat as section (A): this targeted the old classic Branch Protection API. The active config is now Rulesets. Keep [`scripts/setup-branch-protection.sh`](../scripts/setup-branch-protection.sh) only if you still need to clean up old classic rules; otherwise it can be deleted.

If you have `gh` installed and authenticated (`gh auth login`), you can apply both rule sets in one command.

```bash
bash scripts/setup-branch-protection.sh
```

The script is at [`scripts/setup-branch-protection.sh`](../scripts/setup-branch-protection.sh). It calls the GitHub REST API to apply the rules above to both `main` and `dev`. It's idempotent — running it again just re-applies the same rules.

**Note:** The script writes the dev-approval-count from an env var. Set it before running:

```bash
# strict (1 approval needed on dev)
DEV_REVIEWERS=1 bash scripts/setup-branch-protection.sh

# pragmatic (no approvals needed on dev)
DEV_REVIEWERS=0 bash scripts/setup-branch-protection.sh
```

---

## (C) Branch-naming Ruleset

In addition to protecting `main` and `dev`, we enforce branch naming via a GitHub Ruleset. Branches whose names don't match the allowed prefixes are rejected at push time, before they ever land on the remote.

### Allowed prefixes

Only branches matching one of these patterns can be created:

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
hotfix/*
release/*
release-please--branches--*
```

See [CONTRIBUTING.md](../CONTRIBUTING.md#branches) for what each type means.

> The `release-please--branches--*` pattern exists so the [release-please](https://github.com/googleapis/release-please) bot can create its release PR branch on `main` (e.g. `release-please--branches--main`). The pattern is hard-coded by `release-please-action`; we can't shorten it to `release/*`. If you ever migrate off release-please, drop this line.

### Setup (admin, one-time)

1. Repo → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**.
2. **Name:** `branch-naming`. **Enforcement status:** `Active`. **Bypass list:** empty.
3. **Target branches** → **Include by pattern:** `**/*`. Then **Exclude by pattern:** `main` and `dev` (so an admin can recreate them if they're ever accidentally deleted).
4. Under **Branch rules**, enable **only**:
   - **Restrict branch names** → paste the prefixes above, one per line.
   - **Block force pushes** *(optional — keeps feature-branch history intact; skip if your team relies on `git push --force-with-lease` for rebase workflows).*
5. **Save changes.**

> ⚠ **Do not enable "Restrict creations" or "Restrict deletions"** on this ruleset. They sound like they enforce naming, but they don't — "Restrict creations" blocks creating *any* matching branch (so nobody could open a feature branch), and "Restrict deletions" prevents post-merge branch cleanup. Naming is enforced solely by **Restrict branch names**.

### Verify

```bash
git checkout -b bad-name
git commit --allow-empty -m "test"
git push -u origin bad-name
```

Expected:

```text
remote: error: GH013: Repository rule violations found for refs/heads/bad-name.
```

Cleanup:

```bash
git checkout dev
git branch -D bad-name
```

### Caveats

- Patterns use **fnmatch**, not full regex. `feat/*` matches `feat/leaderboard` but **not** `feat/contests/leaderboard` (two slashes). Use single-slash slugs, or change patterns to `feat/**` if you need nesting.
- Rulesets only apply to **new** branch creations. Existing wrongly-named branches (e.g. `feature/add-book`) are grandfathered until deleted.

---

## (D) PR-title enforcement (Conventional Commits)

Because we squash-merge into `dev`, the PR title becomes the commit message. Enforcing format at the PR title is enough — no commit-msg hook required.

The check is at [`.github/workflows/pr-title.yml`](../.github/workflows/pr-title.yml). It uses [`amannn/action-semantic-pull-request`](https://github.com/amannn/action-semantic-pull-request) to validate against the Conventional Commits types listed in [CONTRIBUTING.md](../CONTRIBUTING.md#types).

### Make it a merge-blocker

The workflow already runs on every PR, but a red ✗ doesn't block merge until the check is marked **required**:

1. Open one PR so the check runs at least once (GitHub registers the check name on first run).
2. Repo → **Settings** → **Branches** → edit the rule for `dev` → in **Require status checks to pass before merging**, search for and add `lint` (or whatever name appears — likely `lint` or `lint / lint`).
3. Repeat for `main`.

### Examples

| Title | Verdict |
|---|---|
| `feat(books): add "حسبي ونسبي" to library` | ✓ |
| `fix(api): restore SSRF check in /api/download` | ✓ |
| `Add new book` | ✗ — no type, capital `A` |
| `update: tweak header` | ✗ — `update` isn't an allowed type |
| `feat: Add reading-progress indicator` | ✗ — subject starts with capital |

---

## After setup — what changes for the team

- `git push origin main` and `git push origin dev` will **fail**. This is correct.
- Everyone must work on a feature branch and open a PR.
- The PR cannot be merged until:
  1. CI (`ci` + `lint`) is green
  2. All review threads are resolved
  3. The branch is up to date with the base
- Releases on `main` happen through release-please's auto-generated `release: vX.Y.Z` PR. The bot pushes to a `release-please--branches--main` branch (allowed by [`rulesets/branch-naming.json`](rulesets/branch-naming.json)) and opens a PR — same review path as anything else.
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
> **المصدر الرسمي للقواعد هو ملفات JSON في [`docs/rulesets/`](rulesets/).** الأقسام (أ) و (ب) أدناه تشرح طريقة Branch Protection الكلاسيكية وأصبحت **للمرجعية فقط** — هاجرنا إلى Rulesets. لاستيراد القواعد إلى GitHub انظر التعليمات في أعلى الملف بالإنجليزية.

هذا الدليل يقفل فرعَي `main` و `dev` بحيث:

- لا أحد يقدر يدفع (push) مباشرة على `main` أو `dev` — كل تغيير يمر بـ PR مع CI ناجح.
- إصدارات `main` تتم عبر PR من [release-please](https://github.com/googleapis/release-please)، وليس بـ push مباشر.
- لا يُسمح بـ force push ولا حذف الفرع.

طريقتان للتنفيذ: **(أ) واجهة GitHub** (بدون أدوات إضافية، ~5 دقائق) أو **(ب) سكربت `gh` CLI** (أمر واحد، يحتاج `gh` مثبت ومُسجَّل دخوله).

### القواعد الموصى بها

**لفرع `main`:**

- يتطلب PR قبل الدمج: نعم1
- إلغاء المراجعات عند push جديد: نعم
- يتطلب نجاح CI (`ci` من `predeploy.yml`)
- يتطلب أن يكون الفرع محدّثاً مع الـ base
- يمنع force push
- يمنع الحذف
- يطبَّق على الـ admins أيضاً
- **لا** يتطلب linear history (نستخدم merge commits لـ dev → main)

**لفرع `dev`:**

نفس القواعد، مع فرق واحد: **يتطلب** linear history (لأننا نستخدم squash-merge في dev).

### الطريقة (أ): عبر واجهة GitHub

تحتاج صلاحية **admin** على repo `imamzainorg/imamzain.org`.

1. اذهب إلى <https://github.com/imamzainorg/imamzain.org>
2. اضغط **Settings** (في يمين الصفحة، أعلى الـ repo — وليس إعدادات حسابك).
3. من القائمة الجانبية اليسرى، اضغط **Branches**.
4. تحت "Branch protection rules"، اضغط **Add branch protection rule**.

**لحماية `main`:**

- **Branch name pattern:** اكتب `main`
- فعّل **Require a pull request before merging**
  - فعّل **Dismiss stale pull request approvals when new commits are pushed**
- فعّل **Require status checks to pass before merging**
  - فعّل **Require branches to be up to date before merging**
  - في خانة البحث اكتب `ci` واختر الفحص اللي يظهر (مصدره `.github/workflows/predeploy.yml`)
  - ⚠ إذا ما ظهر `ci`، يعني الـ workflow لم يعمل بعد على هذا الفرع. افتح PR تجريبي أولاً لتسجيل الفحص، ثم ارجع لهذه الخطوة.
- فعّل **Require conversation resolution before merging**
- اترك **Require linear history** فارغاً (نستخدم merge commits للإصدارات)
- اترك **Restrict who can push to matching branches** فارغاً
- فعّل **Do not allow bypassing the above settings**
- اترك **Allow force pushes** و **Allow deletions** فارغين

اضغط **Create**.

**لحماية `dev`:**

كرّر الخطوات أعلاه مع فرقين فقط:

- **Branch name pattern:** اكتب `dev`
- فعّل **Require linear history** (لأننا نستخدم squash-merge في dev)

اضغط **Create**.

**للتحقق أن الحماية شغّالة:**

```bash
git checkout main
git commit --allow-empty -m "test"
git push origin main
```

يجب أن تشاهد رسالة خطأ:

```text
remote: error: GH006: Protected branch update failed for refs/heads/main.
```

إذا ظهرت — الحماية مفعّلة. احذف commit التجريبي:

```bash
git reset --hard HEAD~1
```

### الطريقة (ب): عبر سكربت `gh` CLI

```bash
# الوضع الصارم (يتطلب موافقة واحدة على dev)
DEV_REVIEWERS=1 bash scripts/setup-branch-protection.sh

# الوضع العملي (لا يتطلب موافقات على dev)
DEV_REVIEWERS=0 bash scripts/setup-branch-protection.sh
```

السكربت يستدعي GitHub REST API. يمكن إعادة تشغيله بأمان — يعيد تطبيق نفس القواعد.

### الطريقة (ج): قاعدة تسمية الفروع (Ruleset)

بالإضافة لحماية `main` و `dev`، نفرض اتفاقية تسمية الفروع عبر GitHub Ruleset. أي فرع لا يطابق البادئات المسموح بها يُرفض عند الـ push.

**البادئات المسموح بها:**

```text
feat/*    fix/*    perf/*    refactor/*    chore/*
docs/*    test/*   build/*   ci/*          hotfix/*    release/*
```

**خطوات الإعداد (admin، مرة واحدة):**

1. Repo → **Settings** → **Rules** → **Rulesets** → **New ruleset** → **New branch ruleset**.
2. **Name:** `branch-naming`. **Enforcement status:** `Active`.
3. **Target branches** → **Include by pattern:** `**/*`. ثم **Exclude by pattern:** `main` و `dev`.
4. تحت **Branch rules** فعّل **فقط**:
   - **Restrict branch names** → الصق البادئات أعلاه، كل واحدة بسطر منفصل.
   - **Block force pushes** *(اختياري — يمنع `git push --force` على فروع الميزات).*
5. **Save changes.**

> ⚠ **لا تفعّل "Restrict creations" أو "Restrict deletions"** على هذه القاعدة. اسمها مضلل: "Restrict creations" تمنع إنشاء *أي* فرع مطابق (يعني لا أحد يقدر يفتح فرع ميزة)، و "Restrict deletions" تمنع حذف الفروع بعد الدمج. التحقق من الاسم يتم فقط عبر **Restrict branch names**.
>
> ⚠ النمط `feat/*` يطابق `feat/leaderboard` لكن **لا** يطابق `feat/contests/leaderboard` (شرطتين). استخدم slug بشرطة واحدة، أو غيّر النمط إلى `feat/**` إذا احتجت تعشيش.

### الطريقة (د): التحقق من عنوان الـ PR (Conventional Commits)

بما أننا نستخدم squash-merge على `dev`، فعنوان الـ PR هو نفسه رسالة الـ commit. لذلك يكفي التحقق من عنوان الـ PR — لا حاجة لـ commit-msg hook.

الفحص موجود في [`.github/workflows/pr-title.yml`](../.github/workflows/pr-title.yml). لجعله إلزامياً (يمنع الدمج):

1. افتح أي PR مرة واحدة حتى يسجّل GitHub اسم الفحص.
2. Repo → **Settings** → **Branches** → عدّل قاعدة `dev` → في **Require status checks to pass before merging** أضف `lint`.
3. كرّر لفرع `main`.
