import { LinkIcon } from "lucide-react"

type NewsShareProps = {
  iconSize?: number
  className?: string
}

export default function NewsShare({
  iconSize = 20,
  className = "",
}: NewsShareProps) {
  return (
    <LinkIcon
      width={iconSize}
      height={iconSize}
      className={className}
    />
  )
}
