import Breadcrumbs from "@/components/breadcrumb";
import Section from "@/components/section";
import Image from "next/image";
import Link from "next/link";
// import galleryImages from "@/data/gallery.json"
import { ApplyStepper } from "../components/applicationSteps";
// import SwiperGallery from "../../news/_components/swiper-gallery"
// import HeaderSections from "@/components/header-sections"
const prizes = [
  "الثلث الجلي",
  "الثلث العادي",
  "النسخ",
  "الديواني",
  "النستعليق",
];
type Personal = {
  label: string;
  persons: {
    image: string;
    name: string;
    subtitle?: string;
  }[];
};

const personal: Personal[] = [
  {
    label: "لجنة التأسيس والإشراف العام للمسابقة",
    persons: [
      {
        image: "/images/logo-icon.png",
        name: "السيد غسان الخرسان (دام عزه)",
        subtitle: "رئيس مؤسسة الامام زين العابدين (عليه السلام)",
      },
      {
        image: "/contests/khat/محمد المشرفاوي.jpg",
        name: "الخطاط السيد محمد ياسين المشرفاوي",
        subtitle: "خطاط العتبة الحسينية المقدسة",
      },
    ],
  },
  {
    label: "هيئة التحكيم",
    persons: [
      {
        image: "/contests/khat/نبيل الشريفي.jpg",
        name: "الاستاذ الخطاط نبيل الشريفي",
        subtitle: "العراق",
      },
      {
        image: "/contests/khat/صادق الحسيني.jpg",
        name: "الاستاذ الخطاط صادق الحسيني",
        subtitle: "العراق",
      },
      {
        image: "/contests/khat/فرهاد قورلو.jpg",
        name: "الاستاذ الخطاط فرهاد قورلو",
        subtitle: "تركيا",
      },
      {
        image: "/contests/khat/محسن عبادى.jpg",
        name: "الاستاذ الخطاط محسن عبادى",
        subtitle: "ايران",
      },
      {
        image: "/contests/khat/عباس بو مجداد.jpg",
        name: "الاستاذ الخطاط عباس بو مجداد",
        subtitle: "السعودية",
      },
    ],
  },
  {
    label: "لجنة تنظيم المسابقة والسكرتارية",
    persons: [
      {
        image: "/contests/khat/عدنان الدلفي.jpg",
        name: "الخطاط عدنان حمد الدلفي",
      },
      {
        image: "/contests/khat/موفق البياتي.jpg",
        name: "الخطاط موفق خورشيد البياتي",
      },
      {
        image: "/contests/khat/حسين الحلو.jpg",
        name: "الخطاط حسين الحلو",
      },
      {
        image: "/contests/khat/اوس البندر.jpg",
        name: "الخطاط أوس البندر",
      },
      {
        image: "/contests/khat/حيدر السياب.jpg",
        name: "الخطاط حيدر السياب",
      },
    ],
  },
];

