import { SearchIcon } from "lucide-react";

export default function Faqs() {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4 justify-between pb-5">
        <h1 className="text-primary text-3xl font-bold">الأسئلة الشائعة </h1>
        <div className="col-span-1 w-full md:col-span-3 md:w-72 relative lg:mb-4">
          <input
            type="text"
            // value={searchTitle}
            // onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full rounded-2xl md:text-sm lg:text-lg p-1 bg-transparent border border-primary focus:border-primary   outline-none   "
            placeholder="البحث عن البحوث"
          />
          <div className="absolute text-primary left-0 top-0 pl-3 h-full flex justify-center items-center gap-4">
            <div className="h-2/3 w-[1px] bg-slate-400" />
            <SearchIcon size={20} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10  ">
        {[
          {
            question: "هل تقبلون الأبحاث المكتوبة باللغة العامية؟",
            answer:
              "بالطبع! نحن نقدّر الإبداع، حتى لو كان البحث مكتوباً باللهجة الدارجة أو على شكل قصيدة نبطية!",
          },
          {
            question: "ما هو الحد الأقصى لعدد الصفحات في البحث؟",
            answer:
              "لا يوجد حد! نرحب بالأبحاث من نصف صفحة حتى ألف صفحة، المهم أن يكون المحتوى مكتوباً بخط جميل!",
          },
          {
            question: "هل هناك جوائز مالية لأفضل بحث؟",
            answer:
              'نعم! الجائزة الأولى هي لقب "زين العابدين الصغير"، بالإضافة إلى مفتاح كنز الإمام السجاد (ع) المفقود منذ قرون!',
          },
          {
            question:
              "هل يمكنني الكتابة عن علاقة الإمام السجاد (ع) بالمخلوقات الفضائية؟",
            answer:
              "نعم، إذا كان لديك دليل من الصحيفة السجادية يؤكد اتصاله بكائنات من مجرة أخرى، فنحن ننتظر بحثك بفارغ الصبر!",
          },
          {
            question: "ماذا لو سرقت أفكار بحثي؟",
            answer:
              "لا تقلق! لدينا فريق من الحراس الروحيين للإمام السجاد (ع) سيتعقبون أي شخص يسرق أفكارك ويعيدونها لك بطريقة غامضة!",
          },
          {
            question: "ماذا لو سرقت أفكار بحثي؟",
            answer:
              "لا تقلق! لدينا فريق من الحراس الروحيين للإمام السجاد (ع) سيتعقبون أي شخص يسرق أفكارك ويعيدونها لك بطريقة غامضة!",
          },
        ].map((item, index) => (
          <div key={index} className="text-start flex flex-col items-start gap-2 border-r-5 border-primary pr-2 cursor-pointer">
            <h1 className="text-2xl font-bold"> {item.question} </h1>
            <p className="text-xl "> {item.answer} </p>
          </div>
        ))}
      </div>
    </div>
  );
}
