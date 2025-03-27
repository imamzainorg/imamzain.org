"use client";

import Breadcrumbs from "@/components/breadcrumb";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className={`flex items-center gap-2 `}>
      <Image
        src="/shapes/nav-menu-icon-secondary.svg"
        width={50}
        height={50}
        className="w-2"
        alt="icon"
      />
      <p className={`${isActive ? "border-b-2 border-[#006654]" : ""}`}>
        {label}
      </p>
    </Link>
  );
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="container ">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "#" },
        ]}
      />
      <div className="flex  pt-4 gap-5">
        <div className="flex flex-col h-fit gap-5 backdrop-blur-[3px] p-5 rounded-3xl border border-primary shadow-primary/10">
          {/* <div className="border" /> */}
          <NavLink href="/research" label="                    تعليمات كتابة البحوث المعتمدة
" />
          <NavLink href="/research/terms" label="ضوابط كتابة البحوث العلمية" />
          <NavLink href="/research/pledge" label="        إقرار الباحث
" />
          {/* <NavLink
            href="/research/published-research"
            label="البحوث المنشورة"
          /> */}
        </div>

        <div className="w-3/4">{children}</div>
      </div>
    </div>
  );
}
