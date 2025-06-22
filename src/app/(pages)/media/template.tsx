"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname()

  useEffect(() => {
    if (path.startsWith("/media")) {
    document.body.classList.add("media-background-creative")

    } else {
      document.body.classList.remove("media-background-creative")
    }

    return () => {
      document.body.classList.remove("media-background-creative")
    }
  }, [path])

  return <div className="pb-12 -mb-24 relative z-10">{children}</div>
}
