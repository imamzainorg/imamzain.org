"use client";

import { useSyncExternalStore } from "react";
import { Globe } from "lucide-react";
import Dropdown from "@/components/dropdown";
import { useLanguages } from "@/context/language-context";

export default function DropdownLang({ broad }: { broad?: boolean }) {
  const { currentLanguage, setLanguage, languages } = useLanguages();
  // The stored language is only known in the browser, so show the default until mounted to keep
  // the server and client markup identical.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <Dropdown
      label="اللغة"
      value={mounted ? currentLanguage.code : languages[0].code}
      onChange={setLanguage}
      icon={<Globe />}
      variant={broad ? "glass" : "light"}
      compact={!broad}
      className={broad ? "w-40" : "w-32"}
      options={languages.map((language) => ({ value: language.code, label: language.name }))}
    />
  );
}
