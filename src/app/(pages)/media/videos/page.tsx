"use client"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import playlists from "@/data/youtube.json"
import {motion} from "framer-motion";
import ImageView from "@/components/image-view";
import {VideoRecordingIcon} from "@/assets/icons/reusable";
import {useState} from "react";

export default function Page() {
    const [videoId, setVideoId] = useState<string | null>(null)

    const openModal = (videoId: string) => setVideoId(videoId)
    const closeModal = () => setVideoId(null)

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
                            {name: "الصفحة الرئيسية", url: "/"},
                            {name: "المرئيات", url: "#"},
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

                    <button
                        className=" bg-secondary rounded-[200px]  h-6 w-16 ml-2  text-xs md:text-sm md:h-8 md:w-20 xmd:mr-4 lg:text-lg lg:h-10 lg:w-24 xl:text-xl xl:h-12 xl:w-28 ">
                        مشاهدة
                    </button>
                    <button
                        className="bg-secondary rounded-[200px]   h-6 w-16  m-2 mb-6 text-xs md:text-sm md:h-8 md:w-20 lg:text-lg lg:h-10 lg:w-24 xl:text-xl xl:h-12 xl:w-28  ">
                        اشتراك
                    </button>
                </div>
            </div>

            <div className="container pb-32">
                {playlists.map((playlist, index) => (
                    <div key={index} className="mt-16">
                        <p className="text-white font-bold text-center text-lg   xs:text-right   md:text-xl xl:text-2xl mt-10">
                            {playlist.title}
                        </p>
                        <div
                            className="mt-8 p-4 rounded-3xl grid grid-cols-2 md:grid-cols-3 xmd:grid-cols-4 gap-4 grid-rows-1 bg-gray-600/35">
                            {playlist.videos
                                .slice(0, 4)
                                .map((video, index) => (
                                    <div
                                        key={index}
                                        onClick={() =>
                                            openModal(video.url)
                                        }
                                        className="relative rounded-2xl overflow-hidden h-36 md:h-40 lg:h-48 cursor-pointer"
                                    >
                                        <ImageView
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="rounded-2xl object-cover w-full h-full"
                                        />
                                        <motion.div
                                            initial={{x: 0, y: 15, opacity: 0}}
                                            whileHover={{
                                                y: 0,
                                                opacity: 1,
                                                transition: {duration: 0.3},
                                            }}
                                            className="absolute top-0 right-0 w-full font-semibold text-sm flex flex-col justify-between h-full   "
                                            style={{
                                                background:
                                                    "linear-gradient(0deg, rgba(0,0,0,0.8715861344537815) 0%, rgba(0,0,0,0.40940126050420167) 45%, rgba(229,229,229,0) 100%)",
                                            }}
                                        >
                                            <div className="h-1/2 w-full flex justify-end items-start p-3">
                                                <VideoRecordingIcon
                                                    fill="none"
                                                    stroke="#fff"
                                                />
                                            </div>
                                            <div className="font-semibold text-sm p-4 text-white">
                                                {video.title}
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            {videoId && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center p-4 z-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative bg-black rounded-lg overflow-hidden w-full max-w-4xl aspect-video"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        {/* YouTube Video */}
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/O33ZsudmqcU?autoplay=1`}
                            title="YouTube Video"
                            allow="autoplay; fullscreen"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    )
}
