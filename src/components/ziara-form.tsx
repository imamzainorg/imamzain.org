"use client"
import {
	DropdownArrowIcon,
	MobileIcon,
	PersonIcon,
} from "@/assets/icons/reusable"
import { registerLocale } from "i18n-iso-countries"
import arCountries from "i18n-iso-countries/langs/ar.json"
import { Globe } from "lucide-react"
import { toast } from "sonner"
registerLocale(arCountries)

export default function ziaraForm() {
	return (
		<div className="flex flex-col gap-4 lg:gap-8 items-center h-full justify-center">
			<div className="relative">
				<label htmlFor="name" className="sr-only">
					الزيارة نيابة عن
				</label>
				<input
					type="text"
					id="name"
					placeholder="الزيارة نيابة عن"
					className="rounded-md border-gray-200 ps-10 shadow-sm text-black text-xs md:text-2xl xl:text-3xl"
				/>

				<span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
					<PersonIcon
						stroke="#bb9661"
						fill="#bb9661"
						strokeWidth={0.1}
					/>
				</span>
			</div>

			<div className="relative">
				<label htmlFor="phone" className="sr-only">
					رقم الهاتف
				</label>
				<input
					type="text"
					id="phone"
					placeholder="رقم الهاتف"
					className="rounded-md border-gray-200 ps-10 shadow-sm text-black text-xs md:text-2xl xl:text-3xl"
				/>

				<span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500">
					<MobileIcon
						stroke="#bb9661"
						fill="none"
						strokeWidth={1.5}
					/>
				</span>
			</div>

			<CountriesDropdown />

			<button
				onClick={() => toast("تم ادراج اسمك في قائمة الزائرين")}
				className="w-1/2 rounded-md bg-secondary py-1 sm:py-2 px-3 font-bold text-xs md:text-2xl"
			>
				التسجيل
			</button>
		</div>
	)
}
function CountriesDropdown() {
	return (
		<div className="relative ">
			<label htmlFor="country" className="sr-only">
				البلد
			</label>

			<input
				type="email"
				id="country"
				placeholder="البلد"
				className=" rounded-md border-gray-200 ps-10 shadow-sm text-black bg-white text-xs md:text-2xl xl:text-3xl"
			/>

			<span className="pointer-events-none absolute inset-y-0 start-0 grid w-10 place-content-center">
				<Globe stroke="#bb9661" fill="none" strokeWidth={2} />
			</span>
			<span className="pointer-events-none absolute inset-y-0 end-0 grid w-10 place-content-center">
				<DropdownArrowIcon
					stroke="#bb9661"
					fill="none"
					strokeWidth={2}
				/>
			</span>
		</div>
	)
}
