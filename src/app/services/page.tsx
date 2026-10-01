"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@heroui/react";
import { Clock, Mail, MailOpen, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { MessageIcon, PersonIcon } from "@/assets/icons/reusable";
import Breadcrumbs from "@/components/breadcrumb";
import { outlinePanel, shieldPanel, whiteButton } from "@/components/brand";
import CountriesDropdown from "@/components/countries-input";
import { Reveal } from "@/components/motion";
import PageHeader from "@/components/page-header";

const intro =
  "تواصل مع مؤسسة الإمام زين العابدين عليه السلام في النجف الأشرف عبر العنوان والبريد والهاتف وساعات العمل، أو أرسل رسالتك مباشرة عبر نموذج التواصل.";

const details = [
  { label: "العنوان", value: "النجف الأشرف - ملحق شارع الروان", Icon: MapPin },
  { label: "ساعات العمل", value: "من السبت إلى الخميس (8 صباحاً - 2 ظهراً)", Icon: Clock },
  { label: "الايميل", value: "info@imamzain.org", href: "mailto:info@imamzain.org", Icon: Mail, ltr: true },
  { label: "الهاتف", value: "+964 782 943 9996", href: "tel:+9647829439996", Icon: Phone, ltr: true },
];

interface FormData {
  name: string;
  email: string;
  country: string | number | null;
  message: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    country: "",
    message: "",
  });
  const [error, setError] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string): boolean => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const isValidMessage = (message: string): boolean => {
    return message.length > 10 && message.length < 2000;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(formData.email)) {
      setError("يرجى إدخال بريد إلكتروني صالح");
      return;
    }

    if (!isValidMessage(formData.message)) {
      setError("يجب ان يكون طول الرسالة بين 10 و2000 حرف");
      return;
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
      }),
    });

    if (response.ok) {
      setSubmitted(true);
    } else {
      setError("حدث خطأ أثناء إرسال الرسالة");
    }
  };

  return (
    <div className="container pb-12">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الخدمات", url: "#" },
          { name: "اتصل بنا", url: "#" },
        ]}
      />

      <PageHeader title="تواصل معنا" text={intro} className="mb-20" />

      {submitted ? (
        <Reveal>
          <div className={`${shieldPanel} mx-auto flex max-w-2xl flex-col items-center gap-4 p-10 text-center md:p-14`}>
            <CheckCircle2 className="h-16 w-16 text-secondary dark:text-white" strokeWidth={1.4} />
            <h2 className="text-3xl font-extrabold">شكراً لتواصلك معنا</h2>
            <p className="text-xl leading-loose text-white/85">
              سوف نقوم بمراجعة رسالتك والرد عليك قريباً
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal x={60} y={0}>
            <h2 className="mb-2 text-2xl font-extrabold text-primary dark:text-Muharram_primary md:text-3xl">
              معلومات التواصل
            </h2>
            <ul>
              {details.map(({ label, value, href, Icon, ltr }) => {
                const content = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary text-secondary_dark dark:border-Muharram_secondary dark:text-Muharram_secondary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-secondary_dark dark:text-Muharram_secondary">
                        {label}
                      </span>
                      <span
                        dir={ltr ? "ltr" : undefined}
                        className="mt-0.5 block text-lg font-bold text-gray-900 md:text-xl"
                      >
                        {value}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={label} className="border-b border-dashed border-secondary/40">
                    {href ? (
                      <a href={href} className="flex items-center gap-4 py-4 hover:opacity-80">
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className={`${outlinePanel} mt-10 overflow-hidden`}>
              <iframe
                title="موقع مؤسسة الإمام زين العابدين على الخريطة"
                className="block h-64 w-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.679731674454!2d44.3607952!3d31.9966964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x155ed74306dd573d%3A0x16b7bd7757d9a76!2z2YXYpNiz2LPYqSDYp9mE2KfZhdin2YUg2LLZitmGINin2YTYudin2KjYr9mK2YYgKNi5KSDZhNmE2KjYrdmI2Ksg2YjYp9mE2K_Ysdin2LPYp9iq!5e0!3m2!1sen!2siq!4v1735032144406!5m2!1sen!2siq"
                loading="lazy"
              />
            </div>
          </Reveal>

          <Reveal x={-60} y={0} delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className={`${shieldPanel} mx-2 flex flex-col gap-5 p-8 md:p-10`}
            >
              <h2 className="text-2xl font-extrabold md:text-3xl">أرسل لنا رسالة</h2>

              {error && (
                <p role="alert" className="text-center font-semibold text-red-200">
                  {error}
                </p>
              )}

              <Input
                size="lg"
                labelPlacement="inside"
                name="name"
                placeholder="اسمك الثلاثي"
                value={formData.name}
                onChange={handleChange}
                className="w-full"
                classNames={{ input: "border-none focus:ring-0" }}
                startContent={
                  <>
                    <PersonIcon
                      stroke="#bb9661"
                      fill="#bb9661"
                      strokeWidth={0.1}
                      className="dark:hidden"
                    />
                    <PersonIcon
                      stroke="#a43232"
                      fill="#a43232"
                      strokeWidth={0.1}
                      className="hidden dark:block"
                    />
                  </>
                }
              />
              <Input
                size="lg"
                labelPlacement="inside"
                name="email"
                placeholder="الايميل"
                value={formData.email}
                onChange={handleChange}
                className="w-full"
                classNames={{ input: "border-none focus:ring-0" }}
                startContent={
                  <>
                    <MailOpen
                      stroke="#bb9661"
                      fill="none"
                      strokeWidth={1.5}
                      className="dark:hidden"
                    />
                    <MailOpen
                      stroke="#a43232"
                      fill="none"
                      strokeWidth={1.5}
                      className="hidden dark:block"
                    />
                  </>
                }
              />
              <CountriesDropdown
                className="w-full"
                onCountryChange={(e) => setFormData({ ...formData, country: e })}
              />
              <div className="relative w-full">
                <textarea
                  className="h-32 w-full resize-none rounded-xl p-4 pr-12 text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-Muharram_secondary"
                  name="message"
                  placeholder="اكتب رسالتك"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <div className="absolute right-3 top-4">
                  <MessageIcon
                    width={24}
                    height={24}
                    stroke="#bb9661"
                    fill="none"
                    className="dark:hidden"
                  />
                  <MessageIcon
                    width={24}
                    height={24}
                    stroke="#a43232"
                    fill="none"
                    className="hidden dark:block"
                  />
                </div>
              </div>

              <button type="submit" className={`${whiteButton} w-full`}>
                ارسال
              </button>
            </form>
          </Reveal>
        </div>
      )}
    </div>
  );
}
