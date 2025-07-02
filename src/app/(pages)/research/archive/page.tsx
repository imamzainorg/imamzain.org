"use client";

import Breadcrumbs from "@/components/breadcrumb";
import { dataFetcher } from "@/lib/dataFetcher";
import { Research } from "@/types/research";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRangePicker } from "@heroui/react";
import { FileText, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const categories = [
    "الكل",
    "القرآن",
    "المناجيات",
    "حقوق",
    "سيرة",
    "الأخلاقية",
  ];
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const [research, setResearch] = useState<Research[]>([]);

  useEffect(() => {
    const fetchResearch = async () => {
      const posts = await dataFetcher<Research[]>("research.json");
      setResearch(posts);
    };
    fetchResearch();
  }, []);

  const filteredResearch =
    selectedCategory === "الكل"
      ? research
      : research.filter((res) => res.category === selectedCategory);

  return (
    <div className="container  ">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "/research" },
          { name: "ارشيف البحوث", url: "/research/research-achive" },
        ]}
      />

      <div className="flex justify-between  ">
        <div className="col-span-1 w-full md:col-span-3 md:w-72 relative lg:mb-4">
          <input
            type="text"
            // value={searchTitle}
            // onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full rounded-2xl md:text-sm lg:text-lg p-1 bg-transparent border border-primary focus:border-primary dark:border-Muharram_primary dark:focus:border-Muharram_primary  active:  outline-none   "
            placeholder="البحث عن البحوث"
          />
          <div className="absolute text-primary dark:text-Muharram_primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4 ">
            <div className="h-2/3 w-[1px] bg-slate-400" />
            <SearchIcon size={20} strokeWidth={1.5} />
          </div>
        </div>

        <DateRangePicker
          classNames={{
            inputWrapper:
              "bg-transparent  hover:bg-transparent focus-within:hover:bg-transparent border border-primary ",
            selectorButton: "  text-primary   ",
          }}
          className="max-w-xs"
        />
      </div>



      <div className="flex gap-2  overflow-x-scroll      ">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1 rounded-full border 
                              transition-colors duration-200
                         
                              text-sm 
                              ${
                                selectedCategory === cat
                                  ? "bg-primary text-white border-primary dark:bg-Muharram_primary  dark:border-Muharram_primary"
                                  : "bg-white text-gray-700 border-gray-300"
                              }
                        `}
          >
            {cat}
          </button>
        ))}
      </div>

      <hr className="border-1 mb-5 " />


      <div className="grid grid-cols-2  gap-4 ">
        {filteredResearch.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl    w-full h-full p-5 flex flex-col gap-4
              shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)] "
          >
            <h1 className="text-xl font-bold">{item.title}</h1>
            <div className="text-sm text-neutral-500 flex justify-between items-center">
              <p>اسم الؤلف : {item.author}</p>
              <p>تاريخ النشر : {item.printDate}</p>
            </div>
            <p>{item.description}</p>
            <hr className="border border-neutral-400  w-full" />
            <div className="w-full flex justify-end gap-2">
              <Link
                href={"/"}
                className="px-4 py-2 text-white     bg-primary rounded-xl hover:bg-primary/95 dark:hover:bg-Muharram_primary/95 dark:bg-Muharram_primary"
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  className="text-[20px] mt-1 ml-1"
                />
              </Link>
              <Link
                href={"/"}
                className="px-4 py-2  text-white   text-xl bg-primary rounded-xl hover:bg-primary/95 dark:hover:bg-Muharram_primary/95 dark:bg-Muharram_primary "
              >
                <FileText strokeWidth={2} color="#ffffff" className="mt-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
