/**
 * Collection Configuration Interface
 *
 * This defines all the metadata and behavior for each collection (al-sahifa, risalat-al-huqoq, etc.)
 * Instead of hardcoding collection-specific logic in multiple files, we centralize it here.
 */
export interface CollectionConfig {
	// Unique identifier used in URLs: /library/[slug]
	slug: string

	// Display title shown in hero and breadcrumbs
	title: string
	description: string

	// Category filter used to fetch books from books.json
	category: string

	// Optional: Custom hero background image
	heroImage?: string

	// Optional: Link to "Browse/Read" the collection
	readPath: string

	// Optional: Link to download full PDF
	pdfDownload?: string

	// Optional: Additional card sections (like "ما الحق بالصحيفة")
	additionalSections?: Array<{
		title: string
		items: Array<{
			title: string
			url: string
			description?: string
		}>
	}>

	// Optional: Introduction text for the read layout
	introText?: string

	// Optional: Default dictionary to redirect to
	defaultDictionary?: string
}

export const collections: Record<string, CollectionConfig> = {
	"al-sahifa": {
		slug: "al-sahifa",
		title: "الصحيفة السجادية",
		description:
			"مجموعة من الأدعية والمناجيات للإمام زين العابدين، تجسد أسمى معاني الإيمان والخشوع.",
		category: "al-sahifa",
		readPath: "/library/al-sahifa/al-sahifa-al-sajjadiya-index",
		pdfDownload: "/books/الصحيفة رقعي.pdf",
		defaultDictionary: "al-sahifa-al-sajjadiya-index",
		additionalSections: [
			{
				title: "ما الحق بالصحيفة السجادية",
				items: [
					{
						title: "ما الحقه الحر العاملي",
						url: "/library/al-sahifa/appendix-by-al-hurr-al-amili",
					},
					{
						title: "ما ألحقه الميرزا عبد الله الافندي",
						url: "/library/al-sahifa/appendix-by-mirza-abdullah-al-afandi",
					},
					{
						title: "ما ألحقه الميرزا حسين النوري",
						url: "/library/al-sahifa/appendix-by-al-mirza-husayn-al-nuri",
					},
					{
						title: "ما ألحقه السيد محسن الأمين العاملي",
						url: "/library/al-sahifa/appendix-by-muhsin-al-ameen-al-amili",
					},
					{
						title: "مناجيات الإمام",
						url: "/library/al-sahifa/imam-monologues",
					},
					{
						title: "أدعية أيام الاسبوع",
						url: "/library/al-sahifa/daily-supplications",
					},
				],
			},
		],
		introText: `الصحيفة السجادية هو كتابٌ يضمُّ مجموعةً كبيرةً من الأدعية للإمام علي بن الحسين المُلَقَّبِ بالسجاد وزين العابدين. هي الصحيفة الاولى التي يرجع سندها إلى الإمام زين العابدين (عليه السلام)... والتي خصها الأصحاب بالذكر في إجازاتهم واهتموا براويتها منذ القديم وتوارث ذلك الخلف عن السلف وطبقة عن طبقة، وتنتهي روايتها إلى الإمام الباقر وزيد الشهيد إبني الإمام زين العابدين.`,
	},
	"risalat-al-huqoq": {
		slug: "risalat-al-huqoq",
		title: "رسالة الحقوق",
		description:
			"تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري، وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً بالإنسان وحقوقه كلّها وتشتمل على شبكة علاقات الإنسان الثلاثة، مع ربِّه ونفسِه ومجتمعه.",
		category: "risalat-al-huqoq",
		readPath: "/library/risalat-al-huqoq/introduction",
		defaultDictionary: "introduction",
		introText: `هذه الرسالة تعتبر أوّل رسالة قانونية جامعة دوّنت في التأريخ البشري، وهي من الذخائر النفيسة الذي ترتبط ارتباطاً وثيقاً بالإنسان وحقوقه كلّها وتشتمل على شبكة علاقات الإنسان الثلاثة، مع ربِّه ونفسِه ومجتمعه.وترسم حدود العلائق والواجبات بين الإنسان وجميع ما يحيط به. ويقول الأديب باقر شريف القرشي، حول هذه الرسالة: «من المؤّلفات المهمّة في دنيا الإسلام» رسالة الحقوق «للإمام زين العابدين، فقد وضعت المناهج الحيّة لسلوك الإنسان، وتطوير حياته، وبناء حضارته، على أسس تتوافر فيها جميع عوامل الاستقرار النّفسي.`,
	},
}

export function getCollectionConfig(slug: string): CollectionConfig | null {
	return collections[slug] || null
}

/**
 * Get all collection slugs for static generation
 */
export function getAllCollectionSlugs(): string[] {
	return Object.keys(collections)
}
