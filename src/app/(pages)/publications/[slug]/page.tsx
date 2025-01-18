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
		<div className="space-y-10">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "الأصدارات", url: "/publications" },
					{ name: "كتاب", url: "#" },
				]}
			/>
			{/* الكتاب المقصود */}
			<div className="bg-gray-200 bg-opacity-50 rounded-3xl flex flex-col p-2 !mt-20 sm:!mt-40">
				<div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
					<Image
						src={publication.image}
						width={250}
						height={200}
						alt={publication.slug}
						className="w-40 sm:w-56 h-auto rounded-xl -translate-y-16 sm:-translate-y-28"
					/>
					<div className="space-y-2 text-center sm:text-right -translate-y-10 sm:-translate-y-28">
						<p className="text-lg sm:text-2xl font-semibold">
							{publication.title}
						</p>
						<p className="text-sm sm:text-lg text-gray-500">
							{publication.author}
						</p>
						<div className="bg-white"></div>
					</div>
				</div>

				<div className="text-center -translate-y-10 !mt-8 grid grid-cols-1 sm:grid-cols-2 space-y-4">
					<p>شخصيات اخرى</p>
					<span className="font-light">
						{publication.otherNames[0]
							? publication.otherNames.map((name) => (
									<div key={name}>{name}</div>
							  ))
							: "لا يوجد"}
					</span>

					<p>المطبعة</p>
					<span className="font-light">{publication.printHouse}</span>

					<p>تاريخ الطبع</p>
					<span className="font-light">
						{publication.printDate.toISOString().split("T")[0]}
					</span>

					<p>اللغة</p>
					<span className="font-light">{publication.language}</span>

					<p>عدد الصفحات</p>
					<span className="font-light">{publication.pages}</span>

					<p>عدد الاجزاء</p>
					<span className="font-light">{publication.parts}</span>
				</div>
			</div>

			{/* كتب ذات صلة */}
			<h2 className="text-center font-semibold border-t border-b p-4">
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
