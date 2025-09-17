import Link from "next/link";
import Image from "next/image";
import SubscriptionForm from "./_components/subscripition-form";
import SectionTitle from "@/components/section";
import Breadcrumbs from "@/components/breadcrumb";
import PostCard from "./_components/news-card";
import MeetingsCarousel from "./_components/MeetingsCarousel";
import { dataFetcher } from "@/lib/dataFetcher";
import { Post } from "@/types/post";
import { ChevronRightArrowIcon } from "@/assets/icons/reusable";


export default async function Page() {
  const data = await dataFetcher<Post[]>("posts.json");

  // Latest Posts
  const latestData = data.slice(0, 5); // أحدث 5 منشورات
  const mostReadData = data.slice(0, 3); // الأكثر قراءة
  const imamHussainPosts = data.filter(
    (post) => post.category === "العتبة الحسينية"
  );


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
        <div className="mt-4 md:ml-16">
          <Link
            href="/news/archives"
            className="inline-flex items-center px-3 py-1.5 rounded-xl bg-primary dark:bg-Muharram_primary text-white text-sm font-semibold hover:bg-primary/90 dark:hover:bg-Muharram_primary/90 transition-colors"
          >
            ارشيف الاخبار
            <ChevronRightArrowIcon
              className="rotate-180 ml-1 p-1"
              stroke="#ffffff"
              strokeWidth={0.5}
              fill="#ffffff"
            />
          </Link>
        </div>
      </div>

      {/* Latest Posts Section */}
      {latestData.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-x-16 mt-6">
          {/* أول منشور كبير */}
          <Link
            href={`/news/${latestData[0].slug}`}
            key={latestData[0].id}
            className="lg:w-7/12 space-y-6"
          >
            <div className="relative">
              <div className="absolute w-7 h-7 -bottom-2.5 right-6 bg-[url('/shapes/newsIndicator.svg')] dark:bg-[url('/shapes/newsIndicator_Muharram.svg')] rotate-180 bg-no-repeat"></div>
              <Image
                src={latestData[0].image || "/default-image.jpg"}
                width={500}
                height={500}
                alt={latestData[0].slug}
                className="w-full h-full rounded-xl object-cover"
              />
            </div>
            <div className="text-xs space-y-2">
              <h2 className="font-bold line-clamp-1 lg:line-clamp-none lg:text-lg">
                {latestData[0].title}
              </h2>
              <p className="font-light line-clamp-2 lg:text-base">
                {latestData[0].summary}
              </p>
              <p className="font-extralight lg:text-sm">{latestData[0].date}</p>
            </div>
          </Link>

          {/* باقي الأخبار */}
          <div className="lg:w-4/12">
            <h2 className="text-primary dark:text-Muharram_primary font-bold text-center lg:text-left p-4 mb-2 text-xl xl:text-2xl">
              آخر الاخبار
            </h2>
            <div className="grid lg:grid-rows-4 gap-4">
              {latestData.slice(1).map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Most Read Section */}
      <div className="space-y-5 mt-12">
        <SectionTitle title="الاكثر قراءة" />
        <div className="w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-20">
          <div className="w-full lg:w-7/12 grid grid-cols-1 gap-4">
            {mostReadData.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
          <div className="w-5/12 flex flex-col items-center gap-x-8 lg:flex-row">
            <div className="w-[300px] h-[300px] lg:w-[360px] xl:w-[500px] lg:h-[360px] xl:h-[500px] dark:bg-[url('/shapes/ziara-bg_Muharram.svg')] bg-[url('/shapes/ziara-bg.svg')] bg-container rotate-180 bg-center bg-no-repeat flex justify-center items-center text-white relative isolate">
              <div className="absolute w-full h-full bg-[url('/shapes/bg.svg')]" />
              <div className="rotate-180 text-center w-full">
                <span className="md:text-lg lg:text-2xl xl:text-3xl font-semibold tracking-wide">
                  اشترك في
                </span>
                <p className="text-lg mt-8 md:text-2xl lg:text-3xl tracking-wide font-normal">
                  النشرة البريدية الخاصة
                  <br /> بالأعلانات والنشاطات
                </p>
                <SubscriptionForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meetings Section */}
      <div className="mt-12">
		       
        <SectionTitle title="اللقاءات" />

    <div>
         <MeetingsCarousel meetingsData={data} />
    </div>
      </div>

      {/* أخبار العتبة الحسينية */}
      <SectionTitle title="اخبار العتبة الحسينية المقدسة" />
      <div className="mt-4">
        <div className="md:grid md:grid-cols-4 gap-5 p-2">
          {[...imamHussainPosts]
            .sort((a, b) => b.id - a.id)
            .slice(0, 5)
            .map((post, index) => (
              <Link
                href={`/news/${post.slug}`}
                key={post.id}
                className={`${index === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <div className="rounded-xl overflow-hidden">
                  <div className="relative w-full h-full border-4 border-transparent transition-all hover:border-secondary dark:hover:border-Muharram_secondary/80 duration-300 ease-in-out">
                    <Image
                      src={post.image || "/default-image.jpg"}
                      alt={post.summary}
                      width={1500}
                      height={1500}
                      className="w-full h-full object-cover transform duration-300 hover:scale-110"
                    />
                  </div>
                  {index === 0 && (
                    <h2 className="hidden md:block xl:text-2xl text-lg pt-2 pr-3 font-bold text-gray-900">
                      {post.title}
                    </h2>
                  )}
                  <p className="text-lg pr-3 font-medium text-gray-700 mt-2 lg:text-lg mx-auto">
                    {post.summary}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
