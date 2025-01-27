"use client"

import { LinkIcon } from "lucide-react"
import { toast } from "sonner"

export default function NewsShare({ slug }: { slug: string }) {
	return (
		<LinkIcon
			width={20}
			height={20}
			onClick={() => {
				navigator.clipboard.writeText(
					`https://www.imamzain.org/news/${slug}`,
				)
				toast("تم نسخ رابط الخبر في الحافظة")
			}}
		/>
	)
}
