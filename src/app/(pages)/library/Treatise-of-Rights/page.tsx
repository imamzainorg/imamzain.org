"use client";

import BooklibraryCard from "../components/book-library-card";
import OneBook from "../componentsbook/book";
import Breadcrumbs from "@/components/breadcrumb";
import OBook from "../componentstowbooks/book2";
import { libraryBooks } from "@/lib/data";

export default function treatiseofRights() {
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
        <div className="w-full">
          <div className=" ">
            {libraryBooks.slice(0, 1).map((book) => (
              <OneBook key={book.id} publication={book} />
            ))}
          </div>
        </div>
        <div className="bg-secondary bg-opacity-10 rounded-xl grid grid-cols-1 lg:grid-cols-2 p-2 gap-x-8 lg:p-10">
          {libraryBooks.map((book) => (
            <BooklibraryCard key={book.id} publication={book} />
          ))}
        </div>
        <div className="lg:hidden ">
          {libraryBooks.slice(0, 1).map((book) => (
            <OBook key={book.id} publication={book} />
          ))}
        </div>
        <div className="flex flex-col md:flex-row mx-auto justify-center items-center gap-4 my-8">
          <div className="w-52 h-10 md:h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center  text-white">
            الصحيفة السجادية
          </div>
          <div className="w-1 h-1 bg-secondary rounded-full" />
          <div className="w-52 h-10 md:h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center text-white">
            ماكتب عن الامام
          </div>
          <div className="w-1 h-1 bg-secondary rounded-full" />
          <div className="w-52 h-10 md:h-40 bg-[url('/shapes/button-bg.svg')] bg-contain bg-center bg-no-repeat flex justify-center items-center text-white">
            رسالة الحقوق
          </div>
        </div>
      </div>
    </div>
  );
}
