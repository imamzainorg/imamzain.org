import Breadcrumbs from "@/components/breadcrumb";
import { dataFetcher } from "@/lib/dataFetcher";
import ModalButton from "../../../_components/modal-button";
import Section from "@/components/section";
import { Legacy } from "@/types/imamzainLegacy";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const data = await dataFetcher<Legacy[]>("imamzain-legacy.json");

  const alsahifa = data.find((legacy) => legacy.slug === "al-sahifa");

  const selectedDictionary = slug
    ? alsahifa?.dictionaries.find((dict) => dict.slug === slug)
    : alsahifa?.dictionaries[0];

  if (!selectedDictionary) {
    return <div>Error: Dictionary not found for slug: {slug}</div>;
  }

  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصحفة الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          { name: "الصحيفة السجادية", url: "/library/al-sahifa" },
        ]}
      />

      <div className="flex justify-between gap-5">
        {/* Sidebar Navigation */}
        <div className="w-1/4 pt-20">
          <div className="flex flex-col gap-2 mb-5 backdrop-blur-[3px] p-5 rounded-3xl border border-primary shadow-primary/10">
            <div className="text-center">الصحيفة السجادية</div>
            <div className="border" />
            <div className="flex flex-col gap-5">
              {alsahifa.dictionaries.map((dict) => (
                <Link key={dict.id} href={`/library/al-sahifa/read/${dict.slug}`}>
                  {dict.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 backdrop-blur-[3px] p-5 rounded-3xl border border-primary shadow-primary/10">
            <div className="text-center">روابط مهمة</div>
            <div className="border" />
            <div className="flex flex-col gap-5">
              <Link href="#">معجم الألفاظ</Link>
            </div>
          </div>
        </div>

        {/* Main Content: Render only the selected dictionary */}
        <div className="w-3/4 my-8 space-y-8">
        <h1 className="text-center text-3xl xl:text-4xl font-semibold">
            الصحيفة السجادية
          </h1>
          <p className="text-justify w-full mx-auto tracking-tighter xs:tracking-tight leading-8 sm:leading-loose sm:text-lg xl:text-2xl">
            الصحيفة السجادية هو كتابٌ يضمُّ مجموعةً كبيرةً من الأدعية للإمام علي
            بن الحسين المُلَقَّبِ بالسجاد وزين العابدين. هي الصحيفة الاولى التي
            يرجع سندها إلى الإمام زين العابدين (عليه السلام)... والتي خصها
            الأصحاب بالذكر في إجازاتهم واهتموا براويتها منذ القديم وتوارث ذلك
            الخلف عن السلف وطبقة عن طبقة، وتنتهي روايتها إلى الإمام الباقر وزيد
            الشهيد إبني الإمام زين العابدين.
          </p>
          <Section
            id={selectedDictionary.slug}
            title={selectedDictionary.title}
          />
          <div className="grid grid-cols-2 gap-4">
            {selectedDictionary.subjects.map((subject) => (
              <ModalButton key={subject.id} subject={subject} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
