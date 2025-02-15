import Breadcrumbs from "@/components/breadcrumb"
import storeLocations from "@/data/store-locations.json"

export default function Page() {
	return (
		<div className="">
			<Breadcrumbs
				links={[
					{ name: "الرئيسية", url: "/" },
					{ name: "الخدمات", url: "/services" },
					{ name: "نقاط البيع المباشر", url: "#" },
				]}
			/>
			<h1 className="text-4xl font-bold text-gray-900 my-10 text-center">
				نقاط البيع المباشر
			</h1>
			<div className="w-full max-w-screen-lg mx-auto space-y-12">
				{storeLocations.map((storeLocation, index) => (
					<div
						key={index}
						className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200"
					>
						<h2 className="text-2xl font-bold text-gray-900 text-center sm:text-right mb-6">
							{storeLocation.city}
						</h2>
						<div className="space-y-6">
							{storeLocation.sellpoints.map((sellpoint) => (
								<div
									key={sellpoint.name}
									className="p-4 border border-primary/30 shadow-sm rounded-xl hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg duration-150 cursor-pointer"
								>
									<h4 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
										{sellpoint.name}
									</h4>
									<p className="text-sm lg:text-lg text-gray-700 leading-relaxed">
										{sellpoint.location}
										<br />
										<span className="font-medium text-gray-900">
											رقم الهاتف:{" "}
										</span>
										<span
											dir="ltr"
											className="ml-2 text-gray-700"
										>
											{sellpoint.phone}
										</span>
									</p>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
