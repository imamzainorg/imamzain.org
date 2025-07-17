{/*
  import { dataFetcher } from "@/lib/dataFetcher";
import { notFound } from "next/navigation";
import { Research } from "@/types/research";
import Breadcrumbs from "@/components/breadcrumb";
import SanitizedHtml from "../_components/SanitizedHtml";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const allResearch = await dataFetcher<Research[]>("research.json");
  const research = allResearch.find((r) => r.slug === params.slug);

  if (!research) return notFound();

  return (
    <div className="py-14 px-4 max-w-5xl mx-auto space-y-8 container">
      <Breadcrumbs
        className="text-primary dark:text-Muharram_primary"
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المرئيات", url: "/media/videos" },
        ]}
      />

      <h1 className="text-2xl font-bold text-primary text-center">{research.title}</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border-2 border-black space-y-4 w-10/12 mx-auto">
        {research.part && (
          <p className="text-gray-600 dark:text-gray-300 tracking-wide leading-relaxed">
            <strong className="mr-2">الجزء:</strong>{" "}
            <SanitizedHtml html={research.part || ""} />
          </p>
        )}

        {research.section && (
          <p className="text-gray-600 dark:text-gray-300 tracking-wide leading-relaxed">
            <strong className="mr-2">القسم:</strong>{" "}
            <SanitizedHtml html={research.section || ""} />
          </p>
        )}

        {research.topic && (
          <p className="text-gray-600 dark:text-gray-300 tracking-wide leading-relaxed">
            <strong className="mr-2">الموضوع:</strong>{" "}
            <SanitizedHtml html={research.topic || ""} />
          </p>
        )}

        <p className="text-gray-600 dark:text-gray-300 tracking-wide leading-relaxed">
          <strong className="mr-2">المؤلف:</strong>{" "}
          <SanitizedHtml html={research.author || ""} />
        </p>

        {research.colign && (
          <p className="text-gray-600 dark:text-gray-300 tracking-wide leading-relaxed">
            <strong className="mr-2">الكلية:</strong>{" "}
            <SanitizedHtml html={research.colign || ""} />
          </p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mt-6 mb-2">الملخص (بالعربية)</h2>
        <SanitizedHtml html={research.abstract || ""} />

        {research.abstract_en && (
          <>
            <h2 className="text-xl font-semibold mt-6 mb-2">الملخص (بالإنجليزية)</h2>
            <SanitizedHtml html={research.abstract_en || ""} />
          </>
        )}
      </div>

      {research.introduction && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">المقدمة</h2>
          <SanitizedHtml html={research.introduction || ""} />
        </div>
      )}

      {Array.isArray(research.contentSections) && research.contentSections.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">المحتوى</h2>
          {research.contentSections.map((section, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-bold text-primary dark:text-Muharram_primary">
                <SanitizedHtml html={section.title || ""} />
              </h3>
              <SanitizedHtml html={section.content || ""} />
            </div>
          ))}
        </div>
      )}

      {research.results && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">النتائج</h2>
          <SanitizedHtml html={research.results || ""} />
        </div>
      )}

      {Array.isArray(research.references) && research.references.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-6 mb-2">المصادر</h2>
          <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
            {research.references.map((ref, index) => (
              <li key={index}>
                <SanitizedHtml html={ref || ""} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {research.pdfUrl && (
        <div className="mt-6">
          <a
            href={research.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-primary dark:bg-Muharram_primary text-white rounded-lg hover:bg-primary/90 dark:hover:bg-Muharram_primary/90 transition"
          >
            تحميل البحث PDF
          </a>
        </div>
      )}
    </div>
  );
}

  */}

  export default function Page() {
  return <div className="py-20 text-center text-gray-600">هذه الصفحة معطلة مؤقتاً.</div>;
}