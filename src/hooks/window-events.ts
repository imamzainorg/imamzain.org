import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const SMALL_SCREEN = "(max-width: 1023px)";

const subscribeToScreenSize = (onChange: () => void) => {
    const query = window.matchMedia(SMALL_SCREEN);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};

export default function useWindowEvents() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isScrollDown, setIsScrollDown] = useState<boolean>(true);
    const prevScrollY = useRef<number>(0);

    const isSmallScreen = useSyncExternalStore(
        subscribeToScreenSize,
        () => window.matchMedia(SMALL_SCREEN).matches,
        () => false,
    );

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

    return { isScrolled, isScrollDown, isSmallScreen };
}
