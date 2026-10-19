"use client"

import { History, Play, X } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { formatTime } from "../_lib/format"
import { forget } from "../_lib/listening-memory"

// The recordings this visitor stopped part way, most recent first, on the page's dark band: each
// a press away from carrying on where it was left. Shown only to someone who has listened before.
export default function ContinueListening({
	items,
	positions,
	onResume,
}: {
	items: AudioItemLight[]
	positions: Record<number, number>
	onResume: (item: AudioItemLight) => void
}) {
	if (!items.length) return null

	return (
		<section aria-labelledby="continue-listening" className="max-w-xl">
			<h2 id="continue-listening" className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
				<History aria-hidden className="size-5 text-secondary dark:text-Muharram_secondary" />
				تابع الاستماع
			</h2>
			<ul className="space-y-2">
				{items.map((item) => {
					const at = positions[item.id] ?? 0
					const share = item.durationSeconds ? Math.min(1, at / item.durationSeconds) : 0
					return (
						<li key={item.id} className="relative min-w-0">
							<button
								type="button"
								onClick={() => onResume(item)}
								className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-start transition-colors hover:border-secondary/60 hover:bg-white/[0.07] dark:hover:border-Muharram_secondary/60"
							>
								<span className="grid size-10 shrink-0 place-items-center rounded-full border-2 border-secondary text-secondary transition-colors group-hover:bg-secondary group-hover:text-white dark:border-Muharram_secondary dark:text-Muharram_secondary dark:group-hover:bg-Muharram_secondary dark:group-hover:text-white">
									<Play aria-hidden className="size-4 translate-x-[1px] fill-current" />
								</span>
								<span className="min-w-0 flex-1 pl-7">
									<span className="block truncate font-bold text-white">{item.title}</span>
									<span className="mt-0.5 block text-sm text-white/60">
										توقفت عند <span dir="ltr">{formatTime(at)}</span> من <span dir="ltr">{formatTime(item.durationSeconds ?? 0)}</span>
									</span>
									<span aria-hidden dir="ltr" className="mt-2 block h-1 overflow-hidden rounded-full bg-white/10">
										<span className="block h-full bg-secondary dark:bg-Muharram_secondary" style={{ width: `${share * 100}%` }} />
									</span>
								</span>
							</button>
							<button
								type="button"
								onClick={() => forget(item.id)}
								aria-label={`إزالة «${item.title}» من قائمة المتابعة`}
								title="إزالة من القائمة"
								className="absolute left-2 top-2 grid size-7 place-items-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
							>
								<X className="size-4" />
							</button>
						</li>
					)
				})}
			</ul>
		</section>
	)
}
