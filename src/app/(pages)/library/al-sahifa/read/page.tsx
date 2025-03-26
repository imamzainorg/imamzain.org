import Breadcrumbs from "@/components/breadcrumb";
import { dataFetcher } from "@/lib/dataFetcher";
import ModalButton from "../../_components/modal-button";
import Section from "@/components/section";
import { Legacy } from "@/types/imamzainLegacy";
import Link from "next/link";

export default async function Page() {
  const data = await dataFetcher<Legacy[]>("imamzain-legacy.json");
  const alsahifa: Legacy = data.filter(
    (legacy) => legacy.slug === "al-sahifa"
  )[0];
  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصحفة الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          {
            name: "الصحيفة السجادية",
            url: "/library/al-sahifa",
          },
          {
            name: "قراءة",
            url: "#'",
          },
        ]}
      />

      <div className="flex justify-between gap-5 ">
        <div className="w-1/4 ">
          <div className="flex flex-col gap-5 backdrop-blur-[3px] p-5 rounded-3xl border-1 border-primary shadow-primary/10">
            <div className="text-center">روابط مهمة</div>
            <div className="border-1" />
            <div className="flex flex-col gap-5">
              {[
                {
                  title: "معجم الألفاظ",
                  url: "#",
                },
                {
                  title: "معجم الألفاظ",
                  url: "#",
                },
                {
                  title: "معجم الألفاظ",
                  url: "#",
                },
              ].map((_, i) => (
                <Link key={i} href="#">
                  معجم الألفاظ
                </Link>
              ))}

              {alsahifa.dictionaries.map((dictionary) => (
                <div key={dictionary.id}>
                  <Section title={dictionary.title} />
                  <div className="grid  grid-cols-2    gap-5">
                    {dictionary.subjects.map((subject) => (
                      <ModalButton key={subject.id} subject={subject} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 backdrop-blur-[3px] p-5 rounded-3xl border-1 border-primary shadow-primary/10">
            <div className="text-center">روابط مهمة</div>
            <div className="border-1" />
            <div className="flex flex-col gap-5">
              <Link href="#">معجم الألفاظ</Link>
            </div>
          </div>
        </div>

        <div className="w-3/4 my- space-y-8">
          <h1 className="text-center text-3xl xl:text-4xl font-semibold">
            الصحيفة السجادية
          </h1>
          <p className="text-justify w-full mx-auto tracking-tighter xs:tracking-tight leading-8 sm:!leading-loose sm:text-lg xl:text-2xl">
            الصحيفة السجادية هو كتابٌ يضمُّ مجموعةً كبيرةً من الأدعية للإمام علي
            بن الحسين المُلَقَّبِ بالسجاد وزين العابدين. هي الصحيفة الاولى التي
            يرجع سندها إلى الامام زين العابدين (عليه السلام)... والتي خصها
            الأصحاب بالذكر في إجازاتهم واهتموا براويتها منذ القديم وتوارث ذلك
            الخلف عن السلف وطبقة عن طبقة، وتنتهي روايتها إلى الإمام الباقر وزيد
            الشهيد إبني الإمام زين العابدين.
          </p>

          {alsahifa.dictionaries.map((dictionary) => (
            <div key={dictionary.id}>
              <Section title={dictionary.title} />
              <div className="grid  grid-cols-2    gap-5">
                {dictionary.subjects.map((subject) => (
                  <ModalButton key={subject.id} subject={subject} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
