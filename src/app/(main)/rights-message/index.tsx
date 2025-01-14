import SectionCta from "@/components/section-cta"
import SectionTitle from "@/components/section"
export default function RightsMessage() {
  return (
    <>
      <div className="w-11/12 mx-auto space-y-4">
        <SectionTitle title="رسالة الحقوق" />
        <p className="w-11/12 mx-auto font-light text-lg md:text-2xl lg:text-2xl leading-7 md:leading-9 lg:leading-10 text-justify tracking-tighter">
          رسالة الحقوق منظومة حقوقية دونها الامام زين العابدين ع قبل اربعة عشر
          قرنا ... تمتاز عن غيرها : بالشمولية لجميع الحقوق التي جاء بها الاسلام
          ابتداء من نفس الإنسان وجوارحه وعلاقته بخالقه ثم تتوسع شاملة لجميع
          علاقاته مع ارحامه وجيرانه واصدقائه لتشمل خارطة العلاقات الاجتماعة
          جميعاً. ان مادتها مستمدة من الوحي اذ الامام هو حجة الله تعالى وترجمان
          وحيه. تمتاز بالثبات وعدم طرو التغير عليها كما في بقية المدونات
          الحقوقية الوضعية منطلقة من ملاك الحق المشرع بمقتضى الحكمة الإلهية
          بعيداً عن الاهواء والرغبات الشخصية او العرقية او الطائفية ومحققة
          للعدالة الإجتماعية وموجدة للتوازن بين جميع مكونات المجتمع الانساني
          بالغة به حد الامن والسلم المجتمعي والحياة الكريمة لو تمت مراعاتها
          وتطبيقها.
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
    </>
  );
}
