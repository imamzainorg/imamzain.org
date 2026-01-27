"use client";

import { motion } from "framer-motion";

import ZiaraForm from "@/components/ziara-form";

const CardStatistics = ({ title, value }: { title: string; value: number }) => {
  return (
    <div className="w-full p-2 border-2 border-secondary dark:border-Muharram_secondary drop-shadow-lg rounded-2xl flex flex-col justify-start items-center gap-8 text-center">
      <div className="w-full rounded-2xl flex flex-col  justify-between items-center gap-4 text-center p-6 bg-primary dark:bg-Muharram_primary border-[0.1px] border-nuetral-200">
        <h4 className="text-2xl font-bold  text-white">{title}</h4>
        <p className="text- text-white leading-6">{value}</p>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className="lg:pt-20">
      <div className="relative text-white flex flex-col items-center space-y-20  ">
        <div className="absolute top-0 inset-x-0 h-[100%] bg-dark-background -z-10" />

        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* ===== النص ===== */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-center lg:text-right text-white space-y-6"
            >
              <h2 className="text-title font-bold leading-relaxed">
                زيارة الإمام زين العابدين وأئمة البقيع عليهم السلام
              </h2>

              <p className="text-body leading-relaxed max-w-xl mx-auto lg:mx-0">
                سجل اسمك ليتم أداء زيارة الإمام زين العابدين وأئمة البقيع (عليهم
                السلام) نيابةً عنك عند قبورهم الطاهرة.
              </p>
            </motion.div>

            {/* ===== الفورم مع الموجة ===== */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="relative flex justify-center"
            >
              <div
                className="
                relative
                w-full max-w-md
                bg-[url('/shapes/ziara-bg.svg')]
                bg-no-repeat
                bg-contain
                bg-center
                rounded-[40px]
                px-6 py-28 sm:px-10
              "
              >
                <ZiaraForm />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="  container py-10 pt-20">
        <div className=" w-full p-2 border-2 border-secondary dark:border-Muharram_secondary drop-shadow-lg rounded-2xl flex flex-col justify-start items-center gap-8 text-center">
          <div className="w-full rounded-2xl flex flex-col  justify-between items-center gap-4 text-center p-8 bg-white border-[0.1px] border-nuetral-200">
            <h4 className="text-title font-bold text-secondary dark:text-Muharram_secondary">
              زيارة الإمام زين العابدين (عليهم السلام)
            </h4>
            <p className="text-subtitle   text-neutral-500 md:leading-10">
              السلام عليك يا زين العابدين ، السلام عليك يا زين المتهجدين ،
              السلام عليك يا إمام المتقين ، السلام عليك يا درة الصالحين ، السلام
              عليك يا ولي المسلمين ، السلام عليك يا قرة عين الناظرين العارفين ،
              السلام عليك يا خلف السابقين ، السلام عليك يا وصي الوصيين ، السلام
              عليك يا خازن وصايا المرسلين ، السلام عليك يا ضوء المستوحشين ،
              السلام عليك يا نور المجتهدين ، السلام عليك يا سراج المرتاضين ،
              السلام عليك يا ذخر المتعبدين ، السلام عليك يا مصباح العالمين ،
              السلام عليك يا سفينة العلم ، السلام عليك يا سكينة الحلم ، السلام
              عليك يا ميزان القصاص ، السلام عليك يا سفينة الخلاص ، السلام عليك
              يا بحر الندى ، السلام عليك يا بدر الدجى ، السلام عليك أيها الأواه
              الحليم ، السلام عليك أيها الصابر الحكيم ، السلام عليك يا رئيس
              الباكين ، السلام عليك يا مصباح المؤمنين ، السلام عليك يا مولاي يا
              أبا محمد أشهد أنك حجة الله وابن حجته وأبو حججه وابن أمينه وأبو
              أمنائه وأنك ناصحت في عبادة ربك وسارعت في مرضاته ، وخيبت أعداءه ،
              وسررت أولياءه ، أشهد أنك قد عبدت الله حق عبادته ، واتقيته حق تقاته
              وأطعته حق إطاعته حتى أتاك اليقين ، فعليك يا مولاي يا ابن رسول الله
              أفضل التحية والسلام ورحمة الله وبركاته
            </p>
          </div>
        </div>
      </div>

      <div className="container text-subtitle grid gap-y-4 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 md:gap-x-10 lg:py-10 justify-items-center">
        <CardStatistics title="الطلبات قيد الانتظار" value={25} />
        <CardStatistics title="عدد الطلبات المنجزة" value={4958} />
        <CardStatistics title="اجمالي الطلبات" value={4983} />
      </div>
    </div>
  );
}
