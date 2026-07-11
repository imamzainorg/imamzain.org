// hooks/useWindowEvents.ts
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from 'react-responsive';
// interface ScreenSize {
//     width: number;
//     height: number;
// }

export default function useWindowEvents() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isScrollDown, setIsScrollDown] = useState<boolean>(true);
    // const [screenSize, setScreenSize] = useState<ScreenSize>({ width: window.innerWidth, height: window.innerHeight });
    const prevScrollY = useRef<number>(0);

    const isSmallScreen = useMediaQuery({ maxWidth: 1023 });

    useEffect(() => {
        let frame = 0;

        // Coalesce scroll bursts into a single update per animation frame so the
        // header never recomputes more than once per paint.
        const handleScroll = () => {
            if (frame) return;
            frame = requestAnimationFrame(() => {
                frame = 0;
                const currentScrollY = window.scrollY;
                setIsScrolled(currentScrollY > 50);
                setIsScrollDown(
                    !(currentScrollY > prevScrollY.current && currentScrollY > 100)
                );
                prevScrollY.current = currentScrollY;
            });
        };

        // passive: the handler never calls preventDefault, so let the browser
        // keep scrolling on its own thread (avoids scroll-blocking jank).
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    return {
        isScrolled,
        isScrollDown,
        // screenSize,
        isSmallScreen
    };
}
