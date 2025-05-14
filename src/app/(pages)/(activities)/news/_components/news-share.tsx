"use client"

import { LinkIcon } from "lucide-react"
import { toast } from "sonner"

export default function NewsShare({
	url,
	className = "",
	stroke = "#000000",
	strokeWidth = 1,
}: {
	url: string
	className?: string
	stroke?: string
	strokeWidth?: number
	iconSize?: number;
}) {
	return (
		<LinkIcon
			width={20}
			height={20}
			stroke={stroke}
			strokeWidth={strokeWidth}
			className={className}
			onClick={() => {
				navigator.clipboard.writeText(
					`https://www.imamzain.org/${url}`,
				)
				toast("تم نسخ الرابط في الحافظة")
			}}
		/>
	)
}
