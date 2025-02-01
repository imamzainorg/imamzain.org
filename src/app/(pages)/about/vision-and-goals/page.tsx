import Breadcrumbs from "@/components/breadcrumb"
import Image from "next/image"

export default function visionandgoals() {
	return (
		<>
			{/* Breadcrumb */}
			<Breadcrumbs
				links={[
					{ name: "الصفحة الرئيسية", url: "/" },
					{ name: "حول المؤسسة", url: "/about" },
					{ name: "الرؤية والرسالة", url: "#" },
				]}
			/>

			<div
				id="vision"
				className="flex justify-center items-center shadow-xl "
			>
				<Image
					src="/images/about-vision.JPG"
					className="w-full rounded-xl aspect-[16/6] object-cover object-[center_-80px]"
					width={1500}
					height={1500}
					priority
					alt="logo"
				/>
			</div>
			<div className="">
				<div className="">
					<h2 className="text-xl xmd:text-2xl font-bold p-3 mt-6 xs:mr-3 md:mr-6 xmd:mr-10 xl:mr-16   ">
						رؤية المؤسسة
					</h2>
				</div>
				<div className="w-11/12 mx-auto space-y-2  ">
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						انطلاقاً من العمق الديني والعلمي والاجتماعي لأهل بيت
						النبوة وأنوار الهداية الإلهية (عليهم السلام جميعاً) ،
						وسعياً الى تعريف المجتمع الإنساني بمآثر العترة الطاهرة
						لنبي الرحمة (صلى الله عليه وعليهم أجمعين) ، وإظهاراً
						لمظلومية الأئمة الطاهرين وخصوصا أئمة البقيع (عليهم
						السلام)، وما مورس في حقهم من إجحاف وتنكر وتغييب والحال
						أنهم أهل المدينة وسادتها وهم ورثة جدهم النبي الاكرم
						نسباً وعلماً ومكانةً وسؤدداً فلقد اهتم المؤمنون-جزاهم
						الله خيراً-قديماً وحديثاً بمحاولات كثيرة لنشر فكر أئمة
						البقيع وفقههم والعمل على الفات الانظار الى سمو مرتبتهم
						(عليهم السلام) وجلالة قدرهم في الإسلام فجزى الله
						العاملين كل خير.
					</p>
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						ولكن لا شك أن هناك ما لابد من تسليط الضوء عليه استجابة
						لمتطلبات ما يعيشه المجتمع الإسلامي من فقدان للهوية
						وارباكٍ فكري وتأزم أخلاقي وتفككٍ إجتماعي مما دعا الى
						إيجاد خطاب متوازنٍ وإبرازٍ هادفٍ للحقيقةِ التي يحاول
						الطغاة التعمية عليها وتزييفها وشحن النفوس والعقول
						بالأباطيل والشبهات والأكاذيب.
					</p>
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						ومن خلال تلك الجهود المشكورة للعاملين في الساحة العلمية
						والفكرية والثقافية، وتجسيداً لتوجيهات ونصائح المرجع
						الأعلى للطائفة الشيعية سماحة آية الله العظمى السيد علي
						الحسيني السيستاني (دام ظله الوارف) والتي ركز فيها سماحته
						على الاستفادة من الصحيفة السجادية بالإضافة الى القرآن
						الكريم ونهج البلاغة حيث قال سماحته:
						<br /> وينبغي للمرء أن يأنس بكتب ثلاثة يتزود منها
						بالتأمّل والتفكير : القرآن الكريم... ونهج البلاغة...
						والصحيفة السجادية؛ فإنها تتضمّن أدعيةً بليغة تستمد
						مَضامينَها من القرآنِ الكريمِ وفيها تعليم لما ينبغي أن
						يكون عليه الإنسان من توجهات وهواجس ورؤى وطموح، وبيان
						لكيفية محاسبته لنفسه ونقده لها ومكاشفتها بخباياها
						وأسرارها ، ولا سيما دعاء مكارم الأخلاق منها .
					</p>
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						انبثقت فكرة تأسيس مؤسسة تعنى بتراث الامام السجاد (عليه
						السلام) بحثاً ودراسةً وتحقيقاً وممارسةً ميدانيةً طلباً
						لترسيخ علمِ وفكرِ وثقافةِ أهلِ البيتِ (عليهم جميعا سلام
						الله) في مجتمعاتنا المتعطشة لأخذ الحقيقة الناصعة من
						منابعها الصافية.
					</p>
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						ومن أولئك الذين يسعون دائما - باذلين الوسع بحسب
						الإمكانات المتاحة - لنصرة المذهب الحق وإعلاء الراية
						الأحق سماحة المتولي الشرعي للعتبة الحسينية المقدسة جناب
						الشيخ عبد المهدي الكربلائي (دامت بركاته) الذي كانت له
						فضيلة المبادرة لتأسيس هذه المؤسسة المباركة، حيث التقى
						طلبه الكريم مع همٍ طالما حملناه في قلوبنا وعقولنا لإحياء
						تراث الامام السجاد (عليه السلام).
					</p>
					<p className="w-11/12 mx-auto text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						فنسأل الحق تعالى أن يوفق الجميع لخدمة دين رب العالمين
						وشريعة سيد المرسلين والسادة النجباء من آل طه ويس عليهم
						صلوات المصلين وتسليم المسلمين، وآخر دعوانا أن الحمد لله
						رب العالمين.
					</p>
					<p
						id="message"
						className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  "
					>
						رؤية المؤسسة: الريادة والتميز في إيصال علوم الامام
						السجاد (عليه السلام) إلى الباحثين والنخب والتعريف به
						وبأصحابه وبعلماء المدينة المنورة وأدوارهم في نصرة الحق
						والحقيقة .
					</p>
					<p className="w-11/12 mx-auto mb-5 text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  "></p>
				</div>
				<div className="">
					<h2 className="text-xl xmd:text-2xl font-bold p-3 mt-6 xs:mr-3 md:mr-6 xmd:mr-10 xl:mr-16   ">
						رسالة المؤسسة
					</h2>
				</div>
				<div className="w-11/12 mx-auto space-y-2  ">
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						تحفيز الباحثين والمحققين لإثراء الجانب العلمي والفكري
						والثقافي المرتبط بالإمام السجاد (عليه السلام) وإشاعة روح
						التخلق بأخلاقه والالتزام بمبادئه بين أبنائنا في المؤسسات
						العلمية والنخبوية عبر أعمال وفعاليات علمية وفنية.
					</p>
				</div>
				<div className="">
					<h2 className="text-xl xmd:text-2xl font-bold p-3 mt-6 xs:mr-3 md:mr-6 xmd:mr-10 xl:mr-16   ">
						الهدف من عمل المؤسسة
					</h2>
				</div>
				<div className="w-11/12 mx-auto space-y-2  ">
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						١- تسليط الضوء على ما لم يظهر من آثار الإمام السجاد(عليه
						السلام ).
						<br />
						٢- بلورة صياغة جديدة وطرح رؤية فكرية شاملة فيما قد مضى
						العمل عليه مسبقا تتناسب والهدف الرئيسي للمؤسسة.
						<br />
						٣- جعلُ فكر الإمام السجاد(عليه السلام) حاضراً في الأوساط
						العلمية والنخبوية .
					</p>
				</div>
				<div className="">
					<h2 className="text-xl xmd:text-2xl font-bold p-3 mt-6 xs:mr-3 md:mr-6 xmd:mr-10 xl:mr-16   ">
						محاور عمل المؤسسة
					</h2>
				</div>
				<div className="w-11/12 mx-auto space-y-2  ">
					<ul className="list-disc w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						<li>
							حياة الامام زين العابدين (عليه السلام ) وتراثه
							الروائي والقرآني والعقائدي تحقيقا وتأليفاً.
						</li>
						<li>
							الاهتمام البالغ بالصحيفة السجادية ورسالة الحقوق-على
							وجه الخصوص-وكل إثره(عليه السلام) بحثاً ودراسةً
							وتفعيلها اجتماعياً وأكاديمياً.
						</li>
						<li>
							حياة أصحابهم الميامين ودورهم في حفظ الهوية الدينية.
						</li>
						<li>
							واقع المدينة المنورة كونها منطلقاً للنواة الأولى
							للتشيع ومهدَ الفكر الإسلامي الأصيل .
						</li>
						<li>
							حياة علماء الشيعة في المدينة المنورة وما جاورها.
						</li>
						<li>فهرَس مؤلفات الشيعة في تلك الديار.</li>
						<li>فهرَس المخطوطات والعمل على تحقيقها وطبعها. </li>
						<li>
							إصدار مجلة تراثية علمية متخصصة تتناول المحاور
							السابقة.
						</li>
						<li>
							إنشاء مكتبة تخصصية في الإمام السجاد (عليه السلام ) .
						</li>
					</ul>
				</div>
				<div className="">
					<h2 className=" text-xl xmd:text-2xl font-bold p-3 mt-6 xs:mr-3 md:mr-6 xmd:mr-10 xl:mr-16   ">
						الجهات المستهدفة
					</h2>
				</div>
				<div className="w-11/12 mx-auto space-y-2  ">
					<p className="w-11/12 mx-auto  text-md sm:text-lg md:text-lg lg:text-xl leading-loose sm:!leading-loose text-justify  ">
						طلبة العلوم الدينية.
						<br />
						الباحثون والمتخصصون من الأكاديميين.
						<br />
						الباحثون عن المعرفة.
					</p>
				</div>
			</div>
		</>
	)
}
