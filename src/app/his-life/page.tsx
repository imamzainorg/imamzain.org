import Breadcrumbs from "@/components/breadcrumb";
import HisLifeAccordion from "./components/accordion";
import { dataFetcher } from "@/lib/dataFetcher";
import { imamzainLife } from "@/types/imamzain-life";

export default async function Page() {
  const imamzainLife = await dataFetcher<imamzainLife[]>("imamzain.json");
  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          {
            name: " سيرة الإمام زين العابدين (عليه السلام)",
            url: "#",
          },
        ]}
      />

      <div className="md:w-11/12 mx-auto md:px-6 ">
        <div className="mb-20 space-y-10">
          <h2 className=" text-primary dark:text-Muharram_primary text-title font-bold mb-4">
            سيرة وتراث الامام زين العابدين (عليه السلام)
          </h2>
          <p className=" font-light text-body leading-7 md:leading-9 lg:leading-loose text-justify tracking-tighter">
            الإمام علي بن الحسين بن علي بن أبي طالب هو الإمام الرابع من أئمة أهل
            البيت (عليهم السلام) كما دلت على ذلك النصوص الكثيرة الواردة عن
            الرسول الكريم (صلى الله عليه واله) والأئمة (عليهم السلام) هذا
            بالإضافة إلى الأدلة الاخرى التي أوردها علماء الشيعة في مصنفاتهم.
          </p>
        </div>
        <div className="-space-y-6">
          {imamzainLife.map((section) => (
            <HisLifeAccordion key={section.title} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
