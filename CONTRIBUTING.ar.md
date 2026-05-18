# دليل المساهمة في imamzain.org

> هذا الملف هو **المرجع الرسمي** لطريقة العمل على المشروع. اقرأه مرة واحدة كاملاً، ثم ارجع إليه عند الحاجة. إذا وجدت خطأ أو شيئاً غير واضح، صحّحه في نفس الـ PR الذي تعمل عليه — هذا الملف اتفاقية فريق وليس نصاً مقدساً.

> النسخة الإنجليزية: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## فهرس سريع

1. [القواعد الذهبية](#القواعد-الذهبية)
2. [إعداد Git على جهازك (مرة واحدة فقط)](#إعداد-git-على-جهازك-مرة-واحدة-فقط)
3. [الفروع (Branches)](#الفروع-branches)
4. [رسائل الـ Commit](#رسائل-الـ-commit)
5. [سيناريوهات يومية مع الأوامر كاملة](#سيناريوهات-يومية-مع-الأوامر-كاملة)
6. [إصدار نسخة جديدة (Release)](#إصدار-نسخة-جديدة-release)
7. [ماذا تفعل عندما تخطئ — قسم الإنقاذ](#ماذا-تفعل-عندما-تخطئ--قسم-الإنقاذ)
8. [أخطاء شائعة لا تقع فيها](#أخطاء-شائعة-لا-تقع-فيها)
9. [قاموس Git المختصر](#قاموس-git-المختصر)

---

## القواعد الذهبية

اقرأ هذه القائمة وستفهم 80% من طريقة العمل:

1. **لا تدفع (push) مباشرة إلى `main` أو `dev`.** افتح Pull Request (PR) دائماً.
2. **ابدأ فرعك من `dev`** للميزات والإصلاحات العادية. ابدأ من `main` فقط للإصلاحات الطارئة (hotfix).
3. **استخدم Conventional Commits** — مثل `feat:` و `fix:` و `chore:`. مفصّل في الأسفل.
4. **كل PR = تغيير واحد منطقي.** لا تخلط تنظيف الكود مع إصلاح Bug مع تحديث مكتبة.
5. **استخدم "Squash and merge"** عند دمج فرعك في `dev` (الزر في GitHub).
6. **التاجات (tags) والإصدارات** تُنشأ بسكربت `bun run release` فقط، لا يدوياً.
7. **احذف فرعك** بعد ما يتم دمج الـ PR.

---

## إعداد Git على جهازك (مرة واحدة فقط)

قبل أول مساهمة، شغّل هذه الأوامر **مرة واحدة** على جهازك. هذه ليست خاصة بالمشروع — هي إعداد عام لـ Git:

```bash
# اسمك وإيميلك (يظهران في كل commit تعمله)
git config --global user.name "اسمك بالإنجليزية"
git config --global user.email "your-email@example.com"

# اجعل git pull يستخدم rebase افتراضياً
# (يخلّيك تتجنب رسائل "Merge branch dev" المزعجة في التاريخ)
git config --global pull.rebase true

# اضبط فاصل النهايات للسطور (مهم على ويندوز خاصة)
git config --global core.autocrlf true   # على ويندوز
# git config --global core.autocrlf input  # على ماك/لينكس
```

تحقق أن الإعدادات شُغّلت:

```bash
git config --global --list
```

---

## الفروع (Branches)

| الفرع | الوظيفة | من يدفع إليه مباشرة | كيف يُحدَّث |
|---|---|---|---|
| `main` | الإنتاج. هذا اللي شغّال على الموقع. كل دمج فيه يأخذ tag. | **لا أحد** | فقط عبر PR من `dev` (إصدار عادي) أو `hotfix/*` (إصلاح طارئ) |
| `dev` | فرع التكامل / staging. اللي راح يطلع في الإصدار القادم. | **لا أحد** | فقط عبر PR من فروع قصيرة العمر |
| `feat/<اسم-قصير>` | ميزة جديدة | أنت | افتحه من `dev`، ادمجه في `dev` |
| `fix/<اسم-قصير>` | إصلاح غير عاجل | أنت | افتحه من `dev`، ادمجه في `dev` |
| `perf/<اسم-قصير>` | تحسين أداء | أنت | افتحه من `dev`، ادمجه في `dev` |
| `refactor/<اسم-قصير>` | إعادة هيكلة بدون تغيير سلوك | أنت | افتحه من `dev`، ادمجه في `dev` |
| `chore/<اسم-قصير>` | إعدادات، تحديث dependencies، تنظيف | أنت | افتحه من `dev`، ادمجه في `dev` |
| `docs/<اسم-قصير>` | تعديل على التوثيق فقط | أنت | افتحه من `dev`، ادمجه في `dev` |
| `hotfix/<اسم-قصير>` | **الإنتاج مكسور الآن** | أنت | افتحه من `main`، ادمجه في `main` **و** `dev` (PR لكلٍ منهما) |

### قواعد تسمية الفروع

- استخدم `kebab-case` (كلمات بإنجليزي مفصولة بشرطة).
- اسم يصف المهمة بوضوح.

| صحيح | خطأ | لماذا |
|---|---|---|
| `fix/swiper-prototype-pollution` | `fix/bug` | "bug" ما تقول شي |
| `feat/contests-leaderboard` | `dhiaa-feature` | اسم شخص ليس وصفاً |
| `chore/upgrade-next-to-16` | `update` | كلمة عامة |

### عمر الفرع

اجعل عمر فرعك **أقل من أسبوع**. إذا الميزة أكبر من أسبوع، قسّمها على عدة PRs صغيرة. الفروع الطويلة العمر تصير صعبة الدمج لاحقاً (انظر `feature/project-restructure` كمثال على ما لا يجب فعله).

---

## رسائل الـ Commit

نتبع معيار [Conventional Commits](https://www.conventionalcommits.org/). سكربت الإصدار يقرأ هذه الرسائل ليقرر رقم النسخة الجديدة ويولّد ملف التغييرات (CHANGELOG)، فهي ليست مجرد شكل.

### الصيغة

```
<النوع>(<النطاق>): <الموضوع>

[نص اختياري — اشرح "لماذا" وليس "ماذا"]

[footer اختياري، مثل BREAKING CHANGE: ... أو Refs #123]
```

### أنواع الـ Commit

| النوع | متى تستخدمه | يرفع الإصدار إلى |
|---|---|---|
| `feat` | ميزة جديدة يراها المستخدم | **minor** |
| `fix` | إصلاح bug | patch |
| `perf` | تحسين أداء (بدون تغيير سلوك) | patch |
| `refactor` | إعادة هيكلة كود (بدون تغيير سلوك) | patch |
| `docs` | تعديل توثيق/تعليقات | patch |
| `test` | إضافة أو إصلاح اختبارات | patch |
| `build` | إعدادات بناء، bundler، dependencies تؤثر على البناء | patch |
| `ci` | تغيير workflows / CI | patch |
| `chore` | أي شيء لا يندرج تحت ما سبق (إعدادات، محتوى، تنظيف) | patch |
| `style` | تنسيق فقط (مسافات، فواصل منقوطة) — نادراً ما يُستخدم لأن Prettier يهتم بهذا | patch |
| `revert` | إلغاء commit سابق | patch |

### تغيير كاسر (Breaking Change)

إذا التغيير راح يكسر شيء (مثلاً غيّرت URLs أو schema)، أضف `!` بعد النوع، أو ضع footer `BREAKING CHANGE:`. هذا يرفع الإصدار إلى **major**.

```
feat(routes)!: نقل /library/* إلى /knowledge-base/*

BREAKING CHANGE: روابط /library القديمة الآن تحوّل (301) إلى /knowledge-base.
أي روابط خارجية تشير إلى /library يجب تحديثها.
```

### النطاق (Scope)

اختياري لكن مفضّل. اسم مجلد أو ميزة بكلمة واحدة بالإنجليزي بحروف صغيرة: `header`, `api`, `library`, `research`, `security`, `images`, `isr`, إلخ.

### أمثلة جيدة مقابل سيئة (من تاريخ المشروع نفسه)

| جيد | سيء | لماذا |
|---|---|---|
| `fix(security): restore SSRF hostname check in /api/download` | `feat: update header component and audio types` | "update" ما تقول شي |
| `perf(isr): wrap 5 client routes in server-component shells with revalidate=300` | `Implement feature X to enhance user experience and fix bug Y in module Z` | نص افتراضي حرفي — لا تترك "X" و "Y" أبداً |
| `chore(header): replace 1824 typo with dynamic copyright year` | `hotfix:"test"` | ليس hotfix فعلياً، بدون scope، عديم الفائدة |
| `fix(a11y): finish H1 audit deferred from P0-6` | `merge branch dev` | حروف صغيرة، مكرر، لا يقول شيئاً |

**قاعدة عملية:** إذا وجدت نفسك تكتب "update X" أو "fix bug" — قف، فكّر فيما *تغيّر فعلاً*، وأعد الصياغة. رسالة الـ commit تُقرأ أكثر بكثير مما تُكتب.

---

## سيناريوهات يومية مع الأوامر كاملة

### 1. أريد إضافة ميزة جديدة (مثلاً: لوحة نتائج في المسابقات)

```bash
# 1) اذهب إلى dev واسحب آخر تحديثات
git checkout dev
git pull

# 2) أنشئ فرعك من dev
git checkout -b feat/contests-leaderboard

# 3) شغّل الكود محلياً للتأكد أن كل شيء يعمل قبل التعديل
bun install
bun run dev
# (افتح http://localhost:3000 وتأكد)

# 4) اعمل التعديلات، ثم commit كل ما أنجزت خطوة منطقية
git add src/app/contests/leaderboard.tsx
git commit -m "feat(contests): add leaderboard component"

git add src/app/api/contests/scores/route.ts
git commit -m "feat(contests): wire leaderboard to /api/contests/scores"

# 5) ادفع الفرع لأول مرة (لاحظ -u لربط الفرع المحلي بالبعيد)
git push -u origin feat/contests-leaderboard

# 6) افتح GitHub — راح يظهر زر "Compare & pull request"
#    اختر base: dev (مهم!)
#    اكتب وصفاً واضحاً
#    استخدم القالب اللي يظهر تلقائياً
```

عند الموافقة على الـ PR:
- اضغط **"Squash and merge"** في GitHub.
- **عدّل رسالة الـ commit قبل التأكيد** — هذه الرسالة ستصبح سطراً واحداً في تاريخ `dev`. اجعلها جيدة: `feat(contests): add leaderboard with sort + pagination`.
- اضغط **"Delete branch"** بعد الدمج (يظهر زر بعد الدمج مباشرة).
- محلياً، احذف الفرع أيضاً:

```bash
git checkout dev
git pull
git branch -d feat/contests-leaderboard
```

### 2. أريد إصلاح bug غير عاجل

نفس الخطوات بالضبط، لكن باستخدام `fix/<اسم-قصير>` بدلاً من `feat/`. سيُشحن مع الإصدار العادي القادم.

```bash
git checkout dev
git pull
git checkout -b fix/breadcrumb-overflow-on-mobile
# ...اشتغل...
git commit -m "fix(breadcrumb): truncate long titles on mobile screens"
git push -u origin fix/breadcrumb-overflow-on-mobile
# افتح PR إلى dev
```

### 3. الإنتاج مكسور — Hotfix طارئ

```bash
# 1) ابدأ من main (وليس dev!) — لأن الإصلاح يجب أن يصل للإنتاج فوراً
git checkout main
git pull

# 2) افتح فرع hotfix
git checkout -b hotfix/audio-download-403

# 3) اعمل الحد الأدنى من الإصلاح فقط — لا تنظيف، لا refactor
git commit -m "fix(api): restore allowed-hostname check in /api/download"

# 4) ادفع وافتح PR إلى main (وليس dev!)
git push -u origin hotfix/audio-download-403
# على GitHub: افتح PR، base: main
```

بعد دمج الـ PR في `main`:

1. **شغّل سكربت الإصدار** من `main` (راح يصدر patch، مثلاً `v0.4.1 → v0.4.2`):

```bash
git checkout main
git pull
bun run release
```

2. **زامن الإصلاح إلى `dev`** — لئلا يضيع عند الإصدار التالي:

```bash
# الطريقة السهلة: ادمج main في dev مباشرة (إذا قواعد الحماية تسمح)
git checkout dev
git pull
git merge main
git push

# الطريقة الأنظف (تأخذ مراجعة): افتح PR من main إلى dev
```

### 4. أنا قائد الإصدار هذا الأسبوع (Release Captain)

1. تأكد أن `dev` نظيف:
   - CI أخضر (تحقق من تبويب Actions في GitHub).
   - فتحت موقع المعاينة (Vercel preview) ومشيت على الصفحات الرئيسية.

2. افتح PR من `dev` إلى `main`:
   - العنوان: `release: vX.Y.Z` (بدون رقم محدد إذا كنت لا تعرفه بعد — السكربت يحسبه).
   - في الـ body: قائمة نقاط بأبرز التغييرات.

3. انتظر المراجعة و CI، ثم **اضغط "Create a merge commit"** (وليس Squash، وليس Rebase) — هذا يحفظ حدود الـ PRs الفردية في تاريخ `main` ويساعد سكربت الإصدار يولّد changelog منظم.

4. على جهازك:

```bash
git checkout main
git pull
bun run release
```

السكربت يسألك تأكيد، ثم:
- يرفع رقم النسخة في `package.json`.
- يضيف قسماً جديداً في `CHANGELOG.md`.
- يعمل commit و tag.
- يدفع إلى origin.
- ينشئ GitHub Release (إذا كان `gh` CLI مثبتاً).

5. تحقق من Vercel أنه نشر الـ tag الجديد.

6. زامن commit الإصدار إلى `dev`:

```bash
git checkout dev
git pull
git merge main
git push
```

---

## إصدار نسخة جديدة (Release)

السكربت موجود في [`scripts/release.mjs`](scripts/release.mjs).

### المتطلبات قبل التشغيل

- أنت على فرع `main`.
- لا توجد تغييرات غير محفوظة (`git status` نظيف).
- `main` المحلي متزامن مع `origin/main`.
- (اختياري) `gh` CLI مثبت ومُسجَّل دخوله — حتى ينشئ GitHub Release تلقائياً.

### كيفية تثبيت `gh` CLI

- ويندوز: `winget install --id GitHub.cli`
- ماك: `brew install gh`
- ثم: `gh auth login` واتبع التعليمات.

### الأوامر

```bash
# إصدار عادي — يحسب رقم النسخة تلقائياً من commits منذ آخر tag
bun run release

# معاينة فقط، بدون أي تعديل
bun run release -- --dry-run

# إجبار نوع معين من القفز
bun run release -- --major
bun run release -- --minor
bun run release -- --patch

# تخطي التأكيد التفاعلي (y/n)
bun run release -- --yes

# عدم الدفع (للتجربة)
bun run release -- --skip-push

# عدم إنشاء GitHub Release (فقط tag محلي + دفع)
bun run release -- --skip-gh
```

### قواعد ترقيم الإصدارات لهذا الموقع

لأننا نشحن موقعاً (وليس مكتبة)، يُترجم SemVer كالآتي:

- **MAJOR (X.0.0)** — إعادة تصميم ظاهرة، تغيير في بنية URLs، تغيير نموذج المصادقة، حذف قسم كامل.
- **MINOR (0.X.0)** — صفحة جديدة، قسم جديد، ميزة بارزة على صفحة موجودة.
- **PATCH (0.0.X)** — إصلاح bug، تصحيح محتوى، تحسين أداء، تحديث dependency، أي شيء غير ظاهر للمستخدم تقريباً.

السكربت يحدد القفزة تلقائياً من رسائل الـ commit: أي `feat:` يطلق **minor**، أي `!` أو `BREAKING CHANGE` يطلق **major**، وإلا **patch**. الـ flags `--major | --minor | --patch` تتجاوز الكشف التلقائي.

---

## ماذا تفعل عندما تخطئ — قسم الإنقاذ

> هذا القسم هو **الأهم** لمن هم جدد على Git. لا تخجل من الرجوع إليه.

### "عملت commit على dev مباشرة بالخطأ، ماذا أفعل؟"

```bash
# 1) تحقق أنك على dev وأن commit الخطأ هو الأخير
git log --oneline -3

# 2) أنشئ فرع جديد يأخذ commitك معه
git branch feat/my-fix

# 3) أرجع dev خطوة للخلف (هذا يلغي commit من dev المحلي فقط، ما زال محفوظاً في الفرع الجديد)
git reset --hard HEAD~1

# 4) اذهب إلى الفرع الجديد وكمّل العمل عادي
git checkout feat/my-fix
git push -u origin feat/my-fix
# افتح PR
```

**ملاحظة مهمة:** إذا كنت قد دفعت (`push`) إلى `dev` قبل ما تكتشف الخطأ، **لا تستخدم `git push --force` على dev أبداً**. اتصل بزميل ليساعدك، أو اعمل commit إصلاح يرجّع التغيير (`git revert`).

### "كتبت رسالة commit خاطئة، لكن لم أدفعها بعد"

```bash
# عدّل رسالة آخر commit
git commit --amend -m "feat(contests): الرسالة الصحيحة هنا"
```

### "كتبت رسالة commit خاطئة وكنت قد دفعتها"

إذا الفرع هو فرعك الشخصي ولا أحد يعمل عليه:

```bash
git commit --amend -m "الرسالة الصحيحة"
git push --force-with-lease
```

⚠ **`--force-with-lease` أأمن من `--force`** — يرفض الدفع إذا كان أحد قد دفع شيئاً للفرع بعدك.

إذا الفرع هو `dev` أو `main` أو فرع مشترك: **لا تستخدم force أبداً.** الرسالة صارت تاريخاً، اقبلها.

### "أريد التراجع عن آخر commit بالكامل (لم أدفع)"

```bash
# تراجع لكن احتفظ بالتعديلات في working directory
git reset --soft HEAD~1

# أو تراجع وامسح كل شيء (حذر! لا رجعة)
git reset --hard HEAD~1
```

### "Git pull طلع لي صراع (merge conflict)"

```bash
# 1) شاهد قائمة الملفات المتعارضة
git status

# 2) افتح كل ملف يقول "both modified"
# سترى علامات هكذا:
#   <<<<<<< HEAD
#   كودك
#   =======
#   كود الفرع الآخر
#   >>>>>>> origin/dev

# 3) قرّر يدوياً ماذا تبقي، احذف العلامات (<<<<<<< ======= >>>>>>>)
# 4) احفظ الملف
# 5) قل لـ git أنك حللت الصراع
git add <اسم-الملف>

# 6) أكمل العملية (rebase أو merge بحسب ما كنت تفعل)
git rebase --continue
# أو
git commit
```

إذا تشتت تماماً وأردت إلغاء كل شيء:

```bash
# إلغاء rebase الجاري
git rebase --abort

# إلغاء merge الجاري
git merge --abort
```

### "دفعت ملف فيه كلمة سر أو بيانات حساسة"

**قف فوراً.** اتصل بالفريق. لا تحاول حذفه بمفردك بـ `git rm` — يبقى في التاريخ. الحل المعتمد هو:

1. غيّر كلمة السر / المفتاح فوراً في الخدمة المعنية (لأنه فعلياً مكشوف).
2. اطلب مساعدة من زميل ذي خبرة لتنظيف التاريخ بـ `git filter-repo` أو BFG.

### "فقدت تعديلاتي، هل من أمل؟"

عادة نعم. Git يحتفظ بكل شيء حتى لو غير مرتبط بأي branch.

```bash
# اعرض كل ما حدث في الـ HEAD مؤخراً
git reflog

# هذا يعرض قائمة بشكل: <hash> HEAD@{0}: commit: ...
# اعثر على الـ hash اللي تريد، ثم:
git checkout <hash>

# أو أنشئ فرع منه
git branch recovered-work <hash>
```

---

## أخطاء شائعة لا تقع فيها

من تاريخ المشروع الحقيقي. كل واحد منها كلّف شخصاً وقتاً.

- ❌ **دفع مباشر إلى `dev` أو `main`.** حتى لو سطر واحد. افتح PR — مجرّد تشغيل CI لوحده يستحق الوقت.
- ❌ **commits بصيغة `merge branch dev`.** هذه تأتي من `git pull` على فرع متشعّب. استخدم `git pull --rebase` بدلاً منها، أو فعّل `pull.rebase = true` كما في قسم الإعداد أعلاه.
- ❌ **رسائل commit نائبة (placeholder).** `Implement feature X to enhance user experience and fix bug Y in module Z` بقيت في التاريخ للأبد. اكتب الموضوع الحقيقي.
- ❌ **PR واحد يصلح ستة أشياء غير مرتبطة.** المراجِع لا يستطيع فهمه، وأي revert يدمّر خمسة تغييرات جيدة.
- ❌ **خلط refactor مع bugfix.** اشحن الإصلاح وحده، افتح PR منفصل للـ refactor بعدها.
- ❌ **فروع طويلة العمر** (تذكّر `feature/project-restructure`). إما تشحنها بقطع وراء feature flags أو تقتلها. الفروع الأقدم من أسبوعين نادراً ما تُدمج بسلاسة.
- ❌ **رفع `package.json.version` يدوياً أو إنشاء tag يدوياً.** استخدم `bun run release`.
- ❌ **دفع tag قبل دفع commit الإصدار.** السكربت يفعل ذلك بالترتيب الصحيح — لا تعد ترتيبها.
- ❌ **تعديل أقسام محرّرة سابقاً في `CHANGELOG.md`.** الإصلاح يكون للأمام. التاريخ يهم.
- ❌ **`git push --force` على فرع مشترك.** كارثة. استخدم `--force-with-lease` على فرعك الشخصي فقط.

---

## قاموس Git المختصر

| المصطلح | بالعربي | الشرح |
|---|---|---|
| **branch** | فرع | خط تطوير مستقل. مثل نسخة موازية من الكود. |
| **commit** | كومت / التزام | لقطة من الكود في لحظة معينة. الوحدة الأساسية للتاريخ. |
| **push** | دفع | إرسال commits من جهازك إلى GitHub. |
| **pull** | سحب | جلب آخر commits من GitHub إلى جهازك. |
| **merge** | دمج | ضم فرعين، يولّد commit جديد إذا تشعّبا. |
| **rebase** | إعادة قاعدة | إعادة كتابة commits فوق قاعدة جديدة (تاريخ أنظف، يدمج بدون commit دمج). |
| **fetch** | جلب | يحدّث معلومات Git عن origin بدون أن يدمج. |
| **remote / origin** | المستودع البعيد / المنشأ | GitHub. الاسم الافتراضي للمستودع البعيد هو `origin`. |
| **HEAD** | الرأس | الإشارة إلى آخر commit على فرعك الحالي. |
| **tag** | وسم | اسم ثابت لـ commit معين. نستخدمه لإصدارات الـ release. |
| **PR (Pull Request)** | طلب سحب | اقتراح دمج فرع في فرع آخر. مكان المراجعة والنقاش. |
| **conflict / merge conflict** | تعارض | حصل عند تعديل نفس السطر من قبل فرعين. يحتاج تدخل يدوي. |
| **squash** | سحق / دمج بضغط | تحويل عدة commits إلى commit واحد. |
| **revert** | إلغاء | عمل commit جديد يلغي تأثير commit قديم (لا يحذفه من التاريخ). |
| **reset** | إعادة ضبط | تحريك HEAD إلى commit آخر. خطر إذا `--hard`. |
| **stash** | إخفاء مؤقت | حفظ التعديلات الحالية جانباً بدون commit، للعودة إليها لاحقاً. |
| **diff** | فرق | عرض التغييرات بين حالتين. |
| **log** | سجل | تاريخ commits. |
| **status** | حالة | ماذا تغيّر في working directory الآن. |
| **working directory** | مجلد العمل | الملفات اللي تشوفها في محرر الكود. |
| **staging area / index** | منطقة التحضير | الملفات اللي عملت لها `git add` ومستعدة لـ commit. |

---

## أسئلة أو تحسينات على هذا الملف

افتح PR. اسم الفرع: `docs/<وصف-قصير>`. مثلاً:

```bash
git checkout -b docs/clarify-hotfix-sync-step
# ...عدّل CONTRIBUTING.ar.md...
git commit -m "docs(ar): clarify hotfix-to-dev sync step"
git push -u origin docs/clarify-hotfix-sync-step
```

---

> آخر تحديث: 2026-05-17 — هذا الملف مرفق مع نسخة المشروع. أي تغيير عليه يخضع لنفس قواعد المساهمة الموصوفة فيه.
