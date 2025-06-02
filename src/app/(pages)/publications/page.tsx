"use client";

import { useState, useEffect, useRef } from "react";
import SectionTitle from "@/components/section";
import { HighlightCarousel } from "./components/highlight-carousel";
import Breadcrumbs from "@/components/breadcrumb";
import Section from "@/components/section";
import { dataFetcher } from "@/lib/dataFetcher";
import { Book } from "@/types/book";
import BooklibraryCard from "../library/_components/book-library-card";
import { Input } from "@/components/ui/input";
import {  AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon, ChevronLeft, ChevronRight } from "lucide-react";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Book[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dataFetcher<Book[]>("publications.json");
        setPublications(data);
        setFilteredPublications(data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...publications];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase().trim();

      filtered = filtered.filter(
        (publication) =>
          publication.title.toLowerCase().includes(lowerSearch) ||
          publication.author?.toLowerCase().includes(lowerSearch) ||
          (publication.otherNames &&
            Array.isArray(publication.otherNames) &&
            publication.otherNames.some((name) =>
              name.toLowerCase().includes(lowerSearch)
            ))
      );
    }

    if (filterCategory !== "all") {
      filtered = filtered.filter(
        (publication) => publication.category === filterCategory
      );
    }

    setFilteredPublications(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCategory, publications]);

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPublications = filteredPublications.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNum: number) => {
    setCurrentPage(pageNum);

    // تمرير سلس لأعلى قسم الإصدارات
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الإصدارات", url: "/publications" },
        ]}
      />

      {/* الكتب المميزة */}
      <div className="w-full">
        <SectionTitle title="الإصدارات" />
        <div className="w-11/12 mx-auto my-8">
          <HighlightCarousel publications={publications} />
        </div>
      </div>

      {/* نبذة عن الإصدارات */}
      <div className="w-full my-8">
        <Section
          title="نبذة عن اصدارات المؤسسة"
          text="يعد تراث الامام السجاد عليه السلام من الكنوز المعرفية
                الإلهية التي لم تستوف البحوث والدراسات غور مكنوناته, من
                حيث الدراسة والتحليل والتوثيق , اذ يمثل مصدرا غنيا
                بالمعارف والأفكار والنظريات التربوية لهذا ارتات المؤسسة
                القيام بالتحقيق والتاليف وإتاحة الفرصة امام الباحثين
                الذين يتسمون بالأصالة والابداع والجدة لدراسة وتحليل تراث
                الامام والاسهام في عملية البناء التربوي"
        />
      </div>

      {/* أدوات البحث والفلترة */}
      <div className="w-11/12 mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-1/2 relative">
              <Input
                placeholder="ابحث في الإصدارات..."
                className="pr-12 text-lg rounded-xl border border-primary focus:border-primary focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                style={{ direction: "rtl" }}
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary">
                <SearchIcon size={20} />
              </div>
            </div>

            <div className="w-full md:w-1/5">
              <Button
                variant="outline"
                className="w-full text-lg"
                onClick={() => {
                  setSearchTerm("");
                  setFilterCategory("all");
                }}
              >
                <FilterIcon size={18} className="ml-2" />
                إعادة الضبط
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* قائمة الإصدارات */}
      <div
        ref={scrollRef}
        className="w-11/12 scroll-mt-64 mx-auto space-y-2 mb-8"
      >
        {currentPublications.length === 0 ? (
          <div className="bg-secondary bg-opacity-10 rounded-xl flex flex-col items-center justify-center py-16">
            <div className="text-gray-500 mb-4">
              <SearchIcon size={48} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-gray-500 text-center max-w-md">
              لم نعثر على أي إصدارات تطابق بحثك. حاول تغيير كلمات البحث أو
              إعادة ضبط الفلاتر.
            </p>
          </div>
        ) : (
        	<div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
		   <AnimatePresence mode="wait">
              {currentPublications.map((publication) => (
               
                  <BooklibraryCard
                    route="/publications"
                    publication={publication}
                 
                     key={publication.id}
                  />
               
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* التقسيم الصفحي */}
      {totalPages > 1 && (
        <div className="w-11/12 mx-auto flex justify-center my-8 ">
          <nav className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              aria-label="الصفحة السابقة"
            >
              <ChevronRight size={20} />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage > totalPages - 3) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  onClick={() => paginate(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-colors duration-300 ${
                    currentPage === pageNum
                      ? "bg-primary text-white"
                      : "bg-white text-primary hover:bg-primary hover:text-white"
                  }`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              aria-label="الصفحة التالية"
            >
              <ChevronLeft size={20} />
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
}
