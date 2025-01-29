import BooklibraryCard from "../components/book-library-card";
import Breadcrumbs from "@/components/breadcrumb";
import SectionTitle from "@/components/section";
import { ChevronDown, SearchIcon } from "lucide-react";
import Image from "next/image";
import { libraryBooks } from "@/lib/data";
import { publications } from "@/lib/data";

import { publications1 } from "@/lib/data";
export default function pagep() {
  return (
    <div className="">
      <div className="m-10">
        <Breadcrumbs
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: " المكتبة التخصصية", url: "#" },
            { name: "رسالة الحقوق", url: "#" },
          ]}
        />
        <div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
          {libraryBooks.map((book) => (
            <BooklibraryCard key={book.id} publication1={book} />
          ))}
        </div>
        <div>sdav</div>
        <div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
          {libraryBooks.map((book) => (
            <BooklibraryCard key={book.id} publication={book} />
          ))}
        </div>
        <div className="flex mx-auto justify-center items-center gap-4 my-8">
          <div className="w-52 h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center text-white">
            الصحيفة السجادية
          </div>
          <div className="w-1 h-1 bg-secondary rounded-full" />
          <div className="w-52 h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center text-white">
            ماكتب عن الامام
          </div>
          <div className="w-1 h-1 bg-secondary rounded-full" />
          <div className="w-52 h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center text-white">
            رسالة الحقوق
          </div>
        </div>
      </div>
    </div>
  );
}
