import {
  getDictionaries,
  getDictionary,
  getNavDictionaries,
} from "@/lib/imamzain-legacy-loader";
import Breadcrumbs from "@/components/breadcrumb";
import Link from "next/link";
import { notFound } from "next/navigation";
import { collections } from "@/app/library/_config/collections";
import CollectionSearch from "@/app/library/_components/collection-search";
import DictionaryNav from "@/app/library/_components/dictionary-nav";

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

  // Only the active dictionary's subjects are included in full; DictionaryNav
  // fetches the rest on demand if the reader expands a different one. Both
  // consumers below are client components, so whatever is passed here is
  // serialized into every page under this layout.
  const navDictionaries = getNavDictionaries(collectionSlug, dictionarySlug);

  return (
    <div className="px-4 sm:px-10 py-10 min-h-screen md:container mx-auto">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },

          { name: config.title, url: `#library/${collectionSlug}` },
          {
            name: activeDictionary.title,
            url: `/library/${collectionSlug}/${dictionarySlug}`,
          },
        ]}
      />

      {/* Search Bar */}
      <div className="my-8 w-4/5 mx-auto">
        <CollectionSearch collectionSlug={collectionSlug} />
      </div>

      {/* Mobile dictionaries */}
      <div className="my-6 lg:hidden bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm">
        <h2 className="font-semibold mb-3 text-center text-gray-700 dark:text-gray-200">
          اختر القسم
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {dictionaries.map((dict) => (
            <Link
              key={dict.slug}
              href={`/library/${collectionSlug}/${dict.slug}`}
              className={`px-4 py-2 rounded-full text-sm transition ${
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

      <div className="flex gap-10 mt-8">
        {/* Sidebar - Now with expandable tree */}
        <aside className="hidden lg:flex lg:w-1/4 flex-col gap-6 sticky top-28 self-start max-h-[calc(100vh-8rem)] overflow-hidden">
          <DictionaryNav
            dictionaries={navDictionaries}
            collectionSlug={collectionSlug}
            activeDictionarySlug={dictionarySlug}
          />
        </aside>

        <main className="flex-1 space-y-8">{children}</main>
      </div>
    </div>
  );
}
