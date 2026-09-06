import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataFetcher } from "@/lib/dataFetcher";
import type { YouTubeGroup, YouTubeVideo } from "@/types/youtube-data";
import { findGroupBySlug, getGroupSlug, thumbnailUrl } from "@/lib/youtube";
import VideosBrowser from "../_components/videos-browser";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

// يدور عن الفيديو بكل المجموعات — رابط الفيديو يعتمد على video.slug
// مو سلق المجموعة، فلازم نفتش بكل الحلقات مو بس أول حلقة بكل مجموعة
function findVideoBySlug(
  groups: YouTubeGroup[],
  slug: string,
): { group: YouTubeGroup; video: YouTubeVideo } | null {
  for (const group of groups) {
    const video = group.videos.find((item) => item.slug === slug);
    if (video) return { group, video };
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const groups = await dataFetcher<YouTubeGroup[]>("youtube.json");

  // أولاً: الرابط ممكن يطابق فيديو معين (الحالة الأشيع)
  const videoResult = findVideoBySlug(groups, slug);
  if (videoResult) {
    const { video } = videoResult;
    const canonicalUrl = `/media/videos/${video.slug}`;

    return {
      title: `${video.title} | معرض المرئيات`,
      description: video.desc,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: video.title,
        description: video.desc,
        url: canonicalUrl,
        type: "video.other",
        images: [thumbnailUrl(video.thumbnail)],
      },
      twitter: {
        card: "summary_large_image",
        title: video.title,
        description: video.desc,
        images: [thumbnailUrl(video.thumbnail)],
      },
    };
  }

  // ثانيًا: الرابط ممكن يطابق سلق مجموعة (روابط السلاسل بالسايدبار)
  const group = findGroupBySlug(groups, slug);
  if (group && group.videos.length > 0) {
    const video = group.videos[0];
    const canonicalUrl = `/media/videos/${getGroupSlug(group)}`;

    return {
      title: `${group.title} | معرض المرئيات`,
      description: video.desc,
      alternates: { canonical: canonicalUrl },
      openGraph: {
        title: group.title,
        description: video.desc,
        url: canonicalUrl,
        type: "video.other",
        images: [thumbnailUrl(video.thumbnail)],
      },
    };
  }

  return {};
}

export default async function VideoGroupPage({ params }: Props) {
  const { slug } = await params;
  const groups = await dataFetcher<YouTubeGroup[]>("youtube.json");

  // نحاول نطابق فيديو أولاً، وإذا ما انطابق نجرب سلق مجموعة
  const videoResult = findVideoBySlug(groups, slug);
  const group = videoResult ? videoResult.group : findGroupBySlug(groups, slug);

  if (!group || group.videos.length === 0) notFound();

  const initialVideoSlug = videoResult
    ? videoResult.video.slug
    : group.videos[0].slug;

  // نفس مجموعة "المعرض" اللي تظهر بالصفحة الرئيسية، حتى المستخدم يوصل
  // لكل الفيديوهات وهو واصل من رابط حلقة معينة — مو محبوس بصفحة معزولة
  const galleryGroups = groups.filter(
    (g) =>
      (g.displayLocation === "internal" || g.displayLocation === "both") &&
      g.videos.length > 0,
  );

  // إذا وصل حد لرابط مجموعة معلّمة "home" مباشرة (من الصفحة الرئيسية
  // مثلاً)، نضيفها بالقائمة يدويًا حتى ما يفتح على صفحة فاضية رغم إنها
  // مستثناة من معرض /videos العام
  const groupsForBrowser = galleryGroups.some((g) => g.id === group.id)
    ? galleryGroups
    : [group, ...galleryGroups];

  return (
    <VideosBrowser
      key={`${group.id}-${initialVideoSlug}`}
      groups={groupsForBrowser}
      initialVideoSlug={initialVideoSlug}
    />
  );
}
