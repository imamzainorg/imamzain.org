export interface CollectionConfig {
  /** Used in URLs: /library/[slug] */
  slug: string;
  title: string;
  description: string;
  /** Category filter used to fetch the collection's books from books.json */
  category: string;
  heroImage?: string;
  readPath: string;
  pdfDownload?: string;
  /** Extra link cards shown after the main content (e.g. "ما الحق بالصحيفة") */
  additionalSections?: Array<{
    title: string;
    items: Array<{ title: string; url: string; description?: string }>;
  }>;
  introText?: string;
  /** Dictionary a collection opens on by default */
  defaultDictionary?: string;
}

export const collections: Record<string, CollectionConfig> = {
  "al-sahifa": {
    slug: "al-sahifa",
    title: "الصحيفة السجادية",
    description:
      "مجموعة من الأدعية والمناجيات للإمام زين العابدين، تجسد أسمى معاني الإيمان والخشوع.",
    category: "al-sahifa",
    readPath: "/library/al-sahifa/al-sahifa-al-sajjadiya-index",
    pdfDownload: "/books/الصحيفة رقعي.pdf",
    defaultDictionary: "al-sahifa-al-sajjadiya-index",
    additionalSections: [
      {
        title: "ما الحق بالصحيفة السجادية",
        items: [
          {
            title: "ما الحقه الحر العاملي",
            url: "/library/al-sahifa/appendix-by-al-hurr-al-amili",
          },
          {
            title: "ما ألحقه الميرزا عبد الله الافندي",
            url: "/library/al-sahifa/appendix-by-mirza-abdullah-al-afandi",
          },
          {
            title: "ما ألحقه الميرزا حسين النوري",
            url: "/library/al-sahifa/appendix-by-al-mirza-husayn-al-nuri",
          },
          {
            title: "ما ألحقه السيد محسن الأمين العاملي",
            url: "/library/al-sahifa/appendix-by-muhsin-al-ameen-al-amili",
          },
        ],
      },
    ],
    introText: `الصحيفة السجادية هو كتابٌ يضمُّ مجموعةً كبيرةً من الأدعية للإمام علي بن الحسين المُلَقَّبِ بالسجاد وزين العابدين. هي الصحيفة الاولى التي يرجع سندها إلى الإمام زين العابدين (عليه السلام)... والتي خصها الأصحاب بالذكر في إجازاتهم واهتموا براويتها منذ القديم وتوارث ذلك الخلف عن السلف وطبقة عن طبقة، وتنتهي روايتها إلى الإمام الباقر وزيد الشهيد إبني الإمام زين العابدين.`,
  },
  "risalat-al-huqoq": {
    slug: "risalat-al-huqoq",
    title: "رسالة الحقوق",
    description:
      "تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري، وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً بالإنسان وحقوقه كلّها وتشتمل على شبكة علاقات الإنسان الثلاثة، مع ربِّه ونفسِه ومجتمعه.",
    category: "risalat-al-huqoq",
    readPath: "/library/risalat-al-huqoq/introduction",
    defaultDictionary: "introduction",
    introText: `هذه الرسالة تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري، وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً بالإنسان وحقوقه كلّها وتشتمل على شبكة علاقات الإنسان الثلاثة، مع ربِّه ونفسِه ومجتمعه.وترسم حدود العلائق والواجبات بين الإنسان وجميع ما يحيط به. ويقول الأديب باقر شريف القرشي، حول هذه الرسالة: «من المؤّلفات المهمّة في دنيا الإسلام» رسالة الحقوق «للإمام زين العابدين، فقد وضعت المناهج الحيّة لسلوك الإنسان، وتطوير حياته، وبناء حضارته، على أسس تتوافر فيها جميع عوامل الاستقرار النّفسي.`,
  },
};

export const getCollectionConfig = (slug: string): CollectionConfig | null =>
  collections[slug] ?? null;

export const getAllCollectionSlugs = (): string[] => Object.keys(collections);
