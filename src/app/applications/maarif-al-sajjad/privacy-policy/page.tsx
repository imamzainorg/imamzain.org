import type { Metadata } from "next"
import Breadcrumbs from "@/components/breadcrumb"
import PrivacyPolicy from "./_components/privacy-policy"

export const metadata: Metadata = {
	title: "سياسة الخصوصية — معارف سجادية",
	description:
		"سياسة حماية البيانات الشخصية والخصوصية لتطبيق معارف سجادية: البيانات المطلوبة والغرض منها، صلاحية الموقع والجدار الجغرافي، والإشعارات — بمعالجةٍ محليةٍ على جهازك وبلا مشاركةٍ مع أطرافٍ ثالثة، تماشياً مع سياسات متجري Google وApple.",
	keywords: [
		"سياسة الخصوصية",
		"معارف سجادية",
		"حماية البيانات",
		"الخصوصية",
		"صلاحية الموقع",
		"تطبيق زائري الحسين",
	],
	alternates: { canonical: "/applications/maarif-al-sajjad/privacy-policy" },
	openGraph: {
		title: "سياسة الخصوصية — معارف سجادية",
		description:
			"كيف يحمي تطبيق معارف سجادية بياناتك: معالجةٌ محليةٌ للموقع، تشفيرٌ كامل، وبلا مشاركةٍ مع أطرافٍ ثالثة.",
		type: "website",
		locale: "ar_IQ",
	},
}

export default function Page() {
	return (
		<>
			<div className="container">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "التطبيقات", url: "/applications" },
						{
							name: "معارف سجادية",
							url: "/applications/maarif-al-sajjad",
						},
						{
							name: "سياسة الخصوصية",
							url: "/applications/maarif-al-sajjad/privacy-policy",
						},
					]}
				/>
			</div>
			<PrivacyPolicy />
		</>
	)
}
