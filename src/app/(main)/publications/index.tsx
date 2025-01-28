import Link from "next/link"

import { ChevronRightArrowIcon } from "@/assets/icons/reusable"
import SectionTitle from "@/components/section"
import { publications } from "@/lib/data"
import { HighlightCarousel } from "@/app/(pages)/publications/components/highlight-carousel"
import HeaderSections from "@/components/header-sections";

export default function Publications() {
	return (
		<>
			<div className="container w-full flex flex-col items-center !my-8">
				<div className=" flex w-full items-center justify-between my-8">
					<HeaderSections
						title={'الأصدارات'}
						moreButton={{
							label: 'ارشيف الأصدارات',
							href: '/publications',
						}}
					/>
				</div>
				<div className="w-11/12 mx-auto ">
					<HighlightCarousel publications={publications} />
				</div>
			</div>
		</>
	)
}
