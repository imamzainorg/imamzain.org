import Image from "next/image"
import Link from "next/link"

interface SectionTitleProps {
	children: React.ReactNode
	className?: string
}
const SectionTitle = ({ children, className = "" }: SectionTitleProps) => (
	<div className="flex flex-wrap justify-center items-center text-center">
		<h2
			className={`text-2xl sm:text-3xl md:text-4xl text-center text-[#0B1F47] mb-8 sm:mb-10 relative inline-block font-bold ${className}`}
		>
			{children}
			<span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 block w-full h-1 bg-[#eec67d]"></span>
		</h2>
	</div>
)

const Hero = () => (
	<section
		className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] flex flex-col justify-end text-white px-4 sm:px-5"
		style={{
			background:
				"linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/baqi-gathering/albagi.jpg') no-repeat center center/cover",
		}}
	>
		<div className="container mx-auto w-full h-full flex flex-col justify-center pt-16 sm:pt-20 items-start">
			<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 drop-shadow-lg">
				ملتقى البقيع الثاني
			</h1>
			<p className="text-lg sm:text-xl md:text-2xl max-w-3xl mb-2 sm:mb-3">
				تحت شعار &quot;البقيع: الهوية والتاريخ&quot;
			</p>

			<p className="text-base sm:text-lg mb-2 sm:mb-3">12 شوال 1446هـ</p>
			<a
				href="#schedule"
				className="bg-[#eec67d] rounded-full hover:bg-[#eec67d]/90 text-[#0B1F47] font-bold transition-all duration-300 py-2 sm:py-3 px-6 sm:px-8 inline-block mt-4 sm:mt-5"
			>
				جدول الفعاليات
			</a>
		</div>
	</section>
)

const AboutSection = () => (
	<section id="about" className="py-12 sm:py-16 bg-white">
		<div className="container mx-auto px-4 sm:px-6">
			<SectionTitle className="mx-auto">عن الملتقى</SectionTitle>

			<div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
				<p className="text-lg sm:text-xl md:text-2xl text-center text-gray-900 leading-7 md:leading-9 lg:leading-10 tracking-tighter">
					نظرًا لأهمية التراث الإسلامي عموماً، وما يحمله البقيع من
					رمزية دينية وتاريخية، وفي إطار الجهود الرامية إلى التعريف
					بالبعد الفكري العقائدي والثقافي التاريخي لهذا المعلم
					الإسلامي المقدس، والذي يمثل مصداقا واضحاً للتعدي على المكانة
					السامية لأئمة أهل البيت، ويقدم أنموذجا للتعصب العقائدي
					والتطرف الفكري الذي ما زال المسلمون -قبل غيرهم- يتجرعون منه
					مرارة العيش وغياب الأمن والأمان، ومحاولةً لتمرير المباني
					الفقهية الخاصة وطرحها في الواقع العملي على أنها مسلمات دينية
					وتاريخية؛ للتأثير على وجدان الأمة عموماً. من هنا تسعى مؤسسة
					الإمام زين العابدين للبحوث والدراسات إلى تركيز الضوء على أهم
					المفاصل العلمية والثقافية في هذا الحدث المهم في الملتقى
					الثاني الذي تروم عقده بمناسبة هدم تلك القبور الطواهر في
					الثامن من شهر شوال.
				</p>
			</div>
		</div>
	</section>
)

