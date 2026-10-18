import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Calendar,
  Clock,
  Download,
  Globe,
  Palette,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import { SectionTitle, photoFrame, shieldPanel, solidButton } from "@/components/brand";
import { Reveal } from "@/components/motion";
import {
  ClosedNotice,
  ContestBadge,
  Feature,
  IconRing,
  Note,
  Rule,
} from "../components/contest-ui";

export const metadata: Metadata = {
  title: "مسابقة قبسات من حياة الإمام السجاد الثقافية - الحلقة الأولى",
  description:
    "مسابقة ثقافية محلية لطلبة الجامعات حول كتاب قبسات من حياة الإمام السجاد عليه السلام، تنطلق في 2026/4/12 لمدة خمسة عشر يوماً، مع جوائز للعشرة الأوائل.",
  keywords: [
    "مسابقة قبسات من حياة الإمام السجاد",
    "مسابقة الإمام زين العابدين الثقافية",
    "مسابقة ثقافية للجامعات",
    "كتاب قبسات من حياة الإمام السجاد",
    "مسابقات مؤسسة الإمام زين العابدين",
    "أسئلة عن الإمام السجاد عليه السلام",
    "شروط مسابقة قبسات السجادية",
    "جوائز مسابقة الإمام زين العابدين",
    "تحميل كتاب قبسات من حياة الإمام السجاد",
  ],
  alternates: {
    canonical: "/contests/qatuf-sajjadiyya-cultural-competition",
  },
  openGraph: {
    title: "مسابقة قبسات من حياة الإمام السجاد الثقافية - الحلقة الأولى",
    description:
      "مسابقة ثقافية محلية لطلبة الجامعات حول كتاب قبسات من حياة الإمام السجاد عليه السلام، تنطلق في 2026/4/12 لمدة خمسة عشر يوماً، مع جوائز للعشرة الأوائل.",
    url: "/contests/qatuf-sajjadiyya-cultural-competition",
    type: "website",
    images: ["/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "مسابقة قبسات من حياة الإمام السجاد الثقافية - الحلقة الأولى",
    description:
      "مسابقة ثقافية محلية لطلبة الجامعات حول كتاب قبسات من حياة الإمام السجاد عليه السلام، تنطلق في 2026/4/12 لمدة خمسة عشر يوماً.",
    images: ["/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg"],
  },
};

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Star,
    title: "إبراز التراث الإسلامي",
    description: "أطلقنا هذه المسابقة لإبراز تراث الإمام زين العابدين (ع) من خلال جماليات الخط العربي، باعتباره وعاءً للمعرفة وجزءاً من الهوية الإسلامية."
  },
  {
    icon: BookOpen,
    title: "إحياء النصوص التربوية",
    description: "تهدف المسابقة إلى إحياء نصوص الإمام الأخلاقية والتربوية بخط جميل، وتحفيز الخطاطين لفهم معانيها العميقة."
  },
  {
    icon: Palette,
    title: "استلهام الروح النورانية",
    description: "ندعو المبدعين لاستلهام روح هذا التراث النوراني، والتعبير عنه بريشة الخط العربي، ليكون هذا الجهد امتداداً لرسالة الإمام في نشر القيم والمعرفة."
  }
];

const ruleGroups: {
  icon: LucideIcon;
  title: string;
  items: { kind: "rule" | "note"; text: string }[];
}[] = [
  {
    icon: BookOpen,
    title: "مصدر الأسئلة",
    items: [
      {
        kind: "rule",
        text: "تعد المسابقة حصرية بكتاب \"قبسات من حياة الإمام زين العابدين (عليه السلام) - الحلقة الأولى\""
      },
      {
        kind: "rule",
        text: "تستخرج جميع الأسئلة وأجوبتها من محتوى الكتاب حصراً"
      },
      {
        kind: "note",
        text: "يشترط على المشارك قراءة الكتاب قراءة دقيقة، وأن تكون الإجابة من الكتاب حصراً"
      }
    ]
  },
  {
    icon: Clock,
    title: "المدة الزمنية",
    items: [
      {
        kind: "rule",
        text: "تنشر أسئلة المسابقة عبر الروابط الرسمية لمؤسسة الإمام زين العابدين (عليه السلام) للبحوث والدراسات"
      },
      {
        kind: "rule",
        text: "مدة المسابقة: خمسة عشر (15) يوماً فقط من تاريخ الإعلان"
      },
      {
        kind: "note",
        text: "تقدم الإجابات ضمن المدة الزمنية المحددة، ولا تقبل المشاركات بعد انتهاء فترة الخمسة عشر يوماً"
      }
    ]
  },
  {
    icon: Users,
    title: "متطلبات المشاركة",
    items: [
      {
        kind: "rule",
        text: "يجب الإجابة عن جميع أسئلة المسابقة كاملة"
      },
      {
        kind: "rule",
        text: "تستبعد المشاركات الناقصة أو غير المطابقة"
      },
      {
        kind: "note",
        text: "لا يجوز شرعاً الاستعانة بالذكاء الاصطناعي أو بأي وسيلة أخرى"
      }
    ]
  },
  {
    icon: Star,
    title: "معايير التقييم",
    items: [
      {
        kind: "rule",
        text: "تقيّم المشاركات وفق الدقة والوضوح ومطابقة الجواب لمضمون الكتاب"
      },
      {
        kind: "rule",
        text: "في حال تساوي الدرجات بين أكثر من مشارك، يعتمد معيار إضافي أو تجرى قرعة لتحديد الفائزين"
      },
      {
        kind: "rule",
        text: "قرار لجنة التحكيم نهائي ولا يقبل الاعتراض"
      }
    ]
  },
  {
    icon: Trophy,
    title: "الجوائز",
    items: [
      {
        kind: "rule",
        text: "تمنح مكافآت تشجيعية قيمة للعشرة الأوائل من المشاركين"
      },
      {
        kind: "rule",
        text: "يتم تحديد الفائزين وفق تقييم لجنة التحكيم"
      },
      {
        kind: "rule",
        text: "يعلن عن أسماء الفائزين عبر المنصات الرسمية للمؤسسة"
      }
    ]
  }
];

