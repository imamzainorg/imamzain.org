"use client";

import { defineStepper } from "@stepperize/react";
import { DownloadIcon, NewspaperIcon, PhoneIcon, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

function toArabicNumerals(input: string | number): string {
  return input
    .toString()
    .replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩".charAt(parseInt(d)));
}

/* =========================
   شروط المسابقة
========================= */
const rules = [
  "يشترط أن يكون الورق من النوع المقهر وبخلفية فاتحة، ولا يجوز استخدام الورق الأبيض. حجم الورقة يجب أن يكون (٧٠ × ٥٠) سم لجميع الخطوط. يُستبعد من لم يلتزم بذلك.",
  "يمكن للمتسابق الاشتراك بثلاثة أنواع من الخطوط فقط، ولا يحق له الاشتراك بأكثر من عمل في النوع الواحد.",
  "يجوز اعتماد أي رسم قرآني في النصوص القرآنية.",
  "يجب التقيد بالقواعد الإملائية والنحوية في النصوص غير القرآنية.",
  "يجب أن تكون الأعمال خالية من التوقيع أو أي إشارة لكاتبها، وألا تكون مزخرفة أو مذهبة أو ذات حدود أو ملصقة على ورق مقوى أو خشب. تُرسل بطريقة تحافظ على سلامة اللوحة.",
  "تُعدّ جميع الأعمال ملكاً للعتبة الحسينية المقدسة - مؤسسة الإمام زين العابدين (عليه السلام) سواء فازت أو لم تفز.",
  "على كل مشارك الالتزام بالشروط والنصوص الواردة، ويُستبعد كل عمل يخالف ذلك.",
  "يحق للمتسابق اختيار لون الحبر بحرية، ويمكن استخدام لون واحد أو أكثر.",
];

/* =========================
   Stepper (خطوتان فقط)
========================= */
const stepper = defineStepper(
  { id: "1", title: "١. الشروط والتنزيل" },
  { id: "2", title: "٢. الاستعلام والتواصل" }
);

export const ApplyStepper = () => {
  const methods = stepper.useStepper();

  return (
    <div className="w-full min-h-screen px-4 py-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* =========================
            Navigation
        ========================= */}
        <ol className="flex text-note leading-relaxed gap-4 justify-center">
          {["1", "2"].map((id, index) => {
            const icons = [NewspaperIcon, MailIcon];
            const Icon = icons[index];

            return (
              <li
                key={id}
                onClick={() => methods.goTo(id as "1" | "2")}
                className={cn(
                  "cursor-pointer flex flex-col items-center gap-3 px-6 py-4 rounded-xl border-2 transition",
                  methods.current.id === id
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-gray-200 hover:border-primary/50"
                )}
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <span className="font-bold text-gray-800">
                  {methods.get(id as "1" | "2").title}
                </span>
              </li>
            );
          })}
        </ol>

        {/* =========================
            Content
        ========================= */}
        <div className="bg-white border-2 rounded-2xl p-6 shadow-lg">
          {methods.switch({
            /* =========================
               STEP 1
            ========================= */
            "1": () => (
              <div className="space-y-6">
                <h1 className="text-body font-bold text-gray-800 flex items-center gap-3">
                  <NewspaperIcon className="w-6 h-6 text-primary" />
                  شروط المشاركة
                </h1>

                <ul className="space-y-4">
                  {rules.map((rule, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-xl border-r-4 border-primary text-subtitle leading-relaxed"
                    >
                      <span className="font-bold text-primary ml-2 text-subtitle">
                        {toArabicNumerals(index + 1)}.
                      </span>
                      {rule}

                     
                    </li>
                  ))}
                </ul>
                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 sm:p-6 items-center justify-center flex flex-col">
                  <p className="text-subtitle text-gray-800 leading-relaxed">
                    <span className="font-bold text-yellow-700  mb-2 items-center justify-center flex">
                      ⚠️ ملاحظة مهمة
                    </span>
                    يُرفق مع العمل:
                    <span className="font-semibold text-gray-900">
                      {" "}
                      استمارة المسابقة، سيرة ذاتية مختصرة، صورة شخصية، وصورة
                      جواز السفر
                    </span>
                  </p>

                  <div className="mt-4 text-subtitle flex items-center justify-center  gap-2 text-primary font-semibold">
                    <div>
                      <div className="flex p-1 items-center justify-center ">
                        {" "}
                        <DownloadIcon className="w-3 h-3 md:w-5 md:h-5 ml-2" />
                        <Link
                          download
                          href="/contests/khat/form.pdf"
                          className="underline underline-offset-4 hover:text-primary/80 transition"
                        >
                          تحميل استمارة المسابقة
                        </Link>
                      </div>

                      <br />

                      <p className="text-subtitle leading-relaxed	 text-gray-600 mt-4 items-center justify-center flex">
                         اخر خطوة لإتمام الاشتراك هي ارسال عملك الى منظمين المسابقة في
                  العتبة الحسينية المقدسة{" دار القرآن الكريم مركز والقلم للخط العربي كربلاء المقدسة شارع السدرة عكد الجاجين "}
               </p>
                    </div>
                  </div>
                </div>
              </div>
            ),

            /* =========================
               STEP 2
            ========================= */
            "2": () => (
              <div className="flex flex-col items-center gap-8 text-center">
                <h2 className="text-note leading-relaxed font-bold w-full md:w-6/12 text-gray-800">
                  اخر خطوة لإتمام الاشتراك هي ارسال عملك الى منظمين المسابقة في
                  العتبة الحسينية المقدسة{""}
                </h2>

                <p className="text-subtitle text-gray-600 max-w-2xl">
                  وحسب ما مذكور في النقطة الاخيرة من الشروط
                </p>
                <p className="text-subtitle font-semibold text-gray-600 max-w-2xl">
                  للاستفسار والتواصل، يرجى استخدام وسائل الاتصال التالية:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
                  {/* Email */}
                  <Link
                    href="mailto:khat@imamzain.org"
                    className="flex flex-col items-center gap-4 p-6 border-2 rounded-xl hover:shadow-xl hover:border-primary transition"
                  >
                    <MailIcon className="w-10 h-10 text-primary" />
                    <span className="text-note font-bold mt-1">khat@imamzain.org</span>
                  </Link>

                  {/* Phone */}
                  <div className="flex flex-col items-center gap-4 p-6 border-2 rounded-xl hover:shadow-xl hover:border-primary transition">
                    <PhoneIcon className="w-10 h-10 text-primary" />
                    <span dir="ltr" className="text-note font-bold mt-1">
                      +964 781 970 7817
                    </span>
                  </div>
                </div>
              </div>
            ),
          })}
        </div>

        {/* =========================
            Buttons
        ========================= */}
        <div className="flex justify-between text-note ">
          {methods.current.id !== "1" && (
            <button
              onClick={() => methods.prev()}
              className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition ml-auto"
            >
              شروط وتنزيل الاستمارة
            </button>
          )}

          {methods.current.id !== "2" && (
            <button
              onClick={() => methods.next()}
              className="p-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition ml-auto"
            >
              الاستعلام والتواصل
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
