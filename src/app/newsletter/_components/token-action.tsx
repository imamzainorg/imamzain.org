"use client"

import { useState, useSyncExternalStore } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle2, Clock, Loader2, Mail, MailMinus, TriangleAlert, WifiOff } from "lucide-react"
import Breadcrumbs from "@/components/breadcrumb"
import { infoPanel, outlineButton, solidButton } from "@/components/brand"
import { cn } from "@/lib/utils"

type Status = "ready" | "working" | "done" | "invalid" | "rate-limited" | "failed"
type Screen = { title: string; body: string }
type Words = {
	crumb: string
	ready: Screen & { button: string; busy: string }
	done: Screen & { link: string }
	invalid: Screen & { link: string }
	rateLimited: Screen & { button: string }
	failed: Screen & { button: string }
}

// The two pages the newsletter e-mails link to share everything but their words, their
// endpoint and where a dead link sends the visitor.
const ACTIONS = {
	confirm: {
		endpoint: "/api/newsletter/confirm",
		ReadyIcon: Mail,
		crumbParent: { ar: "الأخبار", en: "News", url: "/news" },
		invalidHref: "/news#newsletter",
		doneHref: "/news",
		ar: {
			crumb: "تأكيد الاشتراك",
			ready: {
				title: "أكّد اشتراكك في النشرة البريدية",
				body: "اضغط على الزر لتأكيد اشتراك هذا البريد في نشرة المؤسسة. لا يتم الاشتراك قبل الضغط.",
				button: "تأكيد الاشتراك",
				busy: "جارٍ التأكيد...",
			},
			done: { title: "تم تأكيد اشتراكك", body: "شكراً لك، ستصلك نشرة المؤسسة على هذا البريد.", link: "تصفح الأخبار" },
			invalid: {
				title: "الرابط غير صالح أو منتهي الصلاحية",
				body: "قد يكون الرابط قديماً أو استُبدل برابط أحدث. اشترك من جديد لتصلك رسالة تأكيد جديدة.",
				link: "الاشتراك في النشرة البريدية",
			},
			rateLimited: { title: "محاولات كثيرة", body: "حاول مرة أخرى بعد بضع دقائق.", button: "إعادة المحاولة" },
			failed: {
				title: "لم يكتمل التأكيد",
				body: "حدث خلل مؤقت من جهتنا. اشتراكك لم يتأكد بعد، حاول مرة أخرى بعد قليل.",
				button: "إعادة المحاولة",
			},
		},
		en: {
			crumb: "Confirm subscription",
			ready: {
				title: "Confirm your newsletter subscription",
				body: "Press the button to confirm this address for the foundation's newsletter. You are not subscribed until you do.",
				button: "Confirm subscription",
				busy: "Confirming...",
			},
			done: {
				title: "Your subscription is confirmed",
				body: "Thank you. You will receive the foundation's newsletter at this address.",
				link: "Browse the news",
			},
			invalid: {
				title: "This link is invalid or has expired",
				body: "It may be old or replaced by a newer one. Subscribe again to get a new confirmation e-mail.",
				link: "Subscribe to the newsletter",
			},
			rateLimited: { title: "Too many attempts", body: "Please try again in a few minutes.", button: "Try again" },
			failed: {
				title: "The confirmation did not go through",
				body: "Something went wrong on our side. You are not subscribed yet, so please try again in a moment.",
				button: "Try again",
			},
		},
	},
	unsubscribe: {
		endpoint: "/api/newsletter/unsubscribe",
		ReadyIcon: MailMinus,
		crumbParent: { ar: "النشرة البريدية", en: "Newsletter", url: "/news#newsletter" },
		invalidHref: "/services",
		doneHref: "/",
		ar: {
			crumb: "إلغاء الاشتراك",
			ready: {
				title: "إلغاء الاشتراك في النشرة البريدية",
				body: "سيُحذف هذا البريد من قائمة النشرة البريدية للمؤسسة ولن تصلك رسائلها بعد ذلك.",
				button: "إلغاء الاشتراك",
				busy: "جارٍ الإلغاء...",
			},
			done: {
				title: "تم إلغاء اشتراكك",
				body: "لن تصلك رسائل النشرة البريدية بعد الآن. شكراً لوقتك معنا.",
				link: "العودة إلى الصفحة الرئيسية",
			},
			invalid: {
				title: "هذا الرابط غير صالح",
				body: "لم نتمكن من التحقق من الرابط. راسلنا على info@imamzain.org أو عبر صفحة التواصل وسنحذف بريدك من القائمة.",
				link: "تواصل معنا",
			},
			rateLimited: { title: "محاولات كثيرة", body: "حاول مرة أخرى بعد بضع دقائق.", button: "إعادة المحاولة" },
			failed: {
				title: "لم يكتمل الإلغاء",
				body: "حدث خلل مؤقت من جهتنا. اشتراكك لم يُلغَ بعد، حاول مرة أخرى بعد قليل.",
				button: "إعادة المحاولة",
			},
		},
		en: {
			crumb: "Unsubscribe",
			ready: {
				title: "Unsubscribe from the newsletter",
				body: "This address will be removed from the foundation's newsletter list and will stop receiving its messages.",
				button: "Unsubscribe",
				busy: "Unsubscribing...",
			},
			done: {
				title: "You have been unsubscribed",
				body: "You will no longer receive the newsletter. Thank you for your time with us.",
				link: "Back to the home page",
			},
			invalid: {
				title: "This link isn't valid",
				body: "We could not verify the link. Write to info@imamzain.org or through the contact page and we will remove your address.",
				link: "Contact us",
			},
			rateLimited: { title: "Too many attempts", body: "Please try again in a few minutes.", button: "Try again" },
			failed: {
				title: "The unsubscribe did not go through",
				body: "Something went wrong on our side. You are not unsubscribed yet, so please try again in a moment.",
				button: "Try again",
			},
		},
	},
}

