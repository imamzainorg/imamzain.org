"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname()

  useEffect(() => {
    const oldBgColor = document.body.style.backgroundColor
    const hasDarkBgClass = document.body.classList.contains("bg-dark-background")

    if (path === "/media/images/page") {
     
      document.body.classList.add("bg-gradient-to-b")
      document.body.style.backgroundColor = ""
      if (hasDarkBgClass) {
        document.body.classList.remove("bg-dark-background")
      }
    } else if (path.startsWith("/media/images")) {
      document.body.style.backgroundColor = "#0a051a"
      document.body.classList.remove("bg-gradient-to-b")
      if (hasDarkBgClass) {
        document.body.classList.remove("bg-dark-background")
      }
    } else if (path.startsWith("/media/videos")) {
      document.body.classList.add("bg-dark-background")
      document.body.style.backgroundColor = ""
      document.body.classList.remove("bg-gradient-to-b")
    } else {
      document.body.style.backgroundColor = ""
      document.body.classList.remove("bg-dark-background")
      document.body.classList.remove("bg-gradient-to-b")
    }

    return () => {
      document.body.style.backgroundColor = oldBgColor
      document.body.classList.remove("bg-dark-background")
      document.body.classList.remove("bg-gradient-to-b")
    }
  }, [path])

  return <div className="pb-12 -mb-24 relative z-10">{children}</div>
}
