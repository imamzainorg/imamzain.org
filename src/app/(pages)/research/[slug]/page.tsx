import {dataFetcher} from "@/lib/dataFetcher";
import {Research} from "@/types/research";
import Breadcrumbs from "@/components/breadcrumb";
import React from "react";
import Link from "next/link";

export default async function page({params}: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug

    const data: Research[] =  await dataFetcher<Research[]>("research.json")

    const Research = data.filter((item: Research) => item.slug === slug)[0]

    console.log('slug', slug)
    return (
        <div className='container'>
            <Breadcrumbs
                links={[
                    {name: "الصفحة الرئيسية", url: "/"},
                    {name: "الصفحة العلمية", url: "#"},
                ]}
            />
            <div>
                <h2 className="font-bold lg:line-clamp-none text-xl pb-2 lg:pb-4">
                    {Research.title}
                </h2>
                <p className=" leading-8 text-lg">
                    {Research.description}
                    {Research.description}
                    {Research.description}
                    {Research.description}
                    {Research.description}
                    {Research.description}
                    {Research.description}
                </p>
            </div>
            <div>
                <div className=" flex pt-5 justify-start items-center gap-2">
                    <Link
                        href={`${Research.pdf}`}
                        className={'bg-primary text-neutral-50 py-2 px-10 rounded-lg   text-center'}
                    >
                        PDF
                    </Link>
                </div>
            </div>
        </div>
    )
}