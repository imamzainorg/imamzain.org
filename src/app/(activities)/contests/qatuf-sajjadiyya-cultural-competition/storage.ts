// Shared client-side storage contract for the Qutuf Sajjadiyya contest.
//
// The presence of ATTEMPT in localStorage is the single source of truth for
// "this browser has an in-progress attempt": it is written when the participant
// lands on the quiz and removed on successful submit. The landing page uses it
// to decide between the registration form and the "resume" prompt; the quiz page
// uses it to restore saved answers. Keeping the keys here stops the two pages
// from drifting apart.

export const STORAGE_PREFIX = "qutuf_"

export const STORAGE_KEYS = {
	ATTEMPT: `${STORAGE_PREFIX}attempt_id`,
	ANSWERS: `${STORAGE_PREFIX}answers`,
	QUESTION: `${STORAGE_PREFIX}current_question`,
} as const

export const COMPETITION_PATH =
	"/contests/qatuf-sajjadiyya-cultural-competition"

export const participateHref = (attemptId: string): string =>
	`${COMPETITION_PATH}/participate?attempt_id=${encodeURIComponent(attemptId)}`