const ObjectivesSection = () => (
	<section id="objectives" className="py-12 sm:py-16 bg-gray-50">
		<div className="container mx-auto px-4 sm:px-6">
			<SectionTitle>أهداف الملتقى</SectionTitle>
			<ul className="list-disc list-inside space-y-3 sm:space-y-4 text-base sm:text-lg pr-2 sm:pr-5">
				<li>
					تحليل تداعيات هدم البقيع من منظور فكري عقائدي، وحضاري
					اجتماعي، وإبراز أثر ذلك على وعي المجتمع الإسلامي.
				</li>
				<li>
					إبراز الأهمية الدينية والتاريخية للبقيع بوصفه مدفنًا لأربعة
					من أئمة أهل البيت وجملة من الصحابة الكرام.
				</li>
				<li>
					مناقشة الرؤى الفقهية والفكرية المتعلقة بإحياء التراث
					الإسلامي، وطرح دراسات تحليلية حول مشروعية الحفاظ على
					المقدسات.
				</li>
				<li>
					إحياء الهوية الإسلامية عبر دراسة البقيع كنموذج يعكس جدلية
					العلاقة بين الدين والحضارة ودور المعالم الإسلامية في تشكيل
					الوعي الجمعي.
				</li>
			</ul>
			<h3 className="mt-8 sm:mt-10 text-xl sm:text-2xl text-[#1a3c40]">
				الغاية العملية من النشاط:
			</h3>
			<ul className="list-disc list-inside space-y-3 sm:space-y-4 text-base sm:text-lg pr-2 sm:pr-5 mt-3 sm:mt-4">
				<li>
					تعزيز الوعي بأهمية المواقع الإسلامية التاريخية، وفتح آفاق
					لحوار العلمي حول دورها في حفظ الهوية الإسلامية.
				</li>
				<li>
					تقديم قراءات تحليلية جديدة تربط بين الماضي والحاضر، وتحث على
					تبني استراتيجيات تحفظ التراث الإسلامي من الاندثار أو
					التغييب.
				</li>
				<li>
					مناقشة القضايا المرتبطة بالبقيع ضمن إطار علمي رصين، يسهم في
					إثراء الفكر الإسلامي وتعزيز الاهتمام بالمقدسات الدينية كجزء
					من الهوية الحضارية للأمة.
				</li>
			</ul>
		</div>
	</section>
)

