"use client"

import NewsShare from "@/components/news-share"
import { toast } from "sonner"

export default function ShareBox() {
  const handleClick = () => {
    const url = window.location.href
    navigator.clipboard.writeText(url)
    toast("تم نسخ الرابط في الحافظة")
  }

  return (
    <div
      onClick={handleClick}
      className="inline-flex items-center gap-2 bg-white border border-primary text-primary hover:bg-primary/10 transition-all font-medium px-6 py-3 rounded-full shadow-sm cursor-pointer hover:scale-105"
    >
      <NewsShare iconSize={20} />
      مشاركة
    </div>
  )
}
