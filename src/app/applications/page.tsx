import type { Metadata } from "next";
import Link from "next/link";
import { Ban, Moon, RefreshCw } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle, outlineButton, shieldPanel } from "@/components/brand";
import { Reveal } from "@/components/motion";
import PageHeader from "@/components/page-header";
import AppCard, { type AppItem } from "./_components/app-card";

export const metadata: Metadata = {
  title: "تطبيقات المؤسسة",
  description:
    "تطبيقات مؤسسة الإمام زين العابدين (عليه السلام) — موسوعةٌ سجّاديةٌ متكاملةٌ ورفيقُ الدعاء اليومي، بين يديك أينما كنت.",
  keywords: [
    "تطبيقات الإمام زين العابدين",
    "تطبيق أنوار سجادية",
    "معارف سجادية",
    "تطبيقات إسلامية",
    "رسالة الحقوق",
  ],
  alternates: { canonical: "/applications" },
  openGraph: {
    title: "تطبيقات مؤسسة الإمام زين العابدين (عليه السلام)",
    description:
      "موسوعة أنوار سجادية الشاملة عن الإمام زين العابدين (عليه السلام)، ومعارف سجادية رفيق المسير والمسابقة — تطبيقاتٌ تُعنى بإرث الإمام السجّاد بين يديك أينما كنت.",
    url: "/applications",
    type: "website",
    images: ["/applications/anwar-sajjadyia/02.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "تطبيقات مؤسسة الإمام زين العابدين (عليه السلام)",
    description:
      "أنوار سجادية ومعارف سجادية — تطبيقات مؤسسة الإمام زين العابدين (عليه السلام).",
    images: ["/applications/anwar-sajjadyia/02.png"],
  },
};

const apps: AppItem[] = [
  {
    name: "أنوار سجادية",
    slug: "anwar-sajjadyia",
    url: "https://anwar.imamzain.org",
    category: "موسوعة شاملة",
    status: "available",
    tagline: "الموسوعة المتكاملة عن الإمام زين العابدين (عليه السلام)",
    description:
      "الصحيفة السجادية ورسالة الحقوق ومسند الإمام وزياراته وسيرته العطرة، مع بحثٍ متقدّمٍ وحكمةِ يومٍ ووضعٍ ليليٍّ مريحٍ للعين — كنزٌ سجّاديٌّ في تطبيقٍ واحد.",
    front: "/applications/anwar-sajjadyia/02.png",
    back: "/applications/anwar-sajjadyia/01.png",
    store: {
      appStore:
        "https://apps.apple.com/ru/app/%D8%A3%D9%86%D9%88%D8%A7%D8%B1-%D8%B3%D8%AC%D8%A7%D8%AF%D9%8A%D8%A9/id6503963375?l=en-GB",
      googlePlay:
        "https://play.google.com/store/apps/details?id=org.masaha.anwarsajjad&pli=1",
    },
  },
  {
    name: "معارف سجادية",
    slug: "maarif-al-sajjad",
    url: "https://maarif.imamzain.org",
    category: "رفيق المسير والمسابقة",
    status: "soon",
    tagline: "امشِ وتعلَّم في طريقِ يا حسين",
    description:
      "مسابقةٌ لحفظ رسالة الحقوق عبر محطّاتٍ على طريق يا حسين، مع اختباراتٍ وقصائدَ وزياراتٍ ودليلٍ للزائر وجوائزَ عند الوصول — رفيقُك في المسيرة المباركة. نعمل على إطلاقه قريبًا بإذن الله.",
    front: "/applications/maarif-al-sajjad/homepage.webp",
    back: "/applications/maarif-al-sajjad/roadmap.webp",
    store: {
      appStore: "https://maarif-web.imamzain.org/",
      googlePlay:
        "https://play.google.com/store/apps/details?id=org.imamzain.maarif_sajjadyia",
    },
  },
];

const trustChips = [
  { Icon: RefreshCw, label: "متجدّدٌ باستمرار" },
  { Icon: Ban, label: "بلا إعلانات" },
  { Icon: Moon, label: "وضعٌ ليليٌّ ونهاري" },
];

export default function Page() {
  return (
    <div className="container pb-12">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "التطبيقات", url: "/applications" },
        ]}
      />

      <PageHeader
        title="نورُ السجّاد بين يديك"
        text="جمعنا لكم معارفَ مدرسة الإمام زين العابدين (عليه السلام) في تطبيقاتٍ أنيقةٍ سهلةِ الاستعمال؛ موسوعةٌ جامعةٌ تُغني الباحث والمحبّ، ورفيقٌ يوميٌّ يصحبكم في دعائكم ومناجاتكم. اخترْ ما يناسبك وابدأ رحلتك مع آل البيت (عليهم السلام)."
        className="mb-24"
      />

      <section aria-label="قائمة التطبيقات" className="space-y-32 pt-8">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </section>

      <section className="pt-32">
        <Reveal>
          <div className={`${shieldPanel} p-8 text-center md:p-14`}>
            <SectionTitle
              light
              title="تطبيقاتٌ تُعنى بإرث الإمام السجّاد (عليه السلام)"
              text="صُمِّمت بعنايةٍ لتكون موثوقةً وميسَّرةً وقريبةً من قلبك."
              className="mb-0 [&>div]:justify-center [&>p]:mx-auto"
            />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {trustChips.map(({ Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 px-4 py-2 text-lg"
                >
                  <Icon className="h-4 w-4 text-secondary dark:text-white" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="flex flex-col items-center gap-4 pt-24 text-center">
        <p className="text-xl font-bold text-secondary_dark dark:text-Muharram_secondary">
          المزيد قريباً بإذن الله
        </p>
        <p className="text-lg leading-loose text-gray-700">
          هل لديك اقتراحٌ لتطبيقٍ تودّ أن نُطلقه؟
        </p>
        <Link href="/services" className={`${outlineButton} mt-2`}>
          تواصل معنا
        </Link>
      </section>
    </div>
  );
}
