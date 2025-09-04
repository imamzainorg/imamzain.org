import { EyeIcon } from "lucide-react"
import { ClockIcon } from "lucide-react"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import Link from "next/link"
import { dataFetcher } from "@/lib/dataFetcher"
import { YouTubePlaylist } from "@/types/youtube-data"

export default async function media({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const slug = (await params).slug
	const playlists = await dataFetcher<YouTubePlaylist[]>("youtube.json")
	const playlist = playlists.filter(
		(playlist) => playlist.videos.filter((video) => video.slug === slug)[0],
	)[0].videos

	const video = playlist.filter((video) => video.slug === slug)[0]

	return (
		<div className="space-y-10 container">
			<Breadcrumbs
				className="text-white"
				dotColor="bg-secondary"
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "المرئيات", url: "/media/videos" },
					{ name: video.title, url: "#" },
				]}
			/>

			<div className="flex flex-col justify-center items-center w-full px-4 md:flex-row-reverse md:w-full">
				<div className="order-1 w-full  p-4">
					<Image
						src={video.thumbnail}
						className="rounded-[25px]"
						width={800}
						height={500}
						alt="logo"
					/>
				</div>

				<div className="order-2 w-full md:w-1/2 p-4 md:ml-4 lg:ml-10 2xl:p-10 -tracking-tighter ">
					<p className="text-secondary dark:text-Muharram_secondary text-lg xs:text-xl xl:text-3xl  sm:text-2xl md:text-lg xmd:text-2xl my-4 xmd:text-justify text-center font-bold">
						{video.title}
					</p>
					<p className="text-white  text-sm xs:text-lg md:text-sm !leading-10 md:!leading-4 xmd:!leading-5 lg:!leading-8 xl:!leading-10 2xl:!leading-10 2xl:2xl text-justify xl:text-xl my-4">
						{video.desc}
					</p>
					<div className="flex xs:flex-row  flex-col text-[0.7rem] md:text-[0.6rem] lg:text-[0.7rem] opacity-50 ">
						<div className="flex-row flex  ">
							<EyeIcon
								stroke="white"
								width={20}
								strokeWidth={0.5}
							/>
							<p className="text-white mr-2 mt-1 xs:ml-3 md:mt-2  lg:mt-1">
								3135 مشاهدة
							</p>
						</div>
						<div className=" flex-row flex ">
							<ClockIcon
								stroke="white"
								width={16}
								strokeWidth={0.5}
							/>
							<p className="text-white mr-2  mt-1 md:mt-2 lg:mt-1 ">
								{video.date}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className=" !-mb-7">
				<h3 className="text-white  flex justify-center items-center xs:items-start xs:justify-start text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold  ">
					مواضيع ذات صلة
				</h3>
			</div>
			<div className="!mb-8 flex justify-center items-center xs:mr-4 ">
				<div className="bg-gray-500 bg-opacity-25  rounded-[25px] p-2  2xl:p-4 space-y-10 w-1/2.5 xs:w-full  ">
					<div className="flex flex-col xs:flex-row justify-center p-0">
						{playlist.slice(0, 4).map((video, index) => (
							<Link
								href={`/media/videos/${video.slug}`}
								key={index}
								className={`relative p-4  ${
									index >= 3
										? "hidden lg:block"
										: index >= 2
											? "hidden md:block "
											: "md:block"
								}`}
							>
								<Image
									src={video.thumbnail}
									alt={video.title}
									width={300}
									height={300}
									className="w-full rounded-[15px] md:rounded-[30px] object-cover"
								/>
								<div className="translate-y-16 hover:translate-y-0 opacity-0 hover:opacity-100 duration-300 absolute rounded-[15px] md:rounded-[30px] top-0 right-0 w-full font-semibold text-sm flex justify-center items-center h-full bg-gradient-to-t from-black via-black/50 to-transparent">
									<div className="font-semibold w-3/4 text-lg p-4 text-white">
										{video.title}
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
