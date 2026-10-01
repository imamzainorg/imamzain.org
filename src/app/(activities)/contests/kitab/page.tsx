import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  BadgeDollarSign,
  BookCheck,
  Mail,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import {
  SectionTitle,
  TitleIcon,
  leadText,
  photoFrame,
  shieldPanel,
} from "@/components/brand";
import DarkBand from "@/components/dark-band";
import { Reveal } from "@/components/motion";
import { arabicNumber } from "@/lib/format";
import { ClosedNotice } from "../components/contest-ui";
import { researchAxes } from "./data/researchAxes";
import { rules } from "./data/rules";
import { criteria } from "./data/criteria";

export const metadata: Metadata = {
  title: "مسابقة الكتاب",
  description:
    "مسابقة الكتاب: جائزة علمية محكمة لتأليف كتب رصينة عن تراث الإمام زين العابدين عليه السلام، مع محاور الكتابة وشروط المشاركة والجوائز وآلية التحكيم والتقديم.",
  keywords: [
    "مسابقة الكتاب",
    "مسابقة كتاب الإمام زين العابدين",
    "مسابقة علمية محكمة في التأليف",
    "جوائز التأليف عن الإمام السجاد",
    "محاور الكتابة عن تراث الإمام السجاد",
    "شروط المشاركة في مسابقة الكتاب",
    "الصحيفة السجادية أدعيتها ومضامينها",
    "تقديم بحث عن الإمام زين العابدين",
  ],
  alternates: { canonical: "/contests/kitab" },
  openGraph: {
    title: "مسابقة الكتاب | مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
    description:
      "مسابقة علمية محكمة لتأليف كتب رصينة حول تراث الإمام زين العابدين عليه السلام. تعرّف على محاور الكتابة وشروط المشاركة والجوائز وآلية التحكيم والتقديم.",
    url: "/contests/kitab",
    type: "website",
    images: ["/contests/kitab/hero.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "مسابقة الكتاب | مؤسسة الإمام زين العابدين عليه السلام",
    description:
      "مسابقة علمية محكمة لتأليف كتب رصينة حول تراث الإمام زين العابدين عليه السلام، مع محاور الكتابة وشروط المشاركة والجوائز وآلية التحكيم والتقديم.",
    images: ["/contests/kitab/hero.jpg"],
  },
};

const vision =
  "إحياء تراث الامام زين العابدين (عليه السلام) عبر حث الباحثين على انتاج دراسات رصينة تواكب متطلبات العصر وتبرز ابعاد شخصيته الفكرية والروحية والاجتماعية";

const goals = [
  "تقديم انتاج علمي مؤصل عن تراث الامام عليه السلام",
  "تشجيع الباحثين والمفكرين على الغوص في شخصية الامام عليه السلام وموروثه العلمي",
  "اثراء المكتبة الاسلامية بكتاب متميز من حيث المنهج والمحتوى",
  "ربط الاجيال المعاصرة بالقيم العبادية والاجتماعية والفكرية في مدرسة الامام (عليه السلام)",
];

const prizes: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: BadgeDollarSign, title: "الجائزة الأولى", text: "يتم اختيار (3) فائزين ويخصص لكل منهم جائزة بمقدار (2,000,000) دينار عراقي." },
  { icon: Award, title: "جائزة التميز", text: "يضاف للكتاب المتميز هدية قدرها (500,000) دينار عراقي." },
  { icon: BookCheck, title: "النشر والطباعة", text: "يتم طبع ونشر الكتب المقبولة على نفقة المؤسسة وتكون حقوق الطبع محفوظة للمؤسسة." },
  { icon: ShieldCheck, title: "التكريم الرسمي", text: "تزويد المشاركين المقبولين والفائزين بما يؤيد ذلك رسمياً." },
];

