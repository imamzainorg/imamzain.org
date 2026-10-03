import type { LucideIcon } from "lucide-react"
import {
	BookOpen,
	Building2,
	Clapperboard,
	Feather,
	FlaskConical,
	Headphones,
	HeartHandshake,
	Images,
	Landmark,
	Library,
	Newspaper,
	Phone,
	Scale,
	ScrollText,
	Smartphone,
	Store,
	Target,
	Trophy,
} from "lucide-react"

export type NavSubLink = {
	label: string
	href: string
	description: string
	Icon: LucideIcon
}

export type NavLink = {
	label: string
	href?: string
	// Groups open the mega menu: an icon and a line for the lead panel, plus the cards.
	Icon?: LucideIcon
	blurb?: string
	cta?: { label: string; href: string }
	subLinks?: NavSubLink[]
}

export const navLinks: NavLink[] = [
	{
		label: "الإمام زين العابدين",
		href: "/his-life",
		Icon: Feather,
	},
	{
		label: "حول المؤسسة",
		Icon: Building2,
		blurb: "تعرّف على رسالة المؤسسة ورؤيتها وأهدافها في خدمة تراث الإمام السجاد (ع).",
		cta: { label: "عن المؤسسة", href: "/about" },
		subLinks: [
			{
				label: "من نحن",
				href: "/about",
				description: "تعريف بالمؤسسة ورسالتها",
				Icon: Building2,
			},
			{
				label: "رؤية واهداف المؤسسة",
				href: "/about/vision-and-goals",
				description: "الرؤية التي نعمل بها والأهداف التي نسعى إليها",
				Icon: Target,
			},
		],
	},
	{
		label: "الإصدارات",
		href: "/publications",
		Icon: BookOpen,
	},
	{
		label: "المكتبة",
		Icon: Library,
		blurb: "كتب ونصوص وأبحاث تخدم القارئ والباحث في تراث الإمام زين العابدين (ع).",
		cta: { label: "تصفح المكتبة", href: "/library" },
		subLinks: [
			{
				label: "المكتبة التخصصية",
				href: "/library",
				description: "كتب ومصادر للتصفح والقراءة",
				Icon: Library,
			},
			{
				label: "الصحيفة السجادية",
				href: "/library/al-sahifa/al-sahifa-al-sajjadiya-index",
				description: "أدعية الصحيفة مع فهرسها",
				Icon: ScrollText,
			},
			{
				label: "رسالة الحقوق",
				href: "/library/risalat-al-huqoq/introduction",
				description: "نص رسالة الحقوق بفقراتها",
				Icon: Scale,
			},
			{
				label: "بوابة البحث العلمي",
				href: "/research",
				description: "أبحاث ودراسات ومنصة علمية",
				Icon: FlaskConical,
			},
		],
	},
	{
		label: "النشاطات",
		Icon: Newspaper,
		blurb: "أخبار المؤسسة وفعالياتها وملتقياتها ومسابقاتها.",
		cta: { label: "آخر الأخبار", href: "/news" },
		subLinks: [
			{
				label: "الاخبار",
				href: "/news",
				description: "آخر أخبار المؤسسة وفعالياتها",
				Icon: Newspaper,
			},
			{
				label: "ملتقى البقيع",
				href: "/baqi-gathering",
				description: "برنامج الملتقى ومحاوره وضيوفه",
				Icon: Landmark,
			},
			{
				label: "المسابقات",
				href: "/contests",
				description: "مسابقات ثقافية وعلمية للمشاركة",
				Icon: Trophy,
			},
		],
	},
	{
		label: "الخدمات",
		Icon: HeartHandshake,
		blurb: "طرق التواصل معنا وخدماتنا للزائرين والقراء.",
		cta: { label: "تواصل معنا", href: "/services" },
		subLinks: [
			{
				label: "اتصل بنا",
				href: "/services",
				description: "قنوات التواصل مع المؤسسة",
				Icon: Phone,
			},
			{
				label: "الزيارة بالإنابة",
				href: "/visitation",
				description: "اطلب أداء الزيارة نيابةً عنك",
				Icon: HeartHandshake,
			},
			{
				label: "نقاط البيع المباشر",
				href: "/services/stores",
				description: "أماكن اقتناء إصدارات المؤسسة",
				Icon: Store,
			},
			{
				label: "التطبيقات",
				href: "/applications",
				description: "تطبيقات المؤسسة للهاتف",
				Icon: Smartphone,
			},
		],
	},
	{
		label: "الوسائط",
		Icon: Clapperboard,
		blurb: "مرئيات وصور وصوتيات توثّق نشاط المؤسسة.",
		cta: { label: "المرئيات", href: "/media/videos" },
		subLinks: [
			{
				label: "المرئيات",
				href: "/media/videos",
				description: "مقاطع ومحاضرات مصورة",
				Icon: Clapperboard,
			},
			{
				label: "معرض الصور",
				href: "/media/images",
				description: "ألبومات صور الفعاليات",
				Icon: Images,
			},
			{
				label: "الصوتيات",
				href: "/media/audio",
				description: "محاضرات وتلاوات صوتية",
				Icon: Headphones,
			},
		],
	},
]

// The sub link that matches the current page. The longest href wins so "/services/stores"
// does not also light up "/services".
export function activeSubHref(link: NavLink, path: string): string | undefined {
	const matches = (link.subLinks ?? [])
		.filter((s) => path === s.href || path.startsWith(`${s.href}/`))
		.sort((a, b) => b.href.length - a.href.length)
	return matches[0]?.href
}

export function isLinkActive(link: NavLink, path: string): boolean {
	if (link.href) return path === link.href || path.startsWith(`${link.href}/`)
	return activeSubHref(link, path) !== undefined
}
