"use client";
import { toast } from "sonner";
import { Autocomplete, AutocompleteItem, Button, Input } from "@heroui/react";
import { Globe } from "lucide-react";
import { PersonIcon, MobileIcon } from "@/assets/icons/reusable";

export default function ZiaraForm() {
	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className=" flex flex-col items-center gap-4  pt-20    py-6
			 w-[70%] sm:w-[50%] md:w-[35%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%]
			">
				<Input
					size={"lg"}
					className="border-none w-full"
					labelPlacement="inside"
					name="username"
					placeholder="الزيارة نيابة عن"
					classNames={{
						base: "",
						input: "border-none focus:ring-0",
					}}
					startContent={
						<PersonIcon
							stroke="#bb9661"
							fill="#bb9661"
							strokeWidth={0.1}
						/>
					}
					type="text"
				/>

				{/* Input for Phone */}
				<Input
					size={"lg"}
					className="border-none w-full"
					labelPlacement="inside"
					name="phone"
					placeholder="رقم الهاتف"
					classNames={{
						base: "",
						input: "border-none focus:ring-0",
					}}
					startContent={
						<MobileIcon stroke="#bb9661" fill="none" strokeWidth={1.5} />
					}
					type="text"
				/>

				{/* Dropdown for Countries */}
				<CountriesDropdown />

				{/* Submit Button */}
				<Button
					onClick={() => toast("تم ادراج اسمك في قائمة الزائرين")}
					className="text-white rounded-md bg-secondary p-4 md:p-6 mt-2 font-bold text-xs md:text-lg"
				>
					التسجيل
				</Button>
			</div>
		</div>
	);
}

function CountriesDropdown() {
	const countries = [
		{ label: "العراق", key: "iraq" },
		{ label: "ايران", key: "iran" },
		{ label: "السعودية", key: "ksa" },
		{ label: "البحرين", key: "bahrain" },
		{ label: "الكويت", key: "kuwait" },
		{ label: "تركيا", key: "turkey" },
	];

	return (
		<Autocomplete
			startContent={<Globe stroke="#bb9661" fill="none" strokeWidth={2} />}
			className="w-full"
			placeholder="البلد"
			size={"lg"}
		>
			{countries.map((country) => (
				<AutocompleteItem key={country.key}>{country.label}</AutocompleteItem>
			))}
		</Autocomplete>
	);
}
