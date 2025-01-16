import Layouts from "@/layouts"
import React from "react";


export default function MainLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <Layouts>
                {children}
            </Layouts>
        </>
    )
}
