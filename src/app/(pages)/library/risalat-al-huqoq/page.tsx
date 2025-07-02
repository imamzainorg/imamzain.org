import BooklibraryCard from "../_components/book-library-card";
import Breadcrumbs from "@/components/breadcrumb";
import RelatedBooks from "../_components/related-books";
import ShowcaseSection from "../_components/showcase-section"; 
import { dataFetcher } from "@/lib/dataFetcher";
import { Book } from "@/types/book";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export default async function Page() {
  const libraryBooks = await dataFetcher<Book[]>("library.json");
  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: " المكتبة التخصصية", url: "/library" },
          { name: "رسالة الحقوق", url: "#" },
        ]}
      />

      <div className="relative mt-4 md:mt-16 mb-8 mx-auto flex justify-start gap-20 p-8 md:p-10 backdrop-blur-[1px] shadow-lg shadow-primary/10 dark:shadow-Muharram_primary/10 rounded-[60px] border border-primary dark:border-Muharram_primary ">
        <div className="w-full md:w-3/4 flex flex-col justify-around gap-5 md:pr-10  ">
          <h1 className="text-base md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
            رسالة الحقوق
          </h1>
          <p className="w-3/4 text-sm md:text-xl lg:text-3xl leading-10 pb-5">
            تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري، وهي من
            الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً بالإنسان وحقوقه كلّها
            وتشتمل على شبكة علاقات الإنسان الثلاثة، مع ربِّه ونفسِه ومجتمعه.{" "}
          </p>
          <Link
            href="/library/risalat-al-huqoq/read/introduction"
            className="w-full xs:w-fit  text-sm md:text-xl py-2 px-4 border-2 rounded-xl border-primary dark:border-Muharram_primary flex items-center gap-4 group"
          >
            تصفح رسالة الحقوق
            <ArrowLeft className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 duration-150" />
          </Link>
        </div>
        <div className="w-80 max-md:hidden left-20 -top-20 absolute">
           <Image
                src={`/shapes/book-bg.svg`}
                className="w-full  dark:hidden"
                width={50}
                height={50}
                alt="al-sahifa cover"
              />
                  <Image
                src={`/shapes/book-bg_Muharram.svg`}
                className="w-full hidden dark:block "
                width={50}
                height={50}
                alt="al-sahifa cover"
              />
        </div>
      </div>

      <div className="m-10">
        <h2 className="text-xl lg:text-3xl font-semibold mt-10">
          ما كتب عن رسالة الحقوق
        </h2>
        <ShowcaseSection
          route="/library/risalat-al-huqoq"
          showcaseBooks={libraryBooks.slice(0, 3)}
        />
        <div className="bg-secondary/40 dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
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

      </div>
    </div>
  );
}
