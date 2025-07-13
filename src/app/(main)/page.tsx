import Live from "./_components/live"
import Posts from "./_components/posts"
import Publications from "./_components/publications"
import Services from "./_components/services"
import Videos from "./_components/videos"
import TopImage from "./_components/top-image"
import GallerySection from "./_components/gallery"
import Application from "./_components/application"
import { dataFetcher } from "@/lib/dataFetcher"
import { Book } from "@/types/book"
import { Post } from "@/types/post"
import { YouTubePlaylist } from "@/types/youtubeData"
import hadiths from "@/data/hadiths.json"
import AnimatedTextSection from "@/components/animated-text"
import { Featured } from "./_components/featured"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"

const desktopImages = [
	"/images/albaqi.jpg",
	"/images/albaqi-2.png",
	// "/images/hero-3.jpg",
	"/images/hero-4.jpg",
]

const mobileImages = [
	"/images/albaqi.jpg",
	"/images/albaqi-2.png",
	// "/images/hero-3-vertical.jpg",
	"/images/hero-4-vertical.jpg",
]

export default async function page() {
	const publications = await dataFetcher<Book[]>("publications.json")
	const posts = await dataFetcher<Post[]>("posts.json")
	const playlists = await dataFetcher<YouTubePlaylist[]>("youtube.json")

	// Select Proper Hadith Based on Date
	const today = new Date()
	const dayOfMonth = today.getDate()
	const currentHadithIndex = (dayOfMonth - 1) % hadiths.length
	const currentHadith = hadiths[currentHadithIndex]

	return (
		<div className="">
			<TopImage
				desktopImages={desktopImages}
				mobileImages={mobileImages}
				currentHadith={currentHadith}
			/>
			<div className="w-4/5 mx-auto flex justify-between">
				<div className="w-1/4 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
					{/* Contest Image */}
					<div className="relative h-24 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-Muharram_primary dark:to-Muharram_secondary opacity-90 z-10" />
						<Image
							src="/contests/khat/logo.png"
							alt="مسابقة الخط العربي"
							className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							height={200}
							width={400}
						/>
						<div className="w-full h-full text-xl text-white absolute inset-0 flex items-center justify-center z-20">
							مسابقة الخط العربي
						</div>
					</div>

					{/* Contest Content */}
					<div className="p-6 text-center">
						<h3 className="text-xl font-bold text-slate-800 mb-2">
							الوقت المتبقي للمسابقة
						</h3>
						<p className="text-sm text-primary font-medium mb-3">
							32:12:45:29
						</p>

						{/* Action Button */}
						<Link href="/contests/khat">
							<button className="w-full bg-gradient-to-r from-primary to-secondary dark:from-Muharram_primary dark:to-Muharram_secondary text-white text-sm rounded-xl py-2 px-4 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group">
								تفاصيل المسابقة
								<ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
							</button>
						</Link>
					</div>
				</div>
				<div className="w-1/4 bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
					{/* Contest Image */}
					<div className="relative h-24 overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-Muharram_primary dark:to-Muharram_secondary opacity-90 z-10" />
						<Image
							src="/contests/kitab/hero.jpg"
							alt="مسابقة كتاب"
							className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							height={200}
							width={400}
						/>
						<div className="w-full h-full text-xl text-white absolute inset-0 flex items-center justify-center z-20">
							مسابقة كتاب
						</div>
					</div>

					{/* Contest Content */}
					<div className="p-6 text-center">
						<h3 className="text-xl font-bold text-slate-800 mb-2">
							الوقت المتبقي للمسابقة
						</h3>
						<p className="text-sm text-primary font-medium mb-3">
							32:12:45:29
						</p>

						{/* Action Button */}
						<Link href="/contests/kitab">
							<button className="w-full bg-gradient-to-r from-primary to-secondary dark:from-Muharram_primary dark:to-Muharram_secondary text-white text-sm rounded-xl py-2 px-4 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group">
								تفاصيل المسابقة
								<ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
							</button>
						</Link>
					</div>
				</div>
			</div>
			<Featured />
			<div className="container">
				<AnimatedTextSection
					title="رؤية المؤسسة"
					text="
					انطلاقاً من العمق الديني والعلمي والإجتماعي لأهل بيت النبوة
					وأنوار الهداية الإلهية (عليهم السلام جميعاً) ، وسعياً الى
					تعريف المجتمع الإنساني بمآثر العترة الطاهرة لنبي الرحمة (صلى
					الله عليه وعليهم أجمعين) ، وإظهاراً لمظلومية الأئمة الطاهرين
					وخصوصاً أئمة البقيع (عليهم السلام)، وما مورس في حقهم من
					إجحاف وتنكر وتغييب والحال أنهم أهل المدينة وسادتها وهم ورثة
					جدهم النبي الاكرم نسباً وعلماً ومكانةً وسؤدداً فلقد اهتم
					المؤمنون جزاهم الله خيراً قديماً وحديثاً بمحاولات كثيرة لنشر
					فكر أئمة البقيع وفقههم والعمل على إلفات الأنظار الى سمو
					مرتبتهم (عليهم السلام) وجلالة قدرهم في الإسلام فجزى الله
					العاملين كل خير."
					ctaLinks={[
						{
							label: "اهداف المؤسسة",
							href: "/about/vision-and-goals#vision",
						},
						{
							label: "رسالة المؤسسة",
							href: "/about/vision-and-goals#message",
						},
					]}
				/>
			</div>
			<Posts newsPosts={posts} />

			<div className="pt-20 ">
				<div
					className="bg-cover bg-top bg-no-repeat"
					style={{
						backgroundImage: "url('/images/albaqi.jpg') ",
					}}
				>
					<div className="bg-secondary/25 dark:bg-Muharram_secondary/25 backdrop-blur-sm text-white py-20">
						<div className="container">
							<AnimatedTextSection
								title="الإمام زين العابدين (عليه السلام)"
								text='
							الإمام علي بن الحسين (عليه السلام) هو الإمام الرابع
							من سلسلة الأئمة الأطهار (عليهم السلام) من آل بيت
							النبي (صلى الله عليه وآله)، أطل على هذه الدنيا في
							اليوم الخامس من شهر شعبان من سنة 37 أو 38 للهجرة وجه
							نَوْرَانِيٌّ هادئْ ، يحمل سماتٍ من نور الله ، وملامح
							ضاربةٌ في العراقة من أبيه الحسين إلى جده إبراهيم «
							عليهم السلام » ، ومن أمه شاه زنان بنت يزدجرد إلى
							أعلى أعراق الفرس وقدم الإسلام الأصيل للأمة، مقابل
							الإسلام الأموي المشوه وعاصر خلال حياته عدداً من
							الخلفاء الأمويين، أولهم "يزيد بن معاوية"
							لعنة الله عليه، وآخرهم "الوليد بن عبد الملك بن
							مروان" ورحل عن هذه الدنيا في سنة 95 للهجرة بعد
							حياة حافلة بالبذل والعطاء في سبيل إعلاء شأن الرسالة
							وخدمة الأمة الإسلامية.'
								ctaLinks={[
									{
										label: "حياته الكريمة",
										href: "/his-life/birth-and-death",
									},
									{
										label: "تراث الإمام",
										href: "/library",
									},
								]}
								textClassName="leading-7 md:leading-9 lg:leading-10"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<AnimatedTextSection
					title="رسالة الحقوق"
					text="
					رسالة الحقوق منظومة حقوقية دونها الامام زين العابدين ع قبل
					اربعة عشر قرنا ... تمتاز عن غيرها : بالشمولية لجميع الحقوق
					التي جاء بها الاسلام ابتداء من نفس الإنسان وجوارحه وعلاقته
					بخالقه ثم تتوسع شاملة لجميع علاقاته مع ارحامه وجيرانه
					واصدقائه لتشمل خارطة العلاقات الاجتماعة جميعاً. ان مادتها
					مستمدة من الوحي اذ الامام هو حجة الله تعالى وترجمان وحيه.
					تمتاز بالثبات وعدم طرو التغير عليها كما في بقية المدونات
					الحقوقية الوضعية منطلقة من ملاك الحق المشرع بمقتضى الحكمة
					الإلهية بعيداً عن الاهواء والرغبات الشخصية او العرقية او
					الطائفية ومحققة للعدالة الإجتماعية وموجدة للتوازن بين جميع
					مكونات المجتمع الانساني بالغة به حد الامن والسلم المجتمعي
					والحياة الكريمة لو تمت مراعاتها وتطبيقها."
					ctaLinks={[
						{
							label: "شروح رسالة الحقوق",
							href: "/library/risalat-al-huqoq",
						},
						{
							label: "قراءة رسالة الحقوق",
							href: "/library/risalat-al-huqoq/read/introduction",
						},
					]}
				/>
			</div>
			<Services />
			<Publications publications={publications} />
			<Application />
			<GallerySection />
			<Videos playlists={playlists} />
			<Live />
		</div>
	)
}
