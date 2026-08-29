"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, LayoutGrid, Tag, Youtube } from "lucide-react"
import { TelegramIcon } from "@/components/brand-icons"
import type { YouTubeGroup } from "@/types/youtube-data"
import { getGroupSlug, getCategoryCounts, thumbnailUrl } from "@/lib/youtube"

const socialLinks = [
	{ label: "يوتيوب", href: "https://www.youtube.com/@imamzainorg", Icon: Youtube },
	{ label: "تيليجرام", href: "https://t.me/imamzainorg", Icon: TelegramIcon },
	{ label: "فيسبوك", href: "https://www.facebook.com/@imamzainorg", Icon: Facebook },
	{ label: "انستغرام", href: "https://www.instagram.com/imamzainorg/", Icon: Instagram },
]

export default function VideosSidebar({
	groups,
	seriesGroups,
	activeCategory,
	onCategoryChange,
}: {
	groups: YouTubeGroup[]
	seriesGroups: YouTubeGroup[]
	activeCategory: string | null
	onCategoryChange: (category: string | null) => void
}) {
	const totalVideos = groups.reduce((sum, g) => sum + g.videos.length, 0)
	const categories = getCategoryCounts(groups)

	return (
		<aside className="space-y-9">
			<div>
				<h2 className="text-slate-300 text-sm font-semibold mb-3">
					التصنيفات
				</h2>
				<div className="flex flex-col gap-1">
					<button
						type="button"
						onClick={() => onCategoryChange(null)}
						className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition ${
							activeCategory === null
								? "bg-secondary/15 text-secondary dark:text-Muharram_secondary font-medium"
								: "text-slate-300 hover:bg-white/5"
						}`}
					>
						<span className="flex items-center gap-2">
							<LayoutGrid className="w-4 h-4" />
							كل الفيديوهات
						</span>
						<span className="text-xs text-slate-500">{totalVideos}</span>
					</button>

					{/* ⚠️ ما راح يبين أي تصنيف هنا لحد ما تضيف حقل "category" لكل
					    مجموعة بالجيسون — بعدها القائمة تتكوّن تلقائيًا وحدها */}
					{categories.length === 0 && (
						<p className="text-sm text-slate-400 px-3 py-2 leading-6">
							ماكو تصنيفات بعد — أضف حقل &quot;category&quot; للمجموعات
							بالجيسون حتى تظهر هنا تلقائيًا
						</p>
					)}

					{categories.map(({ category, count }) => (
						<button
							key={category}
							type="button"
							onClick={() => onCategoryChange(category)}
							className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition ${
								activeCategory === category
									? "bg-secondary/15 text-secondary dark:text-Muharram_secondary font-medium"
									: "text-slate-300 hover:bg-white/5"
							}`}
						>
							<span className="flex items-center gap-2">
								<Tag className="w-4 h-4" />
								{category}
							</span>
							<span className="text-xs text-slate-500">{count}</span>
						</button>
					))}
				</div>
			</div>

			{seriesGroups.length > 0 && (
				<div>
					<h2 className="text-slate-300 text-sm font-semibold mb-3">
						سلاسل ومحاضرات
					</h2>
					<div className="flex flex-col gap-4">
						{seriesGroups.slice(0, 5).map((group) => (
							<Link
								key={group.id}
								href={`/media/videos/${getGroupSlug(group)}`}
								className="flex items-center gap-2 group"
							>
								<div className="relative w-20 aspect-video rounded-lg overflow-hidden flex-shrink-0">
									<Image
										src={thumbnailUrl(group.videos[0].thumbnail)}
										alt={group.title}
										fill
										sizes="80px"
										className="object-cover"
									/>
								</div>
								<div>
									<p className="text-sm text-white line-clamp-2 group-hover:text-secondary dark:group-hover:text-Muharram_secondary">
										{group.title}
									</p>
									<p className="text-xs text-slate-400 mt-1">
										{group.videos.length} حلقة
									</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			)}

		

			<div>
				<h2 className="text-slate-300 text-sm font-semibold mb-3">تابعنا</h2>
				<div className="flex gap-2.5">
					{socialLinks.map(({ label, href, Icon }) => (
						<a
							key={label}
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={label}
							className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
						>
							<Icon className="w-4 h-4" aria-hidden="true" />
						</a>
					))}
				</div>
			</div>
		</aside>
	)
}
