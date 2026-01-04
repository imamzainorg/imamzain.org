import { getDictionaries, getDictionary } from "@/lib/imamzain-legacy-loader";
import Breadcrumbs from "@/components/breadcrumb";
import Link from "next/link";
import Section from "@/components/section";
import { notFound } from "next/navigation";
import { collections } from "@/app/library/_config/collections";
import DictionarySubjects from "../../_components/DictionarySubjects";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collectionSlug: string; dictionarySlug: string }>;
}) {
  const { collectionSlug, dictionarySlug } = await params;

  const config = collections[collectionSlug];
  if (!config) notFound();

  const dictionaries = getDictionaries(collectionSlug);
  const activeDictionary = getDictionary(collectionSlug, dictionarySlug);
  if (!activeDictionary) notFound();

  return (
    <div className="px-4  sm:px-10 py-10 min-h-screen  dark:from-zinc-900 dark:to-zinc-950">
      {/* Breadcrumbs */}
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المكتبة التخصصية", url: "/library" },
          {
            name: config.title,
            url: `/library/${collectionSlug}`,
          },
          {
            name: activeDictionary.title,
            url: `/library/${collectionSlug}/${dictionarySlug}`,
          },
        ]}
      />

      {/* Mobile dictionaries */}
      <div className="my-6  lg:hidden bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm">
        <h2 className="font-semibold mb-3 text-center text-gray-700 dark:text-gray-200">
          اختر القسم
        </h2>

        <div className="flex flex-wrap justify-center gap-2">
          {dictionaries.map((dict) => (
            <Link
              key={dict.slug}
              href={`/library/${collectionSlug}/${dict.slug}`}
              className={`px-4 py-2 rounded-full text-sm transition
                ${
                  dict.slug === dictionarySlug
                    ? "bg-primary/15 text-primary dark:text-Muharram_primary"
                    : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
                }`}
            >
              {dict.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Layout */}
      <div className="flex gap-10  mt-8">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-1/4 flex-col gap-6 sticky top-28 self-start">
          <div className="bg-white shadow-md border border-primary/20 dark:border-Muharram_primary/20 rounded-2xl p-6 space-y-4">
            <h2 className="text-note font-bold text-center text-primary dark:text-Muharram_primary">
              {config.title}
            </h2>
            <div className="h-px bg-primary/20 dark:bg-Muharram_primary/20"></div>
            <nav className="flex flex-col gap-2 text-subtitle">
              {dictionaries.map((dict) => (
                <Link
                  key={dict.slug}
                  href={`/library/${collectionSlug}/${dict.slug}`}
                  className={`p-2 px-3 rounded-lg transition-colors ${
                    dict.slug === dictionarySlug
                      ? "bg-primary/10 text-primary dark:bg-Muharram_primary/10 dark:text-Muharram_primary font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {dict.title}
                </Link>
              ))}
            </nav>
          </div>
          <DictionarySubjects
            subjects={activeDictionary.subjects}
            collectionSlug={collectionSlug}
            dictionarySlug={dictionarySlug}
          />
        </aside>

        {/* Main */}
        <main className="flex-1 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-title font-bold text-primary dark:text-Muharram_primary mb-3">
              {config.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {config.description}
            </p>
          </div>

          <Section id={dictionarySlug} title={activeDictionary.title} />

          {children}
        </main>
      </div>
    </div>
  );
}
