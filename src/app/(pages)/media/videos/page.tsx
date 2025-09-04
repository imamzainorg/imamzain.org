"use client";

import playlists from "@/data/youtube.json";
import { motion } from "framer-motion";
import Image from "next/image";
import { VideoRecordingIcon } from "@/assets/icons/reusable";
import { useState } from "react";
import VideoComponent from "./_components/video-section";
import {PlayButtonIcon} from "@/assets/icons/reusable"
export default function Page() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<{
    title: string;
    videos: { url: string; thumbnail: string; title: string }[];
  } | null>(null);

  // فتح المودال مع تحديد القائمة والفيديو
  const openModal = (
    playlist: {
      title: string;
      videos: { url: string; thumbnail: string; title: string }[];
    },
    videoUrl: string
  ) => {
    setCurrentPlaylist(playlist);
    setVideoId(videoUrl);
  };

  const closeModal = () => {
    setVideoId(null);
    setCurrentPlaylist(null);
  };

  return (
    <div className="">
      <VideoComponent />
      <div className="container pb-32">
        {playlists.map((playlist, index) => (
          <div key={index} className="mt-16">
            <p className="text-white font-bold text-center text-lg md:text-xl xl:text-2xl mt-10">
              {playlist.title}
            </p>
            <div className="mt-8 p-4 rounded-3xl grid grid-cols-2 md:grid-cols-3 xmd:grid-cols-4 gap-4 grid-rows-1 bg-gray-600/35">
              {playlist.videos.slice(0, 4).map((video, idx) => (
                <div
                  key={idx}
                  onClick={() => openModal(playlist, video.url)}
                  className="relative rounded-2xl overflow-hidden h-36 md:h-40 lg:h-48 cursor-pointer group"
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="rounded-2xl object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className=" p-4 rounded-full opacity-0 group-hover:opacity-100 transition">
                      <PlayButtonIcon
                        fill="rgba(255,255,255,0.7)"
                        className="bg-black/60  rounded-full p-6 shadow-lg w-20 h-20 transition-colors"
                      />
                    </div>
                  </div>

                  <motion.div
                    initial={{ x: 0, y: 15, opacity: 0 }}
                    whileHover={{
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.3 },
                    }}
                    className="absolute top-0 right-0 w-full font-semibold text-sm flex flex-col justify-between h-full"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(0,0,0,0.87) 0%, rgba(0,0,0,0.41) 45%, rgba(229,229,229,0) 100%)",
                    }}
                  >
                    <div className="h-1/2 w-full flex justify-end items-start p-3">
                      <VideoRecordingIcon fill="none" stroke="#fff" />
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

      {/* مودال الفيديو + قائمة التشغيل */}
      {videoId && currentPlaylist && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center mt-20 p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-black rounded-lg  w-full max-w-6xl h-[80vh] flex flex-col justify-center  md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* مشغل الفيديو */}
            <div className="flex-1 bg-black">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                title="YouTube Video in Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* قائمة التشغيل */}
            <div className="w-full md:w-72 bg-gray-900 overflow-y-auto border-l border-gray-700 flex flex-col">
              {/* رأس القائمة */}
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <h2 className="text-white font-bold">
                  {currentPlaylist.title}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-red-500 transition text-lg font-bold"
                  aria-label="إغلاق"
                >
                  ✕
                </button>
              </div>

              {/* عناصر الفيديوهات */}
              <div className="space-y-2 p-2 flex-1 overflow-y-auto">
                {currentPlaylist.videos.map((video, idx) => (
                  <div
                    key={idx}
                    onClick={() => setVideoId(video.url)}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                      videoId === video.url
                        ? "bg-secondary text-white"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <div className="relative w-24 h-16 flex-shrink-0">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p className="text-sm text-white line-clamp-2">
                      {video.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
