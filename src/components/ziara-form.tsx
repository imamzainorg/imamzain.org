"use client"
import {
	DropdownArrowIcon,
	MobileIcon,
	PersonIcon,
} from "@/assets/icons/reusable"
import { registerLocale } from "i18n-iso-countries"
import arCountries from "i18n-iso-countries/langs/ar.json"
import { toast } from "sonner"
import {Autocomplete, AutocompleteItem, Button, Input} from "@heroui/react";
registerLocale(arCountries)

export default function ziaraForm() {
	return (
		<div className="flex flex-col items-center h-full justify-center w-full  ">
			<div className="w-1/2 flex flex-col items-center gap-4   pt-10">
				<Input
					// label={"الزيارة نيابة عن"}
					size={'lg'}
					className={'border-none w-full'}
					labelPlacement="inside"
					name="username"
					placeholder="الزيارة نيابة عن"
					classNames={{
						base : '',
						input: 'border-none focus:ring-0'
					}}
					startContent={
						<MobileIcon
							stroke="#bb9661"
							fill="none"
							strokeWidth={1.5}
						/>
					}
					type="text"
				/>
				<Input
					// label={"رقم الهاتف"}
					size={'lg'}
					className={'border-none w-full'}
					labelPlacement="inside"
					name="username"
					placeholder="رقم الهاتف"
					classNames={{
						base : '',
						input: 'border-none focus:ring-0'
					}}
					startContent={
						<MobileIcon
							stroke="#bb9661"
							fill="none"
							strokeWidth={1.5}
						/>
					}
					type="text"
				/>
				<CountriesDropdown />
				<Button
					onClick={() => toast("تم ادراج اسمك في قائمة الزائرين")}
					className="w-1/2 text-white rounded-md bg-secondary px-2 !py-4 mt-4 font-bold text-xs md:text-2xl"
				>
					التسجيل
				</Button>
			</div>
		</div>
	)
}
function CountriesDropdown() {
      const animals = [
        {label: "العراق", key: "cat" },
        {label: "ايران", key: "dog" },
        {label: "السعودية", key: "lion" },
        {label: "البحرين", key: "tiger" },
        {label: "الكويت", key: "giraffe" },
		  {label: "تركيا", key: "elephant"  },
    ];
	return (

			<Autocomplete
				startContent={
					<MobileIcon
						stroke="#bb9661"
						fill="none"
						strokeWidth={1.5}
					/>
				}
                className="w-full"
				placeholder="البلد"
				size={'lg'}
				// label="البلد"
			>
				{animals.map((animal) => (
					<AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
				))}
			</Autocomplete>

	);
}
