"use client"

import { Facebook, Link as LinkIcon } from "lucide-react"
import { toast } from "sonner"
import { XIcon } from "@/components/brand-icons"

const button =
	"flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/25 text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-Muharram_primary/25 dark:text-Muharram_primary dark:hover:border-Muharram_primary dark:hover:bg-Muharram_primary dark:hover:text-white"

// Share an article on Facebook or X, or copy its link.
export default function ShareButtons({ url, title }: { url: string; title: string }) {
	const encodedUrl = encodeURIComponent(url)

	return (
		<div className="flex items-center gap-3">
			<span className="font-semibold text-gray-500">مشاركة</span>
			<a
				href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="مشاركة على فيسبوك"
				className={button}
			>
				<Facebook className="h-5 w-5" />
			</a>
			<a
				href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(`اضغط لقراءة المزيد عن "${title}"`)}`}
				target="_blank"
				rel="noopener noreferrer"
				aria-label="مشاركة على إكس"
				className={button}
			>
				<XIcon className="h-4 w-4" />
			</a>
			<button
				type="button"
				aria-label="نسخ الرابط"
				onClick={() => {
					navigator.clipboard.writeText(url)
					toast("تم نسخ الرابط في الحافظة")
				}}
				className={button}
			>
				<LinkIcon className="h-5 w-5" />
			</button>
		</div>
	)
}
