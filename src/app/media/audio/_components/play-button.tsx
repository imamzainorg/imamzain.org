import { Loader2, Pause, Play, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PlayerStatus } from "../_lib/use-audio-player"

// Play, pause, a spinner while the sound is on its way, and retry after a failure. The button
// changes the moment it is pressed, before any audio arrives, so a slow start never looks like
// a press that did nothing.
export default function PlayButton({
	status,
	onClick,
	title,
	variant = "solid",
	className,
}: {
	status: PlayerStatus
	onClick: () => void
	// What is being played, for screen readers.
	title: string
	variant?: "solid" | "white"
	className?: string
}) {
	const label =
		status === "playing"
			? `إيقاف مؤقت: ${title}`
			: status === "loading"
				? `جارٍ التحميل، اضغط للإيقاف: ${title}`
				: status === "error"
					? `إعادة المحاولة: ${title}`
					: `تشغيل: ${title}`

	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={label}
			title={label}
			className={cn(
				"relative grid size-14 shrink-0 place-items-center rounded-full transition-[transform,background-color] duration-200 active:scale-95",
				variant === "solid"
					? "bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 dark:bg-Muharram_primary dark:shadow-none"
					: "bg-white text-primary hover:bg-white/90 dark:text-Muharram_primary",
				status === "error" && variant !== "white" && "bg-red-600 hover:bg-red-600/90 dark:bg-red-700",
				className,
			)}
		>
			{status === "loading" && (
				<span
					aria-hidden
					className={cn(
						"absolute inset-0 animate-ping rounded-full opacity-20",
						variant === "white" ? "bg-white" : "bg-primary dark:bg-Muharram_primary",
					)}
				/>
			)}
			{status === "playing" ? (
				<Pause className="size-6 fill-current" />
			) : status === "loading" ? (
				<Loader2 className="size-6 animate-spin" />
			) : status === "error" ? (
				<RotateCcw className="size-6" />
			) : (
				<Play className="size-6 translate-x-[1px] fill-current" />
			)}
		</button>
	)
}
