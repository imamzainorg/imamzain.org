import Image from "next/image";
import Link from "next/link";
import { ArrowUpLeft, LibraryBig } from "lucide-react";
import { lightButton, shieldPanel, whiteButton } from "@/components/brand";
import { Reveal } from "@/components/motion";

export interface AppItem {
  name: string;
  slug: string;
  /** The app's own site (its subdomain): the card links out here. */
  url: string;
  tagline: string;
  description: string;
  category: string;
  status: "available" | "soon";
  /** Front (taller) and back screenshot. */
  front: string;
  back: string;
  /**
   * When true, the screenshots are raw screen captures and are wrapped in a
   * slim device bezel. Leave false for assets that already contain a frame.
   */
  framed?: boolean;
  store?: {
    appStore?: string;
    googlePlay?: string;
  };
}

function Phone({
  src,
  alt,
  framed,
  className,
}: {
  src: string;
  alt: string;
  framed?: boolean;
  className: string;
}) {
  return (
    <div className={className}>
      {framed ? (
        <div className="h-full w-full overflow-hidden rounded-[1.8rem] bg-neutral-900 p-[3px] shadow-2xl ring-1 ring-black/10">
          <Image src={src} alt={alt} fill sizes="200px" className="rounded-[1.7rem] object-cover" />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="200px"
          className="object-contain object-bottom drop-shadow-2xl"
        />
      )}
    </div>
  );
}

// One app: a green shield with its pitch and store badges, two phones standing out of its corner.
export default function AppCard({ app }: { app: AppItem }) {
  const isAvailable = app.status === "available";

  return (
    <Reveal>
      <article
        aria-label={`تطبيق ${app.name}`}
        className={`${shieldPanel} relative p-8 md:p-12 lg:min-h-[22rem] lg:pl-[26rem]`}
      >
        <p className="flex flex-wrap items-center gap-3 text-sm font-semibold text-secondary dark:text-white/70 md:text-base">
          <span className="inline-flex items-center gap-2">
            <LibraryBig className="h-4 w-4" />
            {app.category}
          </span>
          {!isAvailable && (
            <span className="rounded-lg border border-white/40 px-3 py-0.5 text-white">قريباً</span>
          )}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{app.name}</h2>
        <p className="mt-3 text-xl font-semibold text-secondary dark:text-white/85">{app.tagline}</p>
        <p className="mt-4 max-w-xl text-lg leading-loose text-white/80">{app.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`اكتشف تطبيق ${app.name} - الموقع الرسمي`}
            className={isAvailable ? whiteButton : lightButton}
          >
            اكتشف التطبيق
            <ArrowUpLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1" />
          </Link>

          {app.store?.appStore && (
            <Link
              href={app.store.appStore}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تنزيل من App Store"
              className="transition-transform hover:-translate-y-0.5"
            >
              <Image src="/applications/app-store.svg" alt="تنزيل من App Store" width={120} height={40} className="h-12 w-auto" />
            </Link>
          )}
          {app.store?.googlePlay && (
            <Link
              href={app.store.googlePlay}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="احصل عليه من Google Play"
              className="transition-transform hover:-translate-y-0.5"
            >
              <Image src="/applications/google-play.svg" alt="احصل عليه من Google Play" width={120} height={40} className="h-12 w-auto" />
            </Link>
          )}
        </div>

        <div aria-hidden className="absolute -top-14 bottom-0 left-10 hidden w-[25rem] lg:block">
          <Phone
            src={app.back}
            alt=""
            framed={app.framed}
            className="absolute bottom-6 left-0 h-[21rem] w-[10.5rem] -rotate-6"
          />
          <Phone
            src={app.front}
            alt={`واجهة تطبيق ${app.name}`}
            framed={app.framed}
            className="absolute bottom-0 left-36 h-[24rem] w-[12rem] rotate-3"
          />
        </div>
      </article>
    </Reveal>
  );
}
