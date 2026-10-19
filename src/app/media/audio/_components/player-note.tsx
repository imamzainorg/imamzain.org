import { cn } from "@/lib/utils"
import type { PlayerStatus } from "../_lib/use-audio-player"

// What the player is doing when it is not simply playing: on its way, on its way slowly, or
// failed with a way to try again. Read out to screen readers as it changes.
export default function PlayerNote({
	status,
	slow,
	onRetry,
	light,
	className,
}: {
	status: PlayerStatus
	slow: boolean
	onRetry: () => void
	light?: boolean
	className?: string
}) {
	return (
		<span role="status" className={cn("min-w-0 truncate text-center text-sm", className)}>
			{status === "loading" && (
				<span className={cn("font-semibold", light ? "text-white/85" : "text-primary dark:text-Muharram_primary")}>
					{slow ? "الاتصال بطيء، ما زال التسجيل يُحمَّل..." : "جارٍ تحميل التسجيل..."}
				</span>
			)}
			{status === "error" && (
				<span className={cn("font-semibold", light ? "text-red-200" : "text-red-600")}>
					تعذّر تشغيل التسجيل.{" "}
					<button type="button" onClick={onRetry} className="underline underline-offset-4">
						إعادة المحاولة
					</button>
				</span>
			)}
		</span>
	)
}
