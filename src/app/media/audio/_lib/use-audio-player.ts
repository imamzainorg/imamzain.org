"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { AudioItemLight } from "@/types/audio"
import { markFinished, savePosition, savedPosition, savedRate, saveRate } from "./listening-memory"

// idle: nothing chosen. loading: asked to play and waiting for sound, both the first fetch and
// any stall later (a seek past what is downloaded, a slow connection). error: the file failed.
export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "error"

export type PlayerState = {
	item: AudioItemLight | null
	status: PlayerStatus
	time: number
	duration: number
	// How far ahead of the playhead the file is already downloaded, as a share of the whole.
	buffered: number
	rate: number
	// Still loading after a few seconds: the page says so instead of looking frozen.
	slow: boolean
}

export const RATES = [1, 1.25, 1.5, 2, 0.75]

const SLOW_AFTER_MS = 5000
// Resume only from a real stopping point, not from the first or last few seconds.
const RESUME_MARGIN = 15
const SAVE_EVERY = 5

const IDLE: PlayerState = { item: null, status: "idle", time: 0, duration: 0, buffered: 0, rate: 1, slow: false }

// One <audio> element for the whole page, so starting a recording always stops the previous one,
// and every state change comes from the element's own events rather than from guesses.
export function useAudioPlayer() {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const itemRef = useRef<AudioItemLight | null>(null)
	const lastSaved = useRef(0)
	const [state, setState] = useState<PlayerState>(IDLE)

	const update = useCallback((patch: Partial<PlayerState>) => setState((prev) => ({ ...prev, ...patch })), [])

	const element = useCallback(() => {
		if (audioRef.current) return audioRef.current
		const audio = new Audio()
		audio.preload = "none"

		const remember = () => {
			const item = itemRef.current
			if (item && audio.currentTime > 0 && !audio.ended) savePosition(item.id, audio.currentTime)
		}
		const bufferedShare = () => {
			const { buffered, currentTime, duration } = audio
			if (!duration || !isFinite(duration)) return 0
			for (let i = 0; i < buffered.length; i++) {
				if (buffered.start(i) <= currentTime + 1 && buffered.end(i) >= currentTime) return buffered.end(i) / duration
			}
			return 0
		}

		audio.addEventListener("waiting", () => update({ status: "loading" }))
		audio.addEventListener("seeking", () => {
			if (!audio.paused) update({ status: "loading" })
		})
		audio.addEventListener("playing", () => update({ status: "playing", slow: false }))
		audio.addEventListener("pause", () => {
			if (audio.ended) return
			remember()
			update({ status: "paused", slow: false })
		})
		audio.addEventListener("ended", () => {
			const item = itemRef.current
			if (item) markFinished(item.id)
			audio.currentTime = 0
			update({ status: "paused", time: 0, slow: false })
		})
		audio.addEventListener("timeupdate", () => {
			if (Math.abs(audio.currentTime - lastSaved.current) >= SAVE_EVERY) {
				lastSaved.current = audio.currentTime
				remember()
			}
			update({ time: audio.currentTime, buffered: bufferedShare() })
		})
		audio.addEventListener("progress", () => update({ buffered: bufferedShare() }))
		audio.addEventListener("durationchange", () => {
			if (isFinite(audio.duration) && audio.duration > 0) update({ duration: audio.duration })
		})
		audio.addEventListener("ratechange", () => update({ rate: audio.playbackRate }))
		audio.addEventListener("error", () => {
			// A src cleared on purpose (stop) also fires an error; only a real failure counts.
			if (audio.getAttribute("src")) update({ status: "error", slow: false })
		})

		audioRef.current = audio
		return audio
	}, [update])

	const start = useCallback(
		(audio: HTMLAudioElement) => {
			audio.play().catch((error: DOMException) => {
				if (error.name === "AbortError") return // replaced by another recording
				// NotAllowedError: the browser wants a tap first. Anything else is a failure.
				update({ status: error.name === "NotAllowedError" ? "paused" : "error", slow: false })
			})
		},
		[update],
	)

	const play = useCallback(
		(item: AudioItemLight, from?: number) => {
			const audio = element()
			if (itemRef.current?.id === item.id && audio.getAttribute("src") && from === undefined) {
				update({ status: "loading" })
				start(audio)
				return
			}

			if (itemRef.current && audio.currentTime > 0) savePosition(itemRef.current.id, audio.currentTime)
			itemRef.current = item

			const duration = item.durationSeconds ?? 0
			const saved = from ?? savedPosition(item.id)
			const resumeAt = saved > RESUME_MARGIN && (!duration || saved < duration - RESUME_MARGIN) ? saved : 0
			const rate = savedRate()

			audio.src = item.audio
			audio.defaultPlaybackRate = rate
			audio.playbackRate = rate
			lastSaved.current = resumeAt
			if (resumeAt) audio.addEventListener("loadedmetadata", () => (audio.currentTime = resumeAt), { once: true })

			setState({ item, status: "loading", time: resumeAt, duration, buffered: 0, rate, slow: false })
			start(audio)
		},
		[element, start, update],
	)

	const pause = useCallback(() => audioRef.current?.pause(), [])

	const toggle = useCallback(
		(item: AudioItemLight) => {
			const audio = audioRef.current
			const current = itemRef.current?.id === item.id
			if (current && audio && !audio.paused) pause()
			else play(item)
		},
		[pause, play],
	)

	const seek = useCallback(
		(seconds: number) => {
			const audio = audioRef.current
			if (!audio || !itemRef.current) return
			const end = isFinite(audio.duration) && audio.duration > 0 ? audio.duration : (itemRef.current.durationSeconds ?? 0)
			const time = Math.max(0, Math.min(end, seconds))
			audio.currentTime = time
			update({ time })
		},
		[update],
	)

	const skip = useCallback((delta: number) => seek((audioRef.current?.currentTime ?? 0) + delta), [seek])

	const setRate = useCallback((rate: number) => {
		saveRate(rate)
		const audio = audioRef.current
		if (!audio) return
		audio.defaultPlaybackRate = rate
		audio.playbackRate = rate
	}, [])

	const retry = useCallback(() => {
		const item = itemRef.current
		if (item) play(item, audioRef.current?.currentTime || savedPosition(item.id))
	}, [play])

	const stop = useCallback(() => {
		const audio = audioRef.current
		if (audio) {
			if (itemRef.current && audio.currentTime > 0) savePosition(itemRef.current.id, audio.currentTime)
			audio.pause()
			audio.removeAttribute("src")
			audio.load()
		}
		itemRef.current = null
		setState(IDLE)
	}, [])

	// Loading for more than a few seconds gets a word of explanation.
	useEffect(() => {
		if (state.status !== "loading") return
		const timer = setTimeout(() => update({ slow: true }), SLOW_AFTER_MS)
		return () => clearTimeout(timer)
	}, [state.status, state.item, update])

	// Lock-screen and headset controls on phones, with the lecture's title and speaker.
	useEffect(() => {
		if (!("mediaSession" in navigator) || !state.item) return
		const session = navigator.mediaSession
		session.metadata = new MediaMetadata({
			title: state.item.title,
			artist: state.item.speaker,
			album: "المكتبة الصوتية، مؤسسة الإمام زين العابدين عليه السلام",
			artwork: [{ src: "/images/logo-icon.png", type: "image/png" }],
		})
		const item = state.item
		const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
			["play", () => play(item)],
			["pause", pause],
			["seekbackward", () => skip(-15)],
			["seekforward", () => skip(15)],
			["seekto", (details) => details.seekTime !== undefined && seek(details.seekTime)],
			["stop", stop],
		]
		for (const [action, handler] of handlers) {
			try {
				session.setActionHandler(action, handler)
			} catch {
				// An action this browser does not support.
			}
		}
	}, [state.item, play, pause, skip, seek, stop])

	useEffect(() => {
		if ("mediaSession" in navigator) {
			navigator.mediaSession.playbackState =
				state.status === "playing" ? "playing" : state.status === "paused" ? "paused" : "none"
		}
	}, [state.status])

	useEffect(
		() => () => {
			const audio = audioRef.current
			if (!audio) return
			if (itemRef.current && audio.currentTime > 0) savePosition(itemRef.current.id, audio.currentTime)
			audio.pause()
			audio.removeAttribute("src")
		},
		[],
	)

	return { state, play, pause, toggle, seek, skip, setRate, retry, stop }
}

export type AudioPlayer = ReturnType<typeof useAudioPlayer>
