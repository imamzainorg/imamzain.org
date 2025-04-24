"use client";

import Breadcrumbs from "@/components/breadcrumb";
import SliderHero from "./_components/slider-hero";
import Link from "next/link";
import { Award } from "lucide-react";
import UploadedResearch from "./_components/uploaded-research";
import Faqs from "./_components/faqs";

export default function Page() {
  return (
    <div className="container  ">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "/research" },
        ]}
      />

      {/* SliderHero  */}
      <SliderHero />

      {/* Link send research */}
      <div className="flex justify-between items-center w-full  pb-14">
        <hr className="border border-[#bb9661] h-  w-full" />
        <Link
          href={"/research/send-research"}
          className="px-16 py-4 text-white text-nowrap mx-10 text-xl bg-primary rounded-2xl hover:bg-primary/95"
        >
          تقديم البحث
        </Link>
        <hr className="border border-[#bb9661] h-  w-full" />
      </div>

      {/* Awards */}
      <div className="py-14">
        <h1 className="text-primary text-3xl font-bold text-center	">
          المكافئات والجوائز
        </h1>
        <div className="flex justify-between gap-1 mt-12">
          {[
            {
              title: " الكتب (تأليف أو تحقيق)",
              subtitle: "لا يقل سعر الصفحة الواحدة عن 5000 دينار",
            },
            {
              title: "  البحوث المقبولة",
              subtitle: "مكافأة تمنح إذا كان البحث لا يقل عن 15 صفحة.",
            },
            {
              title: " البحوث المتميزة",
              subtitle:
                "اصحاب البحوث المتميزة وذات الأصالة العلمية تمنح مكافأة 150,000 دينار",
            },
            {
              title: " المقالات",
              subtitle:
                "مكافأة 25,000 دينار، مع إمكانية منح مكافأة إضافية في حال التميز",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center flex flex-col items-center    w-3/12"
            >
              <Award
                size={70}
                strokeWidth={1}
                className="mb-5"
                color="#BA9560"
              />
              <h1 className="text-xl font-bold"> {item.title} </h1>
              <p className="w-3/4"> {item.subtitle} </p>
            </div>
          ))}
        </div>
      </div>
      {/* Uploaded research */}
	  <UploadedResearch />

	  {/* Faqs */}
	  <Faqs />
    </div>
  );
}
