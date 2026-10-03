"use client"

import { Autocomplete, AutocompleteItem, type AutocompleteProps } from "@heroui/react"
import { Globe } from "lucide-react"
import React, { useState } from "react"
import countries from "i18n-iso-countries"
import ar from "i18n-iso-countries/langs/ar.json"
import { Key } from "@react-types/shared"
import styles from "@/style/countries-dropdown.module.css"

countries.registerLocale(ar)

const CountriesDropdown = ({
	className,
	inputProps,
	onCountryChange,
}: {
	className?: string
	inputProps?: AutocompleteProps["inputProps"]
	onCountryChange?: (key: Key | null) => void
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

	// State to store selected country
	const [selectedCountry, setSelectedCountry] = useState<string>("")

	// Handle country selection
	const handleCountryChange = (key: Key | null) => {
		if (key) {
			setSelectedCountry(key.toString()) // Convert key to string if not null
			if (onCountryChange) {
				onCountryChange(key) // Pass selected country key to parent component
			}
		}
	}

	return (
		<Autocomplete
			startContent={
				<>
					<Globe
						stroke="#bb9661"
						fill="none"
						strokeWidth={2}
						className="dark:hidden "
					/>
					<Globe
						stroke="#a43232"
						fill="none"
						strokeWidth={2}
						className="hidden dark:block "
					/>
				</>
			}
			className={`w-full country-autocomplete ${className ?? ""}`}
			placeholder="البلد"
			inputProps={inputProps}
			listboxProps={{
				itemClasses: {
					base: "rounded-xl px-3.5 py-2.5 text-base font-medium text-gray-900 data-[hover=true]:bg-primary/10 data-[focus-visible=true]:bg-primary/10 data-[selected=true]:font-bold data-[selected=true]:text-primary",
				},
			}}
			size="lg"
			value={selectedCountry}
			onSelectionChange={(key) => handleCountryChange(key)}
			classNames={{
				base: styles.autocompleteBase,
				popoverContent: styles.popoverContent,
				listbox: styles.listbox,
				selectorButton: "text-secondary  dark:bg-Muharram_secondary",
			}}
		>
			{countriesArray.map((country) => (
				<AutocompleteItem key={country.key} textValue={country.label}>
					{country.label}
				</AutocompleteItem>
			))}
		</Autocomplete>
	)
}

export default CountriesDropdown
