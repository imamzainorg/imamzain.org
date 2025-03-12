"use client";

import Breadcrumbs from "@/components/breadcrumb";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavLink = ({ href, label }: { href: string, label: string }) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link href={href} className={`flex items-center gap-2 `}>
            <Image src="/shapes/nav-menu-icon-secondary.svg" width={50} height={50} className="w-2" alt="icon" />
            <p className={`${isActive ? 'border-b-2 border-[#006654]' : ''}`}>{label}</p>
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
            <div className="flex pt-4">
                <div className="w-[250px]   rounded-2xl mr-4 flex flex-col justify-start gap-6 text-lg font-bold text-neutral-700  ">
                    <NavLink href="/research" label="الية النشر" />
                    <NavLink href="/research/terms" label="شروط النشر" />
                    <NavLink href="/research/pledge" label="تعهد الباحث" />
                    <NavLink href="/research/published-research" label="البحوث المنشورة" />
                </div>
                <div className="flex-1">{children}</div>
            </div>
        </div>
    );
}
