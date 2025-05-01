import Breadcrumbs from "@/components/breadcrumb";
import { redirect } from "next/navigation";
import { Book } from "@/types/book";
import Image from "next/image";
import { ShoppingCartIcon, BookOpen, Clock, Languages, FileText } from "lucide-react";
import Link from "next/link";
import { dataFetcher } from "@/lib/dataFetcher";
import { DownloadIcon } from "@/assets/icons/reusable";
import NewsShare from "../../(activities)/news/_components/news-share";
import BooklibraryCard from "../../library/_components/book-library-card";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const publications = await dataFetcher<Book[]>("publications.json");

  const publication: Book | undefined = publications.find(
    (book) => book.slug === slug
  );

  if (!publication) {
    return redirect("/404");
  }

  let seriesParts: Book[] = [];

  if (publication.series) {
    seriesParts = publications.filter(
      (book) => book.series === publication.series
    );
  }

  

  return (
    <div className="space-y-16 my-12 max-w-screen-xl mx-auto px-4">
      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "الأصدارات", url: "/publications" },
          { name: publication.title, url: "#" },
        ]}
      />

 
      <div className="relative rounded-3xl shadow-xl border border-gray-200 bg-white overflow-hidden transition-all hover:shadow-2xl">
        

        <div className="flex flex-col lg:flex-row items-center lg:items-start p-6 md:p-10 gap-8">
        
          <div className="w-full lg:w-1/3 flex justify-center relative group">
            <div className="relative w-full max-w-xs aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={publication.image}
                fill
                alt={publication.title}
                className="object-cover transition-transform group-hover:scale-105"
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
                تأليف: <span className="font-medium">{publication.author}</span>
              </p>
            </div>

         
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4">
              <Link
                download
                href={publication.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-emerald-700 hover:from-primary/90 hover:to-emerald-700/90 transition-all text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg"
              >
                <DownloadIcon fill="#ffffff" />
                تنزيل الكتاب
              </Link>
			  
              
 <div
  className="inline-flex items-center gap-2 bg-white border border-primary text-primary hover:bg-primary/10 transition-all font-medium px-6 py-3 rounded-full shadow-sm"
  >
             
               
               <NewsShare
                slug={publication.slug}
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
                شراء نسخة ورقية
              </Link>
            </div>

          
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-2 text-gray-700">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="font-medium">عدد الصفحات</span>
                </div>
                <span className="text-gray-500 mt-1">{publication.pages}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-2 text-gray-700">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="font-medium">عدد الأجزاء</span>
                </div>
                <span className="text-gray-500 mt-1">{publication.parts}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="font-medium">تاريخ الطبع</span>
                </div>
                <span className="text-gray-500 mt-1">{publication.printDate}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-2 text-gray-700">
                  <Languages className="w-5 h-5 text-primary" />
                  <span className="font-medium">اللغة</span>
                </div>
                <span className="text-gray-500 mt-1">{publication.language}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start">
                <span className="font-medium text-gray-700">المطبعة</span>
                <span className="text-gray-500 mt-1">{publication.printHouse}</span>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg flex flex-col items-center lg:items-start">
                <span className="font-medium text-gray-700">شخصيات أخرى</span>
                <span className="text-gray-500 mt-1">
                  {publication.otherNames.length ? (
                    <div className="flex flex-wrap gap-1 justify-center lg:justify-start">
                      {publication.otherNames.map((name) => (
                        <span key={name} className="bg-gray-200 px-2 py-1 rounded text-sm">
                          {name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    "لا يوجد"
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

     
        {seriesParts.length > 1 && (
          <div className="px-6 md:px-10 py-6 bg-gray-50 border-t">
            <h3 className="text-xl font-bold mb-4 text-gray-800">أجزاء السلسلة:</h3>
            <div className="flex flex-wrap gap-3">
              {seriesParts.map((part, index) => (
                <Link
                  key={part.id}
                  href={`/publications/${part.slug}`}
                  className={`px-5 py-2 rounded-full border-2 transition-all text-sm font-medium
                    ${
                      part.slug === publication.slug
                        ? "bg-primary text-white border-primary shadow-md"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400"
                    }
                  `}
                >
                  الجزء {index + 1}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* وصف الكتاب */}
        <div className="p-6 md:p-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-2">
            وصف الكتاب
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
            <p className="p-4">
          قريباً  </p>
            
          </div>
        </div>
      </div>

      {/* كتب ذات صلة */}
	  <div className="smart-library">
  <h3 className="smart-title">
    <span className="title-underline"></span>
  </h3>
			<h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
				كتب ذات صلة
			</h2>
			<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
				{publications.slice(0, 2).map((libraryBook) => (
					<BooklibraryCard
						route="/publications"
						key={libraryBook.id}
						publication={libraryBook}
						downloadable
					/>
				))}
			</div>
		</div>
</div>	)
}
