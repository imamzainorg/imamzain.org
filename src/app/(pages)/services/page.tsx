"use client";
import { toast } from "sonner";
import {  Button, Input } from "@heroui/react";
import {  MailOpen } from "lucide-react";
import MessageIcon, { PersonIcon } from "@/assets/icons/reusable";
import Breadcrumbs from "@/components/breadcrumb";
import Section from "@/components/section";
import CountriesDropdown from "@/components/countries-input";

export default function Page() {
  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الخدمات", url: "#" },
          { name: "اتصل بنا", url: "#" },
        ]}
      />
      <Section title="تواصل معنا" />
      <div className="flex items-center justify-center max-w-screen-md mx-auto">
        <div className=" bg-primary bg-pattern  p-8 rounded-3xl w-full flex flex-col  items-center justify-center gap-5">
          <Input
            size={"lg"}
            className="border-none    w-full"
            labelPlacement="inside"
            name="name"
            placeholder="اسمك الثلاثي"
            classNames={{
              base: "",
              input: " border-none focus:ring-0",
            }}
            startContent={
              <PersonIcon stroke="#bb9661" fill="#bb9661" strokeWidth={0.1} />
            }
            type="text"
          />

          {/* Input for Phone */}
          <Input
            size={"lg"}
            className="border-none w-full"
            labelPlacement="inside"
            name="email"
            placeholder="الايميل"
            classNames={{
              base: "",
              input: "border-none focus:ring-0",
            }}
            startContent={
              <MailOpen stroke="#bb9661" fill="none" strokeWidth={1.5} />
            }
            type="text"
          />

          <CountriesDropdown className="border-none w-full" />
          <div className="relative w-full">
            <textarea
              className="border w-full h-24 md:h-32   pr-10 py-3  rounded-xl focus:ring-2 focus:ring-secondary"
              name="message"
              placeholder="اكتب رسالتك"
            ></textarea>
            <div className="absolute left top-6 mr-3 transform -translate-y-1/2 ">
              <MessageIcon width={24} height={24} />
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={() => toast("تم ادراج اسمك في قائمة الزائرين")}
            className="text-white rounded-md bg-secondary p-4 md:p-6 mt-2 font-bold text-xs md:text-lg"
          >
            ارسال
          </Button>
        </div>
      </div>
      <Section title="موقع المؤسسة" />
      <div className="w-full mt-10">
        <div className="pb-6 rounded-2xl bg-opacity-25 bg-slate-400">
          <div className="w-11/12 p-2">
            <iframe
              className="rounded-[30px] w-full h-1/3 md:h-60 xl:h-96 shadow-xl p-1 m-4"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
              loading="eager"
            />
            <div className="flex flex-col lg:flex-row w-full">
              <p className=" lg:w-1/2 text-sm pb-2 lg:mr-6 lg:text-right sm:text-base text-center">
                النجف الأشرف-ملحق شارع الروان
              </p>
              <p className="lg:text-left lg:w-1/2 text-sm sm:text-base text-center">
                <span className="font-bold">ساعات العمل </span>
                من السبت الى الخميس (8صباحا - 2 ظهرا)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
