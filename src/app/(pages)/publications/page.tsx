import BookCard from "@/components/book-card"
import SectionTitle from "@/components/section"
import { HighlightCarousel } from "./components/highlight-carousel"
import Breadcrumbs from "@/components/breadcrumb"
import { publications } from "@/lib/data"

export default async function page() {
	// TODO build api endpoint to fetch publications
	// const publications = await fetch("https://api.imamzain.org/publications")

	return (
		<div className="w-11/12 lg:w-9/12 mx-auto mt-28 sm:mt-32 lg:mt-40 xl:mt-48">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الأصدارات", url: "/publications" },
				]}
			/>

			{/* highlighted books */}
			<div className="w-full">
				<SectionTitle title="الأصدارات" />
				<div className="w-11/12 mx-auto my-8">
					<HighlightCarousel
						publications={publications.slice(0, 3)}
					/>
				</div>
			</div>

			{/* brief about our publications */}
			<div className="w-full my-8">
				<SectionTitle title="نبذة عن اصدارات المؤسسة" />
				<div className="w-11/12 mx-auto space-y-2">
					<p className="w-11/12 mx-auto text-sm sm:text-lg lg:text-2xl leading-5 sm:leading-10 tracking-normal text-justify mb-5">
						يعد تراث الامام السجاد عليه السلام من الكنوز المعرفية
						الإلهية التي لم تستوف البحوث والدراسات غور مكنوناته, من
						حيث الدراسة والتحليل والتوثيق , اذ يمثل مصدرا غنيا
						بالمعارف والأفكار والنظريات التربوية لهذا ارتات المؤسسة
						القيام بالتحقيق والتاليف وإتاحة الفرصة امام الباحثين
						الذين يتسمون بالأصالة والابداع والجدة لدراسة وتحليل تراث
						الامام والاسهام في عملية البناء التربوي
					</p>
					<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
						{publications.map((publication) => (
							<BookCard
								key={publication.id}
								publication={publication}
								downloadable
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
