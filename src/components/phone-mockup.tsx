import Image from "next/image"

interface PhoneMockupProps {
	src: string
	alt: string
	/** Sizing/position utilities for the wrapper. Must establish width & height. */
	className?: string
	/** next/image sizes hint. */
	sizes?: string
	priority?: boolean
	/** Tailwind background class for the soft glow behind the device, e.g. "bg-secondary/30". Empty = no glow. */
	glow?: string
	/**
	 * When true, wraps a raw full-screen screenshot in a slim device bezel.
	 * Use for assets that are plain screen captures (no baked-in frame).
	 * Leave false for assets that already contain their own phone frame.
	 */
	framed?: boolean
	/** object-position for framed shots — handy for long scrolling captures (e.g. "top"). */
	position?: "center" | "top"
}

/**
 * Presents an app screenshot either as-is (when the asset already contains its
 * own device frame) or wrapped in a slim, frameless-style bezel (`framed`) for
 * raw screen captures. A soft glow + drop shadow lifts it off the page.
 */
export default function PhoneMockup({
	src,
	alt,
	className = "",
	sizes = "(max-width: 1024px) 70vw, 360px",
	priority = false,
	glow = "",
	framed = false,
	position = "center",
}: PhoneMockupProps) {
	return (
		<div className={`relative ${className}`}>
			{glow && (
				<div
					aria-hidden
					className={`pointer-events-none absolute inset-4 -z-10 rounded-[50%] blur-3xl ${glow}`}
				/>
			)}
			{framed ? (
				<div className="relative h-full w-full rounded-[2.2rem] bg-neutral-900 p-[3px] shadow-2xl ring-1 ring-black/10 dark:ring-white/10">
					<div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-neutral-900">
						<Image
							src={src}
							alt={alt}
							fill
							sizes={sizes}
							priority={priority}
							className={
								// Long scrolling captures crop to the top; normal
								// screens use contain so the status bar is never cut.
								position === "top"
									? "object-cover object-top"
									: "object-contain object-center"
							}
						/>
					</div>
				</div>
			) : (
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					priority={priority}
					className="object-contain drop-shadow-2xl"
				/>
			)}
		</div>
	)
}
