"use server"

import { put, list } from "@vercel/blob"

type SubmissionData = {
	name: string
	contact: string
	contactType: "phone" | "email"
	answers: { [questionIndex: number]: string }
	timeSpent: number
	submittedAt: string
}

export async function saveSubmission(data: SubmissionData) {
	try {
		const { blobs } = await list({
			prefix: "contest-submissions/",
		})

		// Check all existing submissions for duplicate
		for (const blob of blobs) {
			const response = await fetch(blob.url)
			const existingSubmission = await response.json()

			if (existingSubmission.contact === data.contact) {
				return {
					success: false,
					error: "duplicate",
					message:
						"هذا الرقم/البريد الإلكتروني شارك في المسابقة مسبقاً",
				}
			}
		}

		// Create filename with timestamp and sanitized name
		const timestamp = Date.now()
		const sanitizedName = data.name.replace(
			/[^a-zA-Z0-9\u0600-\u06FF]/g,
			"_",
		)
		const filename = `contest-submissions/${timestamp}_${sanitizedName}.json`

		// Save to Vercel Blob
		const blob = await put(filename, JSON.stringify(data, null, 2), {
			access: "public",
			contentType: "application/json",
		})

		return { success: true, url: blob.url }
	} catch (error) {
		console.error("Failed to save submission:", error)
		return { success: false, error: String(error) }
	}
}
