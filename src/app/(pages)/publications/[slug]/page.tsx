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
      <div className="pt-20 sm:pt-28 ">
        <div className="bg-white/20 border    flex  border-primary/30 shadow-xl shadow-primary/20 rounded-3xl flex-col   lg:flex-row  w-full">
          <div className="flex flex-col relative  sm:flex-row -top-24 sm:top-0     justify-center items-center lg:gap-6 lg:items-start">
            <Image
              src={publication.image}
              width={350}
              height={200}
              alt={publication.slug}
              className="w-32 sm:w-40 h-auto   rounded-xl lg:-translate-y-16 sm:-translate-y-28"
            />
            <div className="flex flex-col ">
              <div className=" space-y-2 mt-16 sm:mt-10 text-center sm:text-right -translate-y-10 sm:-translate-y-28 lg:-translate-y-24 ">
                <p className="text-lg sm:text-2xl  lg:text-2xl font-semibold">
                  {publication.title}
                </p>
                <p className="text-sm sm:text-lg text-center lg:text-xl mr-4 text-gray-500">
                  {publication.author}
                </p>
              </div>
              <div className="  flex flex-row justify-between items-center w-full sm:relative sm:-top-20  p-1 lg:p-5">
                <button className="bg-primary text-[10px]  p-3  rounded-2xl text-white  ">
                  000ابدأ القراءة
                </button>
                <MailOpen
                  stroke="#bb9661"
                  fill="none"
                  strokeWidth={1.5}
                  className=" relative  w-1/2  "
                />
              </div>
              <hr className="" />
            </div>
          </div>
    <div className="flex flex-col sm:flex-row bg-red-700">
            <div className="w-full relative -top-10 lg:w-1/2 mx-auto text-center  lg:pr-48  sm:text-xl lg:text-xl  sm:grid sm:grid-cols-10  ">
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
            <div className="lg:w-1/2 p-4 border-t-1 mx-auto w-full text-sm  lg:text-2xl pt-2 lg:pt-40">
              الوصف
              <br />
              <span className="m-4 p-2 ">
                الوصف الاجزاء يوجدب صلة الطبع اللغة الوصف
              </span>
            </div>
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
