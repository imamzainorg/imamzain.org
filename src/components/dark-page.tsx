// The dark, immersive page the photo and video galleries sit on. It reaches 2rem under the
// footer so the footer's rounded top corners reveal dark rather than the cream canvas.
export default function DarkPage({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative -mb-24 min-h-screen bg-[#101c1a] pb-36 dark:bg-[#171314]">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:500px] opacity-[0.04] lg:bg-[length:50%]"
			/>
			<div className="relative">{children}</div>
		</div>
	)
}
