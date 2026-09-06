import { Suspense } from "react";
import type { Metadata } from "next";
import booksData from "@/data/books.json";
import type { Book } from "@/types/book";
import BookLibraryPage from "./_components/book-library-page";

export const metadata: Metadata = {
  title: "المكتبة التخصصية لكتب الإمام زين العابدين",
  description:
    "تصفّح المكتبة التخصصية للإمام زين العابدين عليه السلام: شروح الصحيفة السجادية ورسالة الحقوق وما كُتب عن الإمام السجاد، مع البحث والفرز للقراءة والتحميل.",
  keywords: [
    "المكتبة التخصصية للإمام زين العابدين",
    "كتب الإمام زين العابدين",
    "شروح الصحيفة السجادية",
    "كتب رسالة الحقوق",
    "تحميل كتب الإمام السجاد",
    "إصدارات مؤسسة الإمام زين العابدين",
    "ما كُتب عن الإمام زين العابدين",
    "قائمة كتب الإمام السجاد",
  ],
  alternates: { canonical: "/library" },
  openGraph: {
    title: "المكتبة التخصصية لكتب الإمام زين العابدين عليه السلام",
    description:
      "قائمة كتب الإمام زين العابدين عليه السلام: شروح الصحيفة السجادية ورسالة الحقوق وما كُتب عن الإمام السجاد، مع البحث والفرز للقراءة والتحميل.",
    url: "/library",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "المكتبة التخصصية لكتب الإمام زين العابدين عليه السلام",
    description:
      "قائمة كتب الإمام زين العابدين عليه السلام: شروح الصحيفة السجادية ورسالة الحقوق وما كُتب عن الإمام السجاد، مع البحث والفرز للقراءة والتحميل.",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <BookLibraryPage books={booksData as Book[]} />
    </Suspense>
  );
}