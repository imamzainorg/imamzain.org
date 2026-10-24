"use client"

import { useEffect, useState } from "react"

// The waveform of one recording (300 loudness samples, 0 to 1), fetched when it is first opened
// and kept for the visit. The list never loads them: only the recording being played shows one.
const cache = new Map<number, number[]>()

export function usePeaks(id: number | null): number[] | null {
	const [loaded, setLoaded] = useState<{ id: number; peaks: number[] } | null>(null)

	useEffect(() => {
		if (id === null || cache.has(id)) return
		let live = true
		fetch(`/api/audio-peaks/${id}`)
			.then((response) => (response.ok ? (response.json() as Promise<{ peaks?: number[] }>) : null))
			.then((data) => {
				if (!data?.peaks?.length) return
				cache.set(id, data.peaks)
				if (live) setLoaded({ id, peaks: data.peaks })
			})
			.catch(() => {
				// No waveform: the seek bar falls back to a plain track.
			})
		return () => {
			live = false
		}
	}, [id])

	if (id === null) return null
	return cache.get(id) ?? (loaded?.id === id ? loaded.peaks : null)
}
