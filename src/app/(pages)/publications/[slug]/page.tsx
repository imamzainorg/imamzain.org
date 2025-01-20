import Breadcrumbs from "@/components/breadcrumb"
import { redirect } from "next/navigation"
import { publications } from "@/lib/data"
import { Book } from "@/lib/definitions"
import Image from "next/image"
import BookCard from "@/components/book-card"

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	// TODO build api endpoint to fetch publication by slug
	// const publication = await fetch(`https://api.imamzain.org/publications/${slug}`)

	// mimic the data recieved from fetch(`https://api.imamzain.org/publications/${slug}`)
	const publication: Book | undefined = publications.find(
		(book) => book.slug === slug,
	)

	if (!publication) {
		return redirect("/404")
	}

	return (
		<div className="space-y-10 my-8">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "الأصدارات", url: "/publications" },
					{ name: "كتاب", url: "#" },
				]}
			/>
			{/* الكتاب المقصود */}
			<div className="bg-white/20 border border-primary/30 shadow-xl shadow-primary/20 rounded-3xl flex flex-col p-2 !mt-20 sm:!mt-40">
				<div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 lg:gap-20 items-center">
					<Image
						src={publication.image}
						width={350}
						height={200}
						alt={publication.slug}
						className="w-40 sm:w-60 h-auto rounded-xl -translate-y-16 sm:-translate-y-28"
					/>
					<div className="space-y-2 text-center sm:text-right -translate-y-10 sm:-translate-y-28 lg:-translate-y-24 w-1/2">
						<p className="text-lg sm:text-2xl lg:text-4xl font-semibold">
							{publication.title}
						</p>
						<p className="text-sm sm:text-lg lg:text-2xl text-gray-500">
							{publication.author}
						</p>
					</div>
				</div>

				<div className="w-5/6 lg:w-3/6 mx-auto text-center sm:text-right sm:text-xl lg:text-2xl -translate-y-10 !mt-8 sm:grid sm:grid-cols-10 sm:items-center space-y-4 sm:!-mt-8">
					<p className="col-span-3">شخصيات اخرى</p>
					<span className="hidden sm:block col-span-1">:</span>
					<span className="font-extralight text-slate-500 col-span-6">
						{publication.otherNames[0]
							? publication.otherNames.map((name) => (
									<div key={name}>{name}</div>
							  ))
							: "لا يوجد"}
					</span>

					<p className="col-span-3">المطبعة</p>
					<span className="hidden sm:block col-span-1">:</span>
					<span className="font-extralight text-slate-500 col-span-6">
						{publication.printHouse}
					</span>

					<p className="col-span-3">تاريخ الطبع</p>
					<span className="hidden sm:block col-span-1">:</span>
					<span className="font-extralight text-slate-500 col-span-6">
						{publication.printDate.toISOString().split("T")[0]}{" "}
					</span>

					<p className="col-span-3">اللغة</p>
					<span className="hidden sm:block col-span-1">:</span>
					<span className="font-extralight text-slate-500 col-span-6">
						{publication.language}
					</span>

					<p className="col-span-3">عدد الصفحات</p>
					<span className="hidden sm:block col-span-1">:</span>
					<span className="font-extralight text-slate-500 col-span-6">
						{publication.pages}
					</span>

					<p className="col-span-3">عدد الاجزاء</p>
					<span className="hidden sm:block col-span-1">:</span>
					<span className="font-extralight text-slate-500 col-span-6">
						{publication.parts}
					</span>
				</div>
			</div>

			{/* كتب ذات صلة */}
			<h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
				كتب ذات صلة
			</h2>
			<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
				{publications.slice(0, 2).map((publication) => (
					<BookCard
						key={publication.id}
						publication={publication}
						downloadable
					/>
				))}
			</div>
		</div>
	)
}
