import Breadcrumbs from "@/components/breadcrumb";
import { redirect } from "next/navigation";
import { publications } from "@/lib/data";
import { Book } from "@/lib/definitions";
import Image from "next/image";
import BookCard from "@/components/book-card";
import { Share2Icon,  ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

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
    <div className="space-y-10 my-8">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الأصدارات", url: "/publications" },
          { name: publication.title, url: "#" },
        ]}
      />
      {/* الكتاب المقصود */}
      <div className="pt-20 sm:pt-28  ">
        <div className="border bg-gray-100  flex  border-primary/30 shadow-xl shadow-primary/20 rounded-3xl flex-col     w-full">
          <div className="flex flex-col relative  sm:flex-row -top-24 sm:top-0     justify-center items-center ">
            <Image
              src={publication.image}
              width={350}
              height={200}
              alt={publication.slug}
              className="w-32 sm:w-36 md:w-40 md:left-8 lg:w-44 xl:w-56 xl:left-32 xl:-top-10 md:relative lg:left-24  h-auto    rounded-xl  sm:-translate-y-28"
            />
            <div className="flex flex-col sm:p-4 lg:p-0 ">
              <div className=" space-y-2 mt-16 sm:-mt-3 xl:mb-24  lg:pb-10 text-center sm:text-right -translate-y-10 sm:-translate-y-28  ">
                <p className="text-lg sm:text-xl  xl:text-3xl font-semibold">
                  {publication.title}
                </p>
                <p className="text-sm sm:text-lg xl:text-xl  text-center  mr-4 text-gray-500">
                  {publication.author}
                </p>
              </div>
              <div className="  flex flex-row justify-between  items-center w-full sm:relative sm:-top-20 xl:-top-36  p-1 ">
                <button className="bg-primary text-[10px] whitespace-pre p-4 sm:text-[14px] md:text-lg xl:text-xl   rounded-[30px] text-white  ">
                  إبدأ بالقراءة ⟵{" "}
                </button>
                <Share2Icon
                  stroke="#006654"
                  fill="none"
                  strokeWidth={2.5}
                  className=" relative right-12 sm:right-14 w-1/2 md:right-20 xl:right-32"
                />{" "}
                <Link href={`/publications/${slug}/components`}>
                  <ShoppingCartIcon
                    stroke="#006654"
                    fill="none"
                    strokeWidth={2.5}
                    className=" relative  md:right-9"
                  ></ShoppingCartIcon>
                </Link>
              </div>
              <hr className="sm:relative sm:-top-16 xl:-top-32 " />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row  ">
            <div className="w-full relative -top-10  sm:text-sm md:text-lg  mx-auto text-center xl:text-xl     sm:text-start sm:pr-24 ">
              <p className=" ">شخصيات اخرى</p>
              <span className="font-extralight text-slate-500 sm:m-5  ">
                {publication.otherNames[0]
                  ? publication.otherNames.map((name) => (
                      <div key={name}>{name}</div>
                    ))
                  : "لا يوجد"}
              </span>

							<p className=" mt-4">المطبعة</p>

							<span className="font-extralight text-slate-500 sm:m-5  ">
								{publication.printHouse}
							</span>

							<p className="mt-4">تاريخ الطبع</p>

							<span className="font-extralight text-slate-500 sm:m-5">
								{
									publication.printDate
										.toISOString()
										.split("T")[0]
								}{" "}
							</span>

							<p className="mt-4">اللغة</p>

							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.language}
							</span>

							<p className="mt-4">عدد الصفحات</p>

							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.pages}
							</span>

							<p className="mt-4">عدد الاجزاء</p>

							<span className="font-extralight text-slate-500 sm:m-5">
								{publication.parts}
							</span>
						</div>
						<div className=" sm:w-3/4 p-4 sm:m-2 border-t-1 sm:relative sm:-top-8 sm:border-none mx-auto w-full text-sm lg:text-lg xl:text-xl pt-2 sm:pt-0 ">
							الوصف
							<br />
							<span className="relative right-4 text-slate-500 ">
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
						route="/publications"
						key={publication.id}
						publication={publication}
						downloadable
					/>
				))}
			</div>
		</div>
	)
}
