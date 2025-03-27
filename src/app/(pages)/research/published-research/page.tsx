"use client";
import React, { useEffect, useState } from "react";
import { dataFetcher } from "@/lib/dataFetcher";
import Link from "next/link";
import { Research } from "@/types/research";

export default function Page() {
    const [research, setResearch] = useState<Research[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await dataFetcher<Research[]>("research.json");
            setResearch(posts);
        };
        fetchPosts();
    }, []);

    return (
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {research.map((res) => (
                <div key={res.id} className="flex flex-col justify-between gap-6 min-h-[300px]"> {/* Set a minimum height */}
                    <div
                        className="w-full flex flex-col justify-between
                      bg-white rounded-2xl p-3
                            shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]
                        flex-grow"
                    >
                        <div className="w-full   flex flex-col justify-between gap-6 sm:p-3">
                            <div>
                                <h2 className="font-bold lg:line-clamp-none text-lg pb-2 lg:pb-4">
                                    {res.title}
                                </h2>
                                <p className="flex-grow   line-clamp-4">
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                    {res.description}
                                </p>
                            </div>
                            {/*<p className="font-extralight">{res.date}</p>*/}
                        </div>
                        <div className="flex   justify-center items-center gap-2">
                            <Link
                                href={`/research/${res.slug}`}
                                className="bg-primary text-neutral-50 py-2 px-3 rounded-lg w-full text-center"
                            >
                                مطالعة
                            </Link>
                            <Link
                                href={`${res.pdf}`}
                                className="bg-primary text-neutral-50 py-2 px-3 rounded-lg w-full text-center"
                            >
                                PDF
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
