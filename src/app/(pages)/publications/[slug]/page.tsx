import Breadcrumbs from "@/components/breadcrumb";
import { redirect } from "next/navigation";
import { publications } from "@/lib/data";
import { Book } from "@/lib/definitions";
import Image from "next/image";
import BookCard from "@/components/book-card";
import { MailOpen } from "lucide-react";
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  // TODO build api endpoint to fetch publication by slug
  // const publication = await fetch(`https://api.imamzain.org/publications/${slug}`)

  // mimic the data recieved from fetch(`https://api.imamzain.org/publications/${slug}`)
  const publication: Book | undefined = publications.find(
    (book) => book.slug === slug
  );

  if (!publication) {
    return redirect("/404");
  }

  return (
    <div className="space-y-10 my-8">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الأصدارات", url: "/publications" },
          { name: publication.title, url: "#" },
        ]}
      />
      {/* الكتاب المقصود */}
      <div className="">
        <div className="flex flex-col relative lg:top-56  sm:flex-row justify-center items-center lg:gap-6 lg:items-start">
          <Image
            src={publication.image}
            width={350}
            height={200}
            alt={publication.slug}
            className="w-32 h-auto  rounded-xl lg:-translate-y-16 sm:-translate-y-28"
          />
          <div className="flex flex-col">
            <div className="space-y-2 mt-10 text-center sm:text-right -translate-y-10 sm:-translate-y-28 lg:-translate-y-24 ">
              <p className="text-lg sm:text-2xl  lg:text-2xl font-semibold">
                {publication.title}
              </p>
              <p className="text-sm sm:text-lg lg:text-xl mr-4 text-gray-500">
                {publication.author}
              </p>
            </div>
            <div className="flex flex-row w-full p-5">
              <button className="bg-primary p-4 rounded-3xl text-white w-1/2  ">
                000ابدأ القراءة
              </button>
              <MailOpen
                stroke="#bb9661"
                fill="none"
                strokeWidth={1.5}
                className=" w-full right-32 top-4 relative"
              />
            </div>
            <hr />
          </div>
        </div>
        <div className="bg-white/20 border  bg-red-50 flex  border-primary/30 shadow-xl shadow-primary/20 rounded-3xl  flex-row  w-full">
          <div className="w-1/2 mx-auto text-center lg:pr-48  sm:text-right sm:text-xl lg:text-xl  sm:grid sm:grid-cols-10 sm:items-center pt-40 " >
            <p className="col-span-3 ">شخصيات اخرى</p>
            <span className="hidden sm:block col-span-1">:</span>
            <span className="font-extralight text-slate-500 col-span-6">
              {publication.otherNames[0]
                ? publication.otherNames.map((name) => (
                    <div key={name}>{name}</div>
                  ))
                : "لا يوجد"}
            </span>

            <p className="col-span-3 ">المطبعة</p>
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
		  <div className="bg-amber-200 w-1/2 mx-auto  sm:text-xl lg:text-2xl  sm:grid sm:grid-cols-10  pt-40">
			ssss
		  </div>
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
  );
}
