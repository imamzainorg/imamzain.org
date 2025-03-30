"use client"
export default function Page() {
	return (
		<div className="w-full  flex-col justify-between gap-6 p-10 bg-white rounded-2xl shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]">
			<h1 className="text-3xl font-bold text-center mb-8 text-primary">
				إقرار الباحث
			</h1>

			<div>
				<strong>أقر بأن</strong>:
				<ul className="list-disc list-inside pr-5 mt-2 space-y-2">
					<li>البحث لم يُنشر سابقًا، ولم يُقدَّم لأي جهة أخرى.</li>
					<li>التزمت بأخلاقيات النشر وتعليمات المؤسسة.</li>
					<li>حقوق النشر تعود للمؤسسة بعد القبول.</li>
				</ul>
			</div>
			<p>
				<strong>أتحمل المسؤولية القانونية والأخلاقية</strong> عن محتوى
				البحث.
			</p>

			<div className="mt-6 border-t-2 border-gray-200 pt-4">
				<h3 className="text-xl font-medium mb-3">معلومات الباحث:</h3>
				<div className="space-y-3">
					<p>
						<strong>الاسم الثلاثي:</strong> ........................
					</p>
					<p>
						<strong>الجامعة/المؤسسة:</strong>{" "}
						........................
					</p>
					<p>
						<strong>الباحثون المشاركون (إن وجدوا):</strong>{" "}
						........................
					</p>
					<p>
						<strong>التوقيع:</strong> ........................
					</p>
					<p>
						<strong>التاريخ:</strong> / / 202
					</p>
				</div>
			</div>
		</div>
	)
}
