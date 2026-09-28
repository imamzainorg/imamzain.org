import MotionProvider from "./_components/motion"

// Pages place their own `container`, so sections can span the full width.
export default function HisLifeLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className="bg-pattern pb-24 -mb-24">
			<MotionProvider>{children}</MotionProvider>
		</div>
	)
}
