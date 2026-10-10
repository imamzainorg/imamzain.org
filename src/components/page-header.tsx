import { SectionTitle } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { cn } from "@/lib/utils"

// The opener of an inner page: the title and its intro line, optional actions under them and an
// optional aside (a photo in its frame, a panel) in a second column on large screens.
export default function PageHeader({
	title,
	text,
	actions,
	aside,
	className,
}: {
	title: string
	text?: string
	actions?: React.ReactNode
	aside?: React.ReactNode
	className?: string
}) {
	return (
		<header className={cn("grid items-center gap-12", aside && "lg:grid-cols-[3fr_2fr] lg:gap-20", className)}>
			<Reveal x={60} y={0}>
				<SectionTitle as="h1" title={title} text={text} className="mb-0" />
				{actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
			</Reveal>
			{aside && (
				<Reveal x={-60} y={0} delay={0.15}>
					{aside}
				</Reveal>
			)}
		</header>
	)
}
