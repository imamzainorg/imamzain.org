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
    <div className="container min-h-screen pb-12">
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
      <div className="mb-12 max-w-3xl">
        <CollectionSearch collectionSlug={collectionSlug} />
      </div>

      {/* Mobile dictionaries */}
      <nav aria-label="أقسام الكتاب" className="mb-10 lg:hidden">
        <div className="flex flex-wrap gap-2">
          {dictionaries.map((dict) => (
            <Link
              key={dict.slug}
              href={`/library/${collectionSlug}/${dict.slug}`}
              aria-current={dict.slug === dictionarySlug ? "page" : undefined}
              className={`rounded-xl border-2 px-4 py-2 font-semibold transition-colors ${
                dict.slug === dictionarySlug
                  ? "border-primary bg-primary text-white dark:border-Muharram_primary dark:bg-Muharram_primary"
                  : "border-primary/25 text-primary hover:border-primary dark:border-Muharram_primary/25 dark:text-Muharram_primary"
              }`}
            >
              {dict.title}
            </Link>
          ))}
        </div>
      </nav>

      <div className="lg:grid lg:grid-cols-[18rem_1fr] lg:gap-14 xl:grid-cols-[20rem_1fr] xl:gap-20">
        {/* Sidebar: the book's sections and subjects */}
        <aside className="hidden max-h-[calc(100vh-9rem)] flex-col lg:sticky lg:top-32 lg:flex lg:self-start">
          <DictionaryNav
            dictionaries={navDictionaries}
            collectionSlug={collectionSlug}
            activeDictionarySlug={dictionarySlug}
          />
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