// Arabic unless the visitor picked English in the language switcher. The browser's own language is
// not used: many Arabic readers have English phones.
const chosenEnglish = () => {
	try {
		return localStorage.getItem("preferred-language") === "en"
	} catch {
		return false
	}
}

const EMAIL = /^[^\s@]{1,64}@[^\s@]+\.[^\s@]+$/
const TOKEN = /^[0-9a-f]{64}$/i

// The page an e-mailed link opens. Nothing is sent when it loads, because mail scanners and link
// previewers open links on their own: the visitor has to press the button.
export default function TokenAction({ action }: { action: keyof typeof ACTIONS }) {
	const config = ACTIONS[action]
	const params = useSearchParams()
	const english = useSyncExternalStore(() => () => {}, chosenEnglish, () => false)
	const lang = english ? "en" : "ar"
	const t: Words = config[lang]

	const email = params.get("email")?.trim() ?? ""
	const token = params.get("token")?.trim() ?? ""
	const linkIsValid = email.length <= 254 && EMAIL.test(email) && TOKEN.test(token)

	const [status, setStatus] = useState<Status>("ready")
	const view: Status = linkIsValid ? status : "invalid"

	const submit = async () => {
		if (!linkIsValid || status === "working") return
		setStatus("working")
		try {
			const response = await fetch(config.endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, token }),
			})
			if (response.ok) setStatus("done")
			else if (response.status === 401 || response.status === 400) setStatus("invalid")
			else if (response.status === 429) setStatus("rate-limited")
			else setStatus("failed")
		} catch {
			setStatus("failed")
		}
	}

	const screens = {
		ready: { Icon: config.ReadyIcon, ...t.ready },
		working: { Icon: config.ReadyIcon, ...t.ready },
		done: { Icon: CheckCircle2, ...t.done },
		invalid: { Icon: TriangleAlert, ...t.invalid },
		"rate-limited": { Icon: Clock, ...t.rateLimited },
		failed: { Icon: WifiOff, ...t.failed },
	}
	const { Icon, title, body } = screens[view]
	const retry = view === "failed" ? t.failed.button : t.rateLimited.button

	return (
		<div className="container pb-24">
			<Breadcrumbs
				links={[
					{ name: lang === "en" ? "Home" : "الصفحة الرئيسية", url: "/" },
					{ name: config.crumbParent[lang], url: config.crumbParent.url },
					{ name: t.crumb, url: "#" },
				]}
			/>

			<div dir={english ? "ltr" : "rtl"} className={cn(infoPanel, "mx-auto mt-6 max-w-2xl p-8 text-center md:p-14")}>
				<span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-secondary text-secondary_dark dark:border-Muharram_secondary dark:text-Muharram_secondary">
					<Icon className="h-9 w-9" strokeWidth={1.5} aria-hidden />
				</span>

				<h1 role="status" className="mt-6 text-2xl font-extrabold leading-snug text-primary dark:text-white md:text-3xl">
					{title}
				</h1>
				<p className="mt-4 text-lg leading-loose text-gray-700 dark:text-white/80">{body}</p>

				{linkIsValid && (view === "ready" || view === "working" || view === "done") && (
					<p
						dir="ltr"
						className="mx-auto mt-5 w-fit max-w-full break-all rounded-xl bg-primary/[0.06] px-4 py-2 text-base font-semibold text-gray-800 dark:bg-white/10 dark:text-white"
					>
						{email}
					</p>
				)}

				<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
					{(view === "ready" || view === "working") && (
						<button type="button" onClick={submit} disabled={view === "working"} className={cn(solidButton, "w-full sm:w-auto sm:min-w-56")}>
							{view === "working" ? (
								<>
									<Loader2 className="h-5 w-5 animate-spin" />
									{t.ready.busy}
								</>
							) : (
								t.ready.button
							)}
						</button>
					)}
					{(view === "rate-limited" || view === "failed") && (
						<button type="button" onClick={submit} className={cn(solidButton, "w-full sm:w-auto sm:min-w-56")}>
							{retry}
						</button>
					)}
					{view === "done" && (
						<Link href={config.doneHref} className={cn(outlineButton, "w-full sm:w-auto")}>
							{t.done.link}
						</Link>
					)}
					{view === "invalid" && (
						<Link href={config.invalidHref} className={cn(solidButton, "w-full sm:w-auto")}>
							{t.invalid.link}
						</Link>
					)}
				</div>
			</div>
		</div>
	)
}
