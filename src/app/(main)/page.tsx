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
import { FeaturedContest } from "./_components/featured"

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
			<FeaturedContest />
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
						backgroundImage: "url('/images/albaqi.jpg')",
					}}
				>
					<div className="bg-secondary/80 dark:bg-dark-primary text-white py-20">
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
							href: "/library/risalat-al-huqoq/read",
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
