import { PlayButtonIcon, TimeIcon } from "@/assets/icons/reusable";
import ImageView from "@/components/image-view";
import { Eye } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@heroui/react";

export default function VideoComponent() {
  // Auto-play the video (muted) on page load
  const [isPlaying] = useState(true);
  const containerRef = useRef(null);

  const handleOpenLink = () => { 
    window.open(
      "https://www.youtube.com/embed/c2In_ZUNTsI?autoplay=1",
      "_blank"
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl h-screen overflow-hidden bg-black"
    >
      {/* Video iframe auto-playing muted */}
      <iframe
        className={`w-full h-[114vh] transition-opacity duration-300 absolute ${
          isPlaying ? "opacity-100" : "opacity-0"
        }`}
        src="https://www.youtube.com/embed/c2In_ZUNTsI?autoplay=1&mute=1&controls=0&amp;start=11"
        title="YouTube Video"
        allow="autoplay; fullscreen"
      ></iframe>

      {/* Image placeholder */}
      <div
        className={`w-full h-full transition-opacity duration-300 absolute z-0 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      >
        <ImageView
          src="/news/img.png"
          alt="Video thumbnail"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Overlays (gradients, text, etc.) */}
      <div
        className="absolute group top-0 right-0 w-full font-semibold text-sm h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(93deg, rgba(255,255,255,0) 0%, rgba(37,52,63,0) 54%, rgba(37,52,63,0.47) 79%, rgba(37,52,63,1) 100%)",
        }}
      ></div>
      <div
        className="absolute group top-0 right-0 w-full font-semibold text-sm h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(37,52,63,0) 59%, rgba(37,52,63,1) 100%)",
        }}
      ></div>
      <div
        className="absolute group top-0 right-0 w-full font-semibold text-sm h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(37,52,63,0) 54%, rgba(37,52,63,0.47) 79%, rgba(37,52,63,1) 100%)",
        }}
      ></div>

      {/* Content overlay with video info and the play button */}
      <div className="absolute group top-0 right-0 w-full font-semibold text-sm h-full z-10">
        <div className="container w-full h-full flex flex-col justify-end items-start cursor-pointer">

          <div className="bg-neutral-4 w-[35rem] pb-12  flex flex-col justify-end items-start gap-4">
            <div className="font-semibold pb-4 text-6xl text-[#bb9661]">
              الملتقى التشاوري
            </div>
            <div className="font-semibold text-5xl text-white">
              كلمة السيد غسان الخرسان في الملتقى التشاوري الأول لخطباء المنبر الحسيني
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-fit text-slate-400 flex items-center gap-1 py-4">
                <TimeIcon className="w-5 h-5 text-secondary"stroke="#bb9661"  />
                <span>09 /02 /2025</span>
              </div>
              <div className="w-fit text-slate-400 flex items-center gap-1 py-4">
                <Eye className="w-5 h-5" stroke="#bb9661" />
                <span>10 الف</span>
              </div>
            </div>
        
        <div className="flex justify-center items-center gap-4">
        <Button
              isIconOnly
              radius="full"
              size={"lg"}
              onClick={handleOpenLink}
            >
              <PlayButtonIcon
                fill="#006654"
                className="bg-white rounded-full p-2 shadow-lg w-40 h-40 transition-colors"
              />
            </Button>
            <div className="font-semibold  *: text-2xl text-white" >
            مشاهدة
            </div>
        </div>

          </div>
        </div>
      </div>
    </div>
  );
}
