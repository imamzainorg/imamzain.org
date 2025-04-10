"use client"
export default function Page() {
	return (
		<div
			className="w-full flex flex-col sm:flex-row justify-between gap-6
                 bg-white rounded-2xl p-3
                  shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]"
		>
			<div className="container mx-auto px-4 py-8 max-w-4xl">
				<h1 className="text-3xl font-bold text-center mb-8 text-primary">
					تعليمات كتابة البحوث المعتمدة
				</h1>

				<h2 className="text-2xl font-semibold mb-4 text-primary">
					مواصفات الصفحة والطباعة
				</h2>

				<ol className="list-decimal list-inside space-y-3 text-right">
					<li>
						يُكتب البحث أو الكتاب بقطع <strong>وزيري</strong>.
					</li>
					<li>
						ألا يقل عدد الكلمات عن{" "}
						<strong>250 كلمة في الصفحة الواحدة</strong>.
					</li>
					<li>
						يُعتمد في الكتب والبحوث والمقالات ما يلي:
						<ul className="list-disc list-inside pr-5 mt-2 space-y-2">
							<li>
								الخط: <strong>Lotus</strong>
							</li>
							<li>
								حجم الخط في المتن: <strong>14</strong>
							</li>
							<li>
								حجم خط الهوامش: <strong>12</strong>، وتوضع أسفل
								كل صفحة
							</li>
							<li>
								المسافة بين الأسطر: <strong>1.15</strong>
							</li>
							<li>
								أن تكون الهوامش <strong>2 سم</strong> من جميع
								الجهات
							</li>
						</ul>
					</li>
					<li>
						لا تحتسب الصفحات الفارغة وصفحات العناوين والفهارس في
						العدد الإجمالي.
					</li>
				</ol>

				<h2 className="text-2xl font-semibold mb-4 mt-10 text-primary">
					المكافآت المالية
				</h2>

				<ul className="list-disc list-inside space-y-2 text-right">
					<li>
						<strong>الكتب (تأليف أو تحقيق)</strong>: لا يقل سعر
						الصفحة الواحدة عن <strong>5000 دينار</strong>.
					</li>
					<li>
						<strong>البحوث المقبولة</strong>: مكافأة تمنح إذا كان
						البحث لا يقل عن <strong>15 صفحة</strong>.
					</li>
					<li>
						<strong>
							اصحاب البحوث المتميزة وذات الأصالة العلمية
						</strong>
						: مكافأة <strong>150,000 دينار</strong>
					</li>
					<li>
						<strong>المقالات</strong>: مكافأة{" "}
						<strong>25,000 دينار</strong>، مع إمكانية منح مكافأة
						إضافية في حال التميز.
					</li>
				</ul>

				<h2 className="text-2xl font-semibold mb-4 mt-10 text-primary">
					شروط النشر والملكية الفكرية
				</h2>

				<ol className="list-decimal list-inside space-y-3 text-right">
					<li>
						البحوث والكتب المقدمة عبر <strong>الاستكتاب</strong>{" "}
						تخضع للشروط السابقة.
					</li>
					<li>
						البحوث المقدمة مباشرةً للمؤسسة: يحصل المؤلف على{" "}
						<strong>5%</strong> من جميع الطبعات كهدية.
					</li>
					<li>
						يلزم تقديم ملخص للبحث باللغة العربية (150-200 كلمة)
						يشمل:
						<ul className="list-disc list-inside pr-5 mt-2 space-y-2">
							<li>أهداف البحث</li>
							<li>الأدوات المستخدمة</li>
							<li>المفاهيم الأساسية</li>
							<li>أهم النتائج</li>
						</ul>
					</li>
					<li>
						<strong>حقوق النشر</strong>: تصبح ملكًا للمؤسسة بعد
						القبول، ولا يجوز إعادة النشر دون موافقة خطية.
					</li>
					<li>
						<strong>نسبة الاقتباس</strong>: ألا تزيد عن{" "}
						<strong>10%</strong> (باستثناء المقدمة والهوامش).
					</li>
					<li>
						<strong>التحكيم</strong>: تُحكَّم البحوث من قِبَل خبيرين
						متخصصين، ويجب ألا تكون منشورة سابقًا.
					</li>
					<li>
						<strong>إعادة الطباعة</strong>: تحتاج إلى إذن كتابي من
						صاحب حقوق النشر.
					</li>
					<li>
						<strong>الإخطار بالقرار</strong>: تُبلغ المؤسسة الباحث
						بقرارها خلال <strong>شهرين</strong> من تقديم البحث.
					</li>
					<li>
						<strong>السرية والأمانة العلمية</strong>: تلتزم المؤسسة
						باحترام خصوصية البحث.
					</li>
					<li>
						<strong>لا تُعاد</strong> البحوث غير المقبولة إلى
						الباحثين.
					</li>
				</ol>

				<h3 className="text-2xl font-semibold mb-4 mt-10 text-primary">
					للتواصل
				</h3>
				<p>
					البريد الإلكتروني:{" "}
					<a
						href="mailto:zain.alabiedeen22@gmail.com"
						className="text-blue-600"
					>
						 info@imamzain.org
					</a>
				</p>
				<p>
					رقم الهاتف: <span dir="ltr">0780 794 3999</span>
				</p>
			</div>
		</div>
	)
}
