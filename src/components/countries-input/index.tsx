"use client";

import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Globe } from "lucide-react";
import React, { useState } from "react";
import countries from "i18n-iso-countries";
import ar from "i18n-iso-countries/langs/ar.json";
import { Key } from "@react-types/shared";
import styles from "@/style/CountriesDropdown.module.css";

countries.registerLocale(ar);

const CountriesDropdown = ({
  className,
  onCountryChange,
}: {
  className?: string;
  onCountryChange?: (key: Key | null) => void;
}) => {
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
      setSelectedCountry(key.toString()); // Convert key to string if not null
      if (onCountryChange) {
        onCountryChange(key); // Pass selected country key to parent component
      }
    }
  };

  return (
    <Autocomplete
  startContent={
    <Globe stroke="var(--color-secondary)" fill="none" strokeWidth={2} />
  }
  className={`w-full country-autocomplete ${className ?? ""}`}
  placeholder="البلد"
  size="lg"
  value={selectedCountry}
  onSelectionChange={(key) => handleCountryChange(key)}
  classNames={{
    base: styles.autocompleteBase,
    popoverContent: styles.popoverContent,
    listbox: styles.listbox,
    selectorButton: "text-[var(--color-secondary)] ",
  }}
>
  {countriesArray.map((country) => (
    <AutocompleteItem key={country.key} textValue={country.label}>
      {country.label}
    </AutocompleteItem>
  ))}
</Autocomplete>

  );
};  

export default CountriesDropdown;
