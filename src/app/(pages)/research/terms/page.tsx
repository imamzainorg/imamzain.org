"use client";
export default function Page() {
  return (
    <div
      className="w-full   flex flex-col sm:flex-row justify-between gap-6
             bg-white rounded-2xl p-3
                  shadow-[0px_0px_2.7px_-10px_rgba(0,0,0,0.034),0px_0px_6.9px_-10px_rgba(0,0,0,0.049),0px_0px_14.2px_-10px_rgba(0,0,0,0.061),0px_0px_29.2px_-10px_rgba(0,0,0,0.076),0px_0px_80px_-10px_rgba(0,0,0,0.11)]"
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-primary">
          ضوابط كتابة البحوث العلمية
        </h1>

        <h2 className="text-2xl font-semibold mb-4  text-primary">
          الضوابط العامة
        </h2>

        <ol className="list-decimal list-inside space-y-3 text-right">
          <li>
            سلامة العبارات عن التعقيدات اللفظية والمعنوية ووضوح المعنى قدر
            الإمكان.
          </li>
          <li>
            الابتعاد عن المصادرات بنحو عام، ولا بد من ذكر الدليل العقلي أو
            الشرعي للمدعَى.
          </li>
          <li>
            عدم الخروج عن موضوع البحث، والالتزام بخطة البحث المقدمة من قبل
            المجلس العلمي.
          </li>
          <li>
            ألا يكون البحث نسخاً أو نقلًا من بحث آخر دون جهد الباحث العلمي.
          </li>
          <li>
            الإشارة إلى صاحب أي معلومة أو فكرة مأخوذة من الآخرين مع ذكر المصدر
            بدقة.
          </li>
          <li>
            التعريف بالشخصيات المذكورة في البحث ما لم تكن مشهورة شهرة تغني عن
            التعريف.
          </li>
          <li>كتابة المصطلحات الأجنبية بجانب ترجمتها العربية.</li>
          <li>الابتعاد عن كل ما يثير التعصب الطائفي بين المذاهب أو الأديان.</li>
          <li>
            تجنب التعرض للأشخاص بالسوء أو الانتقاص منهم، والتركيز على مناقشة
            آرائهم.
          </li>
          <li>إرفاق السيرة العلمية للباحث (CV) في صفحة واحدة.</li>
        </ol>

        <h2 className="text-2xl font-semibold mb-4 mt-10 text-primary">
          الضوابط الفنية
        </h2>

        <h3 className="text-xl font-medium mt-4 mb-2">تقسيم الأبحاث:</h3>
        <ul className="list-disc list-inside space-y-2 text-right">
          <li>إذا كان حجم الكتاب أقل من 300 صفحة، يقسم إلى فصول ومباحث.</li>
          <li>
            إذا كان أكثر من 300 صفحة:
            <ul className="list-circle list-inside pr-5 mt-1 space-y-1">
              <li>لموضوع واحد: يقسم إلى أبواب، كل باب فيه فصول ومباحث.</li>
              <li>لموضوعات متعددة: يقسم إلى أقسام، كل قسم فيه أبواب وفصول.</li>
            </ul>
          </li>
          <li>الحد الأدنى للبحث: 15 صفحة، وللمقالة: 3 صفحات.</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2">مواصفات الصفحة:</h3>
        <ul className="list-disc list-inside space-y-2 text-right">
          <li>القطع: الرزيري، 250 كلمة بخط Lotus بحجم 36 للمتن و15 للهوامش.</li>
          <li>هوامش الصفحة: 7 سم من كل جانب.</li>
          <li>توثيق الهوامش أسفل كل صفحة.</li>
        </ul>

        <h3 className="text-xl font-medium mt-6 mb-2">الاقتباس:</h3>
        <ul className="list-disc list-inside space-y-2 text-right">
          <li>من القرآن: توضع الآية بين قوسين مزهرية.</li>
          <li>من الروايات: يذكر اسم الراوي والمصدر.</li>
          <li>
            من كتب المفكرين: يوضع بين قوسين صغيرين أو اعتيادين حسب الحالة.
          </li>
          <li>من الإنترنت: يذكر الرابط الكامل وتاريخ النسخ.</li>
        </ul>

        <h3 className="text-2xl font-semibold mb-4 mt-10 text-primary">للتواصل</h3>
        <p>
          البريد الإلكتروني:{" "}
          <a
            href="mailto:zain.alabiedeen22@gmail.com"
            className="text-blue-600"
          >
            zain.alabiedeen22@gmail.com
          </a>
        </p>
        <p>رقم الهاتف: 7819433990</p>
      </div>
    </div>
  );
}
