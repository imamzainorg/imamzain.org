import { Book, Post } from "./definitions"

export const publications: Book[] = [
	{
		id: 1,
		slug: "al-faraid-al-tarifa",

		title: "الفرائد الطريفة في شرح الصحيفة الشريفة",
		author: "العلامة الشيخ محمد باقر المجلسي",
		otherNames: [],
		printHouse: "مؤسسة الإمام زين العبادين (ع) للبحوث والدراسات",
		printDate: new Date("2024-6-1"),
		language: "العربية",
		pages: 398,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/books/الفرائد الطريفة في شرح الصحيفة الشريفة.jpg",
		pdf: "/books/الفرائد الطريفة في شرح الصحيفة الشريفة.pdf",
	},
	{
		id: 2,
		slug: "al-fawaid-al-sharifa-part-1",

		title: "الفوائد الشريفة في شرح الصحيفة - الجزء الاول",
		author: "العلامة الشيخ تقي الدين بن علي الكفعمي",
		otherNames: [],
		printHouse: "مؤسسة الإمام زين العبادين (ع) للبحوث والدراسات",
		printDate: new Date("2024-6-1"),
		language: "العربية",
		pages: 463,
		parts: 2,

		views: Math.floor(Math.random() * 100),
		image: "/books/الفوائد الشريفة في شرح الصحيفة - الجزء الاول.jpg",
		pdf: "/books/الفوائد الشريفة في شرح الصحيفة - الجزء الاول.pdf",
	},
	{
		id: 6,
		slug: "al-fawaid-al-sharifa-part-2",

		title: "الفوائد الشريفة في شرح الصحيفة - الجزء الثاني",
		author: "العلامة الشيخ تقي الدين بن علي الكفعمي",
		otherNames: [],
		printHouse: "مؤسسة الإمام زين العبادين (ع) للبحوث والدراسات",
		printDate: new Date("2024-6-1"),
		language: "العربية",
		pages: 462,
		parts: 2,

		views: Math.floor(Math.random() * 100),
		image: "/books/الفوائد الشريفة في شرح الصحيفة - الجزء الثاني.jpg",
		pdf: "/books/الفوائد الشريفة في شرح الصحيفة - الجزء الثاني.pdf",
	},
	{
		id: 3,
		slug: "riadh-al-salqeen",

		title: "فوائد رياض السالكين",
		author: "العلامة السيد علي خان المدني الحسيني",
		otherNames: [],
		printHouse: "مؤسسة الإمام زين العبادين (ع) للبحوث والدراسات",
		printDate: new Date("2024-6-1"),
		language: "العربية",
		pages: 254,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/books/فوائد رياض السالكين.jpg",
		pdf: "/books/فوائد رياض السالكين.pdf",
	},
	{
		id: 4,
		slug: "al-sharh-al-kabeer",

		title: "الشرح الكبير",
		author: "السيد نعمة الله الجزائرِي",
		otherNames: [],
		printHouse: "مؤسسة الإمام زين العبادين (ع) للبحوث والدراسات",
		printDate: new Date("2024-6-1"),
		language: "العربية",
		pages: 526,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/books/الشرح الكبير.jpg",
		pdf: "/books/الشرح الكبير.pdf",
	},
	{
		id: 5,
		slug: "sirah-al-imam-al-sajad",

		title: "سيرة الإمام السجاد",
		author: "الشيخ على الكوراني العاملي",
		otherNames: [],
		printHouse: "مؤسسة الإمام زين العبادين (ع) للبحوث والدراسات",
		printDate: new Date("2024-6-1"),
		language: "العربية",
		pages: 589,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/books/سيرة الامام السجاد.jpg",
		pdf: "/books/سيرة الامام السجاد.pdf",
	},
]

