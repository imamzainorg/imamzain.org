"use client"
import { useRef } from "react"

import Image from "next/image"
import Link from "next/link"
import { Book } from "@/lib/definitions"

export function HighlightCarousel({ publications }: { publications: Book[] }) {
	const previousRef = useRef<HTMLButtonElement>(null)
	const nextRef = useRef<HTMLButtonElement>(null)

	return (
		<>
		{/*<Carousel className="w-full" dir="ltr">*/}
		{/*	<CarouselContent>*/}
		{/*		{publications.map((publication) => (*/}
		{/*			<CarouselItem key={publication.id}>*/}
		{/*				<div*/}
		{/*					dir="rtl"*/}
		{/*					className="text-white rounded-xl sm:rounded-2xl lg:rounded-[50px] xl:rounded[150px] bg-[url('/shapes/dark-bg.svg')] bg-dark-background p-4 lg:p-10 xl:p-20 flex justify-center gap-2 sm:gap-6"*/}
		{/*				>*/}
		{/*					<div className="w-7/12 flex flex-col justify-center gap-4 sm:gap-8 lg:gap-12">*/}
		{/*						<h1 className="text-sm sm:text-3xl lg:text-5xl xl:text-6xl font-semibold">*/}
		{/*							{publication.title}*/}
		{/*						</h1>*/}
		{/*						<h3 className="text-xs sm:text-2xl lg:text-3xl xl:text-4xl">*/}
		{/*							{publication.author}*/}
		{/*						</h3>*/}
		{/*						<Link*/}
		{/*							href={`/publications/${publication.slug}`}*/}
		{/*							className="bg-primary text-xs sm:text-xl font-semibold px-4 py-2 lg:px-6 lg:py-3 xl:px-8 xl:py-4 w-fit rounded-lg lg:rounded-xl"*/}
		{/*						>*/}
		{/*							اشتري الكتاب*/}
		{/*						</Link>*/}
		{/*					</div>*/}
		{/*					<div className="w-5/12">*/}
		{/*						<div className="w-full h-full flex justify-center items-center bg-[url('/shapes/book-bg.svg')] bg-no-repeat bg-center">*/}
		{/*							<Image*/}
		{/*								src={publication.image}*/}
		{/*								width={200}*/}
		{/*								height={200}*/}
		{/*								className="object-center w-auto h-4/6"*/}
		{/*								alt={publication.title}*/}
		{/*							/>*/}
		{/*						</div>*/}
		{/*					</div>*/}
		{/*				</div>*/}
		{/*			</CarouselItem>*/}
		{/*		))}*/}
		{/*	</CarouselContent>*/}
		{/*	<CarouselPrevious ref={previousRef} className="hidden" />*/}
		{/*	<CarouselNext ref={nextRef} className="hidden" />*/}
		{/*</Carousel>*/}
		</>
	)
}
