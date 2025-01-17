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

    const isSmallScreen = useMediaQuery({ maxWidth: 1024 });

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            setIsScrollDown(
                !(currentScrollY > prevScrollY.current && currentScrollY > 100)
            );
            prevScrollY.current = currentScrollY;
        };

        // const handleResize = () => {
        //     setScreenSize({ width: window.innerWidth, height: window.innerHeight });
        // };

        const handleZoom = () => {
            const zoomLevel = Math.round((window.outerWidth / window.innerWidth) * 100);
            console.log("Zoom level detected:", zoomLevel);
        };
        // Add event listeners
        window.addEventListener("scroll", handleScroll);
        // window.addEventListener("resize", handleResize);
        window.addEventListener("resize", handleZoom);

        // Cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
            // window.removeEventListener("resize", handleResize);
            window.removeEventListener("resize", handleZoom);
        };
    }, []);

    return {
        isScrolled,
        isScrollDown,
        // screenSize,
        isSmallScreen
    };
}
