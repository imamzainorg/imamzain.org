"use client"
import {motion} from "framer-motion";
import Link from "next/link";
import ImageView from "@/components/image-view";
import Image from "next/image";
import mainApp from "../../../../public/application/main-bg.jpg";

const MainSection = () => {
    const imageVariants = {
        hidden: {opacity: 0, x: -20},
        visible: {
            opacity: 1,
            x: 0,
            transition: {duration: 1, ease: "easeOut"},
        },
    }
    const containerVariants = {
        hidden: {opacity: 0, x: 100},
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 1,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className='relative top-0 h-[90vh] lg:h-[75vh] w-full'>
            <div className="absolute top-0 right-0  w-full h-full -z-20">
                <Image
                    src={mainApp}
                    alt="Some image"
                    fill
                    className="object-cover"
                    style={{
                        objectPosition: "center",
                    }}
                />
            </div>
            <div className="absolute top-0 right-0 w-full h-full flex justify-center items-center">
                <div className="container flex flex-col lg:flex-row justify-between items-center gap-10 pt-32">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="w-full lg:w-1/2 flex flex-col gap-4 lg:justify-between lg:gap-8 xl:gap-14 max-lg:text-center lg:h-[24rem] "
                    >
                        <p className="text-4xl xl:text-5xl font-bold text-center lg:text-start text-primary leading-tight lg:leading-normal">
                            تطبيق أنوار سجادية
                        </p>
                        <p className="text-lg sm:text-xl xl:text-2xl font-semibold max-lg:text-center leading-tight lg:leading-normal">
                            الموسوعة المتكاملة عن الإمام زين العابدين(عليه السلام)
                        </p>
                        <div className="flex justify-center lg:justify-start gap-4 lg:gap-10">
                            <div>
                                <Link
                                    href="https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB"
                                    target="_blank"
                                >
                                    <ImageView
                                        src="/application/app-store.svg"
                                        className="w-28 h-16 lg:w-40 lg:h-24"
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1"
                                    target="_blank"
                                >
                                    <ImageView
                                        src="/application/google-play.svg"
                                        className="w-28 h-16 lg:w-40 lg:h-24"
                                    />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                    <div className="relative flex justify-center items-center ml-10 w-[20rem] h-[24rem]">
                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            className="absolute bottom-0 left-0 w-[8rem] h-[20rem]"
                        >
                            <Image
                                src={'/application/01.png'}
                                alt={`/application/02.png`}
                                fill
                                className="object-center"
                            />
                        </motion.div>

                        <motion.div
                            variants={imageVariants}
                            initial="hidden"
                            animate="visible"
                            className="absolute bottom-0 left-16 w-[12rem] h-[24rem]"
                        >
                            <Image
                                src={'/application/02.png'}
                                alt={`/application/02.png`}
                                fill
                                className="object-center"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}


const InformationSection = () => {
    return (
        <>
            <div className="container py-20">
                <div className="text-center ">
                    <h2 className="text-4xl xl:text-4xl font-bold  lg:leading-normal">
                        الصحيفة السجادية
                    </h2>
                    <p className="text-lg sm:text-xl xl:text-2xl font-semibold pt-6 leading-tight lg:leading-normal">
                        الصحيفة السجادية وزبور آل محمد مع ما ألحقه العلماء لها من أهم مداخل هذا التطبيق.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-center gap-2">
                    <div className="relative w-[34rem] h-[24rem] ">
                        <Image
                            src={'/application/05.png'}
                            alt={`/application/02.png`}
                            fill
                            className="absolute object-cover"
                            style={{
                                objectPosition: "left",
                            }}
                        />
                    </div>
                    <div className="w-fit flex flex-col gap-4 md:gap-6">
                        <h3 className="text-2xl font-semibold  ">
                            ستجد هنا نص الصحيفة السجادية بشكل كامل ومع خدمات وميزات خاصة .. منها:
                        </h3>
                        <ul className="text-xl ">
                            <li>النص مقابل على عدة نسخ معتبرة.</li>
                            <li>النص محرك بتحريك كامل.</li>
                            <li>بيان معاني الكلمات الغامضة من خلال النقر عليها.</li>
                            <li>تمييز الآيات الكريمة باللون الأخضر.</li>
                            <li>التحكم بحجم الخط وفواصل الأسطر.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    )
}

const Collaboration = () => {
    return (<>

    </>)
}



const ImamzainSection = () => {
    return (<></>)
}

const MessageRights = () => {
    return (<></>)
}

const MasnadSection = () => {
    return (<></>)
}
const ShrinesVisitationSection = () => {
    return (<></>)
}

const FeaturesSection = () => {
    return (<></>)
}
export default function page() {
    return (
        <>
            <MainSection/>
            <InformationSection/>
            <Collaboration/>
            <MessageRights/>
            <ImamzainSection/>
            <MasnadSection/>
            <ShrinesVisitationSection/>
            <FeaturesSection/>
        </>
    )
}


// const comp = () => {
//     return (
//         <>
//             <div className="overflow-hidden">
//
//                 {/* Information Section */}
//                 <div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">
//                     <div className="information-container">
//                     <div className="main-container py-6">
//
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Download Section */}
//                 <div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">
//                     <div className="download-container">
//                         <div className="flex flex-row justify-center h-full">
//                             <div
//                                 className="main-container flex flex-col items-center gap-2 lg:gap-10 h-full md:flex-row">
//                                 <div className="w-full flex justify-center gap-10 items-center py-4 h-full">
//                                     <h2 className="text-h2">صدر هذا التطبيق بالتعاون مع:</h2>
//                                     <div
//                                         className="p-2 lg:p-4 rounded-full"
//                                         style={{backgroundColor: 'rgba(255, 250, 201, 0.3)'}}
//                                     >
//                                         <img
//                                             src="/app/anwarsajjad/static/media/download-png.3851d8a8987ccf627714.png"
//                                             alt="download partner"
//                                             className="download-png"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Information Resalat Section */}
//                 <div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">
//                     <div className="information-resalat-container">
//                         <div className="main-container py-8">
//                             <div className="hidden xl:h-[551px] relative w-full h-full xl:flex items-center pt-10">
//                                 <div className="lg:w-[617px] z-10 relative flex flex-col h-full gap-10">
//                                     <h2 className="text-h3">رسالة الحقوق – تراث خالد</h2>
//                                     <p className="text-description-2">
//                                         من أهم ما ورثناه عن الإمام زين العابدين (رسالة الحقوق) تلك الرسالة الخالدة التي
//                                         ترسم للإنسان
//                                         طريق الكمال والسعادة. تجد (رسالة الحقوق) بعرض مميز وأسلوب سهل مع قابلية المشاركة
//                                         والتفضيل.
//                                     </p>
//                                 </div>
//                                 <div
//                                     className="absolute left-0 w-full md:top-0 z-0 bottom-0 flex md:items-end items-center justify-center lg:justify-end">
//                                     <img
//                                         src="/app/anwarsajjad/static/media/resalate-png.97386840e1a6702d1544.png"
//                                         alt="رسالة الحقوق"
//                                         className="resalat-png"
//                                     />
//                                 </div>
//                             </div>
//                             <div className="h-full flex flex-col xl:hidden justify-between items-center">
//                                 <div className="flex flex-col gap-4">
//                                     <h3 className="text-h3">رسالة الحقوق – تراث خالد</h3>
//                                     <p className="text-description-2">
//                                         من أهم ما ورثناه عن الإمام زين العابدين (رسالة الحقوق) تلك الرسالة الخالدة التي
//                                         ترسم للإنسان
//                                         طريق الكمال والسعادة. تجد (رسالة الحقوق) بعرض مميز وأسلوب سهل مع قابلية المشاركة
//                                         والتفضيل.
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <img
//                                         src="/app/anwarsajjad/static/media/resalate-png.97386840e1a6702d1544.png"
//                                         alt="رسالة الحقوق"
//                                         className="resalat-png"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Information Imam Section */}
//                 <div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">
//                     <div className="information-imam-container">
//                         <div className="main-container h-full">
//                             <div className="hidden lg:flex w-full gap-6 h-full justify-center">
//                                 <div className="w-1/2 flex flex-row-reverse items-end pb-4 gap-4">
//                                     <div className="flex flex-row-reverse items-center">
//                                         <img
//                                             src="/app/anwarsajjad/static/media/imam-background.d3747c1c3d0985218243.png"
//                                             alt="الإمام زين العابدين"
//                                             className="Imam-png"
//                                         />
//                                         <p className="w-[189px] md:w-auto text-2 lg:px-10 text-center">
//                                             الإمام زين العابدين(ع) وما أخذه من مساحة واسعة في الأدب العربي
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <div className="w-1/2 flex items-start gap-8 flex-col lg:flex-row">
//                                     <div className="flex flex-row items-center gap-4 pt-4">
//                                         <img
//                                             src="/app/anwarsajjad/static/media/imam-2-background.344b3d32d28cb3a45dd4.png"
//                                             alt="السيرة العطرة"
//                                             className="Imam-png"
//                                         />
//                                         <p className="w-[189px] md:w-auto text-2 lg:px-10 text-center">
//                                             السيرة العطرة للإمام زين العابدين(ع) .. بين يديك
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="h-full flex items-center gap-16 lg:hidden">
//                                 <div className="flex flex-col gap-4 w-full items-end">
//                                     <p className="w-[92px] md:px-2 md:w-[250px] text-2 text-center">
//                                         السيرة العطرة للإمام زين العابدين(ع) .. بين يديك
//                                     </p>
//                                     <img
//                                         src="/app/anwarsajjad/static/media/imam-background.d3747c1c3d0985218243.png"
//                                         alt="الإمام زين العابدين"
//                                         className="Imam-png"
//                                     />
//                                 </div>
//                                 <div className="w-full flex flex-col gap-4">
//                                     <img
//                                         src="/app/anwarsajjad/static/media/imam-2-background.344b3d32d28cb3a45dd4.png"
//                                         alt="السيرة العطرة"
//                                         className="Imam-png"
//                                     />
//                                     <p className="w-[92px] sm:w-[189px] md:w-[250px] text-2 text-center">
//                                         الإمام زين العابدين(ع) وما أخذه من مساحة واسعة في الأدب العربي
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Information Masnad Section */}
//                 <div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">
//                     <div className="information-masnad-container">
//                         <div className="main-container py-6 h-full">
//                             <div className="hidden xl:flex justify-end lg:pl-10 relative lg:py-10 md:py-4 py-2 w-full">
//                                 <div className="flex justify-center">
//                                     <div className="absolute z-10 -right-32 top-1/2 transform -translate-y-1/2">
//                                         <img
//                                             src="/app/anwarsajjad/static/media/masnad-background.6ca9b5a7302ba22f94ee.png"
//                                             alt="مسند الإمام"
//                                             className="masnad-png"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div
//                                     className="relative z-40 h-[414px] lg:w-[561px] lg:h-[863px] md:h-[828px] flex flex-col justify-between">
//                                     <div className="flex flex-col lg:gap-7 lg:pt-16">
//                                         <h3 className="text-h3">مسند الإمام زين العابدين(ع)</h3>
//                                         <p className="text-description-2 text-justify">
//                                             من أهم مميزات مدرسة أهل البيت(ع) المحافظة على التراث الحديثي مع حرص شديد
//                                             واهتمام كبير على طول التاريخ، وإنها المحافظة على الثقل الأصغر الذي أوصى به
//                                             النبي الأعظم(ص). ومن هذا الاتجاه ستجد (مسند الإمام زين العابدين) كل الأحاديث
//                                             المروية عنه(ع) وضمن موسوعة تخصصية متكاملة.
//                                         </p>
//                                     </div>
//                                     <div className="flex lg:justify-end justify-center gap-4">
//                                         <a
//                                             href="https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB"
//                                             target="_blank"
//                                             rel="noreferrer"
//                                         >
//                                             <img
//                                                 src="data:image/png;base64,..."
//                                                 alt="app-store"
//                                                 className="masnad-download-svg"
//                                             />
//                                         </a>
//                                         <a
//                                             href="https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad"
//                                             target="_blank"
//                                             rel="noreferrer"
//                                         >
//                                             <img
//                                                 src="data:image/png;base64,..."
//                                                 alt="google-play"
//                                                 className="masnad-download-svg"
//                                             />
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="hidden md:flex flex-col grow xl:hidden justify-between w-full">
//                                 <div className="flex flex-col md:gap-4">
//                                     <h3 className="text-h3">مسند الإمام زين العابدين(ع)</h3>
//                                     <p className="text-2 text-justify">
//                                         من أهم مميزات مدرسة أهل البيت(ع) المحافظة على التراث الحديثي مع حرص شديد واهتمام
//                                         كبير على طول التاريخ، وإنها المحافظة على الثقل الأصغر الذي أوصى به النبي
//                                         الأعظم(ص). ومن هذا الاتجاه ستجد في (مسند الإمام زين العابدين) كل الأحاديث
//                                         المروية عنه(ع) وضمن موسوعة تخصصية متكاملة.
//                                     </p>
//                                 </div>
//                                 <div className="flex justify-center w-full">
//                                     <div>
//                                         <img
//                                             src="/app/anwarsajjad/static/media/masnad-background.6ca9b5a7302ba22f94ee.png"
//                                             alt="مسند الإمام"
//                                             className="masnad-png"
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="flex lg:justify-end justify-center gap-4">
//                                     <a
//                                         href="https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                     >
//                                         <img
//                                             src="data:image/png;base64,..."
//                                             alt="app-store"
//                                             className="masnad-download-svg"
//                                         />
//                                     </a>
//                                     <a
//                                         href="https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                     >
//                                         <img
//                                             src="data:image/png;base64,..."
//                                             alt="google-play"
//                                             className="masnad-download-svg"
//                                         />
//                                     </a>
//                                 </div>
//                             </div>
//                             <div className="h-full flex flex-col justify-between items-center md:hidden">
//                                 <div className="flex flex-col gap-2">
//                                     <h3 className="text-h3">مسند الإمام زين العابدين(ع)</h3>
//                                     <p className="text-description-2 text-justify">
//                                         من أهم مميزات مدرسة أهل البيت(ع) المحافظة على التراث الحديثي مع حرص شديد واهتمام
//                                         كبير على طول التاريخ، وإنها المحافظة على الثقل الأصغر الذي أوصى به النبي
//                                         الأعظم(ص). ومن هذا الاتجاه ستجد في (مسند الإمام زين العابدين) كل الأحاديث
//                                         المروية عنه(ع) وضمن موسوعة تخصصية متكاملة.
//                                     </p>
//                                 </div>
//                                 <div className="w-full flex justify-center">
//                                     <img
//                                         src="/app/anwarsajjad/static/media/masnad-background.6ca9b5a7302ba22f94ee.png"
//                                         alt="مسند الإمام"
//                                         className="masnad-png"
//                                     />
//                                 </div>
//                                 <div className="w-full flex justify-end gap-2">
//                                     <a
//                                         href="https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                     >
//                                         <img
//                                             src="data:image/png;base64,..."
//                                             alt="app-store"
//                                             className="masnad-download-svg"
//                                         />
//                                     </a>
//                                     <a
//                                         href="https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad"
//                                         target="_blank"
//                                         rel="noreferrer"
//                                     >
//                                         <img
//                                             src="data:image/png;base64,..."
//                                             alt="google-play"
//                                             className="masnad-download-svg"
//                                         />
//                                     </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Information with Background Section */}
//                 <div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">
//                     <div className="information-with-backGround-container">
//                         <div className="bg-secondlyPic bg-cover bg-center w-[1445px] relative">
//                             <div
//                                 className="absolute bottom-4 lg:bottom-10 flex flex-col justify-evenly left-10 p-2 lg:left-15 xl:left-40 lg:w-[539px] bg-white bg-opacity-80 lg:h-[272px] lg:px-[30px] lg:py-[26px] w-[210px] h-[93px] md:h-[170px] md:w-[361px] rounded-lg lg:rounded-2xl">
//                                 <h3 className="text-h3">مقامات الإمام زين العابدين(ع)</h3>
//                                 <p className="text-description-text-3">
//                                     المقامات التي تشرفت بالإمام زين العابدين في أنحاء العالم .. تجدها مع تفاصيل كاملة
//                                     عنها في هذا المدخل من التطبيق
//                                 </p>
//                             </div>
//                             <div
//                                 className="p-2 rounded-lg absolute right-10 lg:right-15 xl:right-40 md:right-10 top-7 lg:top-14 flex flex-col justify-evenly lg:w-[531px] bg-white bg-opacity-80 w-[196px] h-[93px] md:h-[170px] md:w-[361px] lg:h-[272px] lg:px-[40px] lg:py-[26px] lg:rounded-2xl">
//                                 <h3 className="text-h3">زيارات الإمام زين العابدين(ع)</h3>
//                                 <p className="text-description-text-3">
//                                     كل الزيارات المخصوصة والمطلقة التي يزار بها الإمام زين العابدين(ع)
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Features Section */}
//                 <div className="transition-all duration-[2000ms] ease-out transform opacity-100 translate-y-0">
//                     <div className="features">
//                         <div className="main-container py-12 flex flex-col lg:gap-10 md:gap-4 gap-2">
//                             <div className="flex flex-col items-center justify-center gap-2">
//                                 <h2 className="text-h2">ميزات مصممة خصيصًا</h2>
//                                 <p className="text-description">
//                                     يقدم تطبيق أنوار سجادية ميزات مخصصة تشمل الوصول السريع، البحث المتقدم، وتجربة
//                                     استخدام معززة لتفاعلك الروحي
//                                 </p>
//                             </div>
//                             <div
//                                 className="grid gap-y-4 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 md:gap-x-10 lg:py-10 justify-items-center">
//                                 {/* Feature 1 */}
//                                 <div
//                                     className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">
//                                     <img
//                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFkSURBVHgB7Vc7TsNAEH2z+bkB+QAU5gRcIRaigC4dSBTkBDEnsLkBOYFpoKBJEAUFoHADrmBxAksUBIXssLZjCUfYwgivIuJX2J63I/lpPfNmTW/eodUi+QzARA4ICBru9Xb0vHX76JEgFwUg4tOXg91z/BCiCXlSJOA3YKZBmXyBFUAtIkUtIsVKiGhCI3jkm9jojNB475HdD1Ne705sdpTJcReykzE7bSL44XKgXMxJAnb4/srRKoLvfEtdvQxJ7Ca8BhFxHbTaE/XW5dEQ8zzxzeoL0zRMSHmWuz41qhdB9lGgbhdFObVZpVgPx4zbsN3u5iYI8VR9dxgIMUfkkNY3qwHC6bjyzxHPiJmw1Z6E2RWOeer1Qy01QfuqTRlZr1BxzENjYdLesTp9y+EiHCZxAq2jHI0PD/PWDl5n3ldaq4jFGcJe5muzSlGLSPF/RTAQlskXDB5Hv/74QwjJN2XyPwErkmUCxiT0vwAAAABJRU5ErkJggg=="
//                                         alt=""
//                                         className="production-svg"
//                                     />
//                                     <h4 className="text-h4">التاريخ الهجري&nbsp;</h4>
//                                     <p className="text-production">
//                                         انطلاقاً من الحاجة إلى التاريخ الهجري، اضيف التاريخ المتزامن مع الثبوت الشرعي في
//                                         الصفحة الرئيسية
//                                     </p>
//                                 </div>
//                                 {/* Feature 2 */}
//                                 <div
//                                     className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">
//                                     <img
//                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEVSURBVHgB5ZQ/TsMwFId/zwpB3bgAUrgBRygCJhYGxIbUniRFHIRIXAAG1KX/btJIvUDnRvWr7UpOnc7vZei3OHrL50+xTeiw/3ovwVxAELb0R6eDZvI2JDJLCNPw7i47HRBRCWGIuBqUv7WJu3C1bjyEMDvbfPo1a3eiV+u/Q7F2rSc77kS31mP6qPUc/zHzGKLY7WDS1l4m1B3c/i/WbikgCo9NKp2P5KWoNy+PlUln8tfK1YbTHcWatYlYszaKtWujWLs2iPuovUzOXi6e/byCzA0ksbZOxDz9LnCVryEN24f05cpzjdO9ouePVRSHWsYI0nDnydSsjWLt2ijWrg3iPmo9Gcz1vbtYFSQhqumprfUcABjUfOqpJnczAAAAAElFTkSuQmCC"
//                                         alt=""
//                                         className="production-svg"
//                                     />
//                                     <h4 className="text-h4">شهداء الدفاع الكفائي</h4>
//                                     <p className="text-production">
//                                         وفاءً لحقهم العظيم .. اشتمل التطبيق على سيرة الشهداء مع التذكير بيوم شهادتهم حسب
//                                         التقويم الهجري
//                                     </p>
//                                 </div>
//                                 {/* Feature 3 */}
//                                 <div
//                                     className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">
//                                     <img
//                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAACcuBHKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACySURBVHgB7ZYxDsMgDABtCGmf0DFP6ZqxQ+eGl5S8pJG6ds/Qhacw9g2khAJRRzaUZPANxkYWugXLABuDMZzGsRFzfYcVmaztP5fWVLEQ7qCCyg1WRNTHeEgGG0MCJECkQeTfzzMw1mS7rNXYShPTr7p2UAAP3gj10tVSYRdu8oOIcxnikHLEBxSAYXpP0y8gARIgARIgARIgARJYVjLHFTDns10OzT9F9AMUwM5TD3vgBxtfKdQ00IIfAAAAAElFTkSuQmCC"
//                                         alt=""
//                                         className="production-svg"
//                                     />
//                                     <h4 className="text-h4">المناسبات الإسلامية</h4>
//                                     <p className="text-production">
//                                         نظراً لأهمية التذكير بالمناسبات الإسلامية طيلة السنة تزين التطبيق بهذه الخدمة
//                                     </p>
//                                 </div>
//                                 {/* Feature 4 */}
//                                 <div
//                                     className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">
//                                     <img
//                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZQxTsNAEEX/bBzL5R4hnAD6NKQDQZE0SHTJCZAvgCwuANwgBQiJJm4QBUjQ0MMJQjiB6SwSz7C2sGSLylpLcbGv8Kw0GutpNfuBDkDlQZ5vz0zZq3V7PyGNZolEY82qf4mGKF6HFMXJYPGiM59r89RT718Ho+v87BUCj3cDgK/+/YX9yHyTFIHuC0/RFE9F+TwCaDBNqy3JBDsPb/HyaLhS6ABOosRWIjGrHRd1axKSzbzz+4kIT2CBlYSAihsgiIYFHiwgUovNxcmrsdmHBVYSBm0ExrDEPdESlxPtSLic+MPlRNs4iRKXE61IuJyo4HKiVTohUewEHZ5+ytNNaNZ8t9ZV6++8BEgTpv4cTdlwMY/U5Igv82qLBR/L4+EKXeEXOa53HoG//jAAAAAElFTkSuQmCC"
//                                         alt=""
//                                         className="production-svg"
//                                     />
//                                     <h4 className="text-h4">&nbsp;الوضع الليلي والوضع النهاري</h4>
//                                     <p className="text-production">
//                                         يقدم تطبيق أنوار سجادية خيارات الوضع الليلي والوضع النهاري لتخصيص تجربة
//                                         الاستخدام، مما يضمن راحة العينين أثناء القراءة في مختلف الأوقات.
//                                     </p>
//                                 </div>
//                                 {/* Feature 5 */}
//                                 <div
//                                     className="min-w-16 flex flex-col items-center justify-center gap-2 w-[190px] h-[128px] md:w-[300px] md:h-[256px] lg:w-[343px] lg:h-[200px]">
//                                     <img
//                                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAgCAYAAACcuBHKAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEpSURBVHgB7ZQxTsNAEEX/bBzL5R4hnAD6NKQDQZE0SHTJCZAvgCwuANwgBQiJJm4QBUjQ0MMJQjiB6SwSz7C2sGSLylpLcbGv8Kw0GutpNfuBDkDlQZ5vz0zZq3V7PyGNZolEY82qf4mGKF6HFMXJYPGiM59r89RT718Ho+v87BUCj3cDgK/+/YX9yHyTFIHuC0/RFE9F+TwCaDBNqy3JBDsPb/HyaLhS6ABOosRWIjGrHRd1axKSzbzz+4kIT2CBlYSAihsgiIYFHiwgUovNxcmrsdmHBVYSBm0ExrDEPdESlxPtSLic+MPlRNs4iRKXE61IuJyo4HKiVTohUewEHZ5+ytNNaNZ8t9ZV6++8BEgTpv4cTdlwMY/U5Igv82qLBR/L4+EKXeEXOa53HoG//jAAAAAElFTkSuQmCC"
//                                         alt=""
//                                         className="production-svg"
//                                     />
//                                     <h4 className="text-h4">المكتبة التخصصية</h4>
//                                     <p className="text-production">
//                                         ستضاف قريباً المكتبة التخصصية بالإمام زين العابدين(ع)
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//
//                 {/* Footer */}
//                 <div className="footer lg:py-12 md:py-8 sm:py-4 py-3 flex justify-center">
//                     <div className="main-container px-8">
//                         <div className="flex w-full gap-8 justify-end items-center">
//                             <p className="text-body w-[152px] sm:w-auto px-2 text-center">
//                                 جميع الحقوق محفوظة لفريق مساحة حرة 2011 / 2024
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
