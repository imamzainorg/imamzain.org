import { Suspense } from "react"
import type { Metadata } from "next"
import TokenAction from "../_components/token-action"

// Same as the confirmation page: the e-mailed link carries the credential in its query string,
// so the page stays out of the index and never passes its URL on as a referrer.
export const metadata: Metadata = {
	title: "إلغاء الاشتراك من النشرة البريدية",
	robots: { index: false, follow: false },
	referrer: "no-referrer",
}

export default function Page() {
	return (
		<Suspense>
			<TokenAction action="unsubscribe" />
		</Suspense>
	)
}
