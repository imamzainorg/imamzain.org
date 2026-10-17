import {
	getCountries,
	getCountryCallingCode,
	getExampleNumber,
	parsePhoneNumberFromString,
	type CountryCode,
} from "libphonenumber-js/min"
import examples from "libphonenumber-js/examples.mobile.json"

export type { CountryCode }

export const DEFAULT_COUNTRY: CountryCode = "IQ"

export const phoneCountries = getCountries()

export const dialCode = (country: CountryCode) => getCountryCallingCode(country)

const countriesByDialCode = new Map<string, CountryCode[]>()
for (const country of phoneCountries) {
	const code = dialCode(country)
	countriesByDialCode.set(code, [...(countriesByDialCode.get(code) ?? []), country])
}

// Arabic-Indic and Persian digits are typed as they are, so turn them into 0-9.
export const latinDigits = (text: string) =>
	text
		.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
		.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)))

// A number typed or pasted with its international prefix (+964..., 00964...) names its own
// country. Returns that country and the rest of the number, or null while there is nothing
// to detect yet. Countries sharing a code (+1, +7) keep the current one when it fits.
export function splitInternational(text: string, current: CountryCode) {
	const trimmed = latinDigits(text).trim()
	if (!/^(\+|00)/.test(trimmed)) return null

	const digits = trimmed.replace(/\D/g, "").replace(/^00/, "")
	for (const length of [1, 2, 3]) {
		const options = countriesByDialCode.get(digits.slice(0, length))
		if (!options) continue
		const country = options.includes(current)
			? current
			: (parsePhoneNumberFromString(`+${digits}`)?.country ?? options[0])
		return { country, national: digits.slice(length) }
	}
	return null
}

// The number in the form the API expects (+ and digits), or null if it is not a real
// number for that country. A leading 0 (07801234567) is handled.
export function toE164(national: string, country: CountryCode) {
	const parsed = parsePhoneNumberFromString(latinDigits(national), country)
	return parsed?.isValid() ? parsed.number : null
}

export const formatNational = (national: string, country: CountryCode) =>
	parsePhoneNumberFromString(latinDigits(national), country)?.formatNational() ?? national

export const exampleNational = (country: CountryCode) =>
	getExampleNumber(country, examples)?.nationalNumber ?? ""
