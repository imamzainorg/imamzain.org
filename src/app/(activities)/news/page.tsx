import Link from "next/link";
import Image from "next/image";
import Newsletter from "./_components/newsletter";
import SectionTitle from "@/components/section";
import Breadcrumbs from "@/components/breadcrumb";
import PostCard from "./_components/news-card";
import MeetingsCarousel from "./_components/MeetingsCarousel";
import { dataFetcher } from "@/lib/dataFetcher";
import { Post } from "@/types/post";
import { ChevronRightArrowIcon } from "@/assets/icons/reusable";

export default async function Page() {
  const data = await dataFetcher<Post[]>("posts.json");

  // Foundation-specific content (your institution)

  const activities = data.filter((post) => post.category === "نشاطات");
  const events = data.filter((post) => post.category === "فعاليات");
  const majalis = data.filter((post) => post.category === "مجالس");
  const imamHussainPosts = data.filter(
    (post) => post.category === "العتبة الحسينية"
  );

  // Latest from foundation activities (prioritizing your content)
  const latestFoundationContent = [
    ...activities,
    ...events,
    ...imamHussainPosts,
    ...majalis,
  ]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4">
      {/* Breadcrumbs & Archive Link */}
      <div className="flex flex-row justify-between items-start md:items-end mt-8">
        <Breadcrumbs
          links={[
            { name: "الصفحة الرئيسية", url: "/" },
            { name: "الأخبار", url: "#" },
          ]}
        />
      </div>

      {/* Latest Foundation Activities */}
      {latestFoundationContent.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-x-16 mt-6">
          {/* الخبر الرئيسي */}
          <Link
            href={`/news/${latestFoundationContent[0].slug}`}
            key={latestFoundationContent[0].id}
            className="lg:w-7/12 space-y-6"
          >
            <div className="relative">
              <div
                className="absolute w-7 h-7 -bottom-2.5 right-6 
      bg-[url('/shapes/newsIndicator.svg')] 
      dark:bg-[url('/shapes/newsIndicator_Muharram.svg')] 
      rotate-180 bg-no-repeat"
              ></div>
              <Image
                src={latestFoundationContent[0].image || "/default-image.jpg"}
                width={500}
                height={500}
                alt={latestFoundationContent[0].slug}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="text-xs space-y-2">
              <h2 className="font-bold line-clamp-1 lg:line-clamp-none lg:text-lg">
                {latestFoundationContent[0].title}
              </h2>
              <p className="font-light line-clamp-2 lg:text-base">
                {latestFoundationContent[0].summary}
              </p>
              <p className="font-extralight lg:text-sm">
                {latestFoundationContent[0].date}
              </p>
            </div>
          </Link>

          {/* آخر الأنشطة + زر الأرشيف */}
          <div className="lg:w-4/12 space-y-6">
            <h2 className="text-primary dark:text-Muharram_primary font-bold text-center lg:text-left p-4 text-xl xl:text-2xl">
              آخر أنشطة المؤسسة
            </h2>
            <div className="grid lg:grid-rows-3 gap-4">
              {latestFoundationContent.slice(1).map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>

            {/* زر أرشيف الأخبار */}
            <Link
              href="/news/archives"
              className="flex items-center justify-between w-full py-3 px-6 rounded-xl border-2 border-primary
    dark:border-Muharram_primary text-primary dark:text-Muharram_primary font-semibold text-base
    hover:bg-primary hover:text-white dark:hover:bg-Muharram_primary dark:hover:text-white
    transition-all duration-300"
            >
              أرشيف الأخبار
              <ChevronRightArrowIcon
                className="rotate-180 hover:translate-x-1 transition-all duration-300 w-5 h-5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </div>
      )}

      {/* Academic Activities Highlights */}
      <div className="mt-12">
        <SectionTitle title="الأنشطة" />
        <div className="grid  mt-4">
          {/* Conferences */}
          {activities.length > 0 && (
            <div className="space-y-4">
              <div className="space-y-3 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
                {activities.slice(0, 6).map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Most Read Section */}
      <div className="space-y-5 mt-12">
        <SectionTitle title="فعاليات" />
        <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          <div className="w-full lg:w-7/12 grid grid-cols-1 gap-4">
            {events.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
          <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start">
            <Newsletter />
          </div>
        </div>
      </div>

      {/* Meetings Section */}
      <div className="mt-12">
        <SectionTitle title="مجالس" />
        <MeetingsCarousel meetingsData={data} />
      </div>

      {/* اخبار العتبة الحسينية المقدسة - Repositioned and Resized */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-xl p-4 md:p-6">
        <SectionTitle title="اخبار العتبة الحسينية المقدسة" />
        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-2 mb-4 md:mb-6">
          أخبار مختارة من أنشطة المؤسسة الأم والعتبة المقدسة
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {[...imamHussainPosts]
            .sort((a, b) => b.id - a.id)
            .slice(0, 6)
            .map((post) => (
              <Link href={`/news/${post.slug}`} key={post.id} className="block">
                <div className="rounded-lg overflow-hidden bg-white dark:bg-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-full h-32 sm:h-36 md:h-40">
                    <Image
                      src={post.image || "/default-image.jpg"}
                      alt={post.summary}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2 md:p-3">
                    <h3 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1 md:mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
