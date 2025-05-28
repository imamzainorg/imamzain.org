"use client"
import { LinkIcon } from "lucide-react"

import { toast } from "sonner"
type NewsShareProps = {
  iconSize?: number
  className?: string
    url?: string
     fullLink?: string
       stroke?: string
}

export default function NewsShare({
  iconSize = 20,
  className = "",
  url,
}: NewsShareProps) {
  const handleClick = () => {
    const linkToCopy = url || window.location.href
    navigator.clipboard.writeText(linkToCopy)
    toast("تم نسخ الرابط في الحافظة")
  }
  return (
    <LinkIcon
      width={iconSize}
      height={iconSize}
      className={className}
       onClick={handleClick}
    />
  )
}
