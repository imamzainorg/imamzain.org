import Breadcrumbs from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { researchAxes } from "./data/researchAxes"
import { rules } from "./data/rules"
import { criteria } from "./data/criteria"
import {
	Award,
	BadgeDollarSign,
	BookCheck,
	ScrollText,
	ShieldCheck,
	Star,
	Trophy,
	Users,
	BookOpen,
	Crown,
} from "lucide-react"
import { EmailIcon } from "@/assets/icons/reusable"

export default function Page() {
	return (
		<div className="min-h-screen backdrop-blur-[0.5px]">
			{/* Breadcrumbs */}
			<div className="px-4 sm:px-6 lg:px-8 pt-6">
				<Breadcrumbs
					links={[
						{ name: "الصفحة الرئيسية", url: "/" },
						{ name: "المسابقات", url: "/contests" },
						{ name: "مسابقة كتاب", url: "#" },
					]}
				/>
			</div>

			{/* Hero Section */}
			<div className="px-4 sm:px-6 lg:px-8 py-12">
				<div className="max-w-7xl mx-auto">
					<div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
						<div className="w-full lg:w-1/2 space-y-8 tracking-tight">
							{/* Badge */}
							<div className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-full text-sm font-medium">
								<Trophy className="w-4 h-4" />
								مسابقة علمية محكمة
							</div>

							<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-right leading-tight">
								مسابقة الكتاب
							</h1>

							<div className="rounded-2xl p-6 sm:p-8 ">
								<div className="space-y-6 text-justify leading-relaxed text-base sm:text-lg text-gray-700">
									<div className="flex  items-start gap-3">
										<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
											<Star className="w-3 h-3 text-primary" />
										</div>
										<div>
											<p className="font-bold text-primary">
												الرؤية:
											</p>
											<p className="mr-4">
												إحياء تراث الامام زين العابدين
												(عليه السلام) عبر حث الباحثين
												على انتاج دراسات رصينة تواكب
												متطلبات العصر وتبرز ابعاد شخصيته
												الفكرية والروحية والاجتماعية
											</p>
										</div>
									</div>

									<div>
										<div className="flex items-center gap-3 mb-4">
											<div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
												<BookOpen className="w-3 h-3 text-green-600" />
											</div>
											<p className="font-bold text-green-900">
												الاهداف:
											</p>
										</div>
										<ol className="list-arabic-indic mr-12 space-y-3 ">
											<li className="hover:text-secondary cursor-cell transition-colors">
												تقديم انتاج علمي مؤصل عن تراث
												الامام عليه السلام
											</li>
											<li className="hover:text-secondary cursor-cell transition-colors">
												تشجيع الباحثين والمفكرين على
												الغوص في شخصية الامام عليه
												السلام وموروثه العلمي
											</li>
											<li className="hover:text-secondary cursor-cell transition-colors">
												اثراء المكتبة الاسلامية بكتاب
												متميز من حيث المنهج والمحتوى
											</li>
											<li className="hover:text-secondary cursor-cell transition-colors">
												ربط الاجيال المعاصرة بالقيم
												العبادية والاجتماعية والفكرية في
												مدرسة الامام (عليه السلام)
											</li>
										</ol>
									</div>
								</div>
							</div>
						</div>

						<div className="w-full lg:w-1/2 flex justify-center sm:translate-y-16">
							<div className="relative group">
								<div className="absolute -inset-4 bg-slate-300 rounded-3xl blur opacity-25"></div>
								<div className="relative bg-white rounded-2xl p-3 shadow-2xl">
									<Image
										className="w-full rounded-xl"
										src={"/contests/kitab/hero.jpg"}
										alt="لوكو مسابقة الكتاب"
										width={600}
										height={600}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Prizes Section */}
		  <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              المحفزات والجوائز
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative bg-gradient-to-b from-white to-gray-50 cursor-pointer rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-8 h-8 border border-primary rounded-full flex items-center justify-center">
                <Crown className="w-4 h-4 text-primary" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <BadgeDollarSign
                    className="w-12 h-12 text-primary"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="font-bold text-primary text-lg">
                  الجائزة الأولى
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  يتم اختيار (3) فائزين ويخصص لكل منهم جائزة بمقدار (2,000,000)
                  دينار عراقي.
                </p>
              </div>
              <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-gray-50 cursor-pointer rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-8 h-8 border border-primary rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-primary" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <Award
                    className="w-12 h-12 text-primary"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="font-bold text-primary text-lg">
                  جائزة التميز
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  يضاف للكتاب المتميز هدية قدرها (500,000) دينار عراقي.
                </p>
              </div>
              <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-gray-50 cursor-pointer rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-8 h-8 border border-primary rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-primary" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <BookCheck
                    className="w-12 h-12 text-primary"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="font-bold text-primary text-lg">
                  النشر والطباعة
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  يتم طبع ونشر الكتب المقبولة على نفقة المؤسسة وتكون حقوق الطبع
                  محفوظة للمؤسسة.
                </p>
              </div>
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>

            <div className="group relative bg-gradient-to-b from-white to-gray-50 cursor-pointer rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-primary/20 overflow-hidden">
              <div className="absolute top-4 right-4 w-8 h-8 border border-primary rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-green-800" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck
                    className="w-12 h-12 text-primary"
                    strokeWidth={1}
                  />
                </div>
                <h3 className="font-bold text-green-800 text-lg">
                  التكريم الرسمي
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  تزويد المشاركين المقبولين والفائزين بما يؤيد ذلك رسمياً.
                </p>
              </div>
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          </div>
        </div>
      </div>

		      {/* Research Axes Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              محاور الكتابة
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              اختر المحور الذي يناسب اختصاصك وابدأ رحلتك البحثية
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAxes.map((axes) => (
              <div
                key={axes.title}
                className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden"
              >
                <div className="relative z-10 text-right">
                  <div className="flex items-center justify-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20`}
                    >
                 {/* الصورة في الوضع العادي (Light) */}
  <Image
    src="/shapes/book_icon.svg"
    width={24}
    height={24}
    alt="pointer"
    className="rotate-90 w-6 h-6 object-contain dark:hidden"
  />

  {/* الصورة في الوضع الداكن (Dark) */}
  <Image
    src="/shapes/book_icon_Muharram.svg"
    width={24}
    height={24}
    alt="pointer-dark"
    className="rotate-90 w-6 h-6 object-contain hidden dark:block"
  />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                      {axes.title}
                    </h3>
                  </div>

                  <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                    <p className="text-gray-600 leading-relaxed">
                      {axes.keywords.map((keyword, keyIndex) => (
                        <span
                          key={keyword}
                          className="inline-block hover:text-secondary transition-colors duration-300 px-1 py-0.5 rounded"
                        >
                          {keyword}
                          {keyIndex < axes.keywords.length - 1 && (
                            <span className="text-gray-400 mx-1">،</span>
                          )}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </div>


			{/* Evaluation Criteria Section */}
			<div className="px-4 sm:px-6 lg:px-8 py-16">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
					آليةالتحكيم
						</h2>
						<div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-sprimaryecondary/80 mx-auto rounded-full"></div>
					</div>

					<div className="bg-gradient-to-r from-white/20 to-white/10 rounded-2xl p-8 mb-8 border border-primary/20">
						<div className="flex items-center justify-center gap-4 mb-4 bg-white/40">
							<Users className="w-8 h-8 text-primary" />
							<h3 className="text-xl sm:text-2xl font-bold text-primary">
								اللجنة العلمية
							</h3>
						</div>
						<p className="text-center text-secondary text-lg font-semibold">
							تضم أساتذة متخصصة علوم القرآن، التاريخ، الفلسفة،
							واللغة.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{criteria.map((criterion, index) => (
							<div
								key={index}
								className="flex items-center gap-4 bg-gray-50/80 rounded-xl p-6 hover:bg-secondary/15 cursor-pointer hover:shadow-md transition-all duration-300 group"
							>
								<div className="p-3 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
									<ScrollText className="text-primary w-6 h-6" />
								</div>
								<span className="text-gray-700 group-hover:text-primary transition-colors text-base sm:text-lg">
									{criterion}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>

      {/* Rules Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              شروط المشاركة
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full"></div>
          </div>

          <div className="rounded-2xl p-8 shadow-lg border border-primary/20 bg-gradient-to-b from-white to-gray-50">
            <ol className="list-arabic-indic text-right space-y-4 pr-8">
              {rules.map((rule, index) => (
                <li
                  key={index}
                  className="leading-relaxed text-gray-700 text-base sm:text-lg cursor-pointer p-3 hover:bg-primary/10 hover:font-semibold rounded-lg transition-all duration-300 border-b border-gray-200 last:border-b-0"
                >
                  {rule}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* Submission Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-white to-primary/5 rounded-3xl p-8 sm:p-12 shadow-2xl border border-primary/20 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/5 rounded-full"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                آلية التقديم
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary/35 to-primary/80 mx-auto rounded-full mb-8"></div>

              <p className="text-gray-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                يمكنكم الانضمام إلى المسابقة من خلال تقديم عملكم عبر البريد
                الإلكتروني
              </p>

              <div className="inline-block">
                <Link
                  href="mailto:kitab@imamzain.org"
                  className="group inline-flex items-center gap-4 bg-gradient-to-l from-secondary to-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg sm:text-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 shadow-md"
                >
                  <div className="p-2 bg-white/20 rounded-full group-hover:bg-white/30 transition-colors">
                    <EmailIcon
                      className="w-6 h-6"
                      fill="#ffffff"
                      stroke="#ffffff"
                    />
                  </div>
                  <span>kitab@imamzain.org</span>
                </Link>
              </div>

              <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}