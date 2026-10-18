import { useCallback, useRef, useState } from "react"

// Runs a submit and ignores any further one until it settles. A ref carries the guard because
// state set by the first click is not visible to a second click in the same tick, and a repeated
// Enter or double click can arrive before the button has re-rendered as disabled.
export function useSingleFlight() {
	const running = useRef(false)
	const [pending, setPending] = useState(false)

	const run = useCallback(async (task: () => Promise<void>) => {
		if (running.current) return
		running.current = true
		setPending(true)
		try {
			await task()
		} finally {
			running.current = false
			setPending(false)
		}
	}, [])

	return [pending, run] as const
}
