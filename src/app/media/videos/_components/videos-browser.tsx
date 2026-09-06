"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumbs from "@/components/breadcrumb";
import type { YouTubeGroup, YouTubeVideo } from "@/types/youtube-data";
import {
  getGroupSlug,
  getLatestVideoPerGroup,
  flattenLatestVideos,
  parseArabicDate,
} from "@/lib/youtube";
import VideoPlayer from "./video-player";
import EpisodesList from "./episodes-list";
import VideoCard from "./video-card";
import VideosSidebar from "./sidebar";
import FilterBar from "./filter-bar";

type SortOrder = "newest" | "oldest";

// عدد قليل ومقصود — قسم "أحدث الفيديوهات" (بدون بحث) يعرض فيديو وحد
// يمثل كل قائمة (سواء قائمة فيها حلقة وحدة أو سلسلة كاملة)، مو كل حلقة
const LATEST_VIDEOS_LIMIT = 6;

// أثناء البحث نفتش بكل حلقة بكل مجموعة (مو تمثيل وحد لكل مجموعة)، فنسمح
// بعدد نتائج أكبر — الهدف "لگيت الفيديو اللي أدور عليه" مو استعراض مختصر
const SEARCH_RESULTS_LIMIT = 18;

// عدد النتائج بالقائمة العائمة تحت صندوق البحث (تختار منها مباشرة) —
// قليل ومقصود، حتى القائمة ما تطول وتغطي المشغل بالكامل
const DROPDOWN_RESULTS_LIMIT = 8;

