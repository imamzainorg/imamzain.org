import BookCard from "@/components/book-card"
import Breadcrumbs from "@/components/breadcrumb"
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel"
import { DownloadIcon, ShareIcon } from "lucide-react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { publications } from "@/lib/data"
import { Book } from "@/lib/definitions"

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug

	// TODO build api endpoint to fetch publication by slug
	// const publication = await fetch(`https://api.imamzain.org/publications/${slug}`)

	// mimic the data recieved from fetch(`https://api.imamzain.org/publications/${slug}`)
	const publication: Book | null =
		publications.find((book) => book.slug === slug) || null

	if (!publication) {
		return redirect("/404")
	}

	return (
		<div className="w-11/12 mx-auto my-5">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "الأصدارات", url: "/publications" },
					{ name: publication.title, url: "/publications" },
				]}
			/>
			<div className="flex flex-col justify-center items-center">
				{/* book info container */}
				<div className="relative my-40 flex flex-col justify-center max-w-screen-xl w-full gap-10 rounded-lg bg-gray-50 shadow-md pt-52">
					{/* image and main info container */}
					<div className="absolute -top-44 flex w-full justify-center gap-20 items-center">
						{/* image container */}
						<div className="overflow-hidden drop-shadow-sm flex md:justify-center">
							<Image
								width={600}
								height={600}
								className="w-60 object-cover rounded-xl border-opacity-45 border-2 border-gray-200 "
								src={publication.image}
								alt={publication.title}
							/>
						</div>
						<div className=" flex flex-col gap-10">
							<div>
								<h1 className="text-2xl font-bold mb-4">
									{publication.title}
								</h1>
								<p className="text-xl font-semibold text-gray-400">
									تأليف {publication.author}
								</p>
							</div>
							<div className="pb-4 w-full border-b-2 border-slate-300 flex justify-between">
								<button className="bg-primary text-md p-5 rounded-full flex gap-4 items-center duration-300">
									<p>قم بتنزيل الكتاب</p>
									<DownloadIcon />
								</button>
								<button>
									<ShareIcon />
								</button>
							</div>
						</div>
					</div>
					<div className="w-3/4 mx-auto flex justify-start gap-10 pb-10 border-b-2 border-slate-300">
						<div className="w-1/3">
							<ul>
								<li>
									<p className="text-2xl font-semibold my-2">
										تفاصيل الكتاب
									</p>
									<ul className="list-disc mr-10 text-md">
										<li>
											<div className="flex gap-x-2">
												<div>عدد الصفحات:</div>
												<div>
													{publication.pages || 0}
												</div>
											</div>
										</li>
										<li>
											<div className="flex gap-x-2">
												<div>دار النشر:</div>
												<div>
													{publication.publisher ||
														""}
												</div>
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</div>
						<div className="w-1/2">
							<h2 className="text-2xl font-semibold">الوصف</h2>
							<p className="text-gray-600 mr-10 text-lg text-justify">
								{publication.summary}
							</p>
						</div>
					</div>
				</div>
				<div className="w-full border">
					<div className="w-1/2 rounded-full h-0.5 mx-auto bg-primary" />
					<h2 className="text-3xl font-semibold text-center my-10">
						كتب ذات صلة
					</h2>
					<Carousel
						opts={{ startIndex: publications.length - 1 }}
						className="w-2/3 mx-auto"
					>
						<CarouselContent className="flex-row-reverse">
							{publications.map((book, index) => (
								<CarouselItem
									key={index}
									className="md:basis-1/4"
								>
									<BookCard publication={book} />
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</div>
		</div>
	)
}
