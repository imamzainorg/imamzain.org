import Link from "next/link"
import {
  BadgeCheck,
  BookCopyIcon,
  Crown,
  FileBadge,
  GraduationCapIcon,
  NewspaperIcon,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import {
  MoreLink,
  SectionTitle,
  TitleIcon,
  outlineButton,
  photoFrame,
  shieldPanel,
  solidButton,
  whiteButton,
} from "@/components/brand"
import DarkBand from "@/components/dark-band"
import { Reveal } from "@/components/motion"
import PageHeader from "@/components/page-header"

interface SubLink {
  label: string
  href: string
}

interface Section {
  title: string
  description: string
  href: string
  icon: LucideIcon
  subLinks?: SubLink[]
}

interface Reward {
  title: string
  amount: string
  subtitle: string
  icon: LucideIcon
}

const intro =
  "بوابة البحث العلمي: أرشيف بحوث المؤتمرات وبحوث التخرج والدوريات العربية المحكمة في تراث الإمام زين العابدين عليه السلام، مع مكافآت مالية للبحوث المتميزة."

const sections: Section[] = [
  {
    title: "بحوث المؤتمرات",
    description: "استعرض البحوث المقدمة في المؤتمرات العلمية المختلفة.",
    href: "/research/scientific-platform?type=conferences",
    icon: NewspaperIcon,
    subLinks: [
      {
        label: "مؤتمر الاسرة",
        href: "/research/scientific-platform?type=conferences&search=مؤتمر الاسرة في ضوء رسالة الحقوق للامام زين العابدين ع وتحديات الغزو الثقافي",
      },
      {
        label: "المؤتمر العلمي الدولي الأول",
        href: "/research/scientific-platform?type=conferences&search=وقائع المؤتمر  العلمي الدولي الأول الموسوم بـ(الأبعاد التربوية والاجتماعية في تراث الامام زين العابدين (عليه السلام))",
      },

      {
        label: "مهرجان تراتيل سجادية",
        href: "/library?conferences=مهرجان تراتيل سجادية",
      },
    ],
  },
  {
    title: "بحوث التخرج",
    description: "بحوث التخرج لطلبة البكالوريوس والماجستير والدكتوراه.",
    href: "/research/scientific-platform?type=student-research",
    icon: GraduationCapIcon,
    subLinks: [
      {
        label: "بكالوريوس",
        href: "/research/scientific-platform?type=student-research&degree=bachelor",
      },
      {
        label: "ماجستير",
        href: "/research/scientific-platform?type=student-research&degree=master",
      },
      {
        label: "دكتوراه",
        href: "/research/scientific-platform?type=student-research&degree=phd",
      },
    ],
  },
  {
    title: "الدوريات العربية",
    description: "اطّلع على مجموعة من الدوريات والمجلات العربية المحكمة.",
    href: "/research/scientific-platform?type=journals",
    icon: BookCopyIcon,
    subLinks: [
      {
        label: "دوريات عامة",
        href: "/research/scientific-platform?type=journals",
      },
    ],
  },
];

const rewards: Reward[] = [
  {
    title: "البحوث المقبولة",
    amount: "100,000 د.ع.",
    subtitle: "كل بحث ينال المقبولية على ان لا يقل عن 15 صفحة",
    icon: BadgeCheck,
  },
  {
    title: "البحوث المتميزة",
    amount: "150,000 د.ع.",
    subtitle: "كل كتاب يحصل على تميز",
    icon: Crown,
  },
  {
    title: "المقالة",
    amount: "25,000 د.ع.",
    subtitle: "لكل مقالة متميزة",
    icon: FileBadge,
  },
]

const notes = [
  "سعر صفحة الكتاب (تأليف، تحقيق) 5,000 د.ع.",
  "المكافئات اعلاه تعني في البحوث والكتب التي تأتي من خلال الاستكتاب",
  "البحوث المقدمة للمؤسسة تخصص 5% من مجموع المطبوع هدية للمؤلف",
];

export default function Page() {
  return (
    <div className="-mb-24">
      <div className="container">
        <Breadcrumbs
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "بوابة البحث العلمي", url: "/research" },
          ]}
        />

        <PageHeader
          title="بوابة البحث العلمي"
          text={intro}
          actions={
            <>
              <a href="#archive" className={solidButton}>
                <span className="h-2 w-2 rounded-full bg-secondary dark:bg-Muharram_secondary" />
                ارشيف البحوث العلمية
              </a>
              <Link href="/research/send-research" className={outlineButton}>
                انشر بحثك
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              </Link>
            </>
          }
          aside={
            <div className={`${photoFrame} mx-2 aspect-[4/3] shadow-xl`}>
              <Image
                src="/images/imam-legacy-bg-symbol.jpg"
                alt="السلام عليك يا علي بن الحسين"
                width={940}
                height={625}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-full w-full object-cover"
              />
            </div>
          }
        />
      </div>

      <section id="archive" className="container scroll-mt-32 pt-28">
        <SectionTitle title="ارشيف البحوث العلمية" />
        <div className="grid gap-x-14 gap-y-16 md:grid-cols-3">
          {sections.map((section, i) => (
            <Reveal key={section.title} y={30} delay={i * 0.12}>
              <div className="flex items-center gap-4">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-secondary text-secondary_dark dark:border-Muharram_secondary dark:text-Muharram_secondary">
                  <section.icon className="h-8 w-8" strokeWidth={1.4} aria-hidden />
                </span>
                <h3 className="text-2xl font-bold text-primary dark:text-Muharram_primary">
                  {section.title}
                </h3>
              </div>
              <p className="mt-4 text-lg leading-loose text-gray-700">{section.description}</p>
              <MoreLink href={section.href} className="mt-3">
                تصفح القسم
              </MoreLink>
              {section.subLinks && section.subLinks.length > 0 && (
                <ul className="mt-6">
                  {section.subLinks.map((sub) => (
                    <li key={sub.label}>
                      <Link
                        href={sub.href}
                        className="group flex items-center justify-between gap-3 border-b border-dashed border-secondary/40 py-3 text-lg leading-8 text-gray-800 transition-colors hover:text-primary dark:hover:text-Muharram_primary"
                      >
                        {sub.label}
                        <ArrowLeft className="h-4 w-4 shrink-0 opacity-0 transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container pt-28">
        <Reveal>
          <div
            className={`${shieldPanel} flex flex-col items-start justify-between gap-8 p-8 md:flex-row md:items-center md:p-12`}
          >
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">انشر بحثك</h2>
              <p className="mt-3 max-w-2xl text-lg leading-loose text-white/80 md:text-xl">
                بحوثكم تخدم تراث الإمام الرابع من أئمة أهل البيت عليهم السلام
              </p>
            </div>
            <Link href="/research/send-research" className={`${whiteButton} shrink-0`}>
              تقديم بحث
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      <DarkBand className="mt-28">
        <SectionTitle
          light
          title="المكافئات المالية"
          text="نقدّر جهودكم البحثية ونكافئ التميز العلمي"
        />
        <ul className="grid gap-12 md:grid-cols-3">
          {rewards.map(({ title, amount, subtitle, icon: Icon }, i) => (
            <li key={title}>
              <Reveal y={30} delay={i * 0.1} className="text-center md:text-right">
                <Icon className="mx-auto h-14 w-14 text-secondary md:mx-0" strokeWidth={1.2} aria-hidden />
                <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                <p
                  className="mt-2 text-3xl font-extrabold text-secondary"
                  aria-label={`المبلغ: ${amount}`}
                >
                  {amount}
                </p>
                <p className="mt-3 text-lg leading-8 text-white/70">{subtitle}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-white/10 pt-10">
          <h3 className="mb-5 flex items-center gap-3 text-xl font-bold text-secondary">
            <TitleIcon className="w-3" />
            ملاحظات مهمة
          </h3>
          <ol className="list-arabic-indic max-w-3xl space-y-3 pr-6 text-lg leading-loose text-white/80 md:text-xl md:leading-loose">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ol>
        </div>
      </DarkBand>
    </div>
  )
}
