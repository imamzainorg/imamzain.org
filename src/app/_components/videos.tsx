"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import {
  PlayButtonIcon,
  TimeIcon,
  VideoRecordingIcon,
} from "@/assets/icons/reusable";
import HeaderSections from "@/components/header-sections";

// Slimmed to the one video this component ever reads (playlist.videos[0])
// and the fields it renders; the server page filters and slices
// youtube.json down to this shape before passing it in.
type HomeVideo = Pick<
  import("@/types/youtube-data").YouTubeVideo,
  "title" | "desc" | "date" | "thumbnail" | "url"
>;

type HomePlaylist = {
  videos: HomeVideo[]; // always exactly one entry: the playlist's first video
};

export default function Videos({
  playlists,
}: {
  playlists: HomePlaylist[];
}) {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [show, setShow] = useState<number>(7);

  const openModal = (videoId: string) => setVideoId(videoId);
  const closeModal = () => setVideoId(null);
  // Already filtered to displayLocation home/both and sliced to the max
  // number of tiles any breakpoint shows by the server page.
  const homePlaylists = playlists;
  useEffect(() => {
    const updateShow = () => {
      const width = window.innerWidth;

      if (width >= 1280) setShow(7);
      else if (width >= 1024) setShow(7);
      else if (width >= 768) setShow(4);
      else if (width >= 640) setShow(2);
      else setShow(2);
    };

    updateShow();
    window.addEventListener("resize", updateShow);

    return () => window.removeEventListener("resize", updateShow);
  }, []);

  // Parent Variants
  const parentVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  };

  return (
    <>
      <div className="container flex flex-col gap-12 pt-20">
        <HeaderSections
          title={"المرئيات"}
          moreButton={{
            label: "المزيد",
            href: "/media/videos",
          }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 auto-rows-[15rem] sm:auto-rows-[15rem] md:auto-rows-[17rem] lg:auto-rows-[12rem] xl:auto-rows-[13rem] gap-4">
          {homePlaylists.slice(0, show).map((playlist, index) => (
            <div
              key={index}
              aria-label="play video"
              onClick={() => openModal(playlist.videos[0].url)}
              className={`cursor-pointer ${
                index === 0 &&
                "row-span-1 lg:row-span-2 col-span-1 lg:col-span-2"
              }`}
            >
              <motion.div
                className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col shadow-xl"
                variants={parentVariants}
                initial="rest"
                whileHover="hover"
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={playlist.videos[0].thumbnail || ""}
                  width={600}
                  height={600}
                  alt="media pic"
                  className="absolute inset-0 w-full h-full object-cover -z-10"
                  unoptimized
                />

                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent -z-10" />

                <div className="h-4/6">
                  <div className="h-1/2 flex justify-end items-start p-3">
                    <VideoRecordingIcon fill="none" stroke="#fff" />
                  </div>

                  <div className="h-1/2 flex justify-start items-end p-3 gap-2">
                    <div className="bg-white dark:hidden rounded-full rotate-180 p-2">
                      <PlayButtonIcon fill="#006654" />
                    </div>
                    <div className="bg-white hidden dark:block rounded-full rotate-180 p-2">
                      <PlayButtonIcon fill="#231F20" />
                    </div>
                  </div>
                </div>

                <motion.div
                  variants={{
                    rest: { height: "30%" },
                    hover: {
                      height: "34%",
                      transition: { duration: 0.3 },
                    },
                  }}
                  className="bg-white rounded-tl-xl flex flex-col justify-between p-3 h-[30%] mt-auto"
                >
                  <div
                    className={`font-semibold text-xs ${
                      index === 0
                        ? "max-lg:truncate lg:line-clamp-2 lg:text-lg"
                        : "truncate"
                    }`}
                  >
                    {playlist.videos[0].title}
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-400 gap-2">
                    <div className="truncate w-3/5">
                      {playlist.videos[0].desc}
                    </div>
                    <div className="flex items-center gap-1">
                      <TimeIcon className="w-3 h-3" stroke="#aaa" />
                      <span>{playlist.videos[0].date}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {videoId && (
        <div
          className="fixed inset-0 bg-black/80 flex justify-center items-center p-4 z-50"
          aria-label="close window"
          onClick={closeModal}
        >
          <div
            className="relative bg-black rounded-lg overflow-hidden w-full max-w-4xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube Video"
              allow="autoplay; fullscreen"
            />
          </div>
        </div>
      )}
    </>
  );
}
