import { Suspense } from "react"
import type { Metadata } from "next"
import TokenAction from "../_components/token-action"

// The link in the confirmation e-mail carries the credential in its query string, so the page is
// kept out of the index and never passes its URL on as a referrer.
export const metadata: Metadata = {
	title: "تأكيد الاشتراك في النشرة البريدية",
	robots: { index: false, follow: false },
	referrer: "no-referrer",
}

export default function Page() {
	return (
		<Suspense>
			<TokenAction action="confirm" />
		</Suspense>
	)
}
