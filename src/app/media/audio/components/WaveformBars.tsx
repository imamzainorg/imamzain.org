import { motion } from "framer-motion";

interface WaveformBarsProps {
  playing: boolean;
}

export function WaveformBars({ playing }: WaveformBarsProps) {
  const randomHeights = [8, 12, 5, 15, 7, 10, 6, 14, 9, 11, 4, 13];
  return (
    <div className="flex items-end gap-[3px] h-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] shadow-[0_0_6px_rgba(201,160,61,0.7)] rounded-full bg-gradient-to-t from-[#2f613c] to-[#09c04f]"
          animate={{
            height: playing
              ? [4, randomHeights[i], 6, randomHeights[(i + 3) % 12], 5]
              : 4,
            opacity: playing ? [0.6, 1, 0.7, 1, 0.6] : 0.5,
          }}
          transition={{
            repeat: Infinity,
            duration: 0.9,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
