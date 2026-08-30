import type { Metadata } from "next"
import playlistsData from "@/data/youtube.json" with { type: "json" }
import VideosClient from "./_components/videos-client"
import type { YouTubePlaylist } from "./_components/videos-client"

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

// Slim youtube.json down to the playlists and fields the page renders, so
// the dataset stays out of the client bundle.
const internalPlaylists: YouTubePlaylist[] = playlistsData
	.filter(
		(playlist) =>
			(playlist.displayLocation === "internal" ||
				playlist.displayLocation === "both") &&
			playlist.videos.length > 0,
	)
	.map((playlist) => ({
		url: playlist.url,
		title: playlist.title,
		videos: playlist.videos.map((video) => ({
			title: video.title,
			url: video.url,
			thumbnail: video.thumbnail,
		})),
	}))

export default function Page() {
	return <VideosClient playlists={internalPlaylists} />
}