export const libraryBooks: Book[] = [
	{
		id: 1,
		slug: "asaleeb-al-islahat-al-ijtimaieh",

		title: "أساليب الإصلاحات الإجتماعية عند الإمام السجّاد (ع)",
		author: "السيد محسن الجلالي",
		otherNames: [],
		printHouse: "العتبة الحسينية المقدسة",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 377,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/أساليب الإصلاحات الإجتماعية عند الإمام السجّاد (ع) - السيد محسن الجلالي.jpg",
		pdf: "/library/أساليب الإصلاحات الإجتماعية عند الإمام السجّاد (ع) - السيد محسن الجلالي.pdf",
	},
	{
		id: 2,
		slug: "al-imam-al-rabie-ali-bin-al-hussein",

		title: "الامام الرابع علي بن الحسين زين العابدين ع",
		author: "لجنة التحرير في طريق الحق",
		otherNames: [],
		printHouse: "مؤسسة في طريق الحق",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 52,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/الامام الرابع علي بن الحسين زين العابدين ع.jpg",
		pdf: "/library/الامام الرابع علي بن الحسين زين العابدين ع.pdf",
	},
	{
		id: 3,
		slug: "al-imam-al-sajjad-wa-al-mafahim-al-tarbia",

		title: "الامام السجاد ع والمفاهيم التربوية",
		author: "قسم الشؤون الفكرية",
		otherNames: [],
		printHouse: "العتبة الكاظمية المقدسة",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 46,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/الامام السجاد ع والمفاهيم التربوية.jpg",
		pdf: "/library/الامام السجاد ع والمفاهيم التربوية.pdf",
	},
	{
		id: 4,
		slug: "al-imam-al-sajjad-wa-bina-al-insan",

		title: "الامام السجاد وبناء الانسان",
		author: "عبد الله احمد اليوسف",
		otherNames: [],
		printHouse: "أطياف للنشر",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 68,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/الامام السجاد وبناء الانسان.jpg",
		pdf: "/library/الامام السجاد وبناء الانسان.pdf",
	},
	{
		id: 5,
		slug: "al-imam-al-sajjad-wa-bina-al-insan",

		title: "الامام زين العابدين داعية الوعي ومحير الطغاة",
		author: "السيد راضي الحسيني",
		otherNames: [],
		printHouse: "المجمع العالمي لأهل البيت",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 69,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/الامام زين العابدين داعية الوعي ومحير الطغاة.jpg",
		pdf: "/library/الامام زين العابدين داعية الوعي ومحير الطغاة.pdf",
	},
	{
		id: 6,
		slug: "al-tahfah-al-radiyah-lil-sahifah-al-sajadiyah",

		title: "الفرائد الطريفة في شرح الصحيفة الشريفة",
		author: "محمد باقر المجلسي",
		otherNames: ["السيد مهدي الرجائي"],
		printHouse: "مؤسسة الأمام زين العابدين للدراسات والبحوث",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 375,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/الفرائد الطريفة في شرح الصحيفة الشريفة (تحقيق السيد مهدي الرجائي).jpg",
		pdf: "/library/الفرائد الطريفة في شرح الصحيفة الشريفة (تحقيق السيد مهدي الرجائي).pdf",
	},
	{
		id: 7,
		slug: "al-tahfah-al-radiyah-lil-sahifah-al-sajadiyah",

		title: "الصحيفة السجادية الدراسة السندية الببليوغرافيا النص",
		author: "محمد باقر المجلسي بتحقيق مهدي الرجائي",
		otherNames: [],
		printHouse: "مؤسسة الأمام زين العابدين للدراسات والبحوث",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 375,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/الموسوعة السجادية - الصحيفة السجادية الدراسة السندية الببليوغرافيا النص ج3.jpg",
		pdf: "/library/الموسوعة السجادية - الصحيفة السجادية الدراسة السندية الببليوغرافيا النص ج3.pdf",
	},
	{
		id: 8,
		slug: "al-tahfah-al-radiyah-lil-sahifah-al-sajadiyah",

		title: "التحفة الرضوية للصحيفة السجادية",
		author: "قاضي بن كاشف الدين اليزدي",
		otherNames: [],
		printHouse: "مركزابحاث باقر العلوم ع",
		printDate: new Date("2024-7-1"),
		language: "العربية",
		pages: 272,
		parts: 1,

		views: Math.floor(Math.random() * 100),
		image: "/library/التحفة الرضوية للصحيفة السجادية.jpg",
		pdf: "/library/التحفة الرضوية للصحيفة السجادية.pdf",
	},
]

