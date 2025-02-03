  
  import Breadcrumbs from "@/components/breadcrumb"
  import Section from "@/components/section"
  import Image from "next/image"
  
  export default function ContactUs() {
      return (
  <div className="mt-96 p-16 pl-28 pr-28">
      <div className="p-6 pl-28 pr-28   rounded-2xl bg-opacity-25 bg-slate-400  h-full container ">
                   
                    <div className="">
                    <Section title="موقع المؤسسة" />
                        <iframe
                            className="rounded-[30px] w-full h-96 shadow-xl"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
                            loading="eager"
                        />
                   <div className="flex flex-row w-full" >
                   <p className=" p-4 w-1/2 text-md md:text-lg lg:text-xl xl:text-2xl">
                            النجف الأشرف-ملحق شارع الروان
                        </p>
                        <p className=" p-4 w-1/2 text-md md:text-lg lg:text-xl xl:text-2xl ">
                         <span className="font-bold">ساعات العمل </span>من السبت الى الخميس(8صباحا-2 ظهرا)
                        </p>
                   </div>
                    </div>
                </div>
  </div>

      );
    }