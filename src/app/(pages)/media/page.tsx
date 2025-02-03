"use client"

import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"

const images = [
	"/images/albaqi.jpg",
	"/images/albaqi.jpg",
	"/images/albaqi.jpg",
	"/images/albaqi.jpg",
]

export default function media() {
	return (
		<div className="">
			<div className="max-w-screen-2xl mx-auto relative">
				<Image
					src="/images/about-landing.jpg"
					className="w-full h-96 xs:h-auto rounded-b-[30px] md:rounded-b-[60px] lg:rounded-b-[70px] xl:rounded-b-[80px]"
					width={1500}
					height={1500}
					priority
					alt="logo"
				/>

				<div className="absolute inset-0 container">
					<Breadcrumbs
						className="text-white"
						dotColor="bg-secondary"
						links={[
							{ name: "الصفحة الرئيسية", url: "/" },
							{ name: "المرئيات", url: "#" },
						]}
					/>
				</div>

				<div className="absolute inset-x-0 bottom-0  text-start  mr-4 md:mb-4 container  ">
					<p className="text-white text-2xl xs:text-3xl font-bold md:text-5xl xmd:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl md:m-2  ">
						استمع . شاهد. زٌر.
					</p>

					<p className="text-white text-sm xs:text-md md:text-lg xmd:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
						الأجواء الروحانية والنفحات الايمانية من البقيع الغرقد
					</p>

					<button className=" bg-secondary rounded-[200px]  h-6 w-16 ml-2  text-xs md:text-sm md:h-8 md:w-20 xmd:mr-4 lg:text-lg lg:h-10 lg:w-24 xl:text-xl xl:h-12 xl:w-28 ">
						مشاهدة
					</button>
					<button className="bg-secondary rounded-[200px]   h-6 w-16  m-2 mb-6 text-xs md:text-sm md:h-8 md:w-20 lg:text-lg lg:h-10 lg:w-24 xl:text-xl xl:h-12 xl:w-28  ">
						اشتراك
					</button>
				</div>
			</div>
			<div className="container">
				<div>
					<p className="text-white font-bold text-center text-xl m-4 xs:text-right xs:mr-10 md:text-3xl xl:text-4xl  2xl:text-5xl mt-10">
						{" "}
						المحاضرات{" "}
					</p>
					<div className="!mb-8 flex justify-center items-center xs:mr-4 ">
						<div className="bg-gray-500 bg-opacity-25  rounded-[25px] p-2  2xl:p-4 space-y-10 w-1/2.5 xs:w-full  ">
							<div className="flex flex-col xs:flex-row justify-center    p-0">
								{images.map((src, index) => (
									<div
										key={index}
										className={`p-4  ${
											index >= 3
												? "hidden lg:block"
												: index >= 2
													? "hidden md:block "
													: "md:block"
										}`}
									>
										<Image
											src={src}
											alt={`Image ${index + 1}`}
											width={300}
											height={300}
											className="rounded-[15px] xs:w-full w-48 md:rounded-[30px]"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div>
					<p className="text-white font-bold text-center text-xl m-4 xs:text-right xs:mr-10 md:text-3xl xl:text-4xl  2xl:text-5xl ">
						{" "}
						الندوات
					</p>
					<div className="!mb-8 flex justify-center items-center xs:mr-4  ">
						<div className="bg-gray-500 bg-opacity-25  rounded-[25px] p-2  2xl:p-4 space-y-10 w-1/2.5 xs:w-full  ">
							<div className="flex flex-col xs:flex-row justify-center    p-0">
								{images.map((src, index) => (
									<div
										key={index}
										className={`p-4  ${
											index >= 3
												? "hidden lg:block"
												: index >= 2
													? "hidden md:block "
													: "md:block"
										}`}
									>
										<Image
											src={src}
											alt={`Image ${index + 1}`}
											width={300}
											height={300}
											className="rounded-[15px] xs:w-full w-48 md:rounded-[30px]"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div>
					<p className="text-white font-bold text-center text-xl m-4 xs:text-right xs:mr-10 md:text-3xl xl:text-4xl  2xl:text-5xl ">
						{" "}
						اللقاءات
					</p>
					<div className="!mb-8 flex justify-center items-center xs:mr-4  ">
						<div className="bg-gray-500 bg-opacity-25  rounded-[25px] p-2  2xl:p-4 space-y-10 w-1/2.5 xs:w-full  ">
							<div className="flex flex-col xs:flex-row justify-center    p-0">
								{images.map((src, index) => (
									<div
										key={index}
										className={`p-4  ${
											index >= 3
												? "hidden lg:block"
												: index >= 2
													? "hidden md:block "
													: "md:block"
										}`}
									>
										<Image
											src={src}
											alt={`Image ${index + 1}`}
											width={300}
											height={300}
											className="rounded-[15px] xs:w-full w-48 md:rounded-[30px]"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div>
					<p className="text-white font-bold text-center text-xl m-4 xs:text-right xs:mr-10 md:text-3xl xl:text-4xl  2xl:text-5xl ">
						المؤتمرات{" "}
					</p>
					<div className="flex justify-center items-center xs:mr-4  ">
						<div className="bg-gray-500 bg-opacity-25  rounded-[25px] p-2  2xl:p-4 space-y-10 w-1/2.5 xs:w-full  ">
							<div className="flex flex-col xs:flex-row justify-center    p-0">
								{images.map((src, index) => (
									<div
										key={index}
										className={`p-4  ${
											index >= 3
												? "hidden lg:block"
												: index >= 2
													? "hidden md:block "
													: "md:block"
										}`}
									>
										<Image
											src={src}
											alt={`Image ${index + 1}`}
											width={300}
											height={300}
											className="rounded-[15px] xs:w-full w-48 md:rounded-[30px]"
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
