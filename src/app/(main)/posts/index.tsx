import Image from "next/image"
import Link from "next/link"

import {
	ChevronRightArrowIcon, 
} from "@/assets/icons/reusable"
import SectionTitle from "@/components/section" 
import { newsPosts } from "@/lib/data" 


export default function Posts() {
  return (
    <>
			<div className="container py-20 flex flex-col items-center gap-6">
				<div className=" w-full flex items-center justify-between my-8">
					<SectionTitle title="الأخبار" />
					<Link
						href="/news"
						className="flex font-semibold gap-2 text-white items-center py-2 px-2 rounded-lg bg-primary text-xs sm:text-sm"
					>
						<p className="text-nowrap">ارشيف الاخبار</p>
						<ChevronRightArrowIcon
							className="rotate-180 p-1.5 sm:p-1"
							stroke="#ffffff"
							strokeWidth={0.5}
							fill="#ffffff"
						/>
					</Link>
				</div>
				<div className="flex flex-wrap justify-between w-full gap-y-4">
					{newsPosts.slice(0, 4).map((item, idx) => {
						const responsiveSize =
							"w-[150px] h-[280px] sm:w-[250px] sm:h-[400px] md:w-[240px] md:h-[400px] xl:w-[250px] xl:h-[450px] 2xl:w-[300px] 2xl:h-[550px]"
						return (
							<Link
								href={`/news/${item.slug}`}
								className={`relative bg-secondary image-mask ${responsiveSize} hover:-translate-y-4 duration-300`}
								key={idx}
							>
								<div
									className={`absolute -bottom-3 ${responsiveSize} bg-cover bg-center image-mask`}
									style={{
										backgroundImage: `url(${item.image})`,
									}}
								>
									<div
										className={`bg-gradient-to-t from-primary to-transparent ${responsiveSize} flex justify-center items-end pr-3 sm:pr-8 md:pr-6 pb-12 image-mask`}
									>
										<div className="flex flex-col text-white/90">
											<div className="flex gap-2 items-center text-xl sm:text-2xl font-bold">
												<Image
													src={
														"/shapes/title-icon.svg"
													}
													width={10}
													height={10}
													alt="title icon"
													className="w-3 md:w-4"
												/>
												خبــــر
											</div>
											<p className="text-xs sm:text-sm line-clamp-2 p-1 pr-5 pb-8 md:pb-5 xl:pb-10">
												{item.summary}
											</p>
										</div>
									</div>
								</div>
							</Link>
						)
					})}
				</div>
			</div>
    </>
  );
}