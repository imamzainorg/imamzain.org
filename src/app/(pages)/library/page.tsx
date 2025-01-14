import BookCard from "@/components/book-card"
import Breadcrumbs from "@/components/breadcrumb"
import SectionTitle from "@/components/section"
import { ChevronDown, SearchIcon } from "lucide-react"

import { libraryBooks } from "@/lib/data"

export default function page() {
	return (
		<div className="">
			<div className="m-10">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المكتبة", url: "#" },
						{ name: "ما كتب عن الامام", url: "#" },
					]}
				/>
				<div className="flex w-full just-between my-8">
					<div className="w-1/2">
						<SectionTitle title="قائمة الكتب" />
					</div>
					<div className="w-1/2 flex gap-2 items-center justify-end">
						<span>الترتيب حسب:</span>
						<select
							id="sorting"
							className="border-none bg-transparent focus:border-none active:border-none"
						>
							<option value="latest" defaultChecked>
								الأحدث
							</option>
							<option value="common">الأكثر شيوعا</option>
						</select>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
					<div className="col-span-3 w-1/2 relative lg:mb-4">
						<input
							type="text"
							className="w-full rounded-xl bg-transparent border-primary"
							placeholder="البحث عن عناوين الكتب"
						/>
						<div className="absolute text-primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
							<div className="h-2/3 w-[1px] bg-slate-400" />
							<SearchIcon size={20} strokeWidth={1.5} />
						</div>
					</div>
					<div className="col-span-1">
						<span className="font-semibold my-2">
							مواضيع المكتبة
						</span>
						<div className="col-span-3 relative w-full">
							<input
								type="text"
								className="w-full rounded-xl bg-transparent border-primary"
								placeholder="البحث عن مواضيع المكتبة"
							/>
							<div className="absolute text-primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
								<div className="h-2/3 w-[1px] bg-slate-400" />
								<ChevronDown size={20} strokeWidth={1.5} />
							</div>
						</div>
					</div>
					<div className="col-span-1">
						<span className="font-semibold my-2">المؤلف</span>
						<div className="col-span-3 relative w-full">
							<input
								type="text"
								className="w-full rounded-xl bg-transparent border-primary"
								placeholder="البحث عن المؤلف"
							/>
							<div className="absolute text-primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
								<div className="h-2/3 w-[1px] bg-slate-400" />
								<ChevronDown size={20} strokeWidth={1.5} />
							</div>
						</div>
					</div>
					<div className="col-span-1">
						<span className="font-semibold my-2">الناشر</span>
						<div className="col-span-3 relative w-full">
							<input
								type="text"
								className="w-full rounded-xl bg-transparent border-primary"
								placeholder="البحث عن دور النشر"
							/>
							<div className="absolute text-primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
								<div className="h-2/3 w-[1px] bg-slate-400" />
								<ChevronDown size={20} strokeWidth={1.5} />
							</div>
						</div>
					</div>
				</div>
				<div className="flex mx-auto justify-center items-center gap-4 my-8">
					<div className="w-52 h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center text-white">
						رسائل
					</div>
					<div className="w-1 h-1 bg-secondary rounded-full" />
					<div className="w-52 h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center text-white">
						مجلات
					</div>
				</div>

				<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
					{libraryBooks.map((book) => (
						<BookCard key={book.id} publication={book} />
					))}
				</div>
			</div>
		</div>
	)
}
