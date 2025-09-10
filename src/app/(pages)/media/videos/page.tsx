


"use client";

import playlists from "@/data/youtube.json" assert { type: "json" };

import { useState, useEffect } from "react";
import Image from "next/image";
import { PlayButtonIcon } from "@/assets/icons/reusable";
import { motion, AnimatePresence } from "framer-motion";
import VideoComponent from "./_components/video-section";
export type YouTubeVideo = {
  title: string;
  url: string;
  date: string;
  desc: string;
  thumbnail: string;
  slug: string;
};

export type YouTubePlaylist = {
  playlistId?: string;
  url: string;
  title: string;
  videos: YouTubeVideo[];
};

export default function Page() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [currentPlaylist, setCurrentPlaylist] = useState<YouTubePlaylist | null>(null);

  const openModal = (playlist: YouTubePlaylist, videoUrl: string) => {
    setCurrentPlaylist(playlist);
    setVideoId(videoUrl);
  };

  const closeModal = () => {
    setVideoId(null);
    setCurrentPlaylist(null);
  };

  // غلق المودال بزر Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
  <div>
        <VideoComponent />
    <div className="pb-32 container">
      
      {playlists.map((playlist: YouTubePlaylist, index: number) => (
        <PlaylistSection key={index} playlist={playlist} openModal={openModal} />
      ))}

      {/* مودال الفيديو */}
      <AnimatePresence>
        {videoId && currentPlaylist && (
          <VideoModal
            videoId={videoId}
            playlist={currentPlaylist}
            setVideoId={setVideoId}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>
    </div>
  </div>
  );
}

/* ---------------- مكون PlaylistSection ---------------- */
function PlaylistSection({
  playlist,
  openModal,
}: {
  playlist: YouTubePlaylist;
  openModal: (playlist: YouTubePlaylist, videoUrl: string) => void;
}) {
  const displayedVideos = playlist.videos.slice(0, 4);

  return (
    <div className="mt-12">
      <div className="flex flex-row items-end justify-between">
        <h2 className="text-white font-bold text-lg md:text-xl xl:text-2xl">
          {playlist.title}
        </h2>

        {playlist.videos.length > 4 && (
          <a
            href={playlist.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition"
          >
            عرض المزيد
          </a>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedVideos.map((video, idx) => (
          <VideoCard key={idx} video={video} onClick={() => openModal(playlist, video.url)} />
        ))}
      </div>

      <div className="w-full h-[1px] my-6 bg-gradient-to-r from-primary via-white dark:via-Muharram_primary to-primary" />
    </div>
  );
}

/* ---------------- مكون VideoCard ---------------- */
function VideoCard({ video, onClick }: { video: YouTubeVideo; onClick: () => void }) {
  return (
    <div className="cursor-pointer group" onClick={onClick}>
      <div className="relative rounded-2xl overflow-hidden aspect-video">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
          <PlayButtonIcon
            fill="rgba(255,255,255,0.9)"
            className="bg-black/60 rounded-full p-3 w-16 h-16 transition-transform group-hover:scale-110"
          />
        </div>
      </div>
      <p className="mt-2 text-white font-semibold text-sm line-clamp-2">{video.title}</p>
    </div>
  );
}

/* ---------------- مكون VideoModal ---------------- */
function VideoModal({
  videoId,
  playlist,
  setVideoId,
  onClose,
}: {
  videoId: string;
  playlist: YouTubePlaylist;
  setVideoId: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative bg-black rounded-xl w-full max-w-6xl h-[80vh] flex flex-col md:flex-row overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* الفيديو */}
        <div className="flex-1">
          <iframe
            className="w-full h-full rounded-l-xl"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>

        {/* قائمة التشغيل */}
        <div className="w-full md:w-72 bg-gray-900 overflow-y-auto border-l border-gray-700 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h3 className="text-white font-bold">{playlist.title}</h3>
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="text-white hover:text-red-500 text-lg font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 p-2 flex-1 overflow-y-auto">
            {playlist.videos.map((video, idx) => (
              <div
                key={idx}
                onClick={() => setVideoId(video.url)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                  videoId === video.url ? "bg-secondary text-white" : "hover:bg-gray-700"
                }`}
              >
                <div className="relative w-24 aspect-video flex-shrink-0">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <p className="text-sm text-white line-clamp-2">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
