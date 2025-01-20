"use client"
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react"
// import { useRouter } from "next/navigation";

interface Language {
	name: string
	code: string
	dir: "ltr" | "rtl"
}

interface LanguagesContextProps {
	currentLanguage: Language
	setLanguage: (langCode: string) => void
	languages: Language[]
}
const LanguagesContext = createContext<LanguagesContextProps | undefined>(
	undefined,
)

export const useLanguages = (): LanguagesContextProps => {
	const context = useContext(LanguagesContext)
	if (!context) {
		throw new Error("useLanguages must be used within a LanguagesProvider")
	}
	return context
}
export const LanguagesProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// const router = useRouter();

	const languages: Language[] = [
		{ name: "العربية", code: "ar", dir: "rtl" },
		{ name: "English", code: "en", dir: "ltr" },
		{ name: "فارسى", code: "fa", dir: "rtl" },
		{ name: "اردو", code: "ur", dir: "rtl" },
	]

	const getDefaultLanguage = (): Language => {
		if (typeof window !== "undefined") {
			const storedLang = localStorage.getItem("preferred-language")
			if (storedLang) {
				const found = languages.find((lang) => lang.code === storedLang)
				if (found) return found
			}

			const browserLang = navigator.language.split("-")[0]
			const found = languages.find((lang) => lang.code === browserLang)
			if (found) return found
		}
		return languages[1]
	}

	const [currentLanguage, setCurrentLanguage] = useState<Language>(
		getDefaultLanguage(),
	)

	const setLanguage = (langCode: string) => {
		const selectedLanguage = languages.find(
			(lang) => lang.code === langCode,
		)
		if (selectedLanguage) {
			setCurrentLanguage(selectedLanguage)
			localStorage.setItem("preferred-language", selectedLanguage.code)

			// document.documentElement.dir = selectedLanguage.dir;
			// router.refresh();
		}
	}

	useEffect(() => {
		// document.documentElement.dir = currentLanguage.dir;
	}, [currentLanguage])

	return (
		<LanguagesContext.Provider
			value={{ currentLanguage, setLanguage, languages }}
		>
			{children}
		</LanguagesContext.Provider>
	)
}
