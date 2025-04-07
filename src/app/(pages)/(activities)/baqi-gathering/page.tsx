import Image from "next/image";

const SectionTitle = ({ children, className = "" }) => (
    <h2
        className={`text-3xl md:text-4xl text-center text-[#0B1F47] mb-10 relative inline-block ${className}`}
    >
        {children}
        <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 block w-full h-1 bg-[#c49e38]"></span>
    </h2>
);

const Header = () => {
    const navItems = [
        { id: "about", label: "عن الملتقى" },
        { id: "objectives", label: "الأهداف" },
        { id: "speakers", label: "المتحدثون" },
        { id: "schedule", label: "جدول الأعمال" },
        { id: "topics", label: "المحاور" },
        { id: "location", label: "المكان" },
        { id: "activities", label: "الفعاليات" },
    ];
    return (
        <header className="bg-[#0B1F47] text-white py-1 border-b-4 border-[#c49e38]">
            <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-start h-24 overflow-hidden">
                    <Image
                        src="/baqi-gathering/ملتقى-البقيع-شعار-النيلي.png"
                        width={1000}
                        height={1000}
                        className="w-14  cursor-pointer py-2"
                        alt="Logo"
                    />
                </div>
                <nav>
                    <ul className="flex flex-wrap justify-center mt-4 md:mt-0">
                        {navItems.map((item) => (
                            <li key={item.id} className="px-2">
                                <a
                                    href={`#${item.id}`}
                                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const Hero = () => (
    <section
        className="relative h-[70vh] flex flex-col justify-center items-center text-center text-white px-5"
        style={{
            background:
                "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/albaqi.jpg') no-repeat center center/cover",
        }}
    >
        <h1 className="text-4xl md:text-5xl font-bold mb-5 drop-shadow-lg">
            ملتقى البقيع الثاني
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-3">
            تحت شعار "البقيع: تراث إسلامي وذاكرة الأمة"
        </p>
        <p className="text-lg mb-3">12 شوال 1446هـ</p>
        <a
            href="#schedule"
            className="bg-[#c49e38] hover:bg-[#a07b1e] transition-all duration-300 text-white py-3 px-8 rounded inline-block mt-5"
        >
            جدول الفعاليات
        </a>
    </section>
);

const AboutSection = () => (
    <section id="about" className="py-16 bg-white">
        <div className="container">
            <div className="flex flex-wrap justify-center items-center text-center">
                <SectionTitle className="mx-auto">عن الملتقى</SectionTitle>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:flex-1 text-lg text-justify">
                    <p className="mb-5">
                        نظرًا لأهمية التراث الإسلامي عموماً، وما يحمله البقيع من رمزية
                        دينية وتاريخية، وفي إطار الجهود الرامية إلى التعريف بالبعد الفكري
                        العقائدي والثقافي التاريخي لهذا المعلم الإسلامي المقدس، والذي يمثل
                        مصداقا واضحاً للتعدي على المكانة السامية لأئمة أهل البيت، ويقدم
                        أنموذجا للتعصب العقائدي والتطرف الفكري الذي ما زال المسلمون -قبل
                        غيرهم- يتجرعون منه مرارة العيش وغياب الأمن والأمان، ومحاولةً
                        لتمرير المباني الفقهية الخاصة وطرحها في الواقع العملي على أنها
                        مسلمات دينية وتاريخية؛ للتأثير على وجدان الأمة عموماً.
                    </p>
                    <p>
                        من هنا تسعى مؤسسة الإمام زين العابدين للبحوث والدراسات إلى تركيز
                        الضوء على أهم المفاصل العلمية والثقافية في هذا الحدث المهم في
                        الملتقى الثاني الذي تروم عقده بمناسبة هدم تلك القبور الطواهر في
                        الثامن من شهر شوال.
                    </p>
                </div>
                {/* Optionally add an image here */}
            </div>
        </div>
    </section>
);

const ObjectivesSection = () => (
    <section id="objectives" className="py-16 bg-gray-50">
        <div className="container">
            <SectionTitle>أهداف الملتقى</SectionTitle>
            <ul className="list-disc list-inside space-y-4 text-lg pr-5">
                <li>
                    تحليل تداعيات هدم البقيع من منظور فكري عقائدي، وحضاري اجتماعي، وإبراز
                    أثر ذلك على وعي المجتمع الإسلامي.
                </li>
                <li>
                    إبراز الأهمية الدينية والتاريخية للبقيع بوصفه مدفنًا لأربعة من أئمة أهل
                    البيت وجملة من الصحابة الكرام.
                </li>
                <li>
                    مناقشة الرؤى الفقهية والفكرية المتعلقة بإحياء التراث الإسلامي، وطرح
                    دراسات تحليلية حول مشروعية الحفاظ على المقدسات.
                </li>
                <li>
                    إحياء الهوية الإسلامية عبر دراسة البقيع كنموذج يعكس جدلية العلاقة بين الدين
                    والحضارة ودور المعالم الإسلامية في تشكيل الوعي الجمعي.
                </li>
            </ul>
            <h3 className="mt-10 text-2xl text-[#1a3c40]">
                الغاية العملية من النشاط:
            </h3>
            <ul className="list-disc list-inside space-y-4 text-lg pr-5 mt-4">
                <li>
                    تعزيز الوعي بأهمية المواقع الإسلامية التاريخية، وفتح آفاق لحوار العلمي
                    حول دورها في حفظ الهوية الإسلامية.
                </li>
                <li>
                    تقديم قراءات تحليلية جديدة تربط بين الماضي والحاضر، وتحث على تبني
                    استراتيجيات تحفظ التراث الإسلامي من الاندثار أو التغييب.
                </li>
                <li>
                    مناقشة القضايا المرتبطة بالبقيع ضمن إطار علمي رصين، يسهم في إثراء الفكر
                    الإسلامي وتعزيز الاهتمام بالمقدسات الدينية كجزء من الهوية الحضارية للأمة.
                </li>
            </ul>
        </div>
    </section>
);

const SpeakersSection = () => {
    const speakers = [
        {
            img: "/baqi-gathering/شيخ محمد أل حيدر.jpg",
            alt: "شيخ محمد أل حيدر",
            name: "سماحة الشيخ محمد أل حيدر",
            title: "هدم القبور نقطة تقاطع السياقات",
        },
        {
            img: "/baqi-gathering/الأستاذ الدكتور حسن الحكيم.jpg",
            alt: "الدكتور حسن الحكيم",
            name: "الأستاذ الدكتور حسن الحكيم",
            title: "قبور ال البيت في التراث الإسلامي بين الحفاظ والتجريف",
        },
        {
            img: "/baqi-gathering/الأستاذ الدكتور حسن الحكيم.jpg",
            alt: "الدكتور حسن الحكيم",
            name: "الأستاذ الدكتور حسن الحكيم",
            title: "قبور ال البيت في التراث الإسلامي بين الحفاظ والتجريف",
        },
    ];
    return (
        <section id="speakers" className="py-16 bg-white">
            <div className="container">
                <SectionTitle>المحاضرون</SectionTitle>
                <div className="flex   justify-center gap-8">
                    {speakers.map((speaker, index) => (
                        <div
                            key={index}
                            className="shadow-xl border rounded-lg flex flex-col md:flex-row justify-between p-4 w-full md:w-1/2 lg:w-1/3"
                        >
                            <div className="md:w-1/2 p-2">
                                <h3 className="text-xl font-semibold mb-2 text-[#1a3c40]">
                                    {speaker.name}
                                </h3>
                                <p className="text-neutral-700 text-lg">
                                    البحث بعنوان {speaker.title}
                                </p>
                            </div>
                            <div className="flex items-center justify-center p-2">
                                <div className="rounded-full bg-gray-100 w-32 h-32 overflow-hidden">
                                    <Image
                                        src={speaker.img}
                                        width={1000}
                                        height={1000}
                                        className="w-full cursor-pointer"
                                        alt={speaker.alt}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ScheduleSection = () => {
    const scheduleItemsFirst = [
        { time: "9:30 - 9:35", title: "قراءة آي من كتاب الله العزيز" },
        { time: "9:35 - 9:45", title: "كلمة ترحيبية من قبل المؤسسة" },
        { time: "9:45 - 9:55", title: "كلمة العتبة الحسينية المقدسة" },
        { time: "9:55 - 10:55", title: "الجلسة البحثية الأولى بواقع محاضرتين" },
        { time: "10:55 - 11:25", title: "جولة في المعرض" },
        { time: "11:25 - 12:30", title: "التهيؤ للصلاة وأدائها" },
        { time: "12:30 - 1:30", title: "الغداء" },
    ];

    return (
        <section id="schedule" className="py-16 bg-gray-50">
            <div className="container">
                <SectionTitle>جدول الأعمال</SectionTitle>
                <div className="flex justify-center mb-8">
                    <button className="px-8 py-3 bg-gray-300 text-lg font-medium rounded hover:bg-gray-400 transition-all duration-300 active:bg-[#1a3c40] active:text-white">
                        يوم الجمعة - 12 شوال
                    </button>
                </div>
                <div className="text-center mb-8">
                    <h3 className="text-2xl text-[#1a3c40] mb-4">الجلسة الأولى</h3>
                    <p className="text-gray-600 mb-6">
                        انطلاق فعاليات الجلسة الأولى الساعة 9:30 صباحاً
                    </p>
                </div>
                <div className="space-y-4">
                    {scheduleItemsFirst.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row bg-white rounded shadow overflow-hidden"
                        >
                            <div className="bg-[#0B1F47] text-white flex flex-col justify-center items-center p-4 md:w-40">
                                <span>{item.time}</span>
                            </div>
                            <div className="flex-1 p-4">
                                <h3 className="text-xl text-[#1a3c40]">{item.title}</h3>
                            </div>
                        </div>
                    ))}

                    <p className="text-center text-gray-600 mt-6">
                        ختام الملتقى الساعة 3:30 عصراً، وهو موعد انطلاق السيارات التي تقل ضيوف
                        المحافظات البعيدة الى مكان استراحتهم في كربلاء المقدسة
                    </p>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-[#0B1F47] text-white py-12">
        <div className="container">
            <div className="flex flex-wrap justify-between mb-10">
                <div className="w-full md:w-1/3 mb-6">
                    <h3 className="text-2xl text-[#c49e38] mb-4">
                        مؤسسة الإمام زين العابدين للبحوث والدراسات
                    </h3>
                    <p className="mb-2 text-gray-300">
                        بعض المعلومات عن المؤسسة يمكن وضعها هنا.
                    </p>
                    <p className="mb-2 text-gray-300">
                        مثال على التفاصيل أو السيرة الذاتية.
                    </p>
                </div>
                <div className="w-full md:w-1/3 mb-6">
                    <h3 className="text-2xl text-[#c49e38] mb-4">روابط سريعة</h3>
                    <a href="#about" className="block text-gray-300 hover:text-[#c49e38] mb-2">
                        عن الملتقى
                    </a>
                    <a href="#objectives" className="block text-gray-300 hover:text-[#c49e38] mb-2">
                        الأهداف
                    </a>
                    <a href="#speakers" className="block text-gray-300 hover:text-[#c49e38] mb-2">
                        المتحدثون
                    </a>
                    <a href="#schedule" className="block text-gray-300 hover:text-[#c49e38] mb-2">
                        جدول الأعمال
                    </a>
                    <a href="#topics" className="block text-gray-300 hover:text-[#c49e38] mb-2">
                        المحاور
                    </a>
                </div>
                <div className="w-full md:w-1/3 mb-6">
                    <h3 className="text-2xl text-[#c49e38] mb-4">تواصل معنا</h3>
                    <a href="mailto:info@example.com" className="block text-gray-300 hover:text-[#c49e38] mb-2">
                        info@example.com
                    </a>
                    <a href="tel:+1234567890" className="block text-gray-300 hover:text-[#c49e38] mb-2">
                        +1234567890
                    </a>
                </div>
            </div>
            <div className="text-center border-t border-[#2a5559] pt-4">
                &copy; {new Date().getFullYear()} مؤسسة الإمام زين العابدين للبحوث والدراسات.
                جميع الحقوق محفوظة.
            </div>
        </div>
    </footer>
);

export default function Home() {
    return (
        <div className="bg-gray-100 text-gray-800 font-serif">
            <Header />
            <Hero />
            <AboutSection />
            <ObjectivesSection />
            <SpeakersSection />
            <ScheduleSection />
            <Footer />
        </div>
    );
}
