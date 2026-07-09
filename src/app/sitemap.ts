import { MetadataRoute } from "next"

import postsData from "@/data/posts.json" with { type: "json" }
import booksData from "@/data/books.json" with  { type: "json" }
import imamzainLifeData from "@/data/imamzain.json" with  { type: "json" }
import alSahifaData from "@/data/imamzain-legacy/al-sahifa.json" with { type: "json" }
import risalatAlHuqoqData from "@/data/imamzain-legacy/risalat-al-huqoq.json" with  { type: "json" }

import { Post } from "@/types/post"
import { Book } from "@/types/book"
import { imamzainLife } from "@/types/imamzain-life"
import { Dictionary } from "@/types/imamzain-legacy"

const BASE_URL = "https://www.imamzain.org"

function createSitemapEntry(
	url: string,
	lastModified: Date = new Date(),
	changeFrequency:
		| "always"
		| "hourly"
		| "daily"
		| "weekly"
		| "monthly"
		| "yearly"
		| "never" = "monthly",
	priority: number = 0.5,
): MetadataRoute.Sitemap[0] {
	return {
		url: `${BASE_URL}${url}`,
		lastModified,
		changeFrequency,
		priority,
	}
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [posts, books, imamzainLife, alSahifa, risalatAlHuqoq] = [
		postsData,
		booksData,
		imamzainLifeData,
		alSahifaData,
		risalatAlHuqoqData,
	] as [Post[], Book[], imamzainLife[], Dictionary[], Dictionary[]]

	const staticRoutes: MetadataRoute.Sitemap = [
		createSitemapEntry("/", new Date(), "daily", 1.0),

		createSitemapEntry("/about", new Date(), "monthly", 0.8),
		createSitemapEntry(
			"/about/vision-and-goals",
			new Date(),
			"monthly",
			0.7,
		),

		createSitemapEntry("/contests", new Date(), "weekly", 0.8),
		createSitemapEntry("/contests/khat", new Date(), "weekly", 0.9),
		createSitemapEntry(
			"/contests/khat/president-goals",
			new Date(),
			"monthly",
			0.5,
		),
		createSitemapEntry("/contests/kitab", new Date(), "weekly", 0.8),

		createSitemapEntry("/news", new Date(), "daily", 0.9),
		createSitemapEntry("/news/archives", new Date(), "daily", 0.7),

		createSitemapEntry("/applications", new Date(), "monthly", 0.8),
		createSitemapEntry(
			"/applications/maarif-al-sajjad/privacy-policy",
			new Date(),
			"yearly",
			0.3,
		),

		createSitemapEntry("/his-life", new Date(), "monthly", 0.8),

		createSitemapEntry("/library", new Date(), "weekly", 0.9),

		createSitemapEntry("/media/images", new Date(), "weekly", 0.6),
		createSitemapEntry("/media/videos", new Date(), "weekly", 0.7),

		createSitemapEntry("/publications", new Date(), "weekly", 0.8),

		createSitemapEntry("/research", new Date(), "monthly", 0.7),
		createSitemapEntry(
			"/research/scientific-platform",
			new Date(),
			"monthly",
			0.6,
		),
		createSitemapEntry(
			"/research/send-research",
			new Date(),
			"monthly",
			0.6,
		),

		createSitemapEntry("/services", new Date(), "monthly", 0.7),
		createSitemapEntry("/services/stores", new Date(), "monthly", 0.6),

		createSitemapEntry("/visitation", new Date(), "monthly", 0.7),

		createSitemapEntry("/baqi-gathering", new Date(), "yearly", 0.5),
	]

	const newsRoutes: MetadataRoute.Sitemap = posts.map((post) =>
		createSitemapEntry(
			`/news/${post.slug}`,
			post.last_update ? new Date(post.last_update) : new Date(),
			"monthly",
			0.7,
		),
	)

	const bookRoutes: MetadataRoute.Sitemap = books.map((book) =>
		createSitemapEntry(
			`/library/books/${book.slug}`,
			new Date(),
			"monthly",
			0.6,
		),
	)

	const imamLifeRoutes: MetadataRoute.Sitemap = imamzainLife.map((section) =>
		createSitemapEntry(
			`/his-life/${section.slug}`,
			new Date(),
			"monthly",
			0.7,
		),
	)

	const risalatHuqoqRoutes: MetadataRoute.Sitemap = risalatAlHuqoq.flatMap(
		(dictionary) =>
			dictionary.subjects.map((subject) =>
				createSitemapEntry(
					`/library/risalat-al-huqoq/${dictionary.slug}/${subject.slug}`,
					new Date(),
					"monthly",
					0.6,
				),
			),
	)

	const alSahifaRoutes: MetadataRoute.Sitemap = alSahifa.flatMap(
		(dictionary) =>
			dictionary.subjects.map((subject) =>
				createSitemapEntry(
					`/library/al-sahifa/${dictionary.slug}/${subject.slug}`,
					new Date(),
					"monthly",
					0.6,
				),
			),
	)

	const publicationRoutes: MetadataRoute.Sitemap = books
		.filter((book) => book.slug)
		.map((book) =>
			createSitemapEntry(
				`/publications/${book.slug}`,
				new Date(),
				"monthly",
				0.6,
			),
		)

	return [
		...staticRoutes,
		...newsRoutes,
		...bookRoutes,
		...imamLifeRoutes,
		...risalatHuqoqRoutes,
		...alSahifaRoutes,
		...publicationRoutes,
	]
}
