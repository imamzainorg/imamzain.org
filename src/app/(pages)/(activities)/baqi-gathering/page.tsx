import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>
          ملتقى البقيع الثاني - مؤسسة الإمام زين العابدين للبحوث والدراسات
        </title>
      </Head>
      <div className="bg-gray-100 text-gray-800 font-serif">
        {/* Header */}
        <header className="bg-[#1a3c40] text-white py-5 border-b-4 border-[#c49e38]">
          <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center">
              <div className="overflow-hidden py-2 ">
                <Image
                  src={'/images/logo-horizontal-white.svg'}
                  width={50}
                  height={50}
                  className={`w-32 sm:w-40 xl:w-52 h-12 lg:h-20 cursor-pointer`}
                  alt="logo"
                />
              </div>
              {/* <span className="ml-4 text-xl font-bold">
                مؤسسة الإمام زين العابدين للبحوث والدراسات
              </span> */}
            </div>
            <nav>
              <ul className="flex flex-wrap justify-center mt-4 md:mt-0">
                <li className="mx-2">
                  <a
                    href="#about"
                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                  >
                    عن الملتقى
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href="#objectives"
                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                  >
                    الأهداف
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href="#speakers"
                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                  >
                    المتحدثون
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href="#schedule"
                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                  >
                    جدول الأعمال
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href="#topics"
                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                  >
                    المحاور
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href="#location"
                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                  >
                    المكان
                  </a>
                </li>
                <li className="mx-2">
                  <a
                    href="#activities"
                    className="text-lg hover:text-[#c49e38] transition-all duration-300"
                  >
                    الفعاليات
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section
          className="relative h-96 flex flex-col justify-center items-center text-center text-white px-5"
          style={{
            background:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/api/placeholder/1200/500') no-repeat center center/cover",
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

        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl text-center text-[#1a3c40] mb-10 relative inline-block">
              عن الملتقى
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 block w-24 h-1 bg-[#c49e38]"></span>
            </h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:flex-1 md:pr-5">
                <p className="mb-5 text-lg">
                  نظرًا لأهمية التراث الإسلامي عموماً، وما يحمله البقيع من رمزية
                  دينية وتاريخية، وفي إطار الجهود الرامية إلى التعريف بالبعد
                  الفكري العقائدي والثقافي التاريخي لهذا المعلم الإسلامي المقدس،
                  والذي يمثل مصداقا واضحاً للتعدي على المكانة السامية لأئمة أهل
                  البيت، ويقدم أنموذجا للتعصب العقائدي والتطرف الفكري الذي ما
                  زال المسلمون -قبل غيرهم- يتجرعون منه مرارة العيش وغياب الأمن
                  والأمان، ومحاولةً لتمرير المباني الفقهية الخاصة وطرحها في
                  الواقع العملي على أنها مسلمات دينية وتاريخية؛ للتأثير على
                  وجدان الأمة عموماً.
                </p>
                <p className="text-lg">
                  من هنا تسعى مؤسسة الإمام زين العابدين للبحوث والدراسات الى
                  تركيز الضوء على أهم المفاصل العلمية والثقافية في هذا الحدث
                  المهم في الملتقى الثاني الذي تروم عقده بمناسبة هدم تلك القبور
                  الطواهر في الثامن من شهر شوال.
                </p>
              </div>
              <div className="md:flex-1 mt-8 md:mt-0 text-center">
                <img
                  src="/api/placeholder/500/300"
                  alt="صورة البقيع"
                  className="rounded-lg shadow-lg inline-block"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section id="objectives" className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl text-center text-[#1a3c40] mb-10 relative inline-block">
              أهداف الملتقى
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 block w-24 h-1 bg-[#c49e38]"></span>
            </h2>
            <ul className="list-disc list-inside space-y-4 text-lg pr-5">
              <li>
                تحليل تداعيات هدم البقيع من منظور فكري عقائدي، وحضاري اجتماعي،
                وإبراز أثر ذلك على وعي المجتمع الإسلامي.
              </li>
              <li>
                إبراز الأهمية الدينية والتاريخية للبقيع بوصفه مدفنًا لأربعة من
                أئمة أهل البيت وجملة من الصحابة الكرام.
              </li>
              <li>
                مناقشة الرؤى الفقهية والفكرية المتعلقة بإحياء التراث الإسلامي،
                وطرح دراسات تحليلية حول مشروعية الحفاظ على المقدسات.
              </li>
              <li>
                إحياء الهوية الإسلامية عبر دراسة البقيع كنموذج يعكس جدلية
                العلاقة بين الدين والحضارة ودور المعالم الإسلامية في تشكيل الوعي
                الجمعي.
              </li>
            </ul>

            <h3 className="mt-10 text-2xl text-[#1a3c40]">
              الغاية العملية من النشاط:
            </h3>
            <ul className="list-disc list-inside space-y-4 text-lg pr-5 mt-4">
              <li>
                تعزيز الوعي بأهمية المواقع الإسلامية التاريخية، وفتح آفاق لحوار
                العلمي حول دورها في حفظ الهوية الإسلامية.
              </li>
              <li>
                تقديم قراءات تحليلية جديدة تربط بين الماضي والحاضر، وتحث على
                تبني استراتيجيات تحفظ التراث الإسلامي من الاندثار أو التغييب.
              </li>
              <li>
                مناقشة القضايا المرتبطة بالبقيع ضمن إطار علمي رصين، يسهم في
                إثراء الفكر الإسلامي وتعزيز الاهتمام بالمقدسات الدينية كجزء من
                الهوية الحضارية للأمة.
              </li>
            </ul>
          </div>
        </section>

        {/* Speakers Section */}
        <section id="speakers" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl text-center text-[#1a3c40] mb-10 relative inline-block">
              المتحدثون
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 block w-24 h-1 bg-[#c49e38]"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                {
                  img: "/api/placeholder/250/250",
                  alt: "السيد محمد صادق الخرسان",
                  name: "سماحة السيد محمد صادق الخرسان",
                  title: "دام توفيقه",
                },
                {
                  img: "/api/placeholder/250/250",
                  alt: "السيد منير الخباز",
                  name: "سماحة السيد منير الخباز",
                  title: "دام توفيقه",
                },
                {
                  img: "/api/placeholder/250/250",
                  alt: "الدكتور حسن الحكيم",
                  name: "الأستاذ الدكتور حسن الحكيم",
                  title: "المحترم",
                },
                {
                  img: "/api/placeholder/250/250",
                  alt: "الشيخ الدكتور عباس السراج",
                  name: "سماحة الشيخ الدكتور عباس السراج",
                  title: "دام توفيقه",
                },
                {
                  img: "/api/placeholder/250/250",
                  alt: "الدكتور أياد الأرناؤوطي",
                  name: "الأستاذ الدكتور أياد الأرناؤوطي",
                  title: "المحترم",
                },
                {
                  img: "/api/placeholder/250/250",
                  alt: "الشيخ الدكتور سامر توفيق عجمي",
                  name: "الشيخ الدكتور سامر توفيق عجمي",
                  title: "المحترم",
                },
                {
                  img: "/api/placeholder/250/250",
                  alt: "الدكتور صادق الطفيلي",
                  name: "الأستاذ الدكتور صادق الطفيلي",
                  title: "المحترم",
                },
              ].map((speaker, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transform transition-transform hover:-translate-y-2"
                >
    <div >
      ww
    </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2 text-[#1a3c40]">
                      {speaker.name}
                    </h3>
                    <p className="text-gray-600">{speaker.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section id="schedule" className="py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl text-center text-[#1a3c40] mb-10 relative inline-block">
              جدول الأعمال
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 block w-24 h-1 bg-[#c49e38]"></span>
            </h2>
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
              {[
                { time: "9:30 - 9:35", title: "قراءة آي من كتاب الله العزيز" },
                { time: "9:35 - 9:45", title: "كلمة ترحيبية من قبل المؤسسة" },
                { time: "9:45 - 9:55", title: "كلمة العتبة الحسينية المقدسة" },
                {
                  time: "9:55 - 10:55",
                  title: "الجلسة البحثية الأولى بواقع محاضرتين",
                },
                { time: "10:55 - 11:25", title: "جولة في المعرض" },
                { time: "11:25 - 12:30", title: "التهيؤ للصلاة وأدائها" },
                { time: "12:30 - 1:30", title: "الغداء" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row bg-white rounded shadow overflow-hidden"
                >
                  <div className="bg-[#1a3c40] text-white flex flex-col justify-center items-center p-4 md:w-40">
                    <span>{item.time}</span>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-xl text-[#1a3c40]">{item.title}</h3>
                  </div>
                </div>
              ))}
              <div className="mt-10 text-center">
                <h3 className="text-2xl text-[#1a3c40] mb-4">الجلسة الثانية</h3>
                <p className="text-gray-600 mb-6">
                  انطلاق فعاليات الجلسة الثانية الساعة 1:30 بعد الظهر
                </p>
              </div>
              {[
                { time: "1:30 - 1:35", title: "قراءة آي من كتاب الله العزيز" },
                {
                  time: "1:35 - 2:35",
                  title: "الجلسة البحثية الثانية بواقع محاضرتين",
                },
                { time: "2:35 - 2:45", title: "الكلمة الختامية" },
                { time: "2:45 - 2:50", title: "تكريم الجامعات" },
                {
                  time: "2:50 - 3:30",
                  title:
                    "تكريم الباحثين المشاركين في المؤتمر العلمي الأول جماعياً",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row bg-white rounded shadow overflow-hidden"
                >
                  <div className="bg-[#1a3c40] text-white flex flex-col justify-center items-center p-4 md:w-40">
                    <span>{item.time}</span>
                  </div>
                  <div className="flex-1 p-4">
                    <h3 className="text-xl text-[#1a3c40]">{item.title}</h3>
                  </div>
                </div>
              ))}
              <p className="text-center text-gray-600 mt-6">
                ختام الملتقى الساعة 3:30 عصراً، وهو موعد انطلاق السيارات التي
                تقل ضيوف المحافظات البعيدة الى مكان استراحتهم في كربلاء المقدسة
              </p>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section id="topics" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5">
            <h2 className="text-3xl md:text-4xl text-center text-[#1a3c40] mb-10 relative inline-block">
              المحاور
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 block w-24 h-1 bg-[#c49e38]"></span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                "أدلة زيارة القبور: قراءة جديدة في النصوص والتاريخ",
                "هدم البقيع: جذوره الفكرية وانعكاساته الحضارية",
                "قبور آل البيت في التراث الإسلامي: بين الحفاظ والتجريف",
                "إحياء البقيع: ضرورة عقائدية أم مسؤولية تاريخية؟",
                "الذاكرة الجماعية وهدم البقيع: التأثيرات النفسية والاجتماعية",
                "أئمة البقيع: حكمة الاجتماع في مهبط النور والولاية",
                "أئمة البقيع: سر الاصطفاء الإلهي ووحدة المسار الإيماني",
                "الهوية والمقدسات: كيف نحمي التراث الإسلامي؟",
              ].map((topic, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-5 rounded-lg shadow-md transform transition-transform hover:-translate-y-1"
                >
                  <h3 className="text-xl text-[#1a3c40]">{topic}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1a3c40] text-white py-12">
          <div className="max-w-7xl mx-auto px-5">
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
                <a
                  href="#about"
                  className="block text-gray-300 hover:text-[#c49e38] mb-2"
                >
                  عن الملتقى
                </a>
                <a
                  href="#objectives"
                  className="block text-gray-300 hover:text-[#c49e38] mb-2"
                >
                  الأهداف
                </a>
                <a
                  href="#speakers"
                  className="block text-gray-300 hover:text-[#c49e38] mb-2"
                >
                  المتحدثون
                </a>
                <a
                  href="#schedule"
                  className="block text-gray-300 hover:text-[#c49e38] mb-2"
                >
                  جدول الأعمال
                </a>
                <a
                  href="#topics"
                  className="block text-gray-300 hover:text-[#c49e38] mb-2"
                >
                  المحاور
                </a>
              </div>
              <div className="w-full md:w-1/3 mb-6">
                <h3 className="text-2xl text-[#c49e38] mb-4">تواصل معنا</h3>
                <a
                  href="mailto:info@example.com"
                  className="block text-gray-300 hover:text-[#c49e38] mb-2"
                >
                  info@example.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="block text-gray-300 hover:text-[#c49e38] mb-2"
                >
                  +1234567890
                </a>
              </div>
            </div>
            <div className="text-center border-t border-[#2a5559] pt-4">
              &copy; {new Date().getFullYear()} مؤسسة الإمام زين العابدين للبحوث
              والدراسات. جميع الحقوق محفوظة.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
