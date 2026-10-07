import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BookPanel from "@/components/book-panel";
import { SectionTitle, outlineButton, solidButton } from "@/components/brand";
import ImamBand from "./_components/imam-band";
import Posts from "./_components/posts";
import Publications from "./_components/publications";
import VisitationSignup from "@/components/visitation-signup";
import TopImage from "./_components/top-image";
import Vision from "./_components/vision";
import { dataFetcher } from "@/lib/dataFetcher";
import { Book } from "@/types/book";
import { Post } from "@/types/post";
import { YouTubePlaylist } from "@/types/youtube-data";
import hadiths from "@/data/hadiths.json";
import { getSliderImages } from "./_components/gallery-data";

import dynamic from "next/dynamic";

const GallerySection = dynamic(() => import("./_components/gallery"), {
  loading: () => <div className="mt-24 h-96 animate-pulse bg-[#101c1a]/90 dark:bg-[#171314]/90" />,
});

const Videos = dynamic(() => import("./_components/videos"));
const Application = dynamic(() => import("./_components/application"));

export const metadata: Metadata = {
  title: {
    absolute: "مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
  },
  description:
    "مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات: إحياء تراث الإمام علي بن الحسين السجاد وأئمة البقيع، ونشر بحوثهم وإصداراتهم وأخبار المؤسسة.",
  keywords: [
    "مؤسسة الإمام زين العابدين",
    "الإمام زين العابدين عليه السلام",
    "الإمام علي بن الحسين السجاد",
    "أئمة البقيع",
    "رسالة الحقوق",
    "تراث أهل البيت",
    "بحوث ودراسات إسلامية",
    "إصدارات مؤسسة الإمام زين العابدين",
    "النيابة في زيارة الإمام السجاد",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
    description:
      "مؤسسة لإحياء تراث الإمام علي بن الحسين السجاد وأئمة البقيع عليهم السلام ونشر بحوثها وإصداراتها، مع أحدث الأخبار وخدمة النيابة في الزيارة.",
    url: "/",
    type: "website",
    images: ["/general/Biography-of-the Infallible-Ones.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات",
    description:
      "مؤسسة لإحياء تراث الإمام علي بن الحسين السجاد وأئمة البقيع عليهم السلام ونشر بحوثها وإصداراتها، مع أحدث الأخبار وخدمة النيابة في الزيارة.",
    images: ["/general/Biography-of-the Infallible-Ones.jpg"],
  },
};

const desktopImages = [
  "/general/Biography-of-the Infallible-Ones.jpg",
  "/images/fhrs-alsahefe.jpg",
  "/images/albaqi.jpg",
  "/images/ziara-imamzain-web.jpg",

  "/images/web.jpg",

  //"/images/albaqi-2.png",
  //"/images/hero-4.jpg", // تراتيل القانتين
  "/images/hero-5.jpg", // البعد الاجتماعي
  "/images/hero-7.jpg", // بناء الامن النفسي
];

const mobileImages = [
  "/images/ziara-imamzain-mobail.jpg",
  "/images/almahad.jpg",
  "/images/albaqi.jpg",
  //"/images/albaqi-2.png",
  //"/images/hero-3-vertical.jpg", // لمحات

  //,"/images/hero-9-vertical.jpg", // المباني السياسية
  "/images/hero-4-vertical.jpg", // تراتيل القانتين
  "/images/hero-5-vertical.jpg", // البعد الاجتماعي
  "/images/hero-6-vertical.jpg", // ابي حمزة الثمالي
  "/images/hero-7-vertical.jpg", // بناء الامن النفسي
];

// Highest number of items any breakpoint of the corresponding home section
// actually renders (see the useState defaults in each client component).
// Slicing to these counts here, instead of shipping the full dataset for the
// client to slice, is what keeps the home page's RSC payload small: it used
// to include every post, book and playlist even though only a handful are
// ever shown.
const HOME_POSTS_COUNT = 4;
const HOME_PUBLICATIONS_COUNT = 10;
const HOME_PLAYLISTS_COUNT = 7;

function homePublications(books: Book[]): Book[] {
  // Mirrors the filter/sort/dedupe Publications previously ran client-side
  // over the full catalog on every visit.
  return books
    .filter(
      (book) =>
        Array.isArray(book.category) && book.category.includes("الإصدارات"),
    )
    .sort((a, b) => b.id - a.id)
    .filter(
      (book, index, arr) =>
        !book.series ||
        arr.findIndex((b) => b.series === book.series) === index,
    )
    .slice(0, HOME_PUBLICATIONS_COUNT);
}

function homePlaylists(playlists: YouTubePlaylist[]) {
  // Videos only ever reads playlist.videos[0] and displayLocation, so the
  // rest of each playlist's videos never needs to leave the server.
  return playlists
    .filter(
      (playlist) =>
        playlist.displayLocation === "both" && playlist.videos.length > 0,
    )
    .slice(0, HOME_PLAYLISTS_COUNT)
    .map((playlist) => {
      const [firstVideo] = playlist.videos;
      return {
        videos: [
          {
            title: firstVideo.title,
            desc: firstVideo.desc,
            date: firstVideo.date,
            thumbnail: firstVideo.thumbnail,
            url: firstVideo.url,
          },
        ],
      };
    });
}

export default async function Page() {
  const books = await dataFetcher<Book[]>("books.json");
  const posts = await dataFetcher<Post[]>("posts.json");
  const playlists = await dataFetcher<YouTubePlaylist[]>("youtube.json");

  // Select Proper Hadith Based on Date
  const today = new Date();
  const dayOfMonth = today.getDate();
  const currentHadithIndex = (dayOfMonth - 1) % hadiths.length;
  const currentHadith = hadiths[currentHadithIndex];

  return (
    <div>
      <h1 className="sr-only">
        مؤسسة الإمام زين العابدين عليه السلام للبحوث والدراسات
      </h1>
      <TopImage
        desktopImages={desktopImages}
        mobileImages={mobileImages}
        currentHadith={currentHadith}
      />

      <Vision text="انطلاقاً من العمق الديني والعلمي والإجتماعي لأهل بيت النبوة وأنوار الهداية الإلهية (عليهم السلام جميعاً) ، وسعياً الى تعريف المجتمع الإنساني بمآثر العترة الطاهرة لنبي الرحمة (صلى الله عليه وعليهم أجمعين) ، وإظهاراً لمظلومية الأئمة الطاهرين وخصوصاً أئمة البقيع (عليهم السلام)، وما مورس في حقهم من إجحاف وتنكر وتغييب والحال أنهم أهل المدينة وسادتها وهم ورثة جدهم النبي الاكرم نسباً وعلماً ومكانةً وسؤدداً فلقد اهتم المؤمنون جزاهم الله خيراً قديماً وحديثاً بمحاولات كثيرة لنشر فكر أئمة البقيع وفقههم والعمل على إلفات الأنظار الى سمو مرتبتهم (عليهم السلام) وجلالة قدرهم في الإسلام فجزى الله العاملين كل خير." />

      <Posts newsPosts={posts.slice(0, HOME_POSTS_COUNT)} />

      <ImamBand text='الإمام علي بن الحسين (عليه السلام) هو الإمام الرابع من سلسلة الأئمة الأطهار (عليهم السلام) من آل بيت النبي (صلى الله عليه وآله)، أطل على هذه الدنيا في اليوم الخامس من شهر شعبان من سنة 37 أو 38 للهجرة وجه نَوْرَانِيٌّ هادئْ ، يحمل سماتٍ من نور الله ، وملامح ضاربةٌ في العراقة من أبيه الحسين إلى جده إبراهيم « عليهم السلام » ، ومن أمه شاه زنان بنت يزدجرد إلى أعلى أعراق الفرس وقدم الإسلام الأصيل للأمة، مقابل الإسلام الأموي المشوه وعاصر خلال حياته عدداً من الخلفاء الأمويين، أولهم "يزيد بن معاوية" لعنة الله عليه، وآخرهم "الوليد بن عبد الملك بن مروان" ورحل عن هذه الدنيا في سنة 95 للهجرة بعد حياة حافلة بالبذل والعطاء في سبيل إعلاء شأن الرسالة وخدمة الأمة الإسلامية.' />

      <section className="container pt-24">
        <SectionTitle title="رسالة الحقوق" />
        <BookPanel text="رسالة الحقوق منظومة حقوقية دونها الامام زين العابدين ع قبل اربعة عشر قرنا ... تمتاز عن غيرها : بالشمولية لجميع الحقوق التي جاء بها الاسلام ابتداء من نفس الإنسان وجوارحه وعلاقته بخالقه ثم تتوسع شاملة لجميع علاقاته مع ارحامه وجيرانه واصدقائه لتشمل خارطة العلاقات الاجتماعة جميعاً. ان مادتها مستمدة من الوحي اذ الامام هو حجة الله تعالى وترجمان وحيه. تمتاز بالثبات وعدم طرو التغير عليها كما في بقية المدونات الحقوقية الوضعية منطلقة من ملاك الحق المشرع بمقتضى الحكمة الإلهية بعيداً عن الاهواء والرغبات الشخصية او العرقية او الطائفية ومحققة للعدالة الإجتماعية وموجدة للتوازن بين جميع مكونات المجتمع الانساني بالغة به حد الامن والسلم المجتمعي والحياة الكريمة لو تمت مراعاتها وتطبيقها." spine={["رسالة", "الحقوق"]}
          quote={{
            text: "فَأَمّا حَقّ اللهِ الْأَكْبَرُ فَإِنّكَ تَعْبُدُهُ لَا تُشْرِكُ بِهِ شَيْئاً فَإِذَا فَعَلْتَ ذَلِكَ بِإِخْلَاصٍ جَعَلَ لَكَ عَلَى نَفْسِهِ أَنْ يَكْفِيَكَ أَمْرَ الدّنْيَا وَ الآْخِرَةِ وَ يَحْفَظَ لَكَ مَا تُحِبّ مِنْهَا.",
            title: "حق الله الأكبر",
            source: "رسالة الحقوق",
            href: "/library/risalat-al-huqoq/the-rights-of-god/the-greatest-right-of-god",
          }}
        >
          <Link href="/library/risalat-al-huqoq/introduction" className={solidButton}>
            قراءة رسالة الحقوق
          </Link>
          <Link href="/library?category=رسالة الحقوق" className={outlineButton}>
            شروح رسالة الحقوق
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </BookPanel>
      </section>

      <VisitationSignup />
      <Publications publications={homePublications(books)} />
      <Application />
      <GallerySection sliderImages={getSliderImages()} />
      <Videos playlists={homePlaylists(playlists)} />
    </div>
  );
}
