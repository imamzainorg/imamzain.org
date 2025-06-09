// components/ui/button-link.tsx
"use client"
import { ChevronRightArrowIcon } from "@/assets/icons/reusable"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ButtonLinkProps {
  href: string
  label: string
  className?: string
}

export default function ButtonLink({ href, label, className }: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center px-6 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors",
        className
      )}
    >
      {label}
<ChevronRightArrowIcon
                                className="rotate-180 relative right-2 p-0.5 md:p-1"
                                stroke="#ffffff"
                                strokeWidth={0.5}
                                fill="#ffffff"
                            />

    </Link>
  )
}
