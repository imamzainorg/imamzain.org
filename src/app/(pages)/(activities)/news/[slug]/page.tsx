import Image from "next/image"
import Breadcrumbs from "@/components/breadcrumb"
import PostCard from "../_components/news-card"

import {ChevronRightArrowIcon, FacebookIcon, TwitterIcon} from "@/assets/icons/reusable"
import Link from "next/link"
import NewsShare from "../_components/news-share"
import {dataFetcher} from "@/lib/dataFetcher"
import {Post} from "@/types/post"
import SwiperGallery from "../_components/swiper-gallery"

export default async function page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>
}) {
    const slug = (await params).slug

    const data: Post[] = await dataFetcher<Post[]>("posts.json")

    const post = data.filter((item: Post) => item.slug === slug)[0]

    // mimic the data recieved from fetch(https://api.imamzain.org/news/{slug}/related)
    const relatedData = data.slice(0, 3)

    return (
        <div>
            <Breadcrumbs
                links={[
                    {name: "الصفحة الرئيسية", url: "/"},
                    {name: "الأخبار", url: "/news"},
                    {name: post.title, url: "#"},
                ]}
            />
            {/* post title */}
            <div className={"flex flex-col-reverse lg:flex-row justify-between"}>
                <h1 className="p-2 sm:p-4 text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold mb-6">
                    {post.title}
                </h1>
                <Link
                    href={"/news/archives"}
                    className="flex font-semibold gap-2 text-white items-center h-fit w-fit  py-2 px-2 pr-5 max-lg:py-1 rounded-lg bg-primary text-xs sm:text-sm max-lg:self-end"
                >
                    <p className="text-nowrap">ارشيف الاخبار</p>
                    <ChevronRightArrowIcon
                        className="rotate-180 p-1.5 sm:p-1"
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        fill="#ffffff"
                    />
                </Link>
            </div>

            <div className="flex gap-x-10 justify-between flex-wrap">
                {/* post metadata */}
                <div className="space-y-2 lg:w-7/12 relative">
                    <Image
                        src={post.image}
                        width={1000}
                        height={1000}
                        className="w-full rounded-xl object-cover h-full"
                        priority
                        alt={slug}
                    />
                    <div className="w-full absolute -bottom-8 ">
                        <div
                            className="flex justify-between items-start md:items-center lg:items-start text-slate-600 md:text-lg lg:text-base">
                            <div className="flex gap-3 items-center">
                                <div
                                    className="w-2 h-2 md:w-3 md:h-3 bg-[url('/shapes/indicator.svg')] bg-contain bg-no-repeat rotate-180"/>
                                <span className="h-4">{post.date}</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <Link
                                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.imamzain.org/news/${slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FacebookIcon
                                        width={20}
                                        height={20}
                                        fill="black"
                                    />
                                </Link>
                                <Link
                                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.imamzain.org/news/${slug}`)}&text=${encodeURIComponent(`اضغط لقراءة المزيد عن "${post.title}"`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <TwitterIcon width={20} height={20}/>
                                </Link>
                                <div className="w-0.5 h-5 bg-gray-600 "/>
                                <NewsShare slug={slug}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* post content */}
                <div
                    className="text-xl mt-16 lg:mt-24 tracking-tight space-y-6 lg:space-y-3 lg:col-span-2 lg:order-last w-full">
                    <h1 className="">{post.body.lede}</h1>
                    <div
                        className="post-content leading-10"
                        dangerouslySetInnerHTML={{__html: post.body.content}}
                    />
                    <p className="">{post.body.tail}</p>
                </div>

                {/* related data */}

                <div className="lg:w-4/12">
                    <h2 className="text-primary font-bold text-center lg:text-left p-4 mb-2 sm:text-xl xl:text-2xl">
                        مواضيع ذات صلة
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                        {relatedData.map((post) => (
                            <PostCard key={post.id} {...post} />
                        ))}
                    </div>
                </div>
            </div>

            {post.attachments && (
                <div className="pt-20">
                    <SwiperGallery images={post.attachments}/>
                </div>
            )}
        </div>
    )
}
