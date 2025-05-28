"use client"
import NewsShare from "@/components/news-share"
import { toast } from "sonner"

type CopyShareButtonProps = {
  link: string
}

export default function CopyShareButton({ link }: CopyShareButtonProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link)
    toast("تم نسخ الرابط في الحافظة")
  }

  return (
    <div
      onClick={handleCopy}
      className="mt-4 inline-flex items-center gap-2 bg-primary border border-primary text-white transition-all font-medium px-2.5 py-1.5 rounded-full shadow-sm cursor-pointer hover:scale-105"
    >
      <NewsShare iconSize={15} stroke="#fff" className="pointer-events-none" />
      مشاركة
    </div>
  )
}
