import type { Metadata } from "next"
import MaarifLanding from "./_components/maarif-landing"

export const metadata: Metadata = {
	title: "معارف سجادية — امشِ وتعلَّم",
	description:
		"معارف سجادية: تطبيقٌ قادمٌ من مؤسسة الإمام زين العابدين (عليه السلام) يصحبك في طريق يا حسين — مسابقةٌ لحفظ رسالة الحقوق عبر محطّاتٍ على الطريق، مع اختباراتٍ وقصائدَ وزياراتٍ ودليلٍ للزائر وجوائزَ عند الوصول. سجّل اهتمامك ليصلك إشعار الإطلاق.",
	keywords: [
		"معارف سجادية",
		"رسالة الحقوق",
		"مسابقة الأربعين",
		"طريق يا حسين",
		"مسيرة الأربعين",
		"تطبيق زائري الحسين",
		"الإمام زين العابدين",
	],
	alternates: { canonical: "/applications/maarif-al-sajjad" },
	openGraph: {
		title: "معارف سجادية — امشِ وتعلَّم",
		description:
			"تطبيقٌ قادمٌ من مؤسسة الإمام زين العابدين (عليه السلام): مسابقةٌ لحفظ رسالة الحقوق على طريق يا حسين، مع جوائز عند الوصول. قريباً.",
		type: "website",
		locale: "ar_IQ",
	},
}

export default function Page() {
	return <MaarifLanding />
}
