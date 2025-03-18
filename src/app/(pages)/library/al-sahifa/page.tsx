import BooklibraryCard from "../_components/book-library-card";
import Breadcrumbs from "@/components/breadcrumb";
import RelatedBooks from "../_components/related-books";
import ShowcaseSection from "../_components/showcase-section";
import SectionCta from "@/components/section-cta";
import { dataFetcher } from "@/lib/dataFetcher";
import { Book } from "@/types/book";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";


export default async function Page() {
  const libraryBooks = await dataFetcher<Book[]>("library.json");
  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: " المكتبة التخصصية", url: "/library" },
          { name: "الصحيفة السجادية", url: "#" },
        ]}
      />

      <div className="mt-32 mb-8 mx-auto flex justify-center gap-20 p-16 backdrop-blur-[1px] shadow-lg shadow-primary/10 rounded-[110px] border border-primary">
        <div className="w-full flex flex-col justify-around">
        <div className="lg:space-y-20 md:space-y-10 space-y-7">
        <h1 className="text-base md:text-3xl lg:text-4xl xl:text-5xl font-semibold">الصحيفة السجادية الكاملة</h1>
        <p className= " text-sm md:text-xl lg:tetx-3xl 2xl:text-4xl leading-normal pb-5">
              مجموعة من الأدعية والمناجيات للإمام زين العابدين، تجسد أسمى معاني
              الإيمان والخشوع.
            </p>
          </div>
          <Link
            href="/library/al-sahifa/read"
            className="w-full xs:w-fit  text-sm md:text-xl py-2 px-4 border-2 rounded-xl border-primary flex items-center gap-4 group"
            >
            تصفح الصحيفة الكاملة
            <ArrowLeft className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 duration-150" />
          </Link>
        </div>
        <Image
          src={`/shapes/book-bg.svg`}
          className="w-1/3 hidden md:block"
          width={50}
          height={50}
          alt="al-sahifa cover"
        />
      </div>
	

      <SectionCta
        links={[
          { label: "الصحيفة كاملة", href: "#" },
          { label: "معجم الألفاظ", href: "#" },
          { label: "ما ألحق بها", href: "#" },
        ]}
      />
      <ShowcaseSection
        route="/library/al-sahifa"
        showcaseBooks={libraryBooks.slice(0, 3)}
      />
      <div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
        {libraryBooks.map((book) => (
          <BooklibraryCard
            route="/library/al-sahifa"
            key={book.id}
            publication={book}
          />
        ))}
      </div>
      <div className="lg:hidden">
        <RelatedBooks
          route="/library/al-sahifa"
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
  );
}
