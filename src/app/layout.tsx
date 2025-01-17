import type {Metadata} from "next"
import localFont from "next/font/local"

import {Analytics} from "@vercel/analytics/next"
import {SpeedInsights} from "@vercel/speed-insights/next"

import "@/style/globals.css"
import {Toaster} from "sonner"

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import {LanguagesProvider} from "@/context/language-context";
import {HeroUIProvider} from "@heroui/system";

config.autoAddCss = false;

const imamzainfont = localFont({
    src: [
        {
            path: "../assets/fonts/weight 100 PingAR+LT-Hairline.otf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 100 PingAR+LT-Hairline.otf",
            weight: "100",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 200 PingAR+LT-Thin.otf",
            weight: "200",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 300 PingAR+LT-ExtraLight.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 400 PingAR+LT-Light.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 500 PingAR+LT-Regular.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 600 PingAR+LT-Medium.otf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 700 PingAR+LT-Bold.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 800 PingAR+LT-Heavy.otf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../assets/fonts/weight 900 PingAR+LT-Black.otf",
            weight: "900",
            style: "normal",
        },
    ],
    variable: "--font-imamzain",
})

export const metadata: Metadata = {
    title: "الموقع التجريبي لمؤسسة الإمام زين العابدين",
    description:
        "مؤسسة قائمة لاحياء تراث ونشر تعاليم الامام علي بن الحسين السجاد عليه السلام",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="ar" dir="rtl">
        <body
            className={`${imamzainfont.className}  bg-[url('/shapes/bg.svg')]`}
        >
        <HeroUIProvider>
            <LanguagesProvider>
                {children}
                <Toaster/>
            </LanguagesProvider>
        </HeroUIProvider>

        <Analytics/>
        <SpeedInsights/>

        </body>
        </html>
    )
}
