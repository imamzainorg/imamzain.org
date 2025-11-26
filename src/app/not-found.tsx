import Link from "next/link"
import Image from "next/image"
export default function NotFound() {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center z-50">
			<Image
				src={"/images/logo.png"}
				width={400}
				height={400}
				alt="Logo"
			/>
			<div className="flex flex-col items-center justify-center">
				<p className="md:text-lg lg:text-xl text-gray-600 mt-8">
					عذرا، لكن الصفحة التي طلبتها غير موجودة
				</p>
				<Link
					href="/"
					className="flex items-center gap-5 bg-transparent border-b-2 border-transparent hover:border-primary px-4 py-2 mt-12 transition duration-150"
					title="الصفحة الرئيسية"
				>
					الرجوع الى الصفحة الرئيسية
				</Link>
			</div>
		</div>
	)
}