export default function page() {
  // const images = galleryImages
  // 	.filter((item) => item.title === "khat")
  // 	.map((image) => {
  // 		return { id: image.id, path: image.image.path }
  // 	})
  return (
    <div className="container px-4 sm:px-6 md:px-8">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المسابقات", url: "/contests" },
          { name: "مسابقة الخط", url: "#" },
        ]}
      />
      <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 lg:gap-14">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 w-full lg:w-1/2">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            مسابقة زين العابدين عليه السلام الدولية الاولى في الخط العربي
          </h1>
          <div className="space-y-3 sm:space-y-4 text-justify leading-relaxed sm:leading-loose text-base sm:text-lg">
            <p>
              أطلقنا هذه المسابقة لإبراز تراث الإمام زين العابدين (عليه السلام)
              من خلال جماليات الخط العربي، باعتباره وعاءً للمعرفة وجزءاً من
              الهوية الإسلامية.
            </p>
            <p>
              تهدف المسابقة إلى إحياء نصوص الإمام الأخلاقية والتربوية بخط جميل،
              وتحفيز الخطاطين لفهم معانيها العميقة.
            </p>
            <p>
              ندعو المبدعين لاستلهام روح هذا التراث النوراني، والتعبير عنه بريشة
              الخط العربي، ليكون هذا الجهد امتداداً لرسالة الإمام في نشر القيم
              والمعرفة.
            </p>
          </div>
		  <div className="flex items-center justify-center flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
		  

		    <Link
        href="/contests/khat/president-goals/#president-message"
        className=" mt-4 inline-flex items-center hover:scale-110 gap-2 bg-primary border-secondary border-2  text-white  transition-all font-medium px-2.5 py-1.5 rounded-full shadow-sm"
      >
		كلمة رئيس المؤسسة
   
      </Link>
			  <Link
        href="/contests/khat/president-goals/#goals"
        className=" mt-4 inline-flex items-center gap-2 hover:scale-110 bg-primary  border-secondary border-2 text-white  transition-all font-medium px-2.5 py-1.5 rounded-full shadow-sm"
      >
    أهداف المسابقة
      </Link>

		  </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
          <Image
            className="w-full sm:w-4/5 aspect-square rounded-xl shadow-md"
            src={"/contests/khat/landing.jpg"}
            alt="لوكو مسابقة الخط"
            width={1000}
            height={1000}
          />
        </div>
		<div>
			
		</div>
      </div>
    
      <h1 className="w-full text-center text-xl sm:text-2xl md:text-3xl my-12 sm:my-16 lg:my-20 font-semibold">
        خطوات الاشتراك في المسابقة
      </h1>
      <ApplyStepper />
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full mt-6 sm:mt-8" />
      {/* اعلان المسابقة */}
      <div className="flex flex-col sm:flex-row justify-between py-6 sm:py-8 lg:py-10 my-4 sm:my-5 text-base sm:text-lg lg:text-xl p-3 sm:p-5">
        <div className="text-center mb-4 sm:mb-0">
          اعلان المسابقة
          <br />
          <span className="text-lg sm:text-xl font-semibold">
            يوم ١١ / ٤ / ٢٠٢٥م
          </span>
        </div>
        <div className="text-center">
          آخر موعد لتسليم اللوحات
          <br />
          <span className="text-lg sm:text-xl font-semibold">
            يوم ٥ / ١ / ٢٠٢٦م
          </span>
        </div>
      </div>
      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent rounded-full mb-6 sm:mb-8" />

      <div className="flex flex-col justify-center space-y-10 sm:space-y-12 lg:space-y-15">
        {personal.map((type) => (
          <div key={type.label} className="my-6 sm:my-8">
            <Section title={type.label} />
            <div className="flex flex-wrap justify-around gap-y-8 sm:gap-y-10 m-auto w-full">
              {type.persons.map((person) => (
                <div
                  key={person.name}
                  className="flex flex-col text-center justify-center items-center w-1/2 sm:w-1/3 px-2 sm:px-4"
                >
                  <Image
                    src={person.image}
                    alt={person.name}
                    width={300}
                    height={300}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full hover:scale-110 duration-150"
                  />
                  <p className="text-sm sm:text-base lg:text-lg font-semibold mt-2">
                    {person.name}
                  </p>
                  {person.subtitle && (
                    <p className="font-light text-slate-500 text-xs sm:text-sm">
                      {person.subtitle}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent rounded-full my-6 sm:my-8" />

      {/* الجوائز والمحفزات */}
      <div className="flex flex-col justify-center space-y-8 py-8 px-4 md:px-6">
        <Section title="الجوائز والمحفزات" />

        <div className="relative overflow-hidden shadow-lg rounded-xl border border-gray-200">
          <table className="w-full text-right">
            <thead className="bg-[#006654] text-white">
              <tr>
                <th className="py-3 px-4 font-semibold text-center text-sm md:text-base">
                  نوع الخط
                </th>
                <th className="py-3 px-4 font-semibold text-center text-sm md:text-base">
                  المركز الأول
                </th>
                <th className="py-3 px-4 font-semibold text-center text-sm md:text-base">
                  المركز الثاني
                </th>
                <th className="py-3 px-4 font-semibold text-center text-sm md:text-base">
                  المركز الثالث
                </th>
              </tr>
            </thead>
            <tbody>
              {prizes.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="py-4 px-4 border-b border-gray-200 text-center font-medium text-gray-700">
                    {row}
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-center text-gray-800 font-bold">
                    3,000,000 د.ع
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-center text-gray-800">
                    2,000,000 د.ع
                  </td>
                  <td className="py-4 px-4 border-b border-gray-200 text-center text-gray-800">
                    1,000,000 د.ع
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-6 border-r-2 border-[#006654]">
          <p className="text-base md:text-lg text-right text-gray-800 leading-relaxed">
            وسيتم منح خمس جوائز تقديرية كل منها بقدر ٢٥٠,٠٠٠ د.ع لكل نوع من
            الأنواع الخمسة لأفضل المتسابقين الذين يلون الفائزين الثلاثة الأوائل.
          </p>
          <div className="flex mt-4">
            <div className="bg-gray-50 p-4 rounded-md border-r-2 border-[#006654] max-w-lg">
              <p className="text-gray-700 text-right text-sm md:text-base italic">
                <span className="font-semibold text-[#006654] ml-2">
                  ملاحظة:
                </span>
                تصرف الجوائز بالدينار العراقي وتحول قيمة الجائزة بالنسبة
                للفائزين الأجانب إلى العملات المتداولة وحسب سعر الصرف في وقته.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-slate-900/20 to-transparent rounded-full my-6 sm:my-8" />
			<div className="pt-20 space-y-8">
				<HeaderSections
					title={"ارشيف المسابقة"}
					moreButton={{
						label: "ارشيف المسابقة",
						href: "/contests/khat/gallery",
					}}
				/>
				<SwiperGallery images={images} />
			</div> */}
    </div>
  );
}
