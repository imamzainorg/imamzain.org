# دليل المساهمة في imamzain.org

> هذا الملف هو **المرجع الرسمي** لطريقة العمل على المشروع. اقرأه مرة واحدة كاملاً، ثم ارجع إليه عند الحاجة. إذا وجدت خطأ أو شيئاً غير واضح، صحّحه في نفس الـ PR الذي تعمل عليه — هذا الملف اتفاقية فريق وليس نصاً مقدساً.
>
> النسخة الإنجليزية: [CONTRIBUTING.md](CONTRIBUTING.md)

---

## فهرس سريع

1. [القواعد الذهبية](#القواعد-الذهبية)
2. [إعداد Git على جهازك (مرة واحدة فقط)](#إعداد-git-على-جهازك-مرة-واحدة-فقط)
3. [الفروع (Branches)](#الفروع-branches)
4. [رسائل الـ Commit](#رسائل-الـ-commit)
5. [سيناريوهات يومية مع الأوامر كاملة](#سيناريوهات-يومية-مع-الأوامر-كاملة)
6. [إصدار نسخة جديدة — مرجع release-please](#إصدار-نسخة-جديدة--مرجع-release-please)
7. [ماذا تفعل عندما تخطئ — قسم الإنقاذ](#ماذا-تفعل-عندما-تخطئ--قسم-الإنقاذ)
8. [أخطاء شائعة لا تقع فيها](#أخطاء-شائعة-لا-تقع-فيها)
9. [قاموس Git المختصر](#قاموس-git-المختصر)

---

## القواعد الذهبية

اقرأ هذه القائمة وستفهم 80% من طريقة العمل:

1. **لا تدفع (push) مباشرة إلى `main`.** افتح Pull Request (PR) دائماً.
2. **ابدأ فرعك من `main`** لكل تغيير. الفروع قصيرة العمر (أيام، ليست أسابيع).
3. **استخدم Conventional Commits** — مثل `feat:` و `fix:` و `chore:`. مفصّل في الأسفل.
4. **كل PR = تغيير واحد منطقي.** لا تخلط تنظيف الكود مع إصلاح Bug مع تحديث مكتبة.
5. **استخدم "Squash and merge"** عند دمج فرعك في `main` (هذا الخيار الوحيد المسموح في الـ ruleset، لا تستطيع اختيار غيره).
6. **التاجات (tags) والإصدارات** تُنشأها أداة [release-please](https://github.com/googleapis/release-please) تلقائياً عند دمج PR إصدار يفتحه الـ bot — لا تُنشأ يدوياً ولا بسكربت محلي.
7. **احذف فرعك** بعد ما يتم دمج الـ PR.

نحن نتبع **GitHub Flow**: فرع واحد طويل العمر (`main`)، فروع ميزات قصيرة العمر تتفرع منه، ومعاينات Vercel على كل PR كبيئة staging. لا يوجد فرع `dev`/`staging` — لسنا بحاجة إليه.

---

## إعداد Git على جهازك (مرة واحدة فقط)

قبل أول مساهمة، شغّل هذه الأوامر **مرة واحدة** على جهازك. هذه ليست خاصة بالمشروع — هي إعداد عام لـ Git:

```bash
# اسمك وإيميلك (يظهران في كل commit تعمله)
git config --global user.name "اسمك بالإنجليزية"
git config --global user.email "your-email@example.com"

# اجعل git pull يستخدم rebase افتراضياً
# (يخلّيك تتجنب رسائل "Merge branch main" المزعجة في التاريخ)
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
| `main` | الإنتاج. هذا اللي شغّال على الموقع. كل دمج فيه يأخذ tag تلقائياً عند الإصدار. | **لا أحد** | فقط عبر PR من فرع قصير العمر |
| `feat/<اسم-قصير>` | ميزة جديدة | أنت | افتحه من `main`، ادمجه في `main` |
| `fix/<اسم-قصير>` | إصلاح bug (عاجل أو غير عاجل — الإصلاحات الإنتاجية تستخدم نفس البادئة، فقط ادمج بسرعة) | أنت | افتحه من `main`، ادمجه في `main` |
| `perf/<اسم-قصير>` | تحسين أداء | أنت | افتحه من `main`، ادمجه في `main` |
| `refactor/<اسم-قصير>` | إعادة هيكلة بدون تغيير سلوك | أنت | افتحه من `main`، ادمجه في `main` |
| `chore/<اسم-قصير>` | إعدادات، تحديث dependencies، تنظيف | أنت | افتحه من `main`، ادمجه في `main` |
| `docs/<اسم-قصير>` | تعديل على التوثيق فقط | أنت | افتحه من `main`، ادمجه في `main` |
| `release-please--branches--main` | فرع PR الإصدار الذي يديره الـ bot. **لا تلمسه.** | الـ bot (GitHub App اسمه `imamzain-release-please`) | يُنشأ ويُحدَّث تلقائياً |

### قواعد تسمية الفروع

- استخدم `kebab-case` (كلمات بإنجليزي مفصولة بعلامة ناقص).
- اسم يصف المهمة بوضوح.
- مفروضة على مستوى الـ server بـ [`docs/rulesets/branch-naming.json`](docs/rulesets/branch-naming.json).

| صحيح | خطأ | لماذا |
|---|---|---|
| `fix/swiper-prototype-pollution` | `fix/bug` | "bug" ما تقول شي |
| `feat/contests-leaderboard` | `dhiaa-feature` | اسم شخص ليس وصفاً |
| `chore/upgrade-next-to-16` | `update` | كلمة عامة |

### عمر الفرع

عمر الفرع يجب **ان لا يتجاوز الأسبوع**. إذا الميزة أكبر من أسبوع، قسّمها على عدة PRs صغيرة. الفروع الطويلة العمر تصير صعبة الدمج لاحقاً لأن `main` يتحرك تحتها.

---

## رسائل الـ Commit

نتبع معيار [Conventional Commits](https://www.conventionalcommits.org/). release-please يقرأ هذه الرسائل ليقرر رقم النسخة الجديدة ويولّد ملف التغييرات (CHANGELOG)، فهي ليست مجرد شكل.

### الصيغة

```text
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
| `release` | عنوان PR الإصدار الذي يفتحه release-please تلقائياً. **لا تكتبه يدوياً.** | لا شيء |

### تغيير كاسر (Breaking Change)

إذا التغيير راح يكسر شيء (مثلاً غيّرت URLs أو schema)، أضف `!` بعد النوع، أو ضع footer `BREAKING CHANGE:`. هذا يرفع الإصدار إلى **major**.

```text
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
| `chore(header): replace 1824 typo with dynamic copyright year` | `hotfix:"test"` | "hotfix" ليس نوعاً معتمداً، بدون scope، عديم الفائدة |
| `fix(a11y): finish H1 audit deferred from P0-6` | `merge branch main` | حروف صغيرة، مكرر، لا يقول شيئاً |

**قاعدة عملية:** إذا وجدت نفسك تكتب "update X" أو "fix bug" — قف، فكّر فيما *تغيّر فعلاً*، وأعد الصياغة. رسالة الـ commit تُقرأ أكثر بكثير مما تُكتب.

---

## سيناريوهات يومية مع الأوامر كاملة

### 1. أريد إضافة ميزة جديدة (أو fix أو perf أو refactor أو chore أو docs)

```bash
# 1) اذهب إلى main واسحب آخر تحديثات
git checkout main
git pull --ff-only

# 2) أنشئ فرعك من main
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
#    اختر base: main
#    اكتب وصفاً واضحاً
#    استخدم القالب اللي يظهر تلقائياً
```

عند الموافقة على الـ PR و نجاح CI:

- اضغط **"Squash and merge"** في GitHub (هذا هو الخيار الوحيد المتاح بفضل قاعدة `main` ruleset).
- **تأكد أن عنوان الـ squash commit مطابق لعنوان الـ PR** — هذه الرسالة ستصبح سطراً واحداً في تاريخ `main` وراح يقرأها release-please.
- اضغط **"Delete branch"** بعد الدمج (يظهر زر بعد الدمج مباشرة).
- محلياً، احذف الفرع أيضاً:

```bash
git checkout main
git pull --ff-only
git branch -d feat/contests-leaderboard
```

### 2. الإنتاج مكسور — إصلاح سريع

نفس التدفق أعلاه بالضبط، مع `fix/<اسم-قصير>` وإحساس بالاستعجال:

```bash
git checkout main
git pull --ff-only
git checkout -b fix/audio-download-403

# اعمل الحد الأدنى من الإصلاح فقط — لا تنظيف، لا refactor
git commit -m "fix(api): restore allowed-hostname check in /api/download"

git push -u origin fix/audio-download-403
# افتح PR إلى main
```

راجعه وادمجه. Vercel ينشر إلى الإنتاج خلال دقائق من الدمج. release-please سيلتقط الـ `fix:` ويضيفه إلى PR الإصدار المفتوح للإصدار الـ patch القادم — ادمجه متى تشاء لتاج النسخة.

**لا يوجد بادئة `hotfix` أو تدفق منفصل.** السرعة تأتي من سرعة المراجعة والدمج، لا من تدفق مختلف.

### 3. أنا قائد الإصدار هذا الأسبوع (Release Captain)

الإصدارات مؤتمتة بـ [release-please](https://github.com/googleapis/release-please). الـ workflow: [`.github/workflows/release-please.yml`](.github/workflows/release-please.yml)، الإعدادات: [`release-please-config.json`](release-please-config.json).

التدفق:

1. مع دخول PRs من نوع `feat:` و `fix:` و `perf:` إلخ. إلى `main`، يحافظ release-please على **PR مفتوح عنوانه `release: vX.Y.Z`** يحدّثه تلقائياً بالـ commits الجديدة.

2. عندما تكون جاهزاً للإصدار، انظر إلى هذا الـ PR. الـ body يحتوي قائمة بكل الـ commits مقسّمة حسب النوع (Features، Bug Fixes، إلخ.) وهو معاينة الـ changelog. الـ diff يعرض رفع النسخة في `package.json` والقسم الجديد في `CHANGELOG.md`. راجعه.

3. **اضغط Squash-merge** على PR الإصدار. الـ action يعمل بعد ذلك:
   - tag على commit الـ merge بـ `vX.Y.Z`.
   - يفتح GitHub Release بصفحة notes مولّدة.

4. Vercel ينشر الـ tag الجديد.

هذا كل شيء. **لا تشغّل أي أمر محلي للإصدار.** إذا وجدت نفسك تكتب `npm version` أو `git tag v...` — توقّف. الـ bot يعمل ذلك.

---

## إصدار نسخة جديدة — مرجع release-please

نستخدم [release-please](https://github.com/googleapis/release-please) من Google لأتمتة الإصدارات. **لا يوجد أمر محلي للإصدار** — كل شيء يحدث عبر الـ bot استجابةً لـ commits على `main`.

### كيف يشتغل

1. الـ workflow [`.github/workflows/release-please.yml`](.github/workflows/release-please.yml) يعمل عند كل push إلى `main`.
2. يفحص رسائل Conventional Commits منذ آخر tag بصيغة `v*.*.*`.
3. يفتح (أو يحدّث) PR واحد على `main` عنوانه `release: vX.Y.Z` ويحوي:
   - رفع النسخة في `package.json` و `.release-please-manifest.json`.
   - إضافة قسم جديد في `CHANGELOG.md` يجمّع الـ commits حسب النوع.
4. Squash-merge هذا الـ PR يطلق الـ action مرة ثانية، فيعمل:
   - tag على commit الـ merge بـ `vX.Y.Z`.
   - يفتح GitHub Release بصفحة notes مولّدة.
5. Vercel ينشر الـ tag تلقائياً.

### الإعدادات

- [`release-please-config.json`](release-please-config.json) — نوع الإصدار (`node`)، نمط عنوان الـ PR (`release: v${version}`)، أنواع الـ commits التي تظهر في الـ changelog وتحت أي قسم.
- [`.release-please-manifest.json`](.release-please-manifest.json) — النسخة *الحالية*. release-please يكتب هنا عند كل إصدار؛ لا تعدّله يدوياً.

### كيفية فرض قفزة معيّنة

الافتراضي: `feat:` → minor، `fix/perf/refactor/...` → patch، `!`/`BREAKING CHANGE` → major. لتجاوز هذا:

- **على مستوى commit:** أضف footer `Release-As: 1.2.0` إلى نص رسالة الـ commit.
- **على مستوى PR الإصدار:** عدّل وصف الـ release PR وأضف `Release-As: 1.2.0` على سطر مستقل. ادفع أي commit إلى `main` (حتى لو فاضي) ليحدّث الـ PR.

### قواعد ترقيم الإصدارات لهذا الموقع

لأننا نشحن موقعاً (وليس مكتبة)، يُترجم SemVer كالآتي:

- **MAJOR (X.0.0)** — إعادة تصميم ظاهرة، تغيير في بنية URLs، تغيير نموذج المصادقة، حذف قسم كامل.
- **MINOR (0.X.0)** — صفحة جديدة، قسم جديد، ميزة بارزة على صفحة موجودة.
- **PATCH (0.0.X)** — إصلاح bug، تصحيح محتوى، تحسين أداء، تحديث dependency، أي شيء غير ظاهر للمستخدم تقريباً.

### المشاكل الشائعة

- **release PR ما انفتح؟** يعني ما في commits تستحق إصدار منذ آخر tag. فقط `feat` / `fix` / `perf` / `refactor` / `revert` / breaking-change تطلق إصداراً. تشغيل بـ commits من نوع `chore`/`docs`/`ci`/`style` فقط يتم تجاهله — هذا متعمد.
- **release PR يعرض نسخة خاطئة؟** راجع أنواع الـ commits منذ آخر tag — `BREAKING CHANGE:` مفقود أو `feat:` تائه ممكن يقلب القفزة.
- **CI ما اشتغل على release PR / App auth فشل؟** الـ workflow يستخدم GitHub App اسمه `imamzain-release-please` (App ID والمفتاح الخاص محفوظين كـ secrets في الـ repo: `RELEASE_PLEASE_APP_ID` و `RELEASE_PLEASE_APP_PRIVATE_KEY`). إذا تم إلغاء تثبيت الـ App أو حذف الـ secrets أو إبطال المفتاح، الـ workflow راح يفشل برسالة auth واضحة. أعد تثبيت الـ App من Settings → GitHub Apps على مستوى المنظمة وامنحه صلاحية الوصول إلى هذا الـ repo، ثم أعد تشغيل الـ workflow.

---

## ماذا تفعل عندما تخطئ — قسم الإنقاذ

> هذا القسم هو **الأهم** لمن هم جدد على Git. لا تخجل من الرجوع إليه.

### "عملت commit على main مباشرة بالخطأ، ماذا أفعل؟"

لن يحدث هذا فعلياً لأن `main` محمي بـ ruleset (لا يمكن الدفع إليه مباشرة). لكن إذا commit-ت محلياً قبل ما تكتشف خطأك:

```bash
# 1) تحقق أنك على main وأن commit الخطأ هو الأخير
git log --oneline -3

# 2) أنشئ فرع جديد يأخذ commitك معه
git branch feat/my-fix

# 3) أرجع main خطوة للخلف (هذا يلغي commit من main المحلي فقط)
git reset --hard origin/main

# 4) اذهب إلى الفرع الجديد وكمّل العمل عادي
git checkout feat/my-fix
git push -u origin feat/my-fix
# افتح PR
```

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

إذا الفرع هو `main`: **لا تستخدم force أبداً.** الرسالة صارت تاريخاً، اقبلها. (و الـ ruleset سيمنعك على أي حال.)

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
#   >>>>>>> origin/main

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

- ❌ **دفع مباشر إلى `main`.** حتى لو سطر واحد. افتح PR — مجرّد تشغيل CI و معاينة Vercel وحدهما يستحقان الوقت. ممنوع على مستوى الـ server على أي حال.
- ❌ **commits بصيغة `merge branch main`.** هذه تأتي من `git pull` على فرع متشعّب. استخدم `git pull --rebase` بدلاً منها، أو فعّل `pull.rebase = true` كما في قسم الإعداد أعلاه.
- ❌ **رسائل commit نائبة (placeholder).** `Implement feature X to enhance user experience and fix bug Y in module Z` بقيت في التاريخ للأبد. اكتب الموضوع الحقيقي.
- ❌ **PR واحد يصلح ستة أشياء غير مرتبطة.** المراجِع لا يستطيع فهمه، وأي revert يدمّر خمسة تغييرات جيدة.
- ❌ **خلط refactor مع bugfix.** اشحن الإصلاح وحده، افتح PR منفصل للـ refactor بعدها.
- ❌ **فروع طويلة العمر.** الفروع الأقدم من ~أسبوع نادراً ما تُدمج بسلاسة لأن `main` يتحرك تحتها. إما تشحنها بقطع وراء feature flags أو تقتلها.
- ❌ **رفع `package.json.version` يدوياً أو إنشاء tag يدوياً.** release-please يملك النسخة والـ tag — دعه يعمل.
- ❌ **إغلاق PR الإصدار المفتوح من release-please.** سيُعاد فتحه عند الـ push التالي إلى `main`، لكن ستفقد أي تعديلات على وصف الـ PR. إذا الـ PR خاطئ، صلّحه في مكانه (عدّل الوصف، أضف footer `Release-As:`) أو ادفع commit تصحيحي.
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
git checkout -b docs/clarify-release-flow
# ...عدّل CONTRIBUTING.ar.md...
git commit -m "docs(ar): clarify release flow steps"
git push -u origin docs/clarify-release-flow
```

---

> آخر تحديث: 2026-05-21 — هاجرنا من Gitflow (main + dev) إلى GitHub Flow (main فقط) لتقليل الاحتكاك. هذا الملف مرفق مع نسخة المشروع. أي تغيير عليه يخضع لنفس قواعد المساهمة الموصوفة فيه.