export default function Page() {
  return (
    <div className="container pb-12">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "المسابقات", url: "/contests" },
          {
            name: "مسابقة قبسات من حياة الإمام السجاد (عليه السلام)",
            url: "#",
          },
        ]}
      />

      <ClosedNotice />

      {/* Hero */}
      <section className="grid items-center gap-14 lg:grid-cols-[3fr_2fr] lg:gap-20">
        <Reveal x={60} y={0}>
          <div className="flex flex-wrap gap-3">
            <ContestBadge icon={Globe} text="مسابقة محلية للجامعات" />
            <ContestBadge
              icon={Calendar}
              text="إبتدأت في 2025/4/11 وإنتهت في 2026/3/5"
              strong
            />
          </div>

          <h1 className="mt-6 text-primary dark:text-Muharram_primary">
            <span className="block text-3xl font-extrabold leading-snug md:text-5xl md:leading-snug">
              قبسات من حياة الإمام السجاد (عليه السلام)
            </span>
            <span className="mt-2 block text-2xl font-bold text-secondary_dark dark:text-Muharram_secondary md:text-4xl">
              الحلقة الاولى
            </span>
            <span className="mt-3 block text-xl font-semibold leading-snug text-gray-700 md:text-2xl md:leading-snug">
              الإمام زين العابدين علي بن الحسين عليه السلام منار الحق
            </span>
          </h1>

          <div className="mt-10 space-y-8">
            {features.map((feature) => (
              <Feature key={feature.title} {...feature} />
            ))}
          </div>

          <div className="mt-10">
            <p className="text-lg leading-loose text-gray-600">يمكنكم تنزيل ملف المسابقة الكامل من خلال الضغط على الرابط أدناه</p>
            <Link
              download
              href="/contests/qatuf-sajjadiyya-cultural-competition/contest-book.pdf"
              className={`${solidButton} mt-4`}
            >
              <Download className="h-5 w-5" />
              تنزيل ملف المسابقة الكامل
            </Link>
          </div>
        </Reveal>

        <Reveal x={-60} y={0} delay={0.2}>
          <div className={`${photoFrame} mx-2 shadow-xl`}>
            <Image
              src="/contests/qatuf-sajjadiyya-cultural-competition/landing.jpg"
              alt="لوكو مسابقة قبسات من حياة الإمام السجاد (عليه السلام)"
              width={800}
              height={800}
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </section>

      {/* Rules and instructions */}
      <section className="pt-28">
        <p className="mb-3 font-semibold text-secondary_dark dark:text-Muharram_secondary">
          شروط وضوابط المسابقة
        </p>
        <SectionTitle title="اقرأ الشروط بعناية قبل المشاركة" className="mb-14" />

        <div className="space-y-16">
          {ruleGroups.map((group) => (
            <Reveal key={group.title} y={24}>
              <div className="flex items-center gap-5">
                <IconRing icon={group.icon} />
                <h3 className="text-2xl font-bold text-primary dark:text-Muharram_primary md:text-3xl">
                  {group.title}
                </h3>
              </div>
              <div className="mt-6 space-y-5 md:pr-[4.75rem]">
                {group.items.map((item) =>
                  item.kind === "note" ? (
                    <Note key={item.text}>{item.text}</Note>
                  ) : (
                    <Rule key={item.text}>{item.text}</Rule>
                  ),
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className={`${shieldPanel} p-8 text-center md:p-10`}>
            <p className="text-xl font-bold leading-loose md:text-2xl md:leading-loose">
              المشاركة في المسابقة تعني الاطلاع على الشروط والموافقة عليها كاملة
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