const SpeakersSection = () => {
	const speakers = [
		{
			img: "/baqi-gathering/شيخ محمد أل حيدر.jpg",
			alt: "شيخ محمد أل حيدر",
			name: "سماحة الشيخ محمد أل حيدر",
			title: "هدم قبور البقيع... المناشىء الفكرية والتداعيات الإجتماعية",
		},

		{
			img: "/baqi-gathering/الأستاذ الدكتور حسن الحكيم.jpg",
			alt: "الدكتور حسن الحكيم",
			name: "الأستاذ الدكتور حسن الحكيم",
			title: "قبور آل البيت عليهم السلام في التراث الإسلامي بين الحفاظ والتجريف",
		},
		{
			img: "/baqi-gathering/سماحة الشيخ ستار المرشدي.jpg",
			alt: "سماحة الشيخ ستار الجيزاني",
			name: "سماحة الشيخ ستار الجيزاني",
			title: "هدم قبور البقيع: الحدث والحديث",
		},
	]
	return (
		<section id="speakers" className="py-12 sm:py-16 bg-white">
			<div className="container mx-auto px-4 sm:px-6">
				<SectionTitle>المحاضرون</SectionTitle>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
					{speakers.map((speaker, index) => (
						<div
							key={index}
							className="shadow-xl border rounded-lg flex flex-col sm:flex-row xl:flex-col 2xl:flex-row justify-between p-3 sm:p-4 w-full"
						>
							<div className="sm:w-3/4 p-2 order-2 sm:order-1 xl:order-2 2xl:order-1">
								<h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2 text-[#1a3c40]">
									{speaker.name}
								</h3>
								<p className="text-neutral-900 text-sm sm:text-base">
									عنوان البحث :
								</p>
								<p className="text-neutral-700 text-sm sm:text-base">
									{speaker.title}
								</p>
							</div>
							<div className="flex items-center justify-center p-2 order-1 sm:order-2 xl:order-1 2xl:order-2">
								<div className="rounded-full bg-gray-100 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 overflow-hidden">
									<Image
										src={speaker.img}
										width={1000}
										height={1000}
										className="w-full h-full object-cover cursor-pointer"
										alt={speaker.alt}
									/>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

const ScheduleSection = () => {
	const scheduleItems = [
		{
			time: "9:30 - 9:35",
			title: "قراءة آية من كتاب الله العزيز",
			duration: "5 دقائق",
		},
		{
			time: "9:35 - 9:45",
			title: "كلمة ترحيبية من قبل المؤسسة",
			duration: "10 دقائق",
		},
		{
			time: "9:45 - 9:55",
			title: "كلمة العتبة الحسينية المقدسة",
			duration: "10 دقائق",
		},
		{
			time: "9:55 - 10:55",
			title: "الجلسة البحثية الأولى",
			lectures: [
				{
					title: "المحاضرة الأولى: سماحة العلامة الشيخ محمد آل حيدر دام عزه",
				},
				{
					title: "المحاضرة الثانية: الأستاذ الدكتور حسن الحكيم المحترم",
				},
				{
					title: "المحاضرة الثالثة: سماحة العلامة العلامة الشيخ ستار الجيزاني دام عزه",
				},
			],
			chair: "رئيس الجلسة: د.علي شدهان ياسر",
			duration: "1 ساعة",
		},
		{
			time: "10:55 - 11:25",
			title: "جولة في المعرض",
			duration: "30 دقيقة",
		},
		{
			time: "11:25 - 12:30",
			title: "التهيؤ للصلاة وأدائها",
		},
		{
			time: "12:30 - 1:30",
			title: "التبرك بوجبة غداء",
		},
	]

	const sidelineItems = [
		{
			title: "معرض الخط التخصصي بالإمام السجاد عليه السلام",
			href: "/contests/khat",
		},
	]

	return (
		<section id="schedule" className="py-12 sm:py-16 bg-gray-50">
			<div className="container mx-auto px-4 sm:px-6">
				<SectionTitle>جدول الأعمال</SectionTitle>
				<div className="flex justify-center mb-6 sm:mb-8">
					<div className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-300 text-base sm:text-lg font-medium rounded hover:bg-gray-400 transition-all duration-300">
						يوم الجمعة - 12 شوال
					</div>
				</div>
				<div className="text-center mb-6 sm:mb-8">
					<p className="text-gray-600 mb-4 sm:mb-6 text-lg sm:text-xl">
						انطلاق فعاليات الجلسة الأولى الساعة 9:30 صباحاً
					</p>
				</div>
				<div className="space-y-3 sm:space-y-4">
					{scheduleItems.map((item, index) => (
						<div
							key={index}
							className="bg-white rounded shadow overflow-hidden"
						>
							<div className="flex flex-col sm:flex-row">
								<div className="bg-[#0B1F47] text-white flex flex-col justify-center items-center p-3 sm:p-4 sm:w-40">
									<span className="text-sm sm:text-base">
										{item.time}
									</span>
									{item.duration && (
										<span className="text-xs sm:text-sm mt-1 sm:mt-2">
											{item.duration}
										</span>
									)}
								</div>
								<div className="flex-1 p-3 sm:p-4">
									<h3 className="text-lg sm:text-xl text-[#1a3c40]">
										{item.title}
									</h3>
									{item.lectures && (
										<ul className="mt-2 list-disc list-inside">
											{item.lectures.map((lecture, i) => (
												<li
													key={i}
													className="text-sm sm:text-base lg:text-lg text-gray-700 mb-1"
												>
													{lecture.title}
												</li>
											))}
										</ul>
									)}
									{item.chair && (
										<p className="mt-2 text-sm sm:text-base lg:text-lg text-gray-700">
											{item.chair}
										</p>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
				<div className="mt-8 sm:mt-12">
					<h3 className="text-xl sm:text-2xl text-[#1a3c40] text-center mb-3 sm:mb-4">
						على هامش الملتقى
					</h3>
					<div className="space-y-3 sm:space-y-4">
						{sidelineItems.map((item, index) => (
							<Link
								key={index}
								href={item.href}
								className="bg-white rounded shadow overflow-hidden p-3 sm:p-4 text-center"
							>
								<h3 className="text-lg sm:text-xl text-[#1a3c40]">
									{item.title}
								</h3>
							</Link>
						))}
					</div>
				</div>
				<p className="text-center text-gray-600 pt-4 sm:pt-6 text-base sm:text-lg lg:text-xl">
					ختام الملتقى بعد التبرك بوجبة الغداء ، انطلاق السيارات التي
					تقل ضيوف المحافظات البعيدة إلى مكان استراحتهم في كربلاء
					المقدسة
				</p>
			</div>
		</section>
	)
}

export default function page() {
	return (
		<div className="bg-gray-100 text-gray-800 rtl">
			<Hero />
			<AboutSection />
			<ObjectivesSection />
			<SpeakersSection />
			<ScheduleSection />
		</div>
	)
}
