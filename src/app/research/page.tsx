"use client";

import Breadcrumbs from "@/components/breadcrumb";
import SliderHero from "./_components/slider-hero";
import Link from "next/link";
import { BadgeCheck, Crown, FileBadge, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "بحوث المؤتمرات",
    description: "استعرض البحوث المقدمة في المؤتمرات العلمية المختلفة.",
    href: "/research/scientific-platform?type=conferences",
    icon: "📑",
    subLinks: [
      {
        label: "المؤتمر العلمي الدولي الأول",
        href: "/research/scientific-platform?type=conferences",
      },
    ],
  },
  {
    title: "بحوث التخرج",
    description: "بحوث التخرج لطلبة البكالوريوس والماجستير والدكتوراه.",
    href: "/research/scientific-platform?type=student-research",
    icon: "🎓",
    subLinks: [
      {
        label: "بكالوريوس",
        href: "/research/scientific-platform?type=student-research&degree=bachelor",
      },
      {
        label: "ماجستير",
        href: "/research/scientific-platform?student-research&degree=master",
      },
      {
        label: "دكتوراه",
        href: "/research/scientific-platform?type=student-research&degree=phd",
      },
    ],
  },
  {
    title: "الدوريات العربية",
    description: "اطّلع على مجموعة من الدوريات والمجلات العربية المحكمة.",
    href: "/research/scientific-platform?type=journals",
    icon: "📚",
    subLinks: [
      {
        label: "دوريات عامة",
        href: "/research/scientific-platform?type=journals",
      },
    ],
  },
];

export default function Page() {
  return (
    <div className="container">
      {/* Breadcrumb */}
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الصفحة العلمية", url: "/research" },
        ]}
      />

      {/* SliderHero */}
      <SliderHero />

      {/* أقسام الصفحة العلمية */}
      <div className="py-20">
        <h1 className="text-title font-bold text-center text-primary dark:text-Muharram_primary mb-16">
          الارشفة والتوثيق
        </h1>
        <div className=" gap-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative bg-white dark:bg-Muharram_primary rounded-3xl shadow-xl overflow-hidden cursor-pointer group/card"
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Link href={section.href}>
                <div className="p-8 flex flex-col items-center text-center">
                  {/* أيقونة البطاقة */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="text-6xl mb-4 transition-transform"
                  >
                    {section.icon}
                  </motion.div>

                  {/* العنوان والسهم */}
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h2 className="text-body font-bold text-primary dark:text-white">
                      {section.title}
                    </h2>
                    {section.subLinks && section.subLinks.length > 0 && (
                      <motion.div
                        className="text-gray-400"
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{
                          duration: 0.3,
                        }}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>

                  {/* الوصف */}
                  <p className="text-gray-600 text-note leading-4 xl:leading-7 2xl:leading-8 dark:text-gray-300 mb-4 transition group-hover:text-gray-800 dark:group-hover:text-gray-100">
                    {section.description}
                  </p>
                </div>
              </Link>

              {/* القوائم الفرعية  */}
              {section.subLinks && section.subLinks.length > 0 && (
                <div className="px-6 pb-6 ">
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-subtitle font-medium text-gray-500 dark:text-white mb-3 text-center">
                      أقسام فرعية
                    </h3>
                    <div className="flex flex-col gap-2">
                      {section.subLinks.map((sub, i) => (
                        <motion.div
                          key={i}
                          initial={{
                            opacity: 0,
                            x: -10,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: i * 0.1,
                          }}
                        >
                          <Link
                            href={sub.href}
                            className="flex items-center justify-between w-full py-2 px-4 rounded-xl bg-gray-50 hover:bg-primary/10 dark:bg-Muharram_secondary dark:hover:bg-Muharram_secondary/20 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-all duration-300 group/link"
                          >
                            <span className="text-subtitle font-medium">
                              {sub.label}
                            </span>
                            <motion.div
                              className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                              whileHover={{
                                x: 3,
                              }}
                            ></motion.div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Link send research */}
      <div className="flex justify-between items-center w-full pb-14">
        <hr className="border border-[#bb9661] dark:border-Muharram_secondary w-full" />
        <Link
          href={"/research/send-research"}
          className="px-16 py-4 text-white text-nowrap mx-10 text-body bg-primary rounded-2xl hover:bg-primary/95 dark:bg-Muharram_primary dark:hover:bg-Muharram_primary/95"
        >
          تقديم البحث
        </Link>
        <hr className="border border-[#bb9661] w-full" />
      </div>

      {/* المكافآت المالية */}
      <div className="py-14">
        <h1 className="text-primary dark:text-Muharram_primary text-title font-bold text-center">
          المكافئات المالية
        </h1>
        <div className="flex flex-wrap justify-center gap-10 mt-12">
          {[
            {
              title: "البحوث المقبولة",
              amount: "100,000 د.ع.",
              subtitle: "كل بحث ينال المقبولية على ان لا يقل عن 15 صفحة",
              icon: (
                <BadgeCheck
                  size={70}
                  strokeWidth={1}
                  className="mb-5"
                  color="#BA9560"
                />
              ),
            },
            {
              title: "البحوث المتميزة",
              amount: "150,000 د.ع.",
              subtitle: "كل كتاب يحصل على تميز",
              icon: (
                <Crown
                  size={70}
                  strokeWidth={1}
                  className="mb-5"
                  color="#BA9560"
                />
              ),
            },
            {
              title: "المقالة",
              amount: "25,000 د.ع.",
              subtitle: "لكل مقالة متميزة",
              icon: (
                <FileBadge
                  size={70}
                  strokeWidth={1}
                  className="mb-5"
                  color="#BA9560 "
                />
              ),
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center flex flex-col items-center w-72 p-6 dark:text-Muharram_secondary rounded-2xl bg-white dark:bg-Muharram_primary/30 text-black shadow hover:shadow-xl transition"
            >
              {item.icon}
              <h1 className="text-note  font-bold p-2">{item.title}</h1>
              <p className="w-3/4 text-subtitle p-2 font-semibold">{item.amount}</p>
              <p className="w-3/4 text-subtitle p-1 sm:leading-6 xl:leading-8">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* ملاحظات */}
        <div className="border-r-2 border-secondary dark:border-Muharram_primary pr-4 italic max-w-2xl mx-auto mt-10">
          <div className="w-full text-right font-semibold mt-8 p-2 text-note">ملاحظات:</div>
          <ol className="list-arabic-indic text-subtitle text-right text-gray-700 space-y-2 sm:space-y-3 px-2 sm:px-4 md:px-6 lg:px-8">
            {[
              "سعر صفحة الكتاب (تأليف، تحقيق) 5,000 د.ع.",
              "المكافئات اعلاه تعني في البحوث والكتب التي تأتي من خلال الاستكتاب",
              "البحوث المقدمة للمؤسسة تخصص 5% من مجموع المطبوع هدية للمؤلف",
            ].map((rule, index) => (
              <li key={index} className="leading-relaxed">
                {rule}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
