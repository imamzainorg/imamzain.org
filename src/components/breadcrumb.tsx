import { cn } from "@/lib/utils"
import Link from "next/link"
import { memo } from "react"

interface BreadcrumbsProps {
  links: { name: string; url: string }[]
  className?: string
  dotColor?: string
}

const Breadcrumbs = ({
  links,
  className = "text-gray-700",
  dotColor = "bg-primary dark:bg-Muharram_secondary",
}: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="pt-8 sm:pt-8 lg:pt-32 pb-5 sm:pb-6 lg:pb-6 max-w-full"
    >
      <ol
        className={cn(
          "flex items-center text-xs sm:text-sm lg:text-lg mt-14",
          "max-w-full overflow-x-auto whitespace-nowrap scrollbar-hide",
          className
        )}
      >
        {links.map((link, index) => {
          const isLast = index === links.length - 1

          return (
            <li key={link.url} className="flex items-center shrink-0">
             
		 
              {index !== 0 && (
                <span
                  className={cn(
                    "w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 rounded-full mx-3 shrink-0",
                    dotColor
                  )}
                />
              )}

            
              {isLast ? (
                <span
                  aria-current="page"
                  className="font-bold text-subtitle line-clamp-1 max-w-[120px] sm:max-w-none"
                >
                  {link.name}
                </span>
              ) : (
                <Link
                  href={link.url}
                  className="text-subtitle p-1 hover:text-primary dark:hover:text-Muharram_primary duration-150 truncate max-w-[120px] sm:max-w-none"
                >
                  {link.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

Breadcrumbs.displayName = "Breadcrumbs"
export default memo(Breadcrumbs)
