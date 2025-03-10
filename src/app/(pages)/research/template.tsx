"use client";

import Breadcrumbs from "@/components/breadcrumb"; 
import Link from "next/link";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "#" },
        ]}
      />
      <div className="   flex ">
        <div

        className="w-[250px] bg-white  p-4 rounded-2xl    mr-4  
          shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]"
 
        > 
        <Link href="/research" className="flex items-center gap-2">
        الية النشر
        </Link>

        <Link href="/research/terms" className="flex items-center gap-2">
        شروط النشر
        </Link>

        <Link href="/research" className="flex items-center gap-2">
        تعهد الباحث
        </Link>

        <Link href="/research" className="flex items-center gap-2">
        البحوث المنشورة
        </Link>
 
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
