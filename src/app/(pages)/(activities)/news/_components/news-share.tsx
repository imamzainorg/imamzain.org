"use client"

import { LinkIcon } from "lucide-react"
import { toast } from "sonner"

type NewsShareProps = {
	url?: string       
	fullLink?: string   
	className?: string
	stroke?: string
	strokeWidth?: number
	iconSize?: number
}

export default function NewsShare({
	url,
	fullLink,
	className = "",
	stroke = "#000000",
	strokeWidth = 1,
	iconSize = 20,
}: NewsShareProps) {
	const handleClick = () => {
		const linkToCopy = fullLink || (url ? `https://www.imamzain.org/${url}` : null)

		if (!linkToCopy) {
			toast("لم يتم تحديد رابط للنسخ")
			return
		}

		navigator.clipboard.writeText(linkToCopy)
		toast("تم نسخ الرابط في الحافظة")
	}

	return (
		<LinkIcon
			width={iconSize}
			height={iconSize}
			stroke={stroke}
			strokeWidth={strokeWidth}
			className={className}
			onClick={handleClick}
		/>
	)
}
