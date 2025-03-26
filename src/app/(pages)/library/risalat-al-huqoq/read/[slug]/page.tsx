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

  const risalatAlHuqoq = data.find((legacy) => legacy.slug === "risalat-al-huqoq");

  const selectedDictionary = slug
    ? risalatAlHuqoq?.dictionaries.find((dict) => dict.slug === slug)
    : risalatAlHuqoq?.dictionaries[0];

  if (!selectedDictionary) {
    return <div>Error: Dictionary not found for slug: {slug}</div>;
  }

  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصحفة الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          {
            name: "رسالة الحقوق",
            url: "/library/risalat-al-huqoq",
          }
        ]}
      />

      <div className="flex justify-between gap-5">
        {/* Sidebar Navigation */}
        <div className="w-1/4 pt-20">
          <div className="flex flex-col gap-2 mb-5 backdrop-blur-[3px] p-5 rounded-3xl border border-primary shadow-primary/10">
            <div className="text-center">الصحيفة السجادية</div>
            <div className="border" />
            <div className="flex flex-col gap-5">
              {risalatAlHuqoq?.dictionaries.map((dict) => (
                <Link
                  key={dict.id}
                  href={`/library/risalat-al-huqoq/read/${dict.slug}`}
                >
                  {dict.title}
                </Link>
              ))}
            </div>
          </div>

          {/* <div className="flex flex-col gap-2 backdrop-blur-[3px] p-5 rounded-3xl border border-primary shadow-primary/10">
            <div className="text-center">روابط مهمة</div>
            <div className="border" />
            <div className="flex flex-col gap-5">
              <Link href="#">معجم الألفاظ</Link>
            </div>
          </div> */}
        </div>

        {/* Main Content: Render only the selected dictionary */}
        <div className="w-3/4 my-8 space-y-8">
          <h1 className="text-center text-3xl xl:text-4xl font-semibold">
            رسالة الحقوق
          </h1>
          <p className="text-justify w-full mx-auto tracking-tighter xs:tracking-tight leading-8 sm:leading-loose sm:text-lg xl:text-2xl">
            هذه الرسالة تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري،
            وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً بالإنسان وحقوقه
            كلّها وتشتمل على شبكة علاقات الإنسان الثلاثة، مع ربِّه ونفسِه
            ومجتمعه.وترسم حدود العلائق والواجبات بين الإنسان وجميع ما يحيط به.
            ويقول الأديب باقر شريف القرشي، حول هذه الرسالة: «من المؤّلفات
            المهمّة في دنيا الإسلام» رسالة الحقوق «للإمام زين العابدين، فقد وضعت
            المناهج الحيّة لسلوك الإنسان، وتطوير حياته، وبناء حضارته، على أسس
            تتوافر فيها جميع عوامل الاستقرار النّفسي.»
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
