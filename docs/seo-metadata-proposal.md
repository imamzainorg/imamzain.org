# SEO Metadata Proposal — imamzain.org

**Status:** Proposal for sign-off (no code changed yet).
**Scope:** Full SEO metadata for every page — 25 static routes + 7 dynamic templates (32 total).
**Language:** Arabic only (`lang="ar" dir="rtl"`, `locale=ar_IQ`).
**Method:** Each page's real rendered content + data sources were read and verified; descriptions invent nothing.

> How to use this doc: review the **title** and **description** copy per page (that's what shows in Google). Approve, edit inline, or flag. Once you sign off, I'll implement on a branch + PR (server pages get `export const metadata`, client pages get a co-located `layout.tsx`, dynamic pages get `generateMetadata`).

---

## 0. Site-wide decisions & fixes (read first)

These apply globally and a couple need a one-line decision from you.

| # | Item | Recommendation |
|---|------|----------------|
| 1 | **Title template** — root layout already appends `\| مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات` to every page title. | Every proposed `title` below is the **page-specific part only** — the brand is added automatically. Do **not** repeat the foundation name in a page title. (Home is the one exception: it uses `title.absolute`.) |
| 2 | **www vs non-www mismatch** 🚩 | ✅ **DECIDED: non-www.** Root `metadataBase` is already `https://imamzain.org`; change `BASE_URL` in `src/app/sitemap.ts` from `https://www.imamzain.org` → `https://imamzain.org` so both agree. All canonicals below use non-www. |
| 3 | **Default OG image** | ✅ **DECIDED: yes.** Add one branded `1200×630` card at `/public/og/default.jpg` and set `openGraph.images` in the root layout as the global fallback. **Note (per owner): the API will provide dedicated OG images for posts, publications, and other content** — so dynamic templates use the fallback chain `record.ogImage ?? record.image ?? "/og/default.jpg"` (see §3), which works today with the content image and auto-upgrades to the API's OG field once it ships. |
| 4 | **`keywords` meta tag** | Google ignores it for ranking, but it's harmless and other engines (Bing/Yandex) and internal search may use it. We keep targeted keywords per page (they also document intent). |
| 5 | **Canonicals & query params** | Filter/search/tab params (`?category=`, `?type=`, `?attempt_id=`) must **not** vary the canonical — each page below pins a single clean canonical. |
| 6 | **`noindex` candidates** | `/contests/.../participate` (transactional quiz step, empty without `attempt_id`) → **noindex**. `/research/send-research` despite its name is a real informational guide → **keep indexed**. |
| 7 | **Filename hygiene** (minor) | A few OG/asset files contain spaces or Arabic characters (e.g. `/general/Biography-of-the Infallible-Ones.jpg`). They URL-encode and work, but ASCII-hyphenated names are safer for crawlers. Noted per page. |

---

## 1. Summary table

“Title” = page-specific part (brand auto-appended). “Attach” = how metadata gets onto the page.

| Route | Title (Arabic) | Desc len | Attach via |
|-------|----------------|:-------:|------------|
| `/` | مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات *(absolute)* | 147 | `export const metadata` (server) |
| `/about` | حول المؤسسة | 150 | `export const metadata` (server) |
| `/about/vision-and-goals` | الرؤية والرسالة والأهداف | 143 | `export const metadata` (server) |
| `/contests` | مسابقات في تراث الإمام زين العابدين عليه السلام | 144 | **new** `layout.tsx` (client) |
| `/contests/khat` | مسابقة الخط العربي الدولية الأولى للإمام زين العابدين (ع) | 151 | **new** `layout.tsx` (client) |
| `/contests/khat/president-goals` | كلمة رئيس المؤسسة وأهداف مسابقة الخط العربي | 145 | `export const metadata` (server) |
| `/contests/kitab` | مسابقة الكتاب | 155 | `export const metadata` (server) |
| `/contests/qatuf-…-competition` | مسابقة قبسات من حياة الإمام السجاد الثقافية - الحلقة الأولى | 149 | **edit existing** `metadata` (server) |
| `/contests/qatuf-…/participate` | المشاركة في مسابقة قبسات من حياة الإمام السجاد | 155 | **new** `layout.tsx` + **noindex** (client) |
| `/news` | الأخبار والأنشطة | 152 | `export const metadata` (server) |
| `/news/archives` | أرشيف الأخبار | 150 | `export const metadata` (server) |
| `/his-life` | سيرة الإمام زين العابدين عليه السلام وتراثه | 153 | `export const metadata` (server) |
| `/library` | المكتبة التخصصية لكتب الإمام زين العابدين | 152 | `export const metadata` (server) |
| `/media/images` | معرض الصور | 152 | **new** `layout.tsx` (client) |
| `/media/videos` | معرض المرئيات والفيديو | 157 | `export const metadata` (server) |
| `/media/audio` | المكتبة الصوتية | 157 | **new** `layout.tsx` (client) |
| `/publications` | إصدارات المؤسسة وشروح الصحيفة السجادية | 148 | `export const metadata` (server) |
| `/research` | بوابة البحث العلمي | 153 | **new** `layout.tsx` (client) |
| `/research/scientific-platform` | المنصة العلمية للبحوث | 159 | **new** `layout.tsx` (client) |
| `/research/send-research` | آلية تقديم البحوث وضوابط النشر والتحكيم | 152 | `export const metadata` (server) |
| `/services` | تواصل معنا | 145 | **new** `layout.tsx` (client) |
| `/services/stores` | نقاط البيع المباشر | 154 | **new** `layout.tsx` (client) |
| `/visitation` | زيارة الإمام زين العابدين وأئمة البقيع نيابةً عنك | 142 | **new** `layout.tsx` (client) |
| `/baqi-gathering` | ملتقى البقيع الثاني: البقيع الهوية والتاريخ | 152 | `export const metadata` (server) |
| `/application` | تطبيق أنوار سجادية – الموسوعة المتكاملة عن الإمام السجاد | 155 | **edit existing** `metadata` (server) |
| `/news/[slug]` | `{post.title}` | ~runtime | `generateMetadata` |
| `/his-life/[slug]` | `{section.title}` … | ~runtime | `generateMetadata` |
| `/library/books/[bookSlug]` | `{book.title} — {book.author}` | ~runtime | `generateMetadata` |
| `/library/[collection]/[dictionary]` | `{dictionary} — {collection}` | ~runtime | `generateMetadata` |
| `/library/[collection]/[dictionary]/[subject]` | `{subject} - {collection}` | ~runtime | `generateMetadata` |
| `/publications/[slug]` | `{book.title} — {book.author}` | ~runtime | `generateMetadata` |
| `/media/videos/[slug]` | `{video.title}` | ~runtime | `generateMetadata` |

---

## 2. Static pages — full proposals

Each entry: **Title** (page-specific) · **Description** (chars) · **Keywords** · **Canonical / OG** · **Attach** · **Notes**.

### `/` — Home
- **Title (absolute):** `مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات`
- **Description (147):** مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات: إحياء تراث الإمام علي بن الحسين السجاد وأئمة البقيع، ونشر بحوثهم وإصداراتهم وأخبار المؤسسة.
- **Keywords:** مؤسسة الإمام زين العابدين · الإمام زين العابدين عليه السلام · الإمام علي بن الحسين السجاد · أئمة البقيع · رسالة الحقوق · تراث أهل البيت · بحوث ودراسات إسلامية · إصدارات مؤسسة الإمام زين العابدين · النيابة في زيارة الإمام السجاد
- **Canonical:** `/` · **OG:** website · `/general/Biography-of-the Infallible-Ones.jpg`
- **Attach:** `export const metadata` in `src/app/page.tsx`; use `title: { absolute: … }` so the template isn't applied; add `alternates: { canonical: "/" }`.
- **Notes:** OG filename has a space → URL-encodes fine, but consider renaming to hyphens. Dropped `الصحيفة السجادية` keyword — home features رسالة الحقوق + biography, not the Sahifa, so it'd be a relevance mismatch.

### `/about` — حول المؤسسة
- **Title:** `حول المؤسسة`
- **Description (150):** تعرّف على مؤسسة الإمام زين العابدين عليه السلام: رؤيتها في إحياء فكر أئمة البقيع، ورسالتها في إثراء البحث حول الإمام السجاد، مع موقعها ووسائل التواصل.
- **Keywords:** مؤسسة الإمام زين العابدين · مؤسسة الإمام السجاد للبحوث والدراسات · رؤية ورسالة المؤسسة · أئمة البقيع · الإمام زين العابدين السجاد · إحياء فكر العترة الطاهرة · مؤسسة بحوث ودراسات النجف الأشرف · التواصل مع مؤسسة الإمام زين العابدين
- **Canonical:** `/about` · **OG:** website · `/images/about-landing.jpg`
- **Attach:** `export const metadata` in `src/app/about/page.tsx`.
- **Notes:** Original draft was 182 chars; **trimmed to 150** above. Page has embedded Google Map + contact block → optional JSON-LD `Organization`/`LocalBusiness` would enrich results (out of scope here).

### `/about/vision-and-goals` — الرؤية والرسالة والأهداف
- **Title:** `الرؤية والرسالة والأهداف`
- **Description (143):** رؤية مؤسسة الإمام زين العابدين عليه السلام ورسالتها وأهدافها ومحاور عملها في إحياء تراث الإمام السجاد والعناية بالصحيفة السجادية ورسالة الحقوق.
- **Keywords:** رؤية مؤسسة الإمام زين العابدين · رسالة مؤسسة الإمام السجاد وأهدافها · محاور عمل مؤسسة الإمام السجاد · تراث الإمام السجاد عليه السلام · الصحيفة السجادية ورسالة الحقوق · رسالة الحقوق للإمام السجاد · إحياء تراث أهل البيت عليهم السلام · علماء الشيعة في المدينة المنورة
- **Canonical:** `/about/vision-and-goals` · **OG:** website · `/images/about-vision.jpg`
- **Attach:** `export const metadata` in the page.
- **Notes:** Title chosen as “…والأهداف” (broader than the in-page breadcrumb “الرؤية والرسالة”) because the page also covers goals + work axes.

### `/contests` — مسابقات في تراث الإمام زين العابدين
- **Title:** `مسابقات في تراث الإمام زين العابدين عليه السلام`
- **Description (144):** مسابقات مؤسسة الإمام زين العابدين عليه السلام في تراث الإمام السجاد: مسابقة قبسات الثقافية، ومسابقة الكتاب البحثية، ومسابقة الخط العربي الدولية.
- **Keywords:** مسابقات الإمام زين العابدين عليه السلام · مسابقة الخط العربي الدولية · مسابقة كتاب 1447هـ · مسابقة قبسات من حياة الإمام السجاد · مسابقات ثقافية عن الإمام السجاد · مسابقات بحثية في التراث الإسلامي · مسابقات في تراث أهل البيت · مسابقة الخط العربي للإمام زين العابدين
- **Canonical:** `/contests` · **OG:** website · `/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg`
- **Attach (client):** new `src/app/(activities)/contests/layout.tsx` with `export const metadata`.
- **Notes:** ⚠️ Inheritance — a layout here also wraps children. Verified: `qatuf/page.tsx` already has its own metadata (overrides), `kitab/page.tsx` is a server page (gets its own export), and **`khat/page.tsx` is the only child that would inherit** → it gets its own `layout.tsx` (below). Metadata avoids deadline/prize claims since 2 of 3 contests are closed.

### `/contests/khat` — مسابقة الخط العربي الدولية
- **Title:** `مسابقة الخط العربي الدولية الأولى للإمام زين العابدين (ع)`
- **Description (151):** مسابقة الإمام زين العابدين (ع) الدولية الأولى في الخط العربي بخمسة أنواع خطوط ونصوص من تراثه: شروط المشاركة وخطوات الاشتراك والجوائز وهيئة تحكيم دولية.
- **Keywords:** مسابقة الخط العربي · مسابقة الإمام زين العابدين للخط · مسابقة خط عربي دولية · أنواع الخط العربي الثلث والنسخ والديواني · خط النستعليق · شروط مسابقة الخط العربي · جوائز مسابقة الخط العربي · خطوات الاشتراك في مسابقة الخط · نصوص من تراث الإمام السجاد بالخط العربي
- **Canonical:** `/contests/khat` · **OG:** website · `/contests/khat/landing.jpg`
- **Attach (client):** new `src/app/(activities)/contests/khat/layout.tsx`.
- **Notes:** ⚠️ This layout also wraps `khat/president-goals` → give that child its own metadata (below) so the contest title doesn't leak onto it. Contest dates have passed → copy avoids implying open registration.

### `/contests/khat/president-goals` — كلمة رئيس المؤسسة وأهداف المسابقة
- **Title:** `كلمة رئيس المؤسسة وأهداف مسابقة الخط العربي`
- **Description (145):** كلمة السيد غسان الخرسان رئيس مؤسسة الإمام زين العابدين عليه السلام وأهداف مسابقة الخط العربي في إحياء تراث الإمام السجاد عبر جماليات الخط وفنونه.
- **Keywords:** كلمة رئيس مؤسسة الإمام زين العابدين · أهداف مسابقة الإمام السجاد للخط العربي · السيد غسان الخرسان · إحياء تراث الإمام زين العابدين · الصحيفة السجادية ورسالة الحقوق · المدرسة البغدادية للخط العربي · فن الخط العربي والتراث الإسلامي · مسابقة الخط الدولية
- **Canonical:** `/contests/khat/president-goals` · **OG:** **article** · `/contests/khat/landing.jpg`
- **Attach (server):** `export const metadata` in the page.

### `/contests/kitab` — مسابقة الكتاب
- **Title:** `مسابقة الكتاب`
- **Description (155):** مسابقة الكتاب: جائزة علمية محكمة لتأليف كتب رصينة عن تراث الإمام زين العابدين عليه السلام، مع محاور الكتابة وشروط المشاركة والجوائز وآلية التحكيم والتقديم.
- **Keywords:** مسابقة الكتاب · مسابقة كتاب الإمام زين العابدين · مسابقة علمية محكمة في التأليف · جوائز التأليف عن الإمام السجاد · محاور الكتابة عن تراث الإمام السجاد · شروط المشاركة في مسابقة الكتاب · الصحيفة السجادية أدعيتها ومضامينها · تقديم بحث عن الإمام زين العابدين
- **Canonical:** `/contests/kitab` · **OG:** website · `/contests/kitab/hero.jpg`
- **Attach (server):** `export const metadata` in the page.
- **Notes:** Title omits the year/“closed” status (detail page itself shows neither). Prize figures (2,000,000 / 500,000 IQD) are real and could be added if you want more specificity — left out to keep it evergreen.

### `/contests/qatuf-sajjadiyya-cultural-competition` — مسابقة قبسات الثقافية
- **Title:** `مسابقة قبسات من حياة الإمام السجاد الثقافية - الحلقة الأولى`
- **Description (149):** مسابقة ثقافية محلية لطلبة الجامعات حول كتاب قبسات من حياة الإمام السجاد عليه السلام، تنطلق في 2026/4/12 لمدة خمسة عشر يوماً، مع جوائز للعشرة الأوائل.
- **Keywords:** مسابقة قبسات من حياة الإمام السجاد · مسابقة الإمام زين العابدين الثقافية · مسابقة ثقافية للجامعات · كتاب قبسات من حياة الإمام السجاد · مسابقات مؤسسة الإمام زين العابدين · أسئلة عن الإمام السجاد عليه السلام · شروط مسابقة قبسات السجادية · جوائز مسابقة الإمام زين العابدين · تحميل كتاب قبسات من حياة الإمام السجاد
- **Canonical:** `/contests/qatuf-sajjadiyya-cultural-competition` · **OG:** website · `/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg`
- **Attach (server):** **edit** the existing `metadata` object in place.
- **Notes:** Fixes two real bugs in the current metadata — (1) the title appended “موقع الإمام زين العابدين” (duplicate brand + conflicts with template); (2) the description claimed **“50 سؤالاً”**, a count not stated on the page → removed. Original trim was 164 → **149** above.

### `/contests/qatuf-sajjadiyya-cultural-competition/participate` — المشاركة (NOINDEX)
- **Title:** `المشاركة في مسابقة قبسات من حياة الإمام السجاد`
- **Description (155):** صفحة المشاركة في مسابقة قبسات من حياة الإمام السجاد عليه السلام: أجب عن خمسين سؤالاً حول سيرة الإمام زين العابدين مستخرجة من كتاب المسابقة ثم أرسل إجاباتك.
- **Keywords:** مسابقة قبسات من حياة الإمام السجاد · المشاركة في مسابقة الإمام زين العابدين · أسئلة مسابقة الإمام السجاد · مسابقة ثقافية الإمام زين العابدين · اختبار سيرة الإمام السجاد · نموذج المشاركة في مسابقة قبسات · كتاب قبسات من حياة الإمام السجاد
- **Canonical:** `/contests/qatuf-sajjadiyya-cultural-competition/participate` · **OG:** website · landing.jpg
- **Attach (client):** new `layout.tsx` with **`robots: { index: false, follow: false }`**.
- **Notes:** Pure transactional quiz step — redirects to the contest page without a valid `attempt_id`, so it'd index as thin/broken content. The 50-question count is accurate here (questions.json has exactly 50). Metadata supplied for completeness but **noindex**.

### `/news` — الأخبار والأنشطة
- **Title:** `الأخبار والأنشطة`
- **Description (152):** تابعوا آخر أخبار وأنشطة مؤسسة الإمام زين العابدين عليه السلام: المجالس الحسينية والفعاليات والنشاطات الثقافية والإصدارات وأخبار العتبة الحسينية المقدسة.
- **Keywords:** أخبار مؤسسة الإمام زين العابدين · أنشطة مؤسسة الإمام زين العابدين · المجالس الحسينية · فعاليات ثقافية إسلامية · أخبار العتبة الحسينية المقدسة · مجالس عزاء محرم الحرام · نشاطات دينية كربلاء · العشرة السجادية الأولى · إصدارات الصحيفة السجادية
- **Canonical:** `/news` · **OG:** website · `/general/annual-majlis-third-day-imam-zain-alabidin-foundation-photo-coverage-15.jpg`
- **Attach (server):** `export const metadata` in the page.
- **Notes:** Category counts verified against `posts.json` (نشاطات 41 / العتبة 12 / مجالس 6 / فعاليات 5; 64 total).

### `/news/archives` — أرشيف الأخبار
- **Title:** `أرشيف الأخبار`
- **Description (150):** أرشيف أخبار مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات: تصفّح جميع النشاطات والفعاليات والمجالس وأخبار العتبة الحسينية مرتّبة حسب التصنيف.
- **Keywords:** أرشيف أخبار مؤسسة الإمام زين العابدين · أرشيف الأخبار · نشاطات مؤسسة الإمام زين العابدين · فعاليات مؤسسة الإمام زين العابدين · مجالس حسينية · أخبار العتبة الحسينية المقدسة · أخبار مؤسسة الإمام زين العابدين · تصنيف أخبار المؤسسة
- **Canonical:** `/news/archives` · **OG:** website · same branded asset as `/news`
- **Attach (server):** `export const metadata` in the page.

### `/his-life` — سيرة الإمام السجاد
- **Title:** `سيرة الإمام زين العابدين عليه السلام وتراثه`
- **Description (153):** سيرة الإمام علي بن الحسين زين العابدين السجاد عليه السلام: ولادته وألقابه وكناه، الأدلة على إمامته، كراماته، دوره في كربلاء، رسائله وخطبه ومواقفه ووفاته.
- **Keywords:** سيرة الإمام زين العابدين · سيرة علي بن الحسين السجاد · ولادة الإمام زين العابدين · ألقاب وكنى الإمام السجاد · الأدلة على إمامة علي بن الحسين · الإمام السجاد وكربلاء · كرامات الإمام زين العابدين · خطب ومواقف الإمام السجاد · وفاة الإمام زين العابدين · تراث الإمام السجاد عليه السلام
- **Canonical:** `/his-life` · **OG:** website · `/images/al-abid.jpg`
- **Attach (server):** `export const metadata` in `src/app/his-life/page.tsx`.
- **Notes:** Page renders no `<Image>` and root layout has no default OG → `al-abid.jpg` chosen as a thematically apt fallback (10 biography sections confirmed in `imamzain.json`).

### `/library` — المكتبة التخصصية
- **Title:** `المكتبة التخصصية لكتب الإمام زين العابدين`
- **Description (152):** تصفّح المكتبة التخصصية للإمام زين العابدين عليه السلام: شروح الصحيفة السجادية ورسالة الحقوق وما كُتب عن الإمام السجاد، مع البحث والفرز للقراءة والتحميل.
- **Keywords:** المكتبة التخصصية للإمام زين العابدين · كتب الإمام زين العابدين · شروح الصحيفة السجادية · كتب رسالة الحقوق · تحميل كتب الإمام السجاد · إصدارات مؤسسة الإمام زين العابدين · ما كُتب عن الإمام زين العابدين · قائمة كتب الإمام السجاد
- **Canonical:** `/library` · **OG:** ⚠️ **none** (book covers are per-record CDN URLs; no page hero)
- **Attach (server):** `export const metadata` in `src/app/library/page.tsx` (a client child doesn't block the parent's export).
- **Notes:** Strongly recommend a static `/public/og/library.jpg` so shares get a preview (ties to global fix #3).

### `/media/images` — معرض الصور
- **Title:** `معرض الصور`
- **Description (152):** معرض صور مؤسسة الإمام زين العابدين عليه السلام يضم صور النشاطات والندوات والمناسبات والمسابقات والأخبار من النجف وكربلاء وسامراء مع بحث وتصفية بالتصنيف.
- **Keywords:** معرض صور مؤسسة الإمام زين العابدين · صور نشاطات مؤسسة الإمام زين العابدين · ندوات ومؤتمرات مؤسسة الإمام زين العابدين · صور مناسبات أهل البيت في النجف · صور مسابقات قرآنية النجف الأشرف · أرشيف صور المؤسسة · صور فعاليات النجف وكربلاء وسامراء · معرض الوسائط المتعددة الإسلامي
- **Canonical:** `/media/images` · **OG:** website · `https://cdn.imamzain.org/news/imam-zain-alabideen-mu2tamar-elmi-rabe3-samarra.jpg`
- **Attach (client):** **new** `src/app/media/images/layout.tsx` (page delegates to a client tree; don't touch `media/template.tsx`).
- **Notes:** 384 images confirmed. `?category=` must not change canonical.

### `/media/videos` — معرض المرئيات
- **Title:** `معرض المرئيات والفيديو`
- **Description (157):** مرئيات مؤسسة الإمام زين العابدين عليه السلام: مجالس العزاء الحسينية وشروح الأدعية السجادية كدعاء مكارم الأخلاق وأبي حمزة الثمالي والملتقيات والبرامج العلمية.
- **Keywords:** مرئيات الإمام زين العابدين · مجالس العزاء الحسينية · شرح دعاء مكارم الأخلاق · دعاء أبي حمزة الثمالي · العشرة السجادية بشير الحسناوي · الملتقى التشاوري لخطباء المنبر الحسيني · برنامج ويجازي بالجليل · نفحات من حياة الإمام السجاد · محاضرات مؤسسة الإمام زين العابدين
- **Canonical:** `/media/videos` · **OG:** website · `https://cdn.imamzain.org/news/img.png`
- **Attach (server):** `export const metadata` in `src/app/media/videos/page.tsx` (it's a server module). **Do NOT** add a `layout.tsx` — it would leak this gallery title onto `[slug]` children.

### `/media/audio` — المكتبة الصوتية
- **Title:** `المكتبة الصوتية`
- **Description (157):** المكتبة الصوتية لمؤسسة الإمام زين العابدين عليه السلام: محاضرات ودروس وأدعية صوتية عن سيرة الإمام السجاد ورسالة الحقوق والصحيفة السجادية، استمع وحمّل مجانًا.
- **Keywords:** المكتبة الصوتية للإمام السجاد · محاضرات صوتية عن الإمام زين العابدين · أدعية الإمام السجاد صوتية · دروس الصحيفة السجادية · رسالة الحقوق صوتي · سيرة الإمام علي بن الحسين · محاضرات أهل البيت الصوتية · تحميل محاضرات دينية mp3
- **Canonical:** `/media/audio` · **OG:** website · `/images/al-abid.jpg`
- **Attach (client):** **new** `src/app/media/audio/layout.tsx`.
- **Notes:** 311 audio files; counts verified. 🐞 Pre-existing bug (not metadata): the page's breadcrumb points to `/audio` instead of `/media/audio` — worth a separate fix.

### `/publications` — إصدارات المؤسسة
- **Title:** `إصدارات المؤسسة وشروح الصحيفة السجادية`
- **Description (148):** تصفّح إصدارات مؤسسة الإمام زين العابدين عليه السلام: شروح الصحيفة السجادية، ودراسات رسالة الحقوق، وكتب في سيرة الإمام السجاد وتراثه الفكري والتربوي.
- **Keywords:** إصدارات الإمام زين العابدين · كتب الإمام السجاد عليه السلام · شروح الصحيفة السجادية · الفرائد الطريفة في شرح الصحيفة · فوائد رياض السالكين · دراسات رسالة الحقوق · سيرة الإمام السجاد عليه السلام · تراث الإمام السجاد الفكري والتربوي
- **Canonical:** `/publications` · **OG:** website · `/images/al-sahifa.jpg`
- **Attach (server):** `export const metadata` in `src/app/publications/page.tsx`.
- **Notes:** Verified against the 39-record “الإصدارات” set in `books.json`. ⚠️ child `/publications/[slug]` currently has **no** metadata → add `generateMetadata` (below) to avoid all book pages sharing this listing's title.

### `/research` — بوابة البحث العلمي
- **Title:** `بوابة البحث العلمي`
- **Description (153):** بوابة البحث العلمي: أرشيف بحوث المؤتمرات وبحوث التخرج والدوريات العربية المحكمة في تراث الإمام زين العابدين عليه السلام، مع مكافآت مالية للبحوث المتميزة.
- **Keywords:** بوابة البحث العلمي · أرشيف البحوث العلمية · بحوث المؤتمرات العلمية · بحوث التخرج بكالوريوس وماجستير ودكتوراه · الدوريات العربية المحكمة · نشر البحوث العلمية · مكافآت البحوث العلمية · بحوث تراث الإمام زين العابدين · المؤسسة العلمية للإمام السجاد
- **Canonical:** `/research` · **OG:** website · `/images/imam-legacy-bg-bricks.jpg`
- **Attach (client):** **new** `src/app/research/layout.tsx`.
- **Notes:** ⚠️ A layout here is inherited by `/research/scientific-platform` and `/research/send-research` unless each defines its own. Both do (below), so inheritance is safe.

### `/research/scientific-platform` — المنصة العلمية
- **Title:** `المنصة العلمية للبحوث`
- **Description (159):** أرشيف بحثي يضم بحوث المؤتمرات وبحوث تخرّج البكالوريوس والماجستير والدكتوراه والدوريات العربية حول الإمام زين العابدين عليه السلام، مع بحث وتصفية وتحميل البحوث.
- **Keywords:** المنصة العلمية للبحوث · بحوث المؤتمرات عن الإمام زين العابدين · بحوث تخرج عن الصحيفة السجادية · رسائل ماجستير ودكتوراه عن الإمام السجاد · الدوريات العربية عن الإمام زين العابدين · أرشيف البحوث العلمية · بحوث الإمام علي بن الحسين عليه السلام · تحميل بحوث الصحيفة السجادية
- **Canonical:** `/research/scientific-platform` · **OG:** website · `/images/imam-legacy-bg-bricks.jpg`
- **Attach (client):** **new** `src/app/research/scientific-platform/layout.tsx`.
- **Notes:** Default tab is theses (`student-research`). Dataset counts (65/132/842) deliberately omitted from copy (not shown as on-page claims). `?type=`/search/sort params must not change canonical.

### `/research/send-research` — آلية تقديم البحوث
- **Title:** `آلية تقديم البحوث وضوابط النشر والتحكيم`
- **Description (152):** دليل تقديم البحوث والكتب إلى مؤسسة الإمام زين العابدين عليه السلام: الضوابط العامة والمواصفات الفنية وشروط النشر والملكية الفكرية والتحكيم وطرق الإرسال.
- **Keywords:** آلية تقديم البحوث · ضوابط نشر البحوث العلمية · شروط النشر والملكية الفكرية · المواصفات الفنية للبحث · تحكيم البحوث العلمية · إقرار الباحث وتعهده · تقديم بحث للمؤسسة · الاستكتاب والبحث العلمي · مواصفات كتابة البحث العلمي
- **Canonical:** `/research/send-research` · **OG:** ⚠️ **none** (recommend the global default card)
- **Attach (server):** `export const metadata` in the page. **Keep indexed** (substantive guide, not a form). Original trim 166 → **152** above.
- **Notes:** 🐞 Pre-existing: the declaration PDF link `href="/research/تعهد الباحث.pdf"` points to a file not present in `/public/research/` → verify it's deployed. Minor H1 typos (“أرسال”/“الأقرار”).

### `/services` — تواصل معنا
- **Title:** `تواصل معنا`
- **Description (145):** تواصل مع مؤسسة الإمام زين العابدين عليه السلام في النجف الأشرف عبر العنوان والبريد والهاتف وساعات العمل، أو أرسل رسالتك مباشرة عبر نموذج التواصل.
- **Keywords:** تواصل مع مؤسسة الإمام زين العابدين · اتصل بنا مؤسسة الإمام زين العابدين · عنوان مؤسسة الإمام زين العابدين النجف الأشرف · بريد مؤسسة الإمام زين العابدين الإلكتروني · رقم هاتف مؤسسة الإمام زين العابدين · ساعات عمل مؤسسة الإمام زين العابدين · نموذج تواصل مع المؤسسة · إرسال رسالة إلى مؤسسة الإمام زين العابدين
- **Canonical:** `/services` · **OG:** website · `/images/logo.png`
- **Attach (client):** **new** `src/app/services/layout.tsx`.
- **Notes:** ⚠️ A `/services` layout also wraps `/services/stores` (a different page). Give `/services/stores` its own metadata (below) so the contact copy doesn't leak there. Original trim 166 → **145**.

### `/services/stores` — نقاط البيع المباشر
- **Title:** `نقاط البيع المباشر`
- **Description (154):** نقاط البيع المباشر لإصدارات مؤسسة الإمام زين العابدين عليه السلام في النجف الأشرف وكربلاء المقدسة، مع العناوين وأرقام الهواتف ومواقع الخرائط للوصول إليها.
- **Keywords:** نقاط البيع المباشر · منافذ بيع كتب مؤسسة الإمام زين العابدين · معرض الكتاب الدائم النجف · معرض الكتاب الدائم كربلاء · أماكن شراء إصدارات الصحيفة السجادية · المقر الرئيسي مؤسسة الإمام زين العابدين · دار البذرة للطباعة والنشر · عناوين وأرقام هواتف منافذ البيع
- **Canonical:** `/services/stores` · **OG:** website · `/images/logo.png`
- **Attach (client):** **new** `src/app/services/stores/layout.tsx`.

### `/visitation` — زيارة نيابيّة
- **Title:** `زيارة الإمام زين العابدين وأئمة البقيع نيابةً عنك`
- **Description (142):** سجّل اسمك لتُؤدّى زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام نيابةً عنك عند قبورهم الطاهرة في البقيع، مع نص الزيارة الشريفة المأثورة.
- **Keywords:** زيارة الإمام زين العابدين · زيارة أئمة البقيع · زيارة نيابية عن الميت · الزيارة نيابةً عن · نص زيارة الإمام السجاد · السلام عليك يا زين العابدين · تسجيل زيارة نيابية · زيارة قبور أئمة البقيع
- **Canonical:** `/visitation` · **OG:** website · `/images/ziara-imamzain-web.jpg`
- **Attach (client):** **new** `src/app/visitation/layout.tsx`.
- **Notes:** Stats numbers (25/4958/4983) are hard-coded placeholders → deliberately excluded from copy.

### `/baqi-gathering` — ملتقى البقيع الثاني
- **Title:** `ملتقى البقيع الثاني: البقيع الهوية والتاريخ`
- **Description (152):** ملتقى البقيع الثاني تحت شعار «البقيع: الهوية والتاريخ» في 12 شوال 1446هـ، يناقش هدم قبور أئمة البقيع وأبعاده الفكرية والتاريخية، مع محاضرات وجدول أعمال.
- **Keywords:** ملتقى البقيع الثاني · البقيع الهوية والتاريخ · هدم قبور البقيع · أئمة البقيع من أهل البيت · ذكرى هدم البقيع · مؤسسة الإمام زين العابدين · محاضرات ملتقى البقيع · البقيع الرمزية الدينية والتاريخية
- **Canonical:** `/baqi-gathering` · **OG:** **article** · `/baqi-gathering/albagi.jpg`
- **Attach (server):** `export const metadata` in the page. Original trim 165 → **152**.
- **Notes:** Event date 12 Shawwal 1446 (the demolition anniversary it commemorates is 8 Shawwal — copy uses the event date + “ذكرى هدم البقيع” to avoid ambiguity). Chose ASCII `albagi.jpg` over the Arabic-named logo PNG for OG safety.

### `/application` — تطبيق أنوار سجادية
- **Title:** `تطبيق أنوار سجادية – الموسوعة المتكاملة عن الإمام السجاد`
- **Description (155):** تطبيق أنوار سجادية للجوال: موسوعة متكاملة عن الإمام زين العابدين (ع) تضم الصحيفة السجادية ورسالة الحقوق والمسند والزيارات. حمّله من App Store وGoogle Play.
- **Keywords:** تطبيق أنوار سجادية · تحميل تطبيق أنوار سجادية · موسوعة الإمام زين العابدين · تطبيق الصحيفة السجادية · رسالة الحقوق · مسند الإمام زين العابدين · زيارات الإمام السجاد · تطبيق الإمام السجاد للجوال
- **Canonical:** `/application` · **OG:** website · `/application/main-bg.jpg`
- **Attach (server):** **edit** existing `metadata` — keep title/description/keywords, add canonical + OpenGraph + Twitter.
- **Notes:** Fixed spelling to match the H1 (`أنوار سجادية`, not `الانوار السجادية`). A purpose-built OG card from the app screenshots (`01.png`/`02.png`) would improve previews.

---

## 3. Dynamic templates — `generateMetadata` designs

These produce **per-item** metadata at runtime. Below: the title/description shape + exact field mapping. (Descriptions are clamped to ≤160 at runtime.)

> **OG image (all dynamic templates):** use the forward-compatible chain `record.ogImage ?? <content image> ?? "/og/default.jpg"`. Today `record.ogImage` is undefined (local JSON), so it falls back to the content image (`post.image` / `book.image` / `video.thumbnail`); once the API ships dedicated OG fields, the metadata upgrades automatically with no code change. The `<content image>` paths below are the current fallback.

### `/news/[slug]` — news article
- **Title:** `post.title` (brand auto-appended)
- **Description:** `post.summary` **if** `post.summary.trim().length >= 60`, else strip HTML from `post.content` (`replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()`) truncated to ~155 on a word boundary. *(The ≥60 gate is mandatory — at least one post has an empty summary and several are tiny/poetry.)*
- **Keywords:** `[...baseNewsKeywords, post.category]`
- **Canonical:** `/news/${slug}` · **OG:** **article**, `images:[post.image]`, `publishedTime:post.date`, `modifiedTime:post.last_update`
- **Attach:** `generateMetadata` in `src/app/(activities)/news/[slug]/page.tsx`.
- 🐞 **Must-fix guard:** the page does `data.filter(...)[0]` with **no not-found guard** → an unknown slug crashes on `post.title`. Add `notFound()` in the page and a fallback in `generateMetadata`.
- 🚩 In-body Facebook/Twitter share links use the **www** host while canonical uses non-www — normalize to non-www.

### `/his-life/[slug]` — biography section
- **Title:** `section.title` (optionally framed as `… في سيرة الإمام السجاد (عليه السلام)`; keep short for SERP)
- **Description:** strip HTML from `section.content`, collapse whitespace, slice to ~157 + `…` (per-section → unique, avoids duplicates across the 10 sections).
- **Keywords:** base biography phrases (optionally prepend `section.title`).
- **Canonical:** `/his-life/${slug}` · **OG:** **article**, `/images/logo.png` (type has no image field)
- **Attach:** `generateMetadata` in `src/app/his-life/[slug]/page.tsx`; fallback for unknown slug → `robots:{index:false}`. Optionally `generateStaticParams` for the 10 slugs.

### `/library/books/[bookSlug]` — book detail
- **Title:** `` `${book.title}${partSuffix} — ${book.author}` `` where `partSuffix = (book.totalParts>1 && book.partNumber) ? \` (الجزء ${book.partNumber})\` : ""` (disambiguates multi-part series, e.g. لمحات من رسالة الحقوق parts 12–16).
- **Description:** synthesized — `` `${book.title} للمؤلف ${book.author} ضمن المكتبة التخصصية لمؤسسة الإمام زين العابدين (ع): تفاصيل الكتاب وعدد صفحاته وداره وإمكانية تنزيله بصيغة PDF.` `` (clamp ≤160; `book.description` is empty in every record).
- **Keywords:** dedup of `[book.title, book.author, \`تحميل ${book.title} PDF\`, "كتب عن الإمام زين العابدين", "المكتبة التخصصية للإمام السجاد", "كتب الصحيفة السجادية", "كتب رسالة الحقوق", ...categories]`, cap 8–9.
- **Canonical:** `/library/books/${book.slug}` · **OG:** **article**, `encodeImageUrl(book.image)`
- **Attach:** `generateMetadata` in the page.
- ⚠️ **Data normalization (verified mismatches):** `book.language` is sometimes an array (id 1 = `["العربية"]`) and `book.category` is an array — normalize with `Array.isArray()` before use. Record id 8 is fully English — pass through literally.
- 🔧 **Reuse `encodeImageUrl`** (private const in `src/components/book-card.tsx`) — extract to `src/lib/encodeImageUrl.ts` and import in both places so cover URLs (Arabic/spaces/parentheses) are encoded consistently.

### `/library/[collectionSlug]/[dictionarySlug]` — dictionary index
- **Title:** `${activeDictionary.title} — ${collection.title}`
- **Description:** `` `فهرس موضوعات «${activeDictionary.title}» من ${collection.title} للإمام زين العابدين عليه السلام، مع روابط مباشرة لكل قسم للوصول السريع إلى نصوصه.` `` (clamp ≤160).
- **Keywords:** collection-aware base (Sahifa vs Risalat al-Huquq).
- **Canonical:** `/library/${collectionSlug}/${dictionarySlug}` · **OG:** website, `collectionSlug === "al-sahifa" ? "/images/al-sahifa.jpg" : "/images/risalat-al-huqoq.jpg"`
- **Attach:** `generateMetadata` in the page; guard `if (!collection || !activeDictionary) return {}` (mirrors layout `notFound()`).
- **Notes:** Near-duplicate risk across the 14 index pages → keeping `activeDictionary.title` in both title and description makes each unique. Keep indexed (real content lives in `[subjectSlug]`).

### `/library/[collectionSlug]/[dictionarySlug]/[subjectSlug]` — subject (the prime content)
- **Title:** `${subjectTitleShort} - ${collection.title}` (truncate `subject.title` to ~50 chars in `<title>` only; full text stays in H1 + ogTitle). *Use `collection.title` for the suffix, not dictionary.title (cleaner/more searchable).*
- **Description:** `` `${subject.title} من ${collection.title} للإمام زين العابدين عليه السلام، نصٌّ كاملٌ بالتشكيل مع شروحٍ مختارةٍ وتنقّلٍ سلسٍ بين المواضيع.` `` (clamp ≤160).
- **Keywords:** base + collection-specialized (al-sahifa → `الصحيفة السجادية كاملة`, `أدعية الإمام السجاد`; risalat → `رسالة الحقوق`, `حقوق الإنسان في الإسلام`).
- **Canonical:** `/library/${collectionSlug}/${dictionarySlug}/${subjectSlug}` · **OG:** **article**, collection image
- **Attach:** `generateMetadata` in the page; guard `if (!collection || !subject) return {}`.
- **Notes:** Removed an inaccurate “search” claim (no on-page search box). Content is vocalized scripture — the prime search target; keep indexed.

### `/publications/[slug]` — publication (maps to `books.json`)
- **Title:** `` `${book.title}${partSuffix} — ${book.author}` `` (same series disambiguation as library books).
- **Description:** `` `حمّل كتاب «${book.title}» تأليف ${book.author} بصيغة PDF مجاناً، من إصدارات مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات، مع تفاصيل الطبعة.` `` (clamp ≤160).
- **Keywords:** `[\`تحميل ${book.title} PDF\`, \`كتاب ${book.title}\`, book.author, "إصدارات مؤسسة الإمام زين العابدين", "تحميل كتب عن الإمام السجاد عليه السلام", "تحميل كتب إسلامية PDF مجاناً", "مكتبة الإمام زين العابدين", ...(book.category ?? [])]`
- **Canonical:** `/publications/${slug}` · **OG:** **article**, `encodeImageUrl(book.image)`; **omit images when empty** (do **not** use `/placeholder-book.png` — that file is absent; the real placeholder is `/images/placeholder.jpg`).
- **Attach:** `generateMetadata` in `src/app/publications/[slug]/page.tsx` (currently missing entirely).

### `/media/videos/[slug]` — video detail *(recovered manually)*
- **Title:** `video.title` (truncate to ~60 for `<title>`; brand auto-appended)
- **Description:** `video.desc` **if** `video.desc.trim().length >= 60`, else fallback `` `شاهد «${video.title}» ضمن مرئيات مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات، مع فيديوهات ذات صلة.` `` (clamp ≤160). *(Most records have an empty `desc`, so the fallback is the primary path.)*
- **Keywords:** `["مرئيات الإمام زين العابدين", "فيديوهات الإمام السجاد", "مجالس حسينية مرئية", "محاضرات مؤسسة الإمام زين العابدين", video.title]`
- **Canonical:** `/media/videos/${slug}` · **OG:** **video.other**, `images:[video.thumbnail]` (local `/general/*.png`)
- **Attach:** `generateMetadata` in `src/app/media/videos/[slug]/page.tsx` (async server component).
- 🐞 **Must-fix guard:** the lookup `playlists.filter(p => p.videos.filter(...)[0])[0].videos` **crashes** on an unknown slug (no guard). Add `notFound()` in the page and a fallback in `generateMetadata`.

---

## 4. Code/asset issues found while scanning (bonus, not metadata)

These surfaced during the content audit — worth separate fixes:

1. 🚩 **www/non-www split** — `sitemap.ts` `BASE_URL` is www; everything else is non-www. Pick one (recommend non-www) for consistent ranking signals.
2. 🐞 **Not-found crashes** — `/news/[slug]` and `/media/videos/[slug]` both dereference a possibly-undefined record with no guard. Add `notFound()`.
3. 🐞 **Missing PDF asset** — `/research/send-research` links `"/research/تعهد الباحث.pdf"`; `/public/research/` doesn't exist in the repo. Verify deployment + URL-encode the Arabic filename.
4. 🐞 **Wrong breadcrumb path** — `/media/audio` breadcrumb links to `/audio` instead of `/media/audio`.
5. 🔧 **`encodeImageUrl` duplication** — extract from `book-card.tsx` to a shared lib so server `generateMetadata` and the client card encode CDN cover URLs identically.
6. 🟡 **Type drift** — `Book.language` is typed `string` but sometimes stored as an array; normalize before rendering/metadata.
7. 🟡 **No default OG image** — add a global `1200×630` card (global fix #3) so `/library`, `/research/send-research`, etc. get share previews.

---

## 5. Status & next steps

**Decisions (locked):** ✅ non-www · ✅ default OG image · ⏸️ dynamic templates **deferred until the API (with OG fields) settles**.

**In progress — branch `feat/seo-metadata-static-pages`:**
1. Site-wide: `sitemap.ts` → non-www; root layout `openGraph.images` default (`/og/default.jpg`).
2. All 25 static pages: server `export const metadata` + new client `layout.tsx` files (with inheritance/noindex handling per page).

**Deferred (separate PR, after API):**
- §3 dynamic `generateMetadata` templates — built with the `record.ogImage ?? content image ?? /og/default.jpg` chain so they consume the API's OG fields when ready.
- Optional bonus code/asset fixes in §4 (not-found guards, missing PDF, breadcrumb, `encodeImageUrl` extraction, type drift).
