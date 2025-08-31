
"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import Breadcrumbs from "@/components/breadcrumb"
import BooklibraryCard from "../_components/book-library-card"
import { Book } from "@/types/book"
import { dataFetcher } from "@/lib/dataFetcher"
import { AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button1"
import { SearchIcon, FilterIcon, ChevronLeft, ChevronRight } from "lucide-react"

export default function RisalatAlHuquqPage() {
  const [publications, setPublications] = useState<Book[]>([])
  const [filteredPublications, setFilteredPublications] = useState<Book[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataFetcher<Book[]>("books.json")

        const filteredByCategory = data.filter((book) =>
          Array.isArray(book.category) && book.category.includes("risalat-al-huqoq")
        )

        const uniqueSeriesMap = new Map<string, Book>()
        filteredByCategory.forEach((book) => {
          if (book.series && book.totalParts > 1) {
            if (!uniqueSeriesMap.has(book.series) && book.partNumber === 1) {
              uniqueSeriesMap.set(book.series, book)
            }
          } else {
            uniqueSeriesMap.set(`${book.series ?? book.id}`, book)
          }
        })

        const filteredData = Array.from(uniqueSeriesMap.values())
        setPublications(filteredData)
        setFilteredPublications(filteredData)
      } catch (error) {
        console.error("Error fetching publications: ", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let filtered = [...publications]

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase().trim()

      filtered = filtered.filter((publication) => {
        const inTitle = publication.title.toLowerCase().includes(lowerSearch)
        const inAuthor = publication.author?.toLowerCase().includes(lowerSearch)
        const inOtherNames =
          publication.otherNames &&
          Array.isArray(publication.otherNames) &&
          publication.otherNames.some((name) =>
            name.toLowerCase().includes(lowerSearch)
          )
        const inPrintHouse = publication.printHouse?.toLowerCase().includes(lowerSearch)
        const inLanguage = publication.language?.toLowerCase().includes(lowerSearch)

        return inTitle || inAuthor || inOtherNames || inPrintHouse || inLanguage
      })
    }

    setFilteredPublications(filtered)
    setCurrentPage(1)
  }, [searchTerm, publications])

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentPublications = filteredPublications.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNum: number) => {
    setCurrentPage(pageNum)
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }

  return (
    <div className="min-h-screen">
  	<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المكتبة التخصصية", url: "/library" },
					{ name: "رسالة الحقوق", url: "#" },
				]}
			/>

			<div className="relative mt-4 md:mt-16 mb-8 mx-auto flex justify-start gap-20 p-8 md:p-10 backdrop-blur-[1px] shadow-lg shadow-primary/10 dark:shadow-Muharram_primary/10 rounded-[60px] border border-primary dark:border-Muharram_primary ">
				<div className="w-full md:w-3/4 flex flex-col justify-around gap-5 md:pr-10">
					<h1 className="text-base md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
						رسالة الحقوق
					</h1>
					<p className="w-3/4 text-sm md:text-xl lg:text-3xl leading-10 pb-5">
						تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري،
						وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً
						بالإنسان وحقوقه كلّها وتشتمل على شبكة علاقات الإنسان
						الثلاثة، مع ربِّه ونفسِه ومجتمعه.
					</p>
					<Link
						href="/library/risalat-al-huqoq/read/introduction"
						className="w-full xs:w-fit text-sm md:text-xl py-2 px-4 border-2 rounded-xl border-primary dark:border-Muharram_primary flex items-center gap-4 group"
					>
						تصفح رسالة الحقوق
						<ArrowLeft className="opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 duration-150" />
					</Link>
				</div>
				<div className="w-80 max-md:hidden left-20 -top-20 absolute">
					<Image
						src={`/shapes/book-bg.svg`}
						className="w-full dark:hidden"
						width={50}
						height={50}
						alt="غلاف رسالة الحقوق"
					/>
					<Image
						src={`/shapes/book-bg_Muharram.svg`}
						className="w-full hidden dark:block"
						width={50}
						height={50}
						alt="غلاف رسالة الحقوق"
					/>
				</div>
			</div>

			<h2 className="text-xl lg:text-3xl font-semibold mt-10 mb-5">
				ما كتب عن رسالة الحقوق
			</h2>


      {/* البحث */}
      <div className="w-11/12 mx-auto my-8">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-1/2 relative">
              <input
                placeholder="ابحث في الإصدارات..."
                className="pr-12 w-full md:w-11/12 text-lg bg-white rounded-xl border border-primary dark:border-Muharram_primary focus:ring-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ direction: "rtl" }}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary dark:text-Muharram_primary">
                <SearchIcon size={20} />
              </div>
            </div>

            <div className="w-full md:w-1/5">
              <Button
                variant="outline"
                className="w-full text-md md:text-lg bg-white md:p-5"
                onClick={() => {
                  setSearchTerm("")
                }}
              >
                <FilterIcon size={18} className="ml-2 bg-white" />
                إعادة الضبط
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* الكتب */}
      <div ref={scrollRef} className="w-11/12 mx-auto mb-8">
        {currentPublications.length === 0 ? (
          <div className="bg-secondary dark:bg-Muharram_secondary/20 bg-opacity-10 rounded-xl flex flex-col items-center justify-center py-16">
            <div className="text-gray-500 mb-4">
              <SearchIcon size={48} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500 text-center max-w-md">
              لم نعثر على أي كتب تطابق بحثك. حاول تغيير كلمات البحث أو إعادة ضبط الفلاتر.
            </p>
          </div>
        ) : (
          <div className="bg-secondary/20 dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
            <AnimatePresence mode="wait">
              {currentPublications.map((publication) => (
                <BooklibraryCard
                  route="/library/risalat-al-huqoq"
                  publication={publication}
                  key={publication.id}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* الصفحات */}
      {totalPages > 1 && (
        <div className="w-11/12 mx-auto flex justify-center my-8">
          <nav className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
			  			className="bg-white text-primary dark:text-Muharram_primary hover:bg-primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
				
            >
              <ChevronRight size={20} />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (currentPage <= 3) pageNum = i + 1
              else if (currentPage > totalPages - 3) pageNum = totalPages - 4 + i
              else pageNum = currentPage - 2 + i

              if (pageNum < 1 || pageNum > totalPages) return null

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => paginate(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                    currentPage === pageNum
                      ? "bg-primary dark:bg-Muharram_primary text-white"
                      : "bg-white text-primary hover:bg-primary dark:text-Muharram_primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
                  }`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </Button>
              )
            })}

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
			  			className="bg-white text-primary dark:text-Muharram_primary hover:bg-primary dark:hover:bg-[rgba(0,0,0,0.5)] hover:text-white"
				
            >
              <ChevronLeft size={20} />
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}
