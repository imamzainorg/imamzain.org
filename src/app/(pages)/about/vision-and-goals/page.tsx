
"use client"
import Breadcrumbs from "@/components/breadcrumb"
import Image from "next/image"
import { motion } from "framer-motion"

export default function VisionAndGoals() {
  type Section = {
    id: string
    title: string
    isList?: boolean
    content: string[]
  }

  const sections = [
    {
      id: "vision",
      title: "رؤية المؤسسة",
      content: [
        "انطلاقاً من العمق الديني والعلمي والاجتماعي لأهل بيت النبوة وأنوار الهداية الإلهية (عليهم السلام جميعاً) ، وسعياً الى تعريف المجتمع الإنساني بمآثر العترة الطاهرة لنبي الرحمة (صلى الله عليه وعليهم أجمعين) ، وإظهاراً لمظلومية الأئمة الطاهرين وخصوصا أئمة البقيع (عليهم السلام)، وما مورس في حقهم من إجحاف وتنكر وتغييب والحال أنهم أهل المدينة وسادتها وهم ورثة جدهم النبي الاكرم نسباً وعلماً ومكانةً وسؤدداً فلقد اهتم المؤمنون-جزاهم الله خيراً-قديماً وحديثاً بمحاولات كثيرة لنشر فكر أئمة البقيع وفقههم والعمل على الفات الانظار الى سمو مرتبتهم (عليهم السلام) وجلالة قدرهم في الإسلام فجزى الله العاملين كل خير.",
        "ولكن لا شك أن هناك ما لابد من تسليط الضوء عليه استجابة لمتطلبات ما يعيشه المجتمع الإسلامي من فقدان للهوية وارباكٍ فكري وتأزم أخلاقي وتفككٍ إجتماعي مما دعا الى إيجاد خطاب متوازنٍ وإبرازٍ هادفٍ للحقيقةِ التي يحاول الطغاة التعمية عليها وتزييفها وشحن النفوس والعقول بالأباطيل والشبهات والأكاذيب.",
        "ومن خلال تلك الجهود المشكورة للعاملين في الساحة العلمية والفكرية والثقافية، وتجسيداً لتوجيهات ونصائح المرجع الأعلى للطائفة الشيعية سماحة آية الله العظمى السيد علي الحسيني السيستاني (دام ظله الوارف) والتي ركز فيها سماحته على الاستفادة من الصحيفة السجادية بالإضافة الى القرآن الكريم ونهج البلاغة حيث قال سماحته:",
        "وينبغي للمرء أن يأنس بكتب ثلاثة يتزود منها بالتأمّل والتفكير : القرآن الكريم... ونهج البلاغة... والصحيفة السجادية؛ فإنها تتضمّن أدعيةً بليغة تستمد مَضامينَها من القرآنِ الكريمِ وفيها تعليم لما ينبغي أن يكون عليه الإنسان من توجهات وهواجس ورؤى وطموح، وبيان لكيفية محاسبته لنفسه ونقده لها ومكاشفتها بخباياها وأسرارها ، ولا سيما دعاء مكارم الأخلاق منها .",
        "انبثقت فكرة تأسيس مؤسسة تعنى بتراث الامام السجاد (عليه السلام) بحثاً ودراسةً وتحقيقاً وممارسةً ميدانيةً طلباً لترسيخ علمِ وفكرِ وثقافةِ أهلِ البيتِ (عليهم جميعا سلام الله) في مجتمعاتنا المتعطشة لأخذ الحقيقة الناصعة من منابعها الصافية.",
        "ومن أولئك الذين يسعون دائما - باذلين الوسع بحسب الإمكانات المتاحة - لنصرة المذهب الحق وإعلاء الراية الأحق سماحة المتولي الشرعي للعتبة الحسينية المقدسة جناب الشيخ عبد المهدي الكربلائي (دامت بركاته) الذي كانت له فضيلة المبادرة لتأسيس هذه المؤسسة المباركة، حيث التقى طلبه الكريم مع همٍ طالما حملناه في قلوبنا وعقولنا لإحياء تراث الامام السجاد (عليه السلام).",
        "فنسأل الحق تعالى أن يوفق الجميع لخدمة دين رب العالمين وشريعة سيد المرسلين والسادة النجباء من آل طه ويس عليهم صلوات المصلين وتسليم المسلمين، وآخر دعوانا أن الحمد لله رب العالمين.",
        "رؤية المؤسسة: الريادة والتميز في إيصال علوم الامام السجاد (عليه السلام) إلى الباحثين والنخب والتعريف به وبأصحابه وبعلماء المدينة المنورة وأدوارهم في نصرة الحق والحقيقة .",
      ],
    },
    {
      id: "message",
      title: "رسالة المؤسسة",
      content: [
        "تحفيز الباحثين والمحققين لإثراء الجانب العلمي والفكري والثقافي المرتبط بالإمام السجاد (عليه السلام) وإشاعة روح التخلق بأخلاقه والالتزام بمبادئه بين أبنائنا في المؤسسات العلمية والنخبوية عبر أعمال وفعاليات علمية وفنية.",
      ],
    },
    {
      id: "goals",
      title: "الهدف من عمل المؤسسة",
      content: [
        "١- تسليط الضوء على ما لم يظهر من آثار الإمام السجاد(عليه السلام ).",
        "٢- بلورة صياغة جديدة وطرح رؤية فكرية شاملة فيما قد مضى العمل عليه مسبقا تتناسب ورؤية المؤسسة.",
        "٣- جعلُ فكر الإمام السجاد(عليه السلام) حاضراً في الأوساط العلمية والنخبوية .",
      ],
    },
    {
      id: "axes",
      title: "محاور عمل المؤسسة",
      isList: true,
      content: [
        "حياة الامام زين العابدين (عليه السلام ) وتراثه الروائي والقرآني والعقائدي تحقيقا وتأليفاً.",
        "الاهتمام البالغ بالصحيفة السجادية ورسالة الحقوق-على وجه الخصوص-وكل إثره(عليه السلام) بحثاً ودراسةً وتفعيلها اجتماعياً وأكاديمياً.",
        "حياة أصحابهم الميامين ودورهم في حفظ الهوية الدينية.",
        "واقع المدينة المنورة كونها منطلقاً للنواة الأولى للتشيع ومهدَ الفكر الإسلامي الأصيل .",
        "حياة علماء الشيعة في المدينة المنورة وما جاورها.",
        "فهرَس مؤلفات الشيعة في تلك الديار.",
        "فهرَس المخطوطات والعمل على تحقيقها وطبعها.",
        "إصدار مجلة تراثية علمية متخصصة تتناول المحاور السابقة.",
        "إنشاء مكتبة تخصصية في الإمام السجاد (عليه السلام ) .",
      ],
    },
    {
      id: "targets",
      title: "الجهات المستهدفة",
      content: [
        "طلبة العلوم الدينية.",
        "الباحثون والمتخصصون من الأكاديميين.",
        "الباحثون عن المعرفة.",
      ],
    },
  ]

  const SectionTitle = ({ title }: { title: string }) => (
	<h2 className="text-2xl font-bold mb-4 text-primary dark:text-Muharram_primary border-b-3 border-secondary dark:border-Muharram_secondary  inline-block pb-2">
	{title}
  </h2>
    
  )

  const TextParagraph = ({ text }: { text: string }) => (
    <p className="mb-4 text-justify text-gray-700 leading-relaxed">{text}</p>
  )

  const renderSectionContent = (section: Section) => {
    if (section.isList) {
      return (
        <ul className="list-disc pr-5 space-y-2">
          {section.content.map((item, index) => (
            <li key={index} className="mb-2 text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      )
    }

    return section.content.map((paragraph, index) => (
      <TextParagraph key={index} text={paragraph} />
    ))
  }

  return (
    <div className="max-w-5xl  mx-auto px-4 py-10">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "حول المؤسسة", url: "/about" },
          { name: "الرؤية والرسالة", url: "#" },
        ]}
        className="mb-8"
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full mb-12 border border-primary/30 rounded-lg overflow-hidden"
      >
        <div   	className="w-full rounded-xl aspect-[1/1] md:aspect-[16/6] object-cover object-right md:object-[center_-80px]"
		>
          <Image
            src="/images/about-vision-min.jpg"
            alt="Vision Banner"
            fill
            priority
        	className="w-full rounded-xl aspect-[1/1] md:aspect-[16/6] object-cover object-right md:object-[center_-80px]"
				  />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 flex items-center justify-center"
          >
    
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.2 }}
        className="space-y-10 mb-12 p-0 w-full "
      >
        {sections.map((section) => (
          <motion.section
            key={section.id}
            id={section.id}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg scroll-mt-64 shadow-md"
          >
            <SectionTitle title={section.title} />
            <div className="space-y-4">{renderSectionContent(section)}</div>
          </motion.section>
        ))}
      </motion.div>
    </div>
  )
}
