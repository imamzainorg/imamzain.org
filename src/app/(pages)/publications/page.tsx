import SectionTitle from "@/components/section"
import { HighlightCarousel } from "./components/highlight-carousel"
import Breadcrumbs from "@/components/breadcrumb"
import Section from "@/components/section"
import { dataFetcher } from "@/lib/dataFetcher"
import { Book } from "@/types/book"
import BooklibraryCard from "../library/_components/book-library-card"

export default async function page() {
	const publications = await dataFetcher<Book[]>("publications.json")

	return (
		<div className="">
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
					<HighlightCarousel publications={publications} />
				</div>
			</div>

			{/* brief about our publications */}
			<div className="w-full my-8">
				<Section
					title="نبذة عن اصدارات المؤسسة"
					text="	يعد تراث الامام السجاد عليه السلام من الكنوز المعرفية
						الإلهية التي لم تستوف البحوث والدراسات غور مكنوناته, من
						حيث الدراسة والتحليل والتوثيق , اذ يمثل مصدرا غنيا
						بالمعارف والأفكار والنظريات التربوية لهذا ارتات المؤسسة
						القيام بالتحقيق والتاليف وإتاحة الفرصة امام الباحثين
						الذين يتسمون بالأصالة والابداع والجدة لدراسة وتحليل تراث
						الامام والاسهام في عملية البناء التربوي
					"
				/>
				<div className="w-11/12 mx-auto space-y-2">
					<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
						{publications.map((publication) => (
							<BooklibraryCard
								route="/publications"
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
