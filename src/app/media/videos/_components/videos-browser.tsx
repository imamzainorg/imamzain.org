"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Breadcrumbs from "@/components/breadcrumb"
import type { YouTubeGroup, YouTubeVideo } from "@/types/youtube-data"
import {
	getGroupSlug,
	getLatestVideoPerGroup,
	flattenLatestVideos,
	parseArabicDate,
	filterGroupsByCategory,
	videoMatchesCategory,
} from "@/lib/youtube"
import VideoPlayer from "./video-player"
import EpisodesList from "./episodes-list"
import VideoCard from "./video-card"
import VideosSidebar from "./sidebar"
import FilterBar from "./filter-bar"

type SortOrder = "newest" | "oldest"

// عدد قليل ومقصود — قسم "أحدث الفيديوهات" (بدون بحث) يعرض فيديو وحد
// يمثل كل قائمة (سواء قائمة فيها حلقة وحدة أو سلسلة كاملة)، مو كل حلقة
const LATEST_VIDEOS_LIMIT = 6

// أثناء البحث نفتش بكل حلقة بكل مجموعة (مو تمثيل وحد لكل مجموعة)، فنسمح
// بعدد نتائج أكبر — الهدف "لگيت الفيديو اللي أدور عليه" مو استعراض مختصر
const SEARCH_RESULTS_LIMIT = 18

// عدد النتائج بالقائمة العائمة تحت صندوق البحث (تختار منها مباشرة) —
// قليل ومقصود، حتى القائمة ما تطول وتغطي المشغل بالكامل
const DROPDOWN_RESULTS_LIMIT = 8

