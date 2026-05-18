# Branch Protection — Setup Guide

> Arabic version below: [النسخة العربية](#إعداد-حماية-الفروع-بالعربي)

This guide locks down `main` and `dev` so:

- Nobody (including admins, by default) can push directly to them.
- Every change must go through a PR with passing CI.
- Force pushes and deletions are blocked.

You can do this two ways: **(A) GitHub Web UI** (no extra tools, ~5 minutes) or **(B) the `gh` CLI script** in this repo (one command, requires `gh` installed and authenticated).

---

## Recommended rules summary

### `main` (production)

| Setting | Value |
|---|---|
| Require a pull request before merging | **✓ ON** |
| Required approving reviews | **1** |
| Dismiss stale pull request approvals when new commits are pushed | **✓ ON** |
| Require status checks to pass before merging | **✓ ON** |
| Required status checks | `ci` (from `predeploy.yml`) |
| Require branches to be up to date before merging | **✓ ON** |
| Require conversation resolution before merging | **✓ ON** |
| Require linear history | **✗ OFF** (we use merge commits for dev → main) |
| Allow force pushes | **✗ OFF** |
| Allow deletions | **✗ OFF** |
| Include administrators | **✓ ON** (no bypasses; safer for a small team) |

### `dev` (integration)

| Setting | Value |
|---|---|
| Require a pull request before merging | **✓ ON** |
| Required approving reviews | **1** (or 0 if solo work is common — see "team-size tradeoff" below) |
| Dismiss stale approvals on new commits | **✓ ON** |
| Require status checks to pass | **✓ ON** |
| Required status checks | `ci` |
| Require branches to be up to date | **✓ ON** |
| Require conversation resolution | **✓ ON** |
| Require linear history | **✓ ON** (we squash-merge into dev) |
| Allow force pushes | **✗ OFF** |
| Allow deletions | **✗ OFF** |
| Include administrators | **✓ ON** |

### Team-size tradeoff for required approvals

With 2–3 active contributors, requiring 1 approval on `dev` can become a bottleneck — if only one person is online, nothing ships. Two options:

- **Strict (recommended):** Require 1 approval on `dev`. If someone's blocked, they wait. Forces collaboration.
- **Pragmatic:** Require 0 approvals on `dev`, 1 on `main`. CI still gates every merge. Reviews happen on `main` PRs (the release PR).

Pick one and tell the team which it is.

---

## (A) Setup via GitHub Web UI

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
  - Under it, set **Required number of approvals before merging:** `1`
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

## (B) Setup via `gh` CLI script

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

## After setup — what changes for the team

- `git push origin main` and `git push origin dev` will **fail**. This is correct.
- Everyone must work on a feature branch and open a PR.
- The PR cannot be merged until:
  1. CI is green
  2. At least one teammate approves (per the rule)
  3. All review threads are resolved
  4. The branch is up to date with the base
- "Include administrators" means even the repo owner cannot bypass. If you ever need to, you can temporarily disable the rule in Settings → Branches, do the action, then re-enable. **Document why** when you do this (in the team chat or as a commit message).

---

## Emergency bypass

If production is broken and the rule is blocking a hotfix flow that you've already followed correctly — the rule is not the problem, the CI or review is. Don't disable the rule; fix the underlying check or get the review.

If the rule itself is broken (e.g., the required check renamed and now blocks everything), an admin can temporarily edit the rule in Settings → Branches → Edit. Always re-enable.

---

## إعداد حماية الفروع (بالعربي)

> النسخة الإنجليزية أعلاه: [English version above](#branch-protection--setup-guide)

هذا الدليل يقفل فرعَي `main` و `dev` بحيث:

- لا أحد (حتى الـ admin افتراضياً) يقدر يدفع (push) مباشرة عليهما.
- كل تغيير يجب أن يمر بـ PR مع CI ناجح.
- لا يُسمح بـ force push ولا حذف الفرع.

طريقتان للتنفيذ: **(أ) واجهة GitHub** (بدون أدوات إضافية، ~5 دقائق) أو **(ب) سكربت `gh` CLI** (أمر واحد، يحتاج `gh` مثبت ومُسجَّل دخوله).

### القواعد الموصى بها

**لفرع `main`:**

- يتطلب PR قبل الدمج: نعم
- عدد المراجعات المطلوبة: 1
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
  - **Required number of approvals before merging:** `1`
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

### بعد التفعيل

- `git push origin main` و `git push origin dev` ستفشلان. هذا صحيح.
- على الجميع العمل على فرع منفصل وفتح PR.
- لا يُدمج الـ PR إلا بعد:
  1. CI أخضر
  2. موافقة زميل واحد على الأقل
  3. حل جميع التعليقات
  4. تحديث الفرع مع الـ base
