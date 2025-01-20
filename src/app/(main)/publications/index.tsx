import Link from "next/link"

import { ChevronRightArrowIcon } from "@/assets/icons/reusable"
import SectionTitle from "@/components/section"
import { publications } from "@/lib/data"
import { HighlightCarousel } from "@/app/(pages)/publications/components/highlight-carousel"

export default function Publications() {
	return (
		<>
			<div className="container w-full flex flex-col items-center !my-8">
				<div className=" flex w-full items-center justify-between my-8">
					<SectionTitle title="الأصدارات" />
					<Link
						href="/publications"
						className="flex font-semibold gap-2 text-white items-center py-1 sm:py-2 px-2 rounded-lg bg-primary text-xs sm:text-sm"
					>
						<p className="text-nowrap">ارشيف الاصدارات</p>
						<ChevronRightArrowIcon
							className="rotate-180 p-1.5 sm:p-1"
							stroke="#ffffff"
							strokeWidth={0.5}
							fill="#ffffff"
						/>
					</Link>
				</div>
				<div className="w-11/12 mx-auto ">
					<HighlightCarousel publications={publications} />
				</div>
			</div>
		</>
	)
}
