import Breadcrumbs from "@/components/breadcrumb"
import { outlinePanel, shieldPanel } from "@/components/brand"
import { Reveal } from "@/components/motion"
import VisitationSignup from "@/components/visitation-signup"
import { arabicNumber } from "@/lib/format"

const ziyara =
  "السلام عليك يا زين العابدين ، السلام عليك يا زين المتهجدين ، السلام عليك يا إمام المتقين ، السلام عليك يا درة الصالحين ، السلام عليك يا ولي المسلمين ، السلام عليك يا قرة عين الناظرين العارفين ، السلام عليك يا خلف السابقين ، السلام عليك يا وصي الوصيين ، السلام عليك يا خازن وصايا المرسلين ، السلام عليك يا ضوء المستوحشين ، السلام عليك يا نور المجتهدين ، السلام عليك يا سراج المرتاضين ، السلام عليك يا ذخر المتعبدين ، السلام عليك يا مصباح العالمين ، السلام عليك يا سفينة العلم ، السلام عليك يا سكينة الحلم ، السلام عليك يا ميزان القصاص ، السلام عليك يا سفينة الخلاص ، السلام عليك يا بحر الندى ، السلام عليك يا بدر الدجى ، السلام عليك أيها الأواه الحليم ، السلام عليك أيها الصابر الحكيم ، السلام عليك يا رئيس الباكين ، السلام عليك يا مصباح المؤمنين ، السلام عليك يا مولاي يا أبا محمد أشهد أنك حجة الله وابن حجته وأبو حججه وابن أمينه وأبو أمنائه وأنك ناصحت في عبادة ربك وسارعت في مرضاته ، وخيبت أعداءه ، وسررت أولياءه ، أشهد أنك قد عبدت الله حق عبادته ، واتقيته حق تقاته وأطعته حق إطاعته حتى أتاك اليقين ، فعليك يا مولاي يا ابن رسول الله أفضل التحية والسلام ورحمة الله وبركاته";

const stats = [
  { title: "الطلبات قيد الانتظار", value: 25 },
  { title: "عدد الطلبات المنجزة", value: 4958 },
  { title: "اجمالي الطلبات", value: 4983 },
];

export default function Page() {
  return (
    <div className="pb-12">
      <div className="container">
        <Breadcrumbs
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "الخدمات", url: "#" },
            { name: "الزيارة بالإنابة", url: "/visitation" },
          ]}
        />
      </div>

      <VisitationSignup asPage />

      <div className="container pt-24">
        <Reveal>
          <div className={`${outlinePanel} px-6 py-10 text-center md:px-16 md:py-14`}>
            <h2 className="text-2xl font-extrabold text-secondary_dark dark:text-Muharram_secondary md:text-4xl">
              زيارة الإمام زين العابدين (عليهم السلام)
            </h2>
            <p className="mx-auto mt-8 max-w-4xl text-xl leading-[2.3] text-gray-800 md:text-2xl md:leading-[2.4]">
              {ziyara}
            </p>
          </div>
        </Reveal>
      </div>

      <div className="container pt-24">
        <Reveal>
          <dl className={`${shieldPanel} grid gap-y-10 p-8 text-center md:grid-cols-3 md:p-12`}>
            {stats.map((stat, i) => (
              <div
                key={stat.title}
                className={i > 0 ? "md:border-r md:border-white/15" : undefined}
              >
                <dd className="text-5xl font-extrabold text-secondary dark:text-white md:text-6xl">
                  {arabicNumber(stat.value)}
                </dd>
                <dt className="mt-3 text-lg font-semibold text-white/85 md:text-xl">{stat.title}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </div>
  );
}