export const newsPosts: Post[] = [
	{
		id: 7,
		slug: "first-consultative-forum-husseini-orators",
		image: "/news/first-consultative-forum-husseini-orators.jpg",
		title: "مؤسسة الإمام زين العابدين (ع) تعقد ملتقى تشاوريًا مع نخبة من خطباء المنبر الحسيني",
		summary:
			"مؤسسة الإمام زين العابدين (ع) تعقد ملتقى تشاوريًا مع نخبة من خطباء المنبر الحسيني.",
		body: {
			lede: "عقدت مؤسسة الإمام زين العابدين (عليه السلام) الملتقى التشاوري الأول مع نخبة من خطباء المنبر الحسيني في النجف الأشرف، بحضور سماحة الشيخ عبد المهدي الكربلائي.",
			content:
				"ناقش الملتقى سبل الارتقاء بالخطاب الفكري والثقافي للمنبر الحسيني، مع التركيز على سيرة وتراث أئمة أهل البيت عليهم السلام، وخاصة الإمام السجاد (عليه السلام).",
			tail: "تم التأكيد على أهمية تعزيز الخطاب الفكري والثقافي للمنبر الحسيني، والاهتمام بسيرة وتراث أئمة أهل البيت عليهم السلام.",
		},
		views: Math.floor(Math.random() * 100),
		date: new Date("2025-1-7"),
		last_update: new Date("2025-1-7"),
		category: "لقاءات",
	},
	{
		id: 3,
		slug: "conference-prep-visit",
		image: "/news/conference-prep-visit-1.jpg",
		title: "زيارة جامعة واسط للتحضير للمؤتمر",
		summary:
			"زيارة تهدف للتعاون مع جامعة واسط لتنظيم المؤتمر العلمي الأول للمؤسسة.",
		body: {
			lede: "زار وفد من مؤسسة الإمام زين العابدين جامعة واسط لمناقشة سبل التعاون لتنظيم المؤتمر العلمي الأول.",
			content:
				"استعرض الوفد رؤية المؤسسة ومحاور المؤتمر، وتم تبادل الدروع التقديرية تأكيداً للعلاقات البناءة بين الطرفين.",
			tail: "تشكل هذه الشراكة خطوة مهمة نحو إنجاح المؤتمر وتعزيز البحث العلمي المشترك.",
		},
		views: Math.floor(Math.random() * 100),
		date: new Date("2024-2-21"),
		last_update: new Date("2024-2-21"),
		category: "مؤتمرات",
	},
	{
		id: 2,
		slug: "yemeni-scholars-visit",
		image: "/news/yemeni-scholars-visit-1.jpg",
		title: "وفد علمائي يمني يزور المؤسسة",
		summary:
			"وفد يمني يطّلع على إنجازات المؤسسة ويبحث التعاون في إحياء المخطوطات التراثية.",
		body: {
			lede: "استقبلت مؤسسة الإمام زين العابدين وفداً علمائياً من اليمن برئاسة السيد محمد عبدالعظيم الحوثي.",
			content:
				"اطلع الوفد على إنجازات المؤسسة في تحقيق تراث الإمام زين العابدين، وتم مناقشة إمكانية التعاون لإحياء المخطوطات التراثية اليمنية.",
			tail: "أشاد الوفد بدور المؤسسة في الحفاظ على التراث الإسلامي، معبرين عن أملهم في تعزيز الشراكة المستقبلية.",
		},
		views: Math.floor(Math.random() * 100),
		date: new Date("2024-5-1"),
		last_update: new Date("2024-2-21"),
		category: "اخبار",
	},
	{
		id: 5,
		slug: "scientific-encyclopedia-project",
		image: "/news/scientific-encyclopedia-project-1.jpg",
		title: "مشروع موسوعة علمية عن تراث الإمام",
		summary:
			"مشروع موسوعي لتوثيق تراث الإمام زين العابدين بمشاركة أكاديميين وباحثين.",
		body: {
			lede: "أطلقت مؤسسة الإمام زين العابدين مشروعاً موسوعياً لتوثيق تراث الإمام زين العابدين.",
			content:
				"يشرف على المشروع الشيخ ستار الجيزاني ويديره الدكتور مصطفى الإبراهيمي، بمشاركة خبراء من الحوزة العلمية وأساتذة الجامعات.",
			tail: "يمثل المشروع إنجازاً علمياً مهماً يعزز البحث في التراث الإسلامي ويحفّز مزيداً من الدراسات المستقبلية.",
		},
		views: Math.floor(Math.random() * 100),
		date: new Date("2024-5-1"),
		last_update: new Date("2024-2-21"),
		category: "لقاءات",
	},
	{
		id: 6,
		slug: "scientific-platform-project",
		image: "/news/scientific-platform-project-1.jpg",
		title: "المنصة العلمية: نقاش فكري متجدد",
		summary:
			"منصة علمية تقدم محاضرات نصف شهرية تعزز النقاشات الأكاديمية حول التراث الإسلامي.",
		body: {
			lede: "أطلقت مؤسسة الإمام زين العابدين مشروع المنصة العلمية لتقديم محاضرات أكاديمية نصف شهرية.",
			content:
				"تقدم المحاضرات باحثون متخصصون من الحوزة العلمية والجامعات، وتهدف إلى تعزيز البحث الأكاديمي وفتح باب النقاش لتطوير الأفكار.",
			tail: "تعد المنصة العلمية مساحة للتبادل الفكري والنقاش المثمر، مما يعزز دور المؤسسة في دعم البحث العلمي.",
		},
		views: Math.floor(Math.random() * 100),
		date: new Date("2024-6-13"),
		last_update: new Date("2024-2-21"),
		category: "ندوات",
	},
	{
		id: 1,
		slug: "strengthen-bonds-meeting",
		image: "/news/institution-meeting-1.jpg",
		title: "لقاء الأحبة يعمّق أواصر المحبة",
		summary:
			"لقاء دوري يهدف لتعزيز العلاقات بين العاملين في المؤسسة ومناقشة المستجدات.",
		body: {
			lede: "عقدت مؤسسة الإمام زين العابدين لقاءً دورياً لتعميق أواصر المحبة ومناقشة مستجدات المشاريع.",
			content:
				"جمع اللقاء العاملين والمنتسبين لمناقشة مستجدات العمل، استعراض المشاريع القائمة، وتوصيل الرسائل الضرورية.",
			tail: "تُظهر هذه اللقاءات أهمية التواصل الدوري في تعزيز الانتماء وروح العمل الجماعي.",
		},
		views: Math.floor(Math.random() * 100),
		date: new Date("2024-7-10"),
		last_update: new Date("2024-2-21"),
		category: "لقاءات",
	},
	{
		id: 4,
		slug: "scientific-committee-meeting",
		image: "/news/scientific-committee-meeting-1.jpg",
		title: "اجتماع اللجنة العلمية للمؤتمر",
		summary:
			"اجتماع اللجنة العلمية لمتابعة تحضيرات المؤتمر وضمان جودة الأبحاث المقدمة.",
		body: {
			lede: "عقدت اللجنة العلمية لمؤتمر الإمام زين العابدين اجتماعاً في مقر المؤسسة.",
			content:
				"تمت مناقشة مستجدات التحضيرات العلمية، تقييم جودة الأبحاث المقدمة، والاهتمام بالجوانب المضمونية والشكلية.",
			tail: "يبرز الاجتماع الالتزام بتحقيق مؤتمر علمي يعكس جودة وتميز البحث الأكاديمي.",
		},
		views: Math.floor(Math.random() * 100),
		date: new Date("2024-7-21"),
		last_update: new Date("2024-2-21"),
		category: "مؤتمرات",
	},
]

export const galleryImages = Array(20).fill("/images/albaqi.jpg")
