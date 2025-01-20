import SectionCta from "@/components/section-cta";

export default function Imamzain() {
  return (
    <>
      <div className="bg-[url('/images/albaqi.jpg')] bg-cover">
        <div className="bg-secondary/80 text-white">
          <div className="container flex flex-col gap-12 py-24 max-sm:py-8">
            <h1 className="text-3xl text-center md:text-right md:text-4xl text-primary font-bold  ">
              الإمام زين العابدين
            </h1>
            <p className="font-light text-lg md:text-2xl lg:text-2xl leading-7 md:leading-9 lg:leading-10 text-justify tracking-tighter">
              الإمام علي بن الحسين (عليه السلام) هو الإمام الرابع
              من سلسلة الأئمة الأطهار (عليهم السلام) من آل بيت
              النبي (صلى الله عليه وآله)، أطل على هذه الدنيا في
              اليوم الخامس من شهر شعبان من سنة 37 أو 38 للهجرة وجه
              نَوْرَانِيٌّ هادئْ ، يحمل سماتٍ من نور الله ، وملامح
              ضاربةٌ في العراقة من أبيه الحسين إلى جده إبراهيم «
              عليهم السلام » ، ومن أمه شهزنان بنت يزدجرد إلى أعلى
              أعراق الفرس وقدم الإسلام الأصيل للأمة، مقابل الإسلام
              الأموي المشوه وعاصر خلال حياته عدداً من الخلفاء
              الأمويين، أولهم &quot;يزيد بن معاوية&quot; لعنة الله
              عليه، وآخرهم &quot;الوليد بن عبد الملك بن
              مروان&quot; ورحل عن هذه الدنيا في سنة 95 للهجرة بعد
              حياة حافلة بالبذل والعطاء في سبيل إعلاء شأن الرسالة
              وخدمة الأمة الإسلامية.
            </p>
            <SectionCta
              links={[
                {
                  label: "حياته الكريمة",
                  href: "/coming-soon",
                },
                {
                  label: "معرض الصور",
                  href: "/coming-soon",
                },
                {
                  label: "تراث الإمام",
                  href: "/coming-soon",
                },
              ]}
            />
          </div>
        </div>
      </div>

    </>
  );
}