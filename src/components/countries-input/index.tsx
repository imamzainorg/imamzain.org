"use client"

import React from "react"
import { Autocomplete, AutocompleteItem } from "@heroui/react"
import { Globe } from "lucide-react"
import countries from "i18n-iso-countries"
import ar from "i18n-iso-countries/langs/ar.json"

countries.registerLocale(ar)

interface CountriesDropdownProps {
	className?: string
	value?: string
	onChange?: (value: string) => void
}

const CountriesDropdown: React.FC<CountriesDropdownProps> = ({
	className,
	value,
	onChange,
}) => {
	const countryNamesInArabic = countries.getNames("ar", {
		select: "official",
	})
	const countriesArray = Object.entries(countryNamesInArabic).map(
		([key, label]) => ({
			key,
			label,
		}),
	)

	return (
		<Autocomplete
			startContent={
				<Globe stroke="#bb9661" fill="none" strokeWidth={2} />
			}
			className={`w-full ${className || ""}`}
			placeholder="البلد"
			size="lg"
			value={value}
			onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
				if (onChange) onChange(e.target.value)
			}}
		>
			{countriesArray.map((country) => (
				<AutocompleteItem key={country.key} value={country.label}>
					{country.label}
				</AutocompleteItem>
			))}
		</Autocomplete>
	)
}

export default CountriesDropdown
