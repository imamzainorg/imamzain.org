"use client"

import { useState } from "react"
import { toast } from "sonner"
import { BellRing, Check, Loader2 } from "lucide-react"

/**
 * Launch-interest capture for the upcoming "معارف سجادية" app.
 * Reuses the foundation's existing newsletter endpoint so the action is
 * genuinely functional (the user really does get notified) — never a dead CTA.
 */
export default function NotifyForm({
	theme = "light",
	id,
}: {
	theme?: "light" | "emerald"
	id?: string
}) {
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)
	const [done, setDone] = useState(false)

	const onEmerald = theme === "emerald"

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		try {
			const response = await fetch("/api/newsletter/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ subscriberEmail: email }),
			})

			if (response.ok) {
				toast("تم تسجيل اهتمامك", {
					description: "سنُعلمك عند إطلاق معارف سجادية بإذن الله",
				})
				setEmail("")
				setDone(true)
				return
			}

			const data = await response.json().catch(() => ({}))
			toast.error(
				data?.error ||
					data?.message ||
					"تعذّر التسجيل، يرجى المحاولة مرة أخرى",
			)
		} catch {
			toast.error("حدث خطأ، يرجى المحاولة مرة أخرى")
		} finally {
			setLoading(false)
		}
	}

	if (done) {
		return (
			<div
				className={`flex items-center justify-center gap-3 rounded-2xl px-6 py-4 text-note font-semibold ${
					onEmerald
						? "bg-white/15 text-white"
						: "bg-primary/10 text-primary dark:bg-Muharram_secondary/15 dark:text-Muharram_secondary"
				}`}
			>
				<Check className="w-5 h-5 shrink-0" />
				<span>تم تسجيل اهتمامك — سنُعلمك عند الإطلاق بإذن الله</span>
			</div>
		)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
		>
			<label htmlFor={id} className="sr-only">
				البريد الإلكتروني
			</label>
			<input
				id={id}
				type="email"
				required
				dir="rtl"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				disabled={loading}
				placeholder="بريدك الإلكتروني"
				className={`min-h-[48px] flex-1 rounded-2xl px-5 text-note text-center sm:text-start outline-none transition focus:ring-2 ${
					onEmerald
						? "bg-white/95 text-gray-900 placeholder:text-gray-400 focus:ring-secondary"
						: "border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:ring-primary dark:border-white/10 dark:bg-white/10 dark:text-white"
				}`}
			/>
			<button
				type="submit"
				disabled={loading}
				className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-6 text-md font-semibold shadow-lg transition active:scale-95 disabled:opacity-60 ${
					onEmerald
						? "bg-white text-primary shadow-black/20 hover:bg-white/90"
						: "bg-primary text-white shadow-primary/30 hover:bg-primary/90 dark:bg-Muharram_secondary dark:hover:bg-Muharram_secondary/90"
				}`}
			>
				{loading ? (
					<Loader2 className="w-5 h-5 animate-spin" />
				) : (
					<BellRing className="w-5 h-5" />
				)}
				<span className="whitespace-nowrap">
					{loading ? "جارٍ التسجيل…" : "سجّل اهتمامك"}
				</span>
			</button>
		</form>
	)
}
