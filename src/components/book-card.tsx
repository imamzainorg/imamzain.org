import { DownloadIcon } from "@/assets/icons/reusable"
import { Book } from "@/types/book"
import Image from "next/image"
import Link from "next/link"
import NewsShare from "@/app/(pages)/(activities)/news/_components/news-share"
import {
	ShoppingCartIcon,
	BookOpen,
	Languages,
	FileText,
	CalendarIcon,
	Printer,
	Users,
} from "lucide-react"

export default function BookCard({
	publication,
	publications,
}: {
	publication: Book
	publications: Book[]
}) {
	const seriesParts = publication.series
		? publications.filter((book) => book.series === publication.series)
		: []

	return (
		<div className="space-y-16 my-12 max-w-screen-xl mx-auto px-4">
			<div className="relative rounded-3xl shadow-2xl border border-gray-200 bg-gradient-to-tr from-white via-secondary/10 to-secondary/30 overflow-hidden">
				<div className="flex flex-col lg:flex-row items-center lg:items-start p-6 md:p-10 gap-8">
					<div className="w-full lg:w-1/3 flex justify-center relative group">
						<div className="relative w-full max-w-xs aspect-[3/4] rounded-xl overflow-hidden bg-transparent">
							<Image
								src={publication.image}
								fill
								alt={publication.title}
								className="object-contain transition-transform"
								priority
							/>
						</div>
					</div>

					<div className="w-full lg:w-2/3 space-y-6 text-center lg:text-right">
						<div>
							<span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mb-2">
								{publication.category}
							</span>
							<h1 className="text-3xl md:text-4xl font-bold text-gray-900">
								{publication.title}
							</h1>
							<p className="text-xl text-gray-600 mt-2">
								تأليف:{" "}
								<span className="font-medium">
									{publication.author}
								</span>
							</p>
						</div>

						<div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
							<Link
								href={publication.pdf}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-700 hover:from-primary/90 hover:to-emerald-700/90 transition-all text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg"
							>
								<DownloadIcon fill="#ffffff" />
								تنزيل الكتاب
							</Link>

							<div className="inline-flex items-center gap-2 bg-white border border-primary text-primary hover:bg-primary/10 transition-all font-medium px-6 py-3 rounded-full shadow-sm">
								<NewsShare
									url={`publications/${publication.slug}`}
									className="cursor-pointer hover:scale-110 transition-transform"
									iconSize={20}
								/>
								مشاركة
							</div>

							<Link
								href={`/services/stores`}
								className="inline-flex items-center gap-2 bg-white border border-primary text-primary hover:bg-primary/10 transition-all font-medium px-6 py-3 rounded-full shadow-sm"
							>
								<ShoppingCartIcon className="w-5 h-5" />
								اماكن البيع المباشر
							</Link>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
							<Detail
								label="عدد الصفحات"
								icon={
									<BookOpen className="w-5 h-5 text-primary" />
								}
								value={publication.pages}
							/>
							<Detail
								label="عدد الأجزاء"
								icon={
									<FileText className="w-5 h-5 text-primary" />
								}
								value={publication.parts}
							/>
							<Detail
								label="تاريخ الطبع"
								icon={
									<CalendarIcon className="w-5 h-5 text-primary" />
								}
								value={publication.printDate}
							/>
							<Detail
								label="اللغة"
								icon={
									<Languages className="w-5 h-5 text-primary" />
								}
								value={publication.language}
							/>
							<Detail
								label="المطبعة"
								icon={
									<Printer className="w-5 h-5 text-primary" />
								}
								value={publication.printHouse}
							/>
							<Detail
								label="شخصيات اخرى"
								icon={
									<Users className="w-5 h-5 text-primary" />
								}
								value={
									publication.otherNames.length
										? publication.otherNames
												.slice(
													0,
													publication.otherNames
														.length - 1,
												)
												.join(", ") +
											publication.otherNames[
												publication.otherNames.length -
													1
											]
										: "لا يوجد"
								}
							/>
						</div>
					</div>
				</div>
				{seriesParts.length > 1 && (
					<div className="px-6 md:px-10 py-6">
						<div className="w-full h-[0.5px] mb-5 bg-gradient-to-r from-transparent via-primary to-transparent" />
						<h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
							أجزاء السلسلة
						</h3>
						<div className="flex flex-wrap gap-3 justify-center">
							{seriesParts.map((part, index) => (
								<Link
									key={part.id}
									href={`/publications/${part.slug}`}
									className={`px-5 py-2 rounded-full border-2 transition-all text-sm font-medium
                    ${
						part.slug === publication.slug
							? "bg-primary text-white border-primary shadow-md"
							: "border-white text-gray-700 hover:bg-gray-100 hover:border-gray-400"
					}
                  `}
								>
									الجزء {index + 1}
								</Link>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

function Detail({
	label,
	value,
	icon,
}: {
	label: string
	value: string | number
	icon?: React.ReactNode
}) {
	return (
		<div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start">
			<div className="flex items-center gap-2 text-gray-700">
				{icon}
				<span className="font-medium">{label}</span>
			</div>
			<span className="text-gray-500 mt-1">{value}</span>
		</div>
	)
}