// Numbered lines with a gold numeral and a dashed rule, like the biography's source list.
function NumberedList({ items, columns }: { items: string[]; columns?: boolean }) {
  return (
    <ol className={columns ? "grid gap-x-14 md:grid-cols-2" : "max-w-4xl"}>
      {items.map((item, i) => (
        <li
          key={item}
          className="flex items-start gap-4 border-b border-dashed border-secondary/40 py-5"
        >
          <span className="w-9 shrink-0 text-2xl font-bold text-secondary dark:text-Muharram_secondary">
            {arabicNumber(i + 1)}
          </span>
          <span className="text-lg leading-loose text-gray-800 md:text-xl md:leading-loose">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default function Page() {
  return (
    <div className="pb-12">
      <div className="container">
        <Breadcrumbs
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "المسابقات", url: "/contests" },
            { name: "مسابقة كتاب", url: "#" },
          ]}
        />

        <ClosedNotice />

        {/* Hero */}
        <section className="grid items-center gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
          <Reveal x={60} y={0}>
            <h1 className="text-4xl font-extrabold leading-snug text-primary dark:text-Muharram_primary md:text-6xl md:leading-snug">
              مسابقة الكتاب
            </h1>

            <div className="mt-8">
              <p className="flex items-center gap-2 text-xl font-bold text-secondary_dark dark:text-Muharram_secondary">
                <TitleIcon className="w-3" />
                الرؤية
              </p>
              <p className={`mt-3 ${leadText}`}>{vision}</p>
            </div>

            <div className="mt-8">
              <p className="flex items-center gap-2 text-xl font-bold text-secondary_dark dark:text-Muharram_secondary">
                <TitleIcon className="w-3" />
                الاهداف
              </p>
              <NumberedList items={goals} />
            </div>
          </Reveal>

          <Reveal x={-60} y={0} delay={0.2}>
            <div className={`${photoFrame} mx-2 shadow-xl`}>
              <Image
                src="/contests/kitab/hero.jpg"
                alt="لوكو مسابقة الكتاب"
                width={600}
                height={600}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        </section>

      </div>

      {/* Prizes */}
      <DarkBand className="mt-28">
        <SectionTitle light title="المحفزات والجوائز" />
        <ul className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {prizes.map(({ icon: Icon, title, text }, i) => (
            <li key={title}>
              <Reveal y={30} delay={i * 0.1}>
                <Icon className="h-12 w-12 text-secondary" strokeWidth={1.2} aria-hidden />
                <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                <p className="mt-3 text-lg leading-loose text-white/70">{text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </DarkBand>

      <div className="container">
        {/* Research axes */}
        <section className="pt-28">
          <SectionTitle title="محاور الكتابة" text="اختر المحور الذي يناسب اختصاصك وابدأ رحلتك البحثية" />
          <div className="grid gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {researchAxes.map((axis, i) => (
              <Reveal key={axis.title} y={24} delay={(i % 3) * 0.1}>
                <h3 className="flex items-center gap-3 text-xl font-bold leading-8 text-primary dark:text-Muharram_primary">
                  <TitleIcon className="w-2.5 shrink-0" />
                  {axis.title}
                </h3>
                <p className="mt-3 border-t border-dashed border-secondary/40 pt-3 text-lg leading-loose text-gray-600">
                  {axis.keywords.join("، ")}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Judging */}
        <section className="pt-28">
          <SectionTitle title="آلية التحكيم" />
          <Reveal>
            <div className={`${shieldPanel} mb-10 flex flex-col gap-4 p-8 md:flex-row md:items-center md:gap-8 md:p-10`}>
              <span className="flex items-center gap-3 text-2xl font-extrabold">
                <Users className="h-8 w-8 text-secondary dark:text-white" strokeWidth={1.5} />
                اللجنة العلمية
              </span>
              <p className="text-lg leading-loose text-white/85 md:text-xl md:leading-loose">
                تضم أساتذة متخصصة علوم القرآن، التاريخ، الفلسفة، واللغة.
              </p>
            </div>
          </Reveal>
          <NumberedList items={criteria} columns />
        </section>

        {/* Rules */}
        <section className="pt-28">
          <SectionTitle title="شروط المشاركة" />
          <NumberedList items={rules} />
        </section>

        {/* Submission */}
        <section className="pt-28">
        <SectionTitle title="آلية التقديم" text="يمكنكم الانضمام إلى المسابقة من خلال تقديم عملكم عبر البريد الإلكتروني" />
        <Link
          href="mailto:kitab@imamzain.org"
          className="inline-flex items-center gap-4 rounded-xl border-2 border-primary bg-primary px-8 py-4 text-xl font-semibold text-white transition-colors hover:bg-primary/90 dark:border-Muharram_primary dark:bg-Muharram_primary"
        >
          <Mail className="h-6 w-6" />
          <span dir="ltr">kitab@imamzain.org</span>
        </Link>
        </section>
      </div>
    </div>
  );
}
