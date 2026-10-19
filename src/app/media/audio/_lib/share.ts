import { toast } from "sonner"
import type { AudioItemLight } from "@/types/audio"

// A link to the recording's place on this page (the list opens on it). The phone's own share
// sheet where there is one; elsewhere the link goes to the clipboard.
export async function shareRecording(item: AudioItemLight) {
	const url = `${window.location.origin}/media/audio?id=${item.id}`
	if (navigator.share && matchMedia("(pointer: coarse)").matches) {
		try {
			await navigator.share({ title: item.title, text: `${item.title}، ${item.speaker}`, url })
			return
		} catch (error) {
			if ((error as DOMException).name === "AbortError") return
		}
	}
	try {
		await navigator.clipboard.writeText(url)
		toast("تم نسخ رابط التسجيل", { description: item.title })
	} catch {
		toast("تعذر نسخ الرابط", { description: url })
	}
}
