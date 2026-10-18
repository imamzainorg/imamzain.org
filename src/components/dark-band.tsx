import { cn } from "@/lib/utils"

// A full-width dark green band with the faint site pattern, used to break up long pages
// (the home page's services section, the titles section on /his-life). It owns its own
// `container`, so children are the band's content.
export default function DarkBand({
	children,
	className,
	id,
}: {
	children: React.ReactNode
	className?: string
	id?: string
}) {
	return (
		<section id={id} className={cn("relative scroll-mt-24 overflow-hidden bg-[#101c1a] py-20 dark:bg-[#171314] md:py-28", className)}>
			<div aria-hidden className="absolute inset-0 bg-[url('/shapes/bg.svg')] bg-[length:500px] opacity-[0.04]" />
			<div className="container relative">{children}</div>
		</section>
	)
}
