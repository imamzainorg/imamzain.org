"use client"



import {Autocomplete, AutocompleteItem} from "@heroui/react";
import {Globe} from "lucide-react";

import React from "react";
import countries from "i18n-iso-countries";
import ar from "i18n-iso-countries/langs/ar.json";

countries.registerLocale(ar);

const CountriesDropdown = () => {
    const countryNamesInArabic = countries.getNames("ar", { select: "official" });
    const countriesArray = Object.entries(countryNamesInArabic).map(
        ([key, label]) => ({
            key,
            label,
        })
    );
    return (
        <Autocomplete
            startContent={<Globe stroke="#bb9661" fill="none" strokeWidth={2} />}
            className="w-full"
            placeholder="البلد"
            size="lg"
        >
            {countriesArray.map((country) => (
                <AutocompleteItem key={country.key}>
                    {country.label}
                </AutocompleteItem>
            ))}
        </Autocomplete>
    );
};

export default CountriesDropdown;
