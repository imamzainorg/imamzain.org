import Layouts from "@/layouts"

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<Layouts>
			<div className="container !mb-16">{children}</div>
		</Layouts>
	)
}
