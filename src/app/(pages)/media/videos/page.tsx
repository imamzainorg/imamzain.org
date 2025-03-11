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
        <div className="container">
            <Breadcrumbs
                className="text-white"
                dotColor="bg-secondary"
                links={[
                    {name: "الصفحة الرئيسية", url: "/"},
                    {name: "المرئيات", url: "#"},
                ]}
            />



                <div
                    onClick={() =>
                        openModal('c2In_ZUNTsI')
                    }
                    className="relative rounded-2xl h-[30rem] overflow-hidden    cursor-pointer"
                >
                    <ImageView
                        src={'/news/img.png'}
                        alt={'/ws'}
                        className="rounded-2xl object-cover w-full h-full"
                    />
                    <div
                        className="absolute top-0 right-0 w-full font-semibold text-sm flex flex-col justify-between h-full"
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
                        <div className="font-semibold text-2xl p-4 pb-8 text-white">
                            كلمة السيد غسان الخرسان في الملتقى التشاوري الأول لخطباء المنبر الحسيني
                        </div>
                    </div>
                </div>


            <div className=" pb-32">
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
                                            className="absolute top-0 right-0 w-full font-semibold text-sm flex flex-col justify-between h-full"
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