export default function VideosBrowser({
  groups,
  initialVideoSlug,
}: {
  groups: YouTubeGroup[];
  initialVideoSlug?: string;
}) {
  const router = useRouter();

  // ملاحظة: ماكو داعي نخلي سلق المجموعة/الفيديو state معقّد — الصفحة
  // الأب تعيد إنشاء هذا الكومبوننت من الصفر بـ key مختلف كل ما يتغير
  // السلق بالرابط (شوف page.tsx و [slug]/page.tsx)، فما يصير خلط بين
  // فيديو ومجموعة غلط، وما نحتاج useEffect نزامن فيه الـ state لاحقًا
  const currentGroup =
    groups.find((group) =>
      initialVideoSlug
        ? group.videos.some((video) => video.slug === initialVideoSlug)
        : false,
    ) ?? groups[0];

  const currentVideoSlug = initialVideoSlug ?? currentGroup?.videos[0]?.slug;

  const [search, setSearch] = useState("");
  const [sortOrder] = useState<SortOrder>("newest");

  const currentVideo =
    currentGroup?.videos.find((v) => v.slug === currentVideoSlug) ??
    currentGroup?.videos[0];

  // هذا الكومبوننت يتبنى من جديد بالكامل كل ما تدخل فيديو/مجموعة جديدة
  // من صفحة ثانية (شوف key بـ page.tsx و [slug]/page.tsx). نضمن هنا إنه
  // دايمًا يبدأ من فوق الصفحة (استقرار على المشغل) عند دخول فيديو أو
  // مجموعة جديدة — بدون هذا، المتصفح ممكن يحافظ على آخر موقع سكرول كان
  // عليه بالصفحة السابقة (خصوصًا لو الصفحة الجديدة أقصر)، فيبين وكأنه
  // "نزل" لتحت الصفحة تلقائيًا. useLayoutEffect يشتغل قبل ما المتصفح
  // يرسم الشاشة، فالمستخدم أبدًا ما يشوف الوضع الغلط قبل ما نصححه.
  // نصفّر كل مصادر السكرول الممكنة (window + html + body) لضمان التوافق
  // بين المتصفحات المختلفة
  useLayoutEffect(() => {
    if (window.location.hash === "#series") return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // تبديل الحلقة عبر Next حتى يتحدث الرابط ومحتوى الصفحة والـ metadata معًا.
  // scroll: false يحافظ على موضع المستخدم داخل الصفحة.
  const handleEpisodeSelect = (slug: string) => {
    router.replace(`/media/videos/${slug}`, { scroll: false });
  };

  // اختيار مباشر من القائمة العائمة تحت صندوق البحث:
  // - نفس المجموعة الحالية → تبديل فوري بالـ state (زي اختيار حلقة)
  // - مجموعة ثانية → تنقل حقيقي (مخزّن بالـ ISR، رخيص) لأن currentGroup
  //   ثابتة طول عمر هذا الكومبوننت (شوف الملاحظة فوق). scroll: false
  const handleSearchSelect = (video: YouTubeVideo) => {
    if (currentGroup?.videos.some((item) => item.slug === video.slug)) {
      handleEpisodeSelect(video.slug);
    } else {
      router.push(`/media/videos/${video.slug}`, { scroll: false });
    }
    setSearch("");
  };

  // مجموعات فيها أكثر من حلقة = "برامج وسلاسل" فعلية (مستنتجة من الداتا
  // نفسها، بدون حقل تصنيف إضافي)
  const seriesGroups = useMemo(
    () => groups.filter((g) => g.videos.length > 1),
    [groups],
  );

  const searchTerm = search.trim();

  // نتائج القائمة العائمة: تفتش بكل حلقة بكل مجموعة (حتى حلقات المجموعة
  // المفتوحة حاليًا)، حتى تختار مباشرة من أي مكان بالموقع
  const dropdownResults = useMemo(() => {
    if (!searchTerm) return [];
    return flattenLatestVideos(groups)
      .filter(({ video }) => video.title.includes(searchTerm))
      .slice(0, DROPDOWN_RESULTS_LIMIT);
  }, [groups, searchTerm]);

  const latestVideos = useMemo(() => {
    const currentGroupVideoSlugs = new Set(
      currentGroup?.videos.map((video) => video.slug),
    );

    // بلا بحث: فيديو وحد يمثل كل مجموعة (نفس السلوك الأصلي، عرض مختصر)
    // مع بحث: كل حلقة بكل مجموعة — وإلا الحلقات الوسطى بالسلاسل ما
    // كانت تنلگى أبدًا (كانت تنفلتر بس فوق أحدث حلقة من كل مجموعة)
    const source = searchTerm
      ? flattenLatestVideos(groups)
      : getLatestVideoPerGroup(groups);

    const withoutCurrentGroup = source.filter(
      ({ video }) => !currentGroupVideoSlugs.has(video.slug),
    );

    const searched = searchTerm
      ? withoutCurrentGroup.filter(({ video }) =>
          video.title.includes(searchTerm),
        )
      : withoutCurrentGroup;

    const sorted = [...searched].sort((a, b) => {
      const diff =
        parseArabicDate(b.video.date) - parseArabicDate(a.video.date);
      return sortOrder === "newest" ? diff : -diff;
    });

    return sorted.slice(
      0,
      searchTerm ? SEARCH_RESULTS_LIMIT : LATEST_VIDEOS_LIMIT,
    );
  }, [groups, currentGroup, searchTerm, sortOrder]);

  if (!currentGroup || !currentVideo) {
    return (
      <div className="container py-20 text-center text-white">
        لا توجد فيديوهات متاحة حاليًا.
      </div>
    );
  }

  return (
    <div className="container pb-32 pt-6">
      <Breadcrumbs
        className="text-white mb-6"
        dotColor="bg-secondary"
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المرئيات", url: "/media/videos" },
          { name: currentGroup.title, url: "#" },
        ]}
      />

      <h1 className="text-white font-bold text-xl md:text-2xl mb-1">
        الفيديوهات
      </h1>
      <p className="text-slate-400 text-sm mb-6">
        مكتبة تضم المحاضرات والبرامج والندوات الخاصة بالإمام زين العابدين عليه
        السلام
      </p>

      {/* المحتوى الرئيسي أول شي بالـ DOM (= يمين الصفحة بلغة RTL)،
			    والسايدبار بعده (= يسار الصفحة) */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 xl:gap-8 items-start">
        <div className="min-w-0  rounded-2xl p-4 lg:p-5">
          <FilterBar
            search={search}
            onSearchChange={setSearch}
            results={dropdownResults}
            onSelectResult={handleSearchSelect}
          />
          <VideoPlayer key={currentVideo.slug} video={currentVideo} />
        </div>
        <div className=" rounded-2xl p-5 lg:p-6">
          <VideosSidebar seriesGroups={seriesGroups} />
        </div>
      </div>

      {/* من هنا تنزل، الأقسام تاخذ عرض الصفحة كامل */}
      <div className="mt-12  rounded-2xl p-4 lg:p-6">
        <EpisodesList
          videos={currentGroup.videos}
          currentSlug={currentVideo.slug}
          onSelect={handleEpisodeSelect}
        />
      </div>

      <div className="mt-12">
        <h2 className="text-white font-bold text-lg mb-4">
          {searchTerm ? `نتائج البحث عن "${searchTerm}"` : "أحدث الفيديوهات"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {latestVideos.map(({ video }) => (
            // الرابط يستخدم سلق الفيديو نفسه (مو سلق المجموعة)، حتى
            // الضغط يودي بالضبط لهذا الفيديو المعروض بالكارد
            <VideoCard
              key={video.slug}
              video={video}
              href={`/media/videos/${video.slug}`}
            />
          ))}
          {latestVideos.length === 0 && (
            <p className="text-slate-500 text-sm col-span-full">
              ماكو نتائج مطابقة لبحثك.
            </p>
          )}
        </div>
      </div>

      {seriesGroups.length > 0 && (
        <div id="series" className="mt-16 scroll-mt-24">
          <h2 className="text-white font-bold text-lg mb-4">
            البرامج والسلاسل
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {seriesGroups.map((group) => (
              <VideoCard
                key={group.id}
                video={group.videos[0]}
                href={`/media/videos/${getGroupSlug(group)}`}
                episodeCount={group.videos.length}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
