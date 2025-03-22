import BooklibraryCard from "../_components/book-library-card"
import Breadcrumbs from "@/components/breadcrumb"
import RelatedBooks from "../_components/related-books"
import ShowcaseSection from "../_components/showcase-section"
import SectionCta from "@/components/section-cta"
import { dataFetcher } from "@/lib/dataFetcher"
import { Book } from "@/types/book"
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default async function Page() {
	const libraryBooks = await dataFetcher<Book[]>("library.json")
	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: " المكتبة التخصصية", url: "/library" },
					{ name: "رسالة الحقوق", url: "#" },
				]}
			/>
   <div className="mt-32 mb-8 mx-auto md:flex justify-center gap-20 p-16 backdrop-blur-[1px] shadow-lg shadow-primary/10 rounded-[110px] border border-primary">
        <div className="w-full flex flex-col justify-around">
          <div className="lg:space-y-20 md:space-y-10 space-y-7">
            <h1 className="text-base md:text-3xl lg:text-4xl xl:text-5xl font-semibold">رسالة الحقوق</h1>
            <p className= " text-sm md:text-xl lg:tetx-3xl 2xl:text-4xl leading-normal pb-5">

			تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري، وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً بالإنسان وحقوقه كلّها وتشتمل على شبكة علاقات الإنسان الثلاثة، مع ربِّه ونفسِه ومجتمعه.   </p>
          </div>
          <Link
            href="/library/risalat-al-huqoq/read"
            className="w-full xs:w-fit  text-sm md:text-xl py-2 px-4 border-2 rounded-xl border-primary flex items-center gap-4 group"
          >
			تصفح رسالة الحقوق
            <ArrowLeft className="opacity-0 translate-x-3 flex items-end justify-start group-hover:opacity-100 group-hover:translate-x-0 duration-150" />
          </Link>
        </div>
        <Image
          src={`/shapes/book-bg.svg`}
          className="w-1/3 hidden md:block"
          width={50}
          height={50}
          alt="al-sahifa cover "
        />
      </div>
	
			<div className="m-10">
				<SectionCta
					links={[
						{ label: "الصحيفة كاملة", href: "#" },
						{ label: "معجم الألفاظ", href: "#" },
						{ label: "ما ألحق بها", href: "#" },
					]}
				/>
				<ShowcaseSection
					route="/library/risalat-al-huqoq"
					showcaseBooks={libraryBooks.slice(0, 3)}
				/>
				<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
					{libraryBooks.map((book) => (
						<BooklibraryCard
							route="/library/risalat-al-huqoq"
							key={book.id}
							publication={book}
						/>
					))}
				</div>
				<div className="lg:hidden ">
					<RelatedBooks
						route="/library/risalat-al-huqoq"
						relatedBooks={libraryBooks.slice(1, 3)}
					/>
				</div>
				<div className="my-4">
					<SectionCta
						links={[
							{ label: "الصحيفة كاملة", href: "#" },
							{ label: "معجم الفاظ الصحيفة", href: "#" },
							{ label: "ما ألحق بها", href: "#" },
						]}
					/>
				</div>
			</div>
		</div>
	)
}
