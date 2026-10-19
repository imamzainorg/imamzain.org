import { useSyncExternalStore } from "react"

// Where each visitor stopped in every recording, the ones they finished and their playback speed,
// kept in this browser only. Lectures run 40 minutes and more, so coming back to one should pick
// up where it was left. Storage can be missing or blocked (private windows, previews): every
// access is guarded and the page works the same without it, it only forgets.

type Memory = {
	positions: Record<number, number>
	// Recordings with a saved position, the most recently listened first.
	recent: number[]
	finished: number[]
	rate: number
}

const KEY = "audio-listening-v1"
const RECENT_MAX = 6
const EMPTY: Memory = { positions: {}, recent: [], finished: [], rate: 1 }

let memory: Memory | null = null
const listeners = new Set<() => void>()

function read(): Memory {
	if (memory) return memory
	try {
		const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as Partial<Memory> | null
		memory = { ...EMPTY, ...saved }
	} catch {
		memory = EMPTY
	}
	return memory
}

function write(next: Memory) {
	memory = next
	try {
		localStorage.setItem(KEY, JSON.stringify(next))
	} catch {
		// Not saved; the in-memory copy still serves this visit.
	}
	listeners.forEach((listener) => listener())
}

const subscribe = (listener: () => void) => {
	listeners.add(listener)
	return () => listeners.delete(listener)
}

export function useListeningMemory(): Memory {
	return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export const savedPosition = (id: number) => read().positions[id] ?? 0

export function savePosition(id: number, seconds: number) {
	const current = read()
	const at = Math.floor(seconds)
	if (current.positions[id] === at && current.recent[0] === id) return
	write({
		...current,
		positions: { ...current.positions, [id]: at },
		recent: [id, ...current.recent.filter((other) => other !== id)].slice(0, RECENT_MAX),
	})
}

export function markFinished(id: number) {
	const current = read()
	const positions = { ...current.positions }
	delete positions[id]
	write({
		...current,
		positions,
		recent: current.recent.filter((other) => other !== id),
		finished: current.finished.includes(id) ? current.finished : [...current.finished, id],
	})
}

export function forget(id: number) {
	const current = read()
	const positions = { ...current.positions }
	delete positions[id]
	write({ ...current, positions, recent: current.recent.filter((other) => other !== id) })
}

export const savedRate = () => read().rate

export const saveRate = (rate: number) => write({ ...read(), rate })
