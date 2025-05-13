"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import mainApp from "../../../../public/application/main-bg.jpg";

const MainSection = () => {
  const imageVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
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
    <div className="relative top-0 h-[50rem] lg:h-[40rem] w-full">
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
      <div className="absolute top-0 right-0 w-full h-full flex justify-center items-center  pt-10 lg:pt-40 z-10">
        <div className="container flex flex-col lg:flex-row justify-between items-center gap-10 ">
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
              <Link
                href="https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB"
                target="_blank"
              >
                <Image
                  src={"/application/app-store.svg"}
                  alt={"/application/app-store.svg"}
                  width={500}
                  height={500}
                  className="object-center w-28 h-16 lg:w-40 lg:h-24"
                />
              </Link>

              <Link
                href="https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1"
                target="_blank"
              >
                <Image
                  src={"/application/google-play.svg"}
                  alt={"/application/google-play.svg"}
                  width={500}
                  height={500}
                  className="object-center w-28 h-16 lg:w-40 lg:h-24"
                />
              </Link>
            </div>
          </motion.div>
          <div className="relative flex justify-center items-center ml-10 w-[20rem] h-[24rem] ">
            <motion.div
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              className="absolute bottom-0 left-0 w-[8rem] h-[20rem]"
            >
              <Image
                src={"/application/01.png"}
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
                src={"/application/02.png"}
                alt={`/application/02.png`}
                fill
                className="object-center"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InformationSection = () => {
  return (
    <>
      <div className="container py-20">
        <div className="text-center ">
          <h2 className="text-4xl xl:text-4xl font-bold  lg:leading-normal">
            الصحيفة السجادية
          </h2>
          <p className="text-lg sm:text-xl xl:text-2xl font-semibold pt-6 leading-tight lg:leading-normal">
            الصحيفة السجادية وزبور آل محمد مع ما ألحقه العلماء لها من أهم مداخل
            هذا التطبيق.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-center gap-10 items-center">
          <div className="relative w-[26rem] h-[22rem]  ">
            <Image
              src={"/application/05.png"}
              alt={`/application/02.png`}
              fill
              className="absolute object-cover"
              style={{
                objectPosition: "left",
              }}
            />
          </div>
          <div className="lg:w-1/2 flex flex-col gap-4 md:gap-6">
            <h3 className="text-2xl font-semibold  ">
              ستجد هنا نص الصحيفة السجادية بشكل كامل ومع خدمات وميزات خاصة ..
              منها:
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
  );
};

const ImamzainSection = () => {
  return (
    <>
      <div className="bg-[#D3FBFD]">
        <div className="container flex justify-center gap-5 lg:gap-10 py-10 w-full h-[40rem]">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 self-end">
            <p className="text-xl w-[12rem] max-lg:pb-5 lg:w-60 text-center">
              الإمام زين العابدين(ع) وما أخذه من مساحة واسعة في الأدب العربي
            </p>
            <div className="relative w-[12rem] h-[24rem]">
              <Image
                src={"/application/01.png"}
                alt="/application/01.png"
                fill
                className="absolute w-[12rem] h-[24rem] object-center"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-10 self-start">
            <div className="relative w-[12rem] h-[24rem]">
              <Image
                src={"/application/02.png"}
                alt="/application/02.png"
                fill
                className="absolute w-[12rem] h-[24rem] object-center"
              />
            </div>
            <p className="text-xl w-[12rem] max-lg:pt-5 lg:w-60 text-center">
              السيرة العطرة للإمام زين العابدين (ع) .. بين يديك
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const MessageRights = () => {
  return (
    <>
      <div className="container py-8">
        <div className=" w-full h-full flex flex-col lg:flex-row justify-center gap-10 items-center pt-10">
          <div className="lg:w-[617px] z-10 relative flex flex-col h-full gap-10">
            <h2 className="text-2xl font-bold">رسالة الحقوق – تراث خالد</h2>
            <p className="text-xl">
              من أهم ما ورثناه عن الإمام زين العابدين (رسالة الحقوق) تلك الرسالة
              الخالدة التي ترسم للإنسان طريق الكمال والسعادة. تجد (رسالة الحقوق)
              بعرض مميز وأسلوب سهل مع قابلية المشاركة والتفضيل.
            </p>
          </div>

          <div className="relative w-[24rem] h-[24rem] ">
            <Image
              src={"/application/06.png"}
              alt={`/application/06.png`}
              fill
              className="absolute object-cover"
              style={{
                objectPosition: "left",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const MasnadSection = () => {
  return (
    <>
      <>
        <div className="container py-8">
          <div className=" w-full h-full flex flex-col-reverse lg:flex-row justify-center gap-10 items-center pt-10">
            <div className="relative w-[26rem] h-[22rem] ">
              <Image
                src={"/application/05.png"}
                alt={`/application/05.png`}
                fill
                className="absolute object-cover"
              />
            </div>
            <div className="lg:w-[617px] z-10 relative flex flex-col h-full gap-10">
              <h2 className="text-2xl font-bold">
                مسند الإمام زين العابدين(ع)
              </h2>
              <p className="text-xl">
                من أهم مميزات مدرسة أهل البيت(ع) المحافظة على التراث الحديثي مع
                حرص شديد واهتمام كبير على طول التاريخ، وإنها المحافظة على الثقل
                الأصغر الذي أوصى به النبي الأعظم(ص). ومن هذا الاتجاه ستجد (مسند
                الإمام زين العابدين) كل الأحاديث المروية عنه(ع) وضمن موسوعة
                تخصصية متكاملة.
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

const ShrinesVisitationSection = () => {
  return (
    <div className={"bg-[#FDD79C] "}>
      <div className="relative top-0 h-[40rem] lg:h-[70rem] w-full mx-auto ">
        <div className="absolute top-0 right-0  w-full h-full -z-0 ">
          <Image
            src={"/application/07.png"}
            alt="Some image"
            fill
            className="object-cover"
            style={{
              objectPosition: "center",
            }}
          />
        </div>
        <div className="container flex flex-col justify-between   py-10 lg:py-20 w-full h-full ">
          <div className="flex flex-col justify-center gap-2 lg:gap-6 bg-neutral-100  self-start z-20 w-[15rem] lg:w-[30rem] p-5 lg:p-10 rounded-xl xl:mr-32  ">
            <h2 className="text-sm lg:text-2xl font-bold">
              زيارات الإمام زين العابدين(عليه السلام)
            </h2>
            <p className="text-sm lg:text-xl">
              كل الزيارات المخصوصة والمطلقة التي يزار بها الإمام زين
              العابدين(عليه السلام)
            </p>
          </div>

          <div className=" flex flex-col justify-center gap-2 lg:gap-6 bg-neutral-100 self-end z-20  w-[15rem] lg:w-[30rem] p-5 lg:p-10 rounded-xl xl:ml-32 ">
            <h2 className="text-sm lg:text-2xl font-bold">
              زيارات الإمام زين العابدين(عليه السلام)
            </h2>
            <p className="text-sm lg:text-xl">
              كل الزيارات المخصوصة والمطلقة التي يزار بها الإمام زين
              العابدين(عليه السلام)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      imageSrc: "/application/feature-1.png",
      imageAlt: "feature-1",
      title: "التاريخ الهجري",
      description:
        "انطلاقاً من الحاجة إلى التاريخ الهجري، اضيف التاريخ المتزامن مع الثبوت الشرعي في الصفحة الرئيسية",
    },
    {
      imageSrc: "/application/feature-2.png",
      imageAlt: "feature-2",
      title: "شهداء الدفاع الكفائي",
      description:
        "وفاءً لحقهم العظيم .. اشتمل التطبيق على سيرة الشهداء مع التذكير بيوم شهادتهم حسب التقويم الهجري",
    },
    {
      imageSrc: "/application/feature-3.png",
      imageAlt: "feature-3",
      title: "المناسبات الإسلامية",
      description:
        "نظراً لأهمية التذكير بالمناسبات الإسلامية طيلة السنة تزين التطبيق بهذه الخدمة",
    },
    {
      imageSrc: "/application/feature-4.png",
      imageAlt: "feature-4",
      title: "الوضع الليلي والوضع النهاري",
      description:
        "يقدم تطبيق أنوار سجادية خيارات الوضع الليلي والوضع النهاري لتخصيص تجربة الاستخدام، مما يضمن راحة العينين أثناء القراءة في مختلف الأوقات.",
    },
    {
      imageSrc: "/application/feature-5.png",
      imageAlt: "feature-5",
      title: "حكمة اليوم",
      description:
        "في كل يوم من أيام سنة ستظهر لك حكمة من أقوال الإمام زين العابدين (عليه السلام) مع قابلية المشاركة",
    },
    {
      imageSrc: "/application/feature-5.png",
      imageAlt: "feature-5",
      title: "المكتبة التخصصية",
      description: "ستضاف قريباً المكتبة التخصصية بالإمام زين العابدين(ع)",
    },
  ];

  return (
    <div className="container pt-20">
      <div className="flex flex-col items-center justify-center gap-3 pb-10 text-center">
        <h2 className="text-3xl font-bold">ميزات مصممة خصيصًا</h2>
        <p className="text-xl">
          يقدم تطبيق أنوار سجادية ميزات مخصصة تشمل الوصول السريع، البحث المتقدم،
          وتجربة استخدام معززة لتفاعلك الروحي
        </p>
      </div>

      <div className="grid gap-y-4 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 md:gap-x-10 lg:py-10 justify-items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="w-full  p-8 bg-white drop-shadow-lg rounded-2xl flex flex-col justify-start items-center gap-8 text-center"
          >
            <Image
              src={feature.imageSrc}
              alt={feature.imageAlt}
              width={100}
              height={100}
              className="w-8 h-8  object-cover sdfasdf"
            />

            <div className="flex flex-col justify-between items-center gap-4 text-center">
              <h4 className="text-2xl font-bold">{feature.title}</h4>
              <p className="text- text-neutral-500 leading-6">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function page() {
  return (
    <>
      <MainSection />
      <InformationSection />
      <ImamzainSection />
      <MessageRights />
      <MasnadSection />
      <ShrinesVisitationSection />
      <FeaturesSection />
    </>
  );
}
