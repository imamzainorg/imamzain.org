"use client"
import React, { useEffect, useState } from "react"
import Breadcrumbs from "@/components/breadcrumb"
import Link from "next/link"
import Image from "next/image"
import { Post } from "@/types/post"
import { dataFetcher } from "@/lib/dataFetcher"

export default function Page() {
	const categories = [ "الكل", "اخبار", "ندوات", "لقاءات", "مؤتمرات", "العتبة الحسينية" ]
	const [selectedCategory, setSelectedCategory] = useState("الكل")

	const [newsPosts, setNewsPosts] = useState<Post[]>([])

	useEffect(() => {
		const fetchPosts = async () => {
			const posts = await dataFetcher<Post[]>("posts.json")
			setNewsPosts(posts)
		}
		fetchPosts()
	}, [])

	const filteredPosts =
		selectedCategory === "الكل"
			? newsPosts
			: newsPosts.filter((post) => post.category === selectedCategory)

	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "الأخبار", url: "/news" },
					{ name: "ارشيف الأخبار", url: "/news/archives" },
				]}
			/>

			<div className="flex gap-2 mb-6 overflow-x-scroll pl-10 lg:w-[90%] mx-auto">
				{categories.map((cat) => (
					<button
						key={cat}
						onClick={() => setSelectedCategory(cat)}
						className={`px-4 py-1 rounded-full border 
                              transition-colors duration-200
                         
                              text-sm 
                              ${
							selectedCategory === cat
								? "bg-primary text-white border-primary"
								: "bg-white text-gray-700 border-gray-300"
						}
                        `}
					>
						{cat}
					</button>
				))}
			</div>

			<div className="grid gap-4 lg:w-[90%] mx-auto">
				{filteredPosts.map((post) => (
					<Link key={post.id} href={`/news/${post.slug}`}>
						<div
							className="w-full flex flex-col-reverse sm:flex-row justify-between gap-6
                                      hover:scale-[1.02] duration-200 bg-white rounded-3xl p-3
                                      shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]"
						>
							<div className="w-full lg:w-3/4 text-xs xl:text-sm flex flex-col justify-between gap-6 sm:p-3">
								<div>
									<h2 className="font-bold lg:line-clamp-none text-lg sm:text-xl   pb-2 lg:pb-4">
										{post.title}
									</h2>
									<p className="line-clamp-2 text-sm sm:text-lg lg:text-xl">{post.summary}</p>
								</div>
								<p className="font-extralight">{post.date}</p>
							</div>
							<div className="w-full sm:w-[20rem] lg:w-[20rem] h-[15rem] sm:h-[12rem] relative">
								<div
									className="absolute rotate-90 w-3 h-3 xl:w-5 xl:h-5 bottom-3 -right-1.5 xl:bottom-4 xl:-right-2
                                                bg-[url('/shapes/newsIndicator.svg')] bg-no-repeat"
								></div>
								<Image
									src={post.image}
									width={500}
									height={500}
									alt={post.slug}
									className="h-full w-full rounded-2xl object-cover"
								/>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}
