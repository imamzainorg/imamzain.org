"use server"

import { list } from "@vercel/blob"

export async function checkDuplicate(contact: string): Promise<boolean> {
	try {
		// List all submissions from Vercel Blob
		const { blobs } = await list({
			prefix: "contest-submissions/",
		})

		// Check each submission for duplicate contact
		for (const blob of blobs) {
			const response = await fetch(blob.url)
			const submission = await response.json()

			if (submission.contact === contact) {
				return true // Duplicate found
			}
		}

		return false // No duplicate found
	} catch (error) {
		console.error("Error checking for duplicate:", error)
		return false // On error, allow submission
	}
}
