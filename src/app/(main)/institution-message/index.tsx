import SectionCta from "@/components/section-cta";

 

export default function InstitutionMessage() {
  return (
    <>
      <div className="w-4/5 mx-auto flex flex-col gap-4">
        <h1 className="text-3xl text-center md:text-right md:text-4xl text-primary font-bold">
          رسالة المؤسسة
        </h1>
        <p className="mx-auto font-light text-lg md:text-2xl lg:text-2xl leading-7 md:leading-9 lg:leading-10 text-justify tracking-tighter">
          تحفيز الباحثين والمحققين لإثراء الجانب العلمي والفكري
          والثقافي المرتبط بالامام السجاد عليه السلام وإشاعة روح
          التخلق بأخلاقه والالتزام بمبادئه بين أبنائنا في المؤسسات
          العلمية والنخبوية عبر أعمال وفعاليات علمية وفنية.
        </p>
        <SectionCta
          links={[
            { label: "رؤية المؤسسة", href: "/about#vision" },
            { label: "أهداف المؤسسة", href: "/about#goals" },
            { label: "موقع المؤسسة", href: "/about#location" },
          ]}
        />
      </div>
    </>
  );
}