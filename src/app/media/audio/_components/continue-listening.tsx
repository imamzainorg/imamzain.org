"use client"

import { History, Play, X } from "lucide-react"
import type { AudioItemLight } from "@/types/audio"
import { formatTime } from "../_lib/format"
import { forget } from "../_lib/listening-memory"

// The recordings this visitor stopped part way, most recent first, each a press away from
// carrying on where it was left. Shown only to someone who has listened before.
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
		<section aria-labelledby="continue-listening" className="mb-10">
			<h2 id="continue-listening" className="mb-4 flex items-center gap-2 text-xl font-extrabold text-primary dark:text-Muharram_primary">
				<History aria-hidden className="size-5 text-secondary_dark dark:text-Muharram_secondary" />
				تابع الاستماع
			</h2>
			<ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
				{items.map((item) => {
					const at = positions[item.id] ?? 0
					const share = item.durationSeconds ? Math.min(1, at / item.durationSeconds) : 0
					return (
						<li key={item.id} className="relative min-w-0">
							<button
								type="button"
								onClick={() => onResume(item)}
								className="group flex w-full items-center gap-3 rounded-2xl border-2 border-secondary/40 bg-secondary/[0.07] p-3 text-start transition-colors hover:border-secondary dark:border-Muharram_secondary/40 dark:bg-Muharram_secondary/[0.06] dark:hover:border-Muharram_secondary"
							>
								<span className="grid size-11 shrink-0 place-items-center rounded-full bg-secondary text-white dark:bg-Muharram_secondary">
									<Play aria-hidden className="size-5 translate-x-[1px] fill-current" />
								</span>
								<span className="min-w-0 flex-1 pl-6">
									<span className="block truncate font-bold text-gray-900">{item.title}</span>
									<span className="mt-1 block text-sm text-gray-600">
										توقفت عند <span dir="ltr">{formatTime(at)}</span> من <span dir="ltr">{formatTime(item.durationSeconds ?? 0)}</span>
									</span>
									<span aria-hidden className="mt-2 block h-1 overflow-hidden rounded-full bg-secondary/20 dark:bg-Muharram_secondary/20" dir="ltr">
										<span className="block h-full bg-secondary dark:bg-Muharram_secondary" style={{ width: `${share * 100}%` }} />
									</span>
								</span>
							</button>
							<button
								type="button"
								onClick={() => forget(item.id)}
								aria-label={`إزالة «${item.title}» من قائمة المتابعة`}
								title="إزالة من القائمة"
								className="absolute left-2 top-2 grid size-7 place-items-center rounded-full text-gray-400 transition-colors hover:bg-black/5 hover:text-gray-700"
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
