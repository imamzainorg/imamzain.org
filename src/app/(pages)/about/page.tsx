import Breadcrumbs from "@/components/breadcrumb";
import Section from "@/components/section";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-screen-2xl w-11/12 mx-auto mt-28 sm:mt-32 lg:mt-40 lg:mb-36
	 xl:mt-48 space-y-10">
      {/* Breadcrumb */}
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "حول المؤسسة", url: "/about" },
        ]}
      />
      <div className="xl:w-11/12 mx-auto">
        <div className="flex justify-center items-center shadow-xl ">
          <Image
            src="/images/albaqi.jpg"
            className="w-full rounded-xl aspect-[16/6]"
            width={800}
            height={500}
            alt="logo"
          />
        </div>
        <div className="">
          <Section
            title="رؤية المؤسسة"
            text="الريادة  والتميز في إيصال علوم الامام السجاد عليه السلام الى الباحثين والنخب والتعريف به وبأصحابه وبعلماء المدينة المنورة وأدوارهم  في نصرة الحق والحقيقة."
          />
        </div>
        <div className="flex flex-row  ">
          <div className="md:w-1/2">
            <Section
              title=" هيكلة إدارية"
              text="	تحفيز الباحثين والمحققين لإثراء الجانب العلمي والفكري
					والثقافي المرتبط بالامام السجاد عليه السلام وإشاعة روح
					التخلق بأخلاقه والالتزام بمبادئه بين أبنائنا في المؤسسات
					العلمية والنخبوية عبر أعمال وفعاليات علمية وفنية.
				"
            />
          </div>

          <div className="md:flex w-1/2 hidden h-auto p-12  xl:p-14 ">
            <Image
              src="/images/about-landing.jpg"
              className="   rounded-[50px] bg-black"
              width={800}
              height={500}
              alt="logo"
            />
          </div>
        </div>
        <div className="flex flex-row  ">
          <div className="md:w-1/2">
            <Section
              title=" اهداف عمل المؤسسة"
              text="	
						تسليط الضوء على ما لم يظهر من آثار الإمام السجاد (عليه
						السلام).
					بلورة صياغة جديدة ورؤية فكرية شاملة بما يناسب أهداف
						المؤسسة.
					جعل المؤسسة حاضرة في الأوساط العلمية والنخبوية."
            />
          </div>

          <div className="md:flex w-1/2 hidden h-auto p-12  xl:p-14">
            <Image
              src="/images/albaqi.jpg"
              className="rounded-[50px] bg-black"
              width={800}
              height={500}
              alt="logo"
            />
          </div>
        </div>

        <div className=" ">
          <Section title=" موقع المؤسسة" />
          <div className="  h-56 md:h-60 xl:h-96 ">
            <iframe
              className="rounded-[30px] w-full h-full shadow-xl"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
              loading="eager"
            />
            <p className="text-left p-4  text-md md:text-lg lg:text-xl xl:text-2xl  ">
             
              النجف الأشرف-ملحق شارع الروان
            </p>
          </div>
        </div>
        <div className=" mt-24  grid">
          <Section title="معلومات الإتصال" />
          <div className=" bg-slate-500/25 p-6 rounded-[30px] grid ">
            <label className="m-2 text-lg  xs:text-xl md:text-2xl ">رقم الهاتف : 077112222333 </label>
            <label className="m-2 text-lg  xs:text-xl md:text-2xl  ">
              {" "}
              الإيميل : imamzain-asas@gmail.com
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
