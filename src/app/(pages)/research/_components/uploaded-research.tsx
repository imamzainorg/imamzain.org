"use client"
import { ChevronRightArrowIcon } from "@/assets/icons/reusable"
import { dataFetcher } from "@/lib/dataFetcher"
import { Research } from "@/types/research"
import { faFilePdf } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FileText, SearchIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function UploadedResearch() {
	const [research, setResearch] = useState<Research[]>([])

	useEffect(() => {
		const fetchResearch = async () => {
			const posts = await dataFetcher<Research[]>("research.json")
			setResearch(posts)
		}
		fetchResearch()
	}, [])
	return (
		<div className="py-14">
			<div className="flex justify-between pb-5">
				<h1 className="text-primary text-3xl font-bold">
					البحوث المرفوعة{" "}
				</h1>
				<div className="col-span-1 w-full md:col-span-3 md:w-72 relative lg:mb-4">
					<input
						type="text"
						// value={searchTitle}
						// onChange={(e) => setSearchTitle(e.target.value)}
						className="w-full rounded-2xl md:text-sm lg:text-lg p-1 bg-transparent border border-primary focus:border-primary   outline-none   "
						placeholder="البحث عن البحوث"
					/>
					<div className="absolute text-primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
						<div className="h-2/3 w-[1px] bg-slate-400" />
						<SearchIcon size={20} strokeWidth={1.5} />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2  gap-4 ">
				{research &&
					research.slice(0, 4).map((item, index) => (
						<div
							key={index}
							className="bg-white rounded-2xl    w-full h-full p-5 flex flex-col gap-4 cursor-pointer
               shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)] "
						>
							<h1 className="text-xl font-bold">{item.title}</h1>
							<div className="text-sm text-neutral-500 flex justify-between items-center">
								<p>اسم الؤلف : {item.author}</p>
								<p>تاريخ النشر : {item.printDate}</p>
							</div>
							<p>{item.description}</p>
							<hr className="border border-neutral-400  w-full" />
							<div className="w-full flex justify-end gap-2">
								<Link
									href={`/research/${item.slug}`}
									className="px-4 py-2 text-white     bg-primary rounded-xl hover:bg-primary/95"
								>
									<FontAwesomeIcon
										icon={faFilePdf}
										className="text-[20px] mt-1 ml-1"
									/>
								</Link>
								<Link
									href={`/research/${item.slug}`}
									className="px-4 py-2  text-white   text-xl bg-primary rounded-xl hover:bg-primary/95"
								>
									<FileText
										strokeWidth={2}
										color="#ffffff"
										className="mt-0.5"
									/>
								</Link>
							</div>
						</div>
					))}
			</div>

			<div className="flex justify-end mt-10">
				<Link
					href={"/research/archive"}
					className="flex font-semibold gap-2 w-fit  text-white items-center  py-2 px-4 pr-5 max-lg:py-1 rounded-lg bg-primary text-xs sm:text-sm"
				>
					<p className="text-nowrap">المزيد</p>
					<ChevronRightArrowIcon
						className="rotate-180 p-1.5 sm:p-1"
						stroke="#ffffff"
						strokeWidth={0.5}
						fill="#ffffff"
					/>
				</Link>
			</div>
		</div>
	)
}
