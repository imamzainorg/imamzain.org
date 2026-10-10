"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MoreLink, SectionTitle, TitleIcon } from "@/components/brand"
import { Reveal } from "@/components/motion"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/format"
import type { Post } from "@/types/post"

// The latest stories as tall photo cards. On desktop the card under the pointer (or keyboard
// focus) opens wider and shows its summary while the others narrow; on phones they stack.
export default function Posts({ newsPosts }: { newsPosts: Post[] }) {
	const [active, setActive] = useState(0)

	return (
		<section className="container pt-24">
			<SectionTitle
				title="الأخبار"
				className="mb-10"
				action={<MoreLink href="/news/archives">أرشيف الأخبار</MoreLink>}
			/>
			<Reveal>
				<ul className="flex flex-col gap-4 lg:h-[30rem] lg:flex-row" onMouseLeave={() => setActive(0)}>
					{newsPosts.map((post, i) => {
						const open = i === active
						return (
							<li
								key={post.slug}
								className={cn(
									"min-w-0 transition-[flex-grow] duration-500 ease-out lg:flex-1",
									open ? "lg:grow-[2.4]" : "lg:grow-[1]",
									i > 2 && "max-md:hidden",
								)}
								onMouseEnter={() => setActive(i)}
								onFocus={() => setActive(i)}
							>
								<Link
									href={`/news/${post.slug}`}
									className="group relative block h-72 overflow-hidden rounded-[2rem] bg-primary shadow-lg dark:bg-Muharram_primary lg:h-full"
								>
									<Image
										src={post.image}
										alt=""
										fill
										sizes="(max-width: 1024px) 100vw, 50vw"
										className={cn(
											"object-cover transition-transform duration-700",
											open ? "lg:scale-105" : "lg:scale-100",
										)}
									/>
									<div
										aria-hidden
										className="absolute inset-0 bg-gradient-to-t from-[#101c1a] via-[#101c1a]/55 to-transparent dark:from-[#171314] dark:via-[#171314]/55"
									/>
									<div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
										<time className="flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white/70">
											<TitleIcon className="w-2.5" />
											{formatDate(post.date)}
										</time>
										<h3 className="mt-2 line-clamp-3 text-xl font-bold leading-snug text-white md:text-2xl">
											{post.title}
										</h3>
										{/* The summary and the link only make room for themselves on the open card. */}
										<div
											className={cn(
												"grid transition-[grid-template-rows,opacity] duration-500",
												open ? "lg:grid-rows-[1fr] lg:opacity-100" : "lg:grid-rows-[0fr] lg:opacity-0",
											)}
										>
											<div className="overflow-hidden">
												<p className="mt-3 line-clamp-2 leading-7 text-white/75">{post.summary}</p>
												<span className="mt-4 inline-flex items-center gap-2 font-semibold text-secondary dark:text-white">
													قراءة الخبر
													<ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" />
												</span>
											</div>
										</div>
									</div>
								</Link>
							</li>
						)
					})}
				</ul>
			</Reveal>
		</section>
	)
}
