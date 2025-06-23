"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname()

  useEffect(() => {
    if (path.startsWith("/media/images") ) {
  	document.body.style.backgroundColor = "#0a051a"                             
    } else  if (path.startsWith("/media/videos")) {
     document.body.classList.add("bg-dark-background")

    }

    return () => {
      document.body.classList.remove("media-background-creative")
    }
  }, [path])

  return <div className="pb-12 -mb-24 relative z-10">{children}</div>
}
