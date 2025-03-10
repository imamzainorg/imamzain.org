"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Globe } from "lucide-react";
import React, { useState } from "react";
import countries from "i18n-iso-countries";
import ar from "i18n-iso-countries/langs/ar.json";
import {Key} from "@react-types/shared";
countries.registerLocale(ar);

const CountriesDropdown = ({ className, onCountryChange }: { className?: string, onCountryChange?: (key: Key | null) => void }) => {
    const countryNamesInArabic = countries.getNames("ar", { select: "official" });
    const countriesArray = Object.entries(countryNamesInArabic).map(
        ([key, label]) => ({
            key,
            label,
        })
    );

    // State to store selected country
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    // Handle country selection
    const handleCountryChange = (key: Key | null) => {
        if (key) {
            setSelectedCountry(key.toString()); // Convert the key to string if it's not null
            if (onCountryChange) {
                onCountryChange(key); // Pass the selected country key to the parent component
            }
        }
    };

    return (
        <Autocomplete
            startContent={<Globe stroke="#bb9661" fill="none" strokeWidth={2} />}
            className={`w-full ${className}`}
            placeholder="البلد"
            size="lg"
            value={selectedCountry}
            onSelectionChange={(key) => handleCountryChange(key)}
        >
            {countriesArray.map((country) => (
                <AutocompleteItem key={country.key} value={country.key}>
                    {country.label}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
};

export default CountriesDropdown;
