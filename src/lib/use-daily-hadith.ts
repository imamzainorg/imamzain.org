"use client"

import { useEffect, useState } from "react"

type DailyHadith = { content: string; source: string | null }

const HADITH_URL = "https://api.imamzain.org/api/v1/daily-hadiths/today"

// One request per page view, shared by the top bar and the home page. The hadith is picked by the
// API (by the Hijri date), so it is fetched in the browser: the site is built once and served for days.
let request: Promise<DailyHadith | null> | null = null

function load(): Promise<DailyHadith | null> {
	request ??= fetch(HADITH_URL, { headers: { "Accept-Language": "ar" } })
		.then((res) => (res.ok ? res.json() : null))
		.then((body) => (body?.data?.content ? { content: body.data.content, source: body.data.source ?? null } : null))
		.catch(() => {
			request = null // let a later mount try again
			return null
		})
	return request
}

// The saying of the day, or null until it has loaded (and if the API cannot be reached).
export function useDailyHadith(): DailyHadith | null {
	const [hadith, setHadith] = useState<DailyHadith | null>(null)
	useEffect(() => {
		let live = true
		load().then((h) => live && setHadith(h))
		return () => {
			live = false
		}
	}, [])
	return hadith
}
