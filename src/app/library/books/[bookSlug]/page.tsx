"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/breadcrumb";
import { Book } from "@/types/book";
import { dataFetcher } from "@/lib/dataFetcher";
import BooklibraryCard from "@/app/library/_components/book-library-card";
import BookCard from "@/components/book-card";
import { ArrowRight } from "lucide-react";

// ---------------------------------------------
// دالة shuffle نقية
function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
// ---------------------------------------------

export default function Page({ params }: { params: Promise<{ bookSlug: string }> }) {
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [libraryBooks, setLibraryBooks] = useState<Book[]>([]);
  const [showcaseBooks, setShowcaseBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const { bookSlug } = await params;
      const books = await dataFetcher<Book[]>("books.json");
      const currentBook = books.find((item) => item.slug === bookSlug);
      
      if (!currentBook) {
        router.push("/404");
        return;
      }

      // كتب ذات صلة
      const related = books
        .filter((item) => item.id !== currentBook.id)
        .map((item) => {
          let score = 0;
          if (item.printHouse?.trim().toLowerCase() === currentBook.printHouse?.trim().toLowerCase()) score += 5;
          if (item.author?.trim().toLowerCase() === currentBook.author?.trim().toLowerCase()) score += 4;
          if (item.otherNames?.some((name) => currentBook.otherNames?.includes(name))) score += 3;
          if (item.language === currentBook.language) score += 1;
          return { ...item, score };
        })
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 2);

      // كتب عشوائية
      const excludedIds = [currentBook.id, ...related.map((b) => b.id)];
      const remainingBooks = books.filter((item) => !excludedIds.includes(item.id));
      const random = shuffleArray(remainingBooks).slice(0, 2);

      setBook(currentBook);
      setLibraryBooks(books);
      setShowcaseBooks([...related, ...random]);
      setLoading(false);
    };

    loadData();
  }, [params, router]);

  // دالة العودة للمكتبة مع الحفاظ على مكان التمرير
  const handleBackToLibrary = () => {
    const savedPosition = sessionStorage.getItem('libraryScrollPosition');
    const savedURL = sessionStorage.getItem('lastLibraryURL');
    
    if (savedURL) {
      // إذا كان هناك رابط محفوظ للمكتبة مع الفلاتر
      router.push(savedURL);
      
      // استعادة مكان التمرير بعد العودة
      setTimeout(() => {
        if (savedPosition) {
          window.scrollTo({
            top: parseInt(savedPosition),
            behavior: 'instant'
          });
        }
      }, 150);
    } else {
      // العودة للصفحة السابقة
      router.back();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل الكتاب...</p>
        </div>
      </div>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <div className="space-y-10 my-8">
      {/* زر العودة */}


      <Breadcrumbs
        links={[
          { name: "الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          { name: book.title, url: "#" },
        ]}
      />
      <div className="container mx-auto px-4">
        <button
          onClick={handleBackToLibrary}
          className="flex items-center gap-2 bg-primary p-2 rounded-xl  hover:bg-primary/90 text-white hover:text-primary-dark transition-colors group mb-4"
        >
          <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium  ">العودة الى الصفحة السابقة</span>
        </button>
      </div>
      <BookCard key={book.id} publication={book} publications={libraryBooks} />

      <h2 className="text-center font-semibold border-t border-b p-4 sm:text-2xl xl:text-4xl">
        كتب ذات صلة 
      </h2>

      <div className="bg-secondary md:container dark:bg-Muharram_primary/20 bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 lg:px-8">
        {showcaseBooks.map((item) => (
          <BooklibraryCard 
            key={item.id} 
            route="/library/books/" 
            publication={item} 
            downloadable 
          />
        ))}
      </div>
    </div>
  );
}