"use client";

import { useState, useEffect } from 'react';
import SectionTitle from "@/components/section";
import { HighlightCarousel } from "./components/highlight-carousel";
import Breadcrumbs from "@/components/breadcrumb";
import Section from "@/components/section";
import { dataFetcher } from "@/lib/dataFetcher";
import { Book } from "@/types/book";
import BooklibraryCard from "../library/_components/book-library-card";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { SearchIcon, FilterIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Book[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


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

  filtered = filtered.filter(publication =>
    publication.title.toLowerCase().includes(lowerSearch) ||
    publication.author?.toLowerCase().includes(lowerSearch) ||
       (publication.otherNames &&
      Array.isArray(publication.otherNames) &&
      publication.otherNames.some(name =>
        name.toLowerCase().includes(lowerSearch)
      ))
   );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(publication =>
        publication.category === filterCategory
      );
    }

    setFilteredPublications(filtered);
    setCurrentPage(1);
  }, [searchTerm, filterCategory, publications]);

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPublications = filteredPublications.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                className="pr-12 text-lg"
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                <SearchIcon size={20} />
              </div>
            </div>

            <div className="w-full md:w-1/5">
              <Button
                variant="outline"
                className="w-full text-lg"
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('all');
                }}
              >
                <FilterIcon size={18} className="ml-2" />
                إعادة الضبط
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* نتائج البحث */}
    {/* 
    <div className="w-11/12 mx-auto mb-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-primary">
            {filteredPublications.length} إصدار
          </h3>

          <div className="text-sm text-gray-600">
            الصفحة {currentPage} من {totalPages}
          </div>
        </div>
      </div>*/}  

      {/* قائمة الإصدارات */}
      <div className="w-11/12 mx-auto space-y-2 mb-8">
        {currentPublications.length === 0 ? (
          <div className="bg-secondary bg-opacity-10 rounded-xl flex flex-col items-center justify-center py-16">
            <div className="text-gray-500 mb-4">
              <SearchIcon size={48} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500 text-center max-w-md">
              لم نعثر على أي إصدارات تطابق بحثك. حاول تغيير كلمات البحث أو إعادة ضبط الفلاتر.
            </p>
          </div>
        ) : (
          <div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 lg:px-8">
            {currentPublications.map((publication) => (
              <BooklibraryCard
                route="/publications"
                key={publication.id}
                publication={publication}
                downloadable
              />
            ))}
          </div>
        )}
      </div>

      {/* التقسيم الصفحي */}
      {totalPages > 1 && (
        <div className="w-11/12 mx-auto flex justify-center my-8">
          <nav className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
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
                  className="w-10 h-10"
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
            >
              <ChevronLeft size={20} />
            </Button>
          </nav>
        </div>
      )}

   
    </div>
  );
}
