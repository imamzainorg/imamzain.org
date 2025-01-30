import Layouts from "@/layouts"
import React from "react";


export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<>

				<Layouts >

					{children}
				</Layouts >


		</>
	)
}