export default function VideosBrowser({
	groups,
	initialGroupSlug,
	initialVideoSlug,
}: {
	groups: YouTubeGroup[]
	initialGroupSlug: string | null
	initialVideoSlug?: string
}) {
	// ملاحظة: ماكو داعي بعد الآن نخلي سلق المجموعة state — الصفحة الأب
	// تعيد إنشاء هذا الكومبوننت من الصفر بـ key مختلف كل ما يتغير السلق
	// بالرابط (شوف page.tsx و [slug]/page.tsx)، فما يصير خلط بين مجموعتين
	const currentGroup =
		groups.find((g) => getGroupSlug(g) === initialGroupSlug) ?? groups[0]

	const [currentVideoSlug, setCurrentVideoSlug] = useState(
		initialVideoSlug ?? initialGroupSlug ?? undefined,
	)
	const [search, setSearch] = useState("")
	const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
	// null = "كل الفيديوهات". يفلتر شبكتَي "أحدث الفيديوهات" و"البرامج
	// والسلاسل" بس — ما يغيّر الفيديو المفتوح حاليًا بالمشغل
	const [activeCategory, setActiveCategory] = useState<string | null>(null)
	const router = useRouter()

	const currentVideo =
		currentGroup?.videos.find((v) => v.slug === currentVideoSlug) ??
		currentGroup?.videos[0]

	// تبديل حلقة بنفس المجموعة: state بس (بدون طلب شبكة جديد وبدون فقدان
	// الـ ISR cache)، بس نحدّث رابط المتصفح بـ history API خام (بدون
	// router.replace اللي كان يسوي رحلة سيرفر إضافية) — حتى لو صار
	// Refresh أو مشاركة وهو واقف على حلقة غير الأولى، يرجع لنفس الحلقة
	const handleEpisodeSelect = (slug: string) => {
		setCurrentVideoSlug(slug)
		if (typeof window !== "undefined") {
			window.history.replaceState(null, "", `/media/videos/${slug}`)
		}
	}

	// اختيار مباشر من القائمة العائمة تحت صندوق البحث:
	// - نفس المجموعة الحالية → تبديل فوري بالـ state (زي اختيار حلقة)
	// - مجموعة ثانية → تنقل حقيقي (مخزّن بالـ ISR، رخيص) لأن currentGroup
	//   ثابتة طول عمر هذا الكومبوننت (شوف الملاحظة فوق)
	const handleSearchSelect = (video: YouTubeVideo, groupSlug: string) => {
		if (currentGroup && groupSlug === getGroupSlug(currentGroup)) {
			handleEpisodeSelect(video.slug)
		} else {
			router.push(`/media/videos/${video.slug}`)
		}
		setSearch("")
	}

	const categoryFilteredGroups = useMemo(
		() => filterGroupsByCategory(groups, activeCategory),
		[groups, activeCategory],
	)

	// مجموعات فيها أكثر من حلقة = "برامج وسلاسل" فعلية (مستنتجة من الداتا
	// نفسها، بدون حقل تصنيف إضافي)، وتتأثر بفلتر التصنيف المختار
	const seriesGroups = useMemo(
		() => categoryFilteredGroups.filter((g) => g.videos.length > 1),
		[categoryFilteredGroups],
	)

	const searchTerm = search.trim()

	// نتائج القائمة العائمة: تفتش بكل حلقة بكل مجموعة (حتى حلقات المجموعة
	// المفتوحة حاليًا)، حتى تختار مباشرة من أي مكان بالموقع
	const dropdownResults = useMemo(() => {
		if (!searchTerm) return []
		return flattenLatestVideos(groups)
			.filter(({ video }) => video.title.includes(searchTerm))
			.slice(0, DROPDOWN_RESULTS_LIMIT)
	}, [groups, searchTerm])

	const latestVideos = useMemo(() => {
		const excludeSlug = currentGroup ? getGroupSlug(currentGroup) : undefined

		// بلا بحث: فيديو وحد يمثل كل مجموعة (نفس السلوك الأصلي، عرض مختصر)
		// مع بحث: كل حلقة بكل مجموعة — وإلا الحلقات الوسطى بالسلاسل ما
		// كانت تنلگى أبدًا (كانت تنفلتر بس فوق أحدث حلقة من كل مجموعة)
		const source = searchTerm
			? flattenLatestVideos(groups, excludeSlug)
			: getLatestVideoPerGroup(groups, excludeSlug)

		const categoryMatched = source.filter(({ video, groupSlug }) => {
			const group = groups.find((g) => getGroupSlug(g) === groupSlug)
			return videoMatchesCategory(video, activeCategory, group?.categories)
		})

		const searched = searchTerm
			? categoryMatched.filter(({ video }) => video.title.includes(searchTerm))
			: categoryMatched

		const sorted = [...searched].sort((a, b) => {
			const diff =
				parseArabicDate(b.video.date) - parseArabicDate(a.video.date)
			return sortOrder === "newest" ? diff : -diff
		})

		return sorted.slice(0, searchTerm ? SEARCH_RESULTS_LIMIT : LATEST_VIDEOS_LIMIT)
	}, [groups, currentGroup, searchTerm, sortOrder, activeCategory])

	// لما التصنيف المختار يتغير، نمرّر نظر المستخدم لقسم النتائج تلقائيًا
	// — القسم واقع تحت المشغل والحلقات، فبدون هذا المستخدم ما يحس إنه
	// صار أي شي أصلاً لما يضغط تصنيف من السايدبار (اللي فوق الصفحة)
	const resultsRef = useRef<HTMLDivElement>(null)
	const isFirstRender = useRef(true)
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
	}, [activeCategory])

	if (!currentGroup || !currentVideo) {
		return (
			<div className="container py-20 text-center text-white">
				لا توجد فيديوهات متاحة حاليًا.
			</div>
		)
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
				مكتبة تضم المحاضرات والبرامج والندوات الخاصة بالإمام زين العابدين
				عليه السلام
			</p>

			{/* المحتوى الرئيسي أول شي بالـ DOM (= يمين الصفحة بلغة RTL)،
			    والسايدبار بعده (= يسار الصفحة) */}
			<div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_280px] gap-6 xl:gap-8 items-start">
				<div className="min-w-0 bg-gray-800 rounded-2xl p-4 lg:p-5">
					<FilterBar
						search={search}
						onSearchChange={setSearch}
						sortOrder={sortOrder}
						onSortChange={setSortOrder}
						results={dropdownResults}
						onSelectResult={handleSearchSelect}
					/>
					<VideoPlayer video={currentVideo} />
				</div>
				<div className="bg-gray-800 rounded-2xl p-5 lg:p-6">
					
				<VideosSidebar
					groups={groups}
					seriesGroups={seriesGroups}
					activeCategory={activeCategory}
					onCategoryChange={setActiveCategory}
				/>
				</div>
			</div>

			{/* من هنا تنزل، الأقسام تاخذ عرض الصفحة كامل */}
	<div className="mt-12 bg-gray-800 rounded-2xl p-4 lg:p-6">
				<EpisodesList
				videos={currentGroup.videos}
				currentSlug={currentVideo.slug}
				onSelect={handleEpisodeSelect}
			/>
	</div>

			<div className="mt-12" ref={resultsRef}>
				<h2 className="text-white font-bold text-lg mb-4">
					{searchTerm ? `نتائج البحث عن "${searchTerm}"` : "أحدث الفيديوهات"}
				</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
					{latestVideos.map(({ video }) => (
						// الرابط يستخدم سلق الفيديو نفسه (مو سلق المجموعة)، حتى
						// الضغط يودي بالضبط لهذا الفيديو المعروض بالكارد
						<VideoCard key={video.slug} video={video} href={`/media/videos/${video.slug}`} />
					))}
					{latestVideos.length === 0 && (
						<p className="text-slate-500 text-sm col-span-full">
							ماكو نتائج مطابقة لبحثك أو للتصنيف المختار.
						</p>
					)}
				</div>
			</div>

			{seriesGroups.length > 0 && (
				<div className="mt-16">
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
	)
}
