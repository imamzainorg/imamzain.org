"use client";

import Breadcrumbs from "@/components/breadcrumb";
import { Research } from "@/types/temporary";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRangePicker } from "@heroui/react";
import { SearchIcon, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import { useState } from "react";
import researchData from "@/data/temporary.json";

export default function Page() {
  const [research] = useState<Research[]>(researchData);
  const [selectedSummary, setSelectedSummary] = useState<Research | null>(null);

  return (
    <div className="container">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "/research" },
          { name: "ارشيف البحوث", url: "/research/research-achive" },
        ]}
      />

      {/* البحث والتاريخ */}
      <div className="flex justify-between">
        <div className="col-span-1 w-full md:col-span-3 md:w-72 relative lg:mb-4">
          <input
            type="text"
            className="w-full rounded-2xl md:text-sm lg:text-lg p-1 bg-transparent border border-primary focus:border-primary dark:border-Muharram_primary dark:focus:border-Muharram_primary outline-none"
            placeholder="البحث عن البحوث"
          />
          <div className="absolute text-primary dark:text-Muharram_primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
            <div className="h-2/3 w-[1px] bg-slate-400" />
            <SearchIcon size={20} strokeWidth={1.5} />
          </div>
        </div>

        <DateRangePicker
          classNames={{
            inputWrapper: "bg-transparent hover:bg-transparent focus-within:hover:bg-transparent border border-primary",
            selectorButton: "text-primary",
          }}
          className="max-w-xs"
        />
      </div>

      <hr className="border-1 mb-5" />

      {/* قائمة البحوث */}
      <div className="grid grid-cols-2 gap-4">
        {research.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl w-full h-full p-5 flex flex-col gap-4 shadow"
          >
            <h1 className="text-xl font-bold">{item.title}</h1>
            <div className="text-sm text-neutral-500 flex justify-between items-center">
              <p>اسم المؤلف: {item.author}</p>
              <p>تاريخ النشر: {item.publishedYear}</p>
            </div>
            <p>{item.Description}</p>
             <p className="line-clamp-3">{item.part}-{item.section}{item.topic} </p>
            <hr className="border border-neutral-400 w-full" />

            <div className="w-full flex justify-end gap-2">
              <button
                onClick={() => setSelectedSummary(item)}
                className="flex-1 min-w-[120px] px-4 py-2 bg-primary/10 dark:bg-Muharram_primary/20 text-primary dark:text-Muharram_primary rounded-lg hover:bg-primary/20 dark:hover:bg-Muharram_primary/30 transition-colors flex items-center justify-center gap-2"
              >
                قراءة الملخص
              </button>

              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[100px] px-4 py-2 bg-primary dark:bg-Muharram_primary text-white rounded-lg  transition-colors flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faFilePdf} className="text-[16px]" />
                PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* نافذة الملخص */}
      <Dialog open={!!selectedSummary} onClose={() => setSelectedSummary(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white  rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <Dialog.Title className="text-xl font-bold text-gray-800 dark:text-black">ملخص البحث</Dialog.Title>
              <button
                onClick={() => setSelectedSummary(null)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-black/20 transition-colors"
                title="إغلاق"
              >
                <X className="w-6 h-6 text-black " />
              </button>
            </div>

            {selectedSummary && (
              <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                <h3 className="text-lg font-semibold text-black">{selectedSummary.title}</h3>
                <p className="text-sm text-black mt-1">الباحث: {selectedSummary.author}</p>
                <p className="text-black leading-relaxed">{selectedSummary.abstract}</p>
              </div>
            )}

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-2">
              <button
                onClick={() => setSelectedSummary(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                إغلاق
              </button>
              {selectedSummary?.pdfUrl && (
                <a
                  href={selectedSummary.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-primary dark:text-Muharram_primary"
                  title="تنزيل PDF"
                >
                  <FontAwesomeIcon icon={faFilePdf} className="text-lg" />
                </a>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
