import Layouts from "@/layouts"

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Layouts>
			<div className="container">{children}</div>
		</Layouts>
	)
}
