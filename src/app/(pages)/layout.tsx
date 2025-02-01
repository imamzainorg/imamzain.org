import Layouts from "@/layouts"

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>
			<Layouts>{children}</Layouts>
		</>
	)
}
