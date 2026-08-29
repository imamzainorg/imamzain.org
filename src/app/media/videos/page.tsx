import type { Metadata } from "next"
import { dataFetcher } from "@/lib/dataFetcher"
import type { YouTubeGroup } from "@/types/youtube-data"
import { getGroupSlug, sortGroupsByLatest } from "@/lib/youtube"
import VideosBrowser from "./_components/videos-browser"

export const revalidate = 300

export const metadata: Metadata = {
	title: "معرض المرئيات والفيديو",
	description:
		"مرئيات مؤسسة الإمام زين العابدين عليه السلام: مجالس العزاء الحسينية وشروح الأدعية السجادية كدعاء مكارم الأخلاق وأبي حمزة الثمالي والملتقيات والبرامج العلمية.",
	keywords: [
		"مرئيات الإمام زين العابدين",
		"مجالس العزاء الحسينية",
		"شرح دعاء مكارم الأخلاق",
		"دعاء أبي حمزة الثمالي",
		"العشرة السجادية بشير الحسناوي",
		"الملتقى التشاوري لخطباء المنبر الحسيني",
		"برنامج ويجازي بالجليل",
		"نفحات من حياة الإمام السجاد",
		"محاضرات مؤسسة الإمام زين العابدين",
	],
	alternates: { canonical: "/media/videos" },
	openGraph: {
		title: "معرض المرئيات والفيديو | مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"قوائم تشغيل مرئية تضم مجالس العزاء الحسينية وشروح الأدعية السجادية والملتقيات والبرامج العلمية لمؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات.",
		url: "/media/videos",
		type: "website",
		images: ["https://cdn.imamzain.org/news/img.png"],
	},
	twitter: {
		card: "summary_large_image",
		title: "معرض المرئيات والفيديو | مؤسسة الإمام زين العابدين عليه السلام",
		description:
			"قوائم تشغيل مرئية تضم مجالس العزاء الحسينية وشروح الأدعية السجادية والملتقيات والبرامج العلمية لمؤسسة الإمام زين العابدين عليه السلام.",
		images: ["https://cdn.imamzain.org/news/img.png"],
	},
}

export default async function VideosPage() {
	const groups = await dataFetcher<YouTubeGroup[]>("youtube.json")

	// نفس منطق الكود القديم: "internal" أو "both" فقط يظهرن بمعرض /videos
	// (المجموعات المعلّمة "home" مخصصة للصفحة الرئيسية فقط، بس تظل قابلة
	// للوصول مباشرة عبر رابطها الخاص لو حد وصلها من مكان ثاني)
	const galleryGroups = sortGroupsByLatest(
		groups.filter(
			(g) =>
				(g.displayLocation === "internal" || g.displayLocation === "both") &&
				g.videos.length > 0,
		),
	)

	const initialGroup = galleryGroups[0] ?? null

	return (
		<VideosBrowser
			key={initialGroup ? getGroupSlug(initialGroup) : "root"}
			groups={galleryGroups}
			initialGroupSlug={initialGroup ? getGroupSlug(initialGroup) : null}
		/>
	)
}
