"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Clock, Mail, MapPin, MessageSquare, Phone, CheckCircle2, Loader2, Send, UserRound } from "lucide-react";
import Breadcrumbs from "@/components/breadcrumb";
import { outlinePanel, shieldPanel, solidButton } from "@/components/brand";
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

const fieldClass =
  "h-14 w-full rounded-xl border-2 border-primary/20 bg-white px-4 text-lg text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-primary dark:border-Muharram_primary/25 dark:focus:border-Muharram_primary";
const invalidClass = "!border-red-500";

// A labelled field: the label sits above (it never disappears like a placeholder), the icon inside
// at the start, and the error right under the input.
function Field({
  id,
  label,
  hint,
  required,
  error,
  Icon,
  top,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
  Icon: typeof Mail;
  top?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center gap-2 font-bold text-gray-900">
        {label}
        {required && <span aria-hidden className="text-red-600">*</span>}
        {hint && <span className="text-sm font-normal text-gray-500">{hint}</span>}
      </label>
      <div className="relative">
        <Icon
          aria-hidden
          className={`pointer-events-none absolute right-4 h-5 w-5 text-secondary_dark dark:text-Muharram_secondary ${top ? "top-4" : "top-[1.1rem]"}`}
        />
        {children}
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

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
  const [errors, setErrors] = useState<{ email?: string; message?: string; form?: string }>({});
  const [sending, setSending] = useState<boolean>(false);
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
    const next: typeof errors = {};

    if (!isValidEmail(formData.email)) next.email = "يرجى إدخال بريد إلكتروني صالح";
    if (!isValidMessage(formData.message)) next.message = "يجب ان يكون طول الرسالة بين 10 و2000 حرف";
    setErrors(next);
    if (next.email || next.message) return;

    setSending(true);
    try {
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
        setErrors({ form: "حدث خطأ أثناء إرسال الرسالة" });
      }
    } catch {
      setErrors({ form: "تعذر الاتصال بالخادم، حاول مرة أخرى" });
    } finally {
      setSending(false);
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
              noValidate
              className="mx-2 flex flex-col gap-6 rounded-[2rem] border-2 border-primary/15 bg-white p-8 shadow-xl dark:border-Muharram_primary/20 md:p-10"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-primary dark:text-Muharram_primary md:text-3xl">
                  أرسل لنا رسالة
                </h2>
                <p className="mt-2 text-gray-600">نرد عادةً خلال أيام العمل. الحقول المعلّمة بنجمة مطلوبة.</p>
              </div>

              {errors.form && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-700">
                  {errors.form}
                </p>
              )}

              <Field id="contact-name" label="الاسم" hint="اختياري" Icon={UserRound}>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  placeholder="اسمك الثلاثي"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${fieldClass} pr-12`}
                />
              </Field>

              <Field id="contact-email" label="البريد الإلكتروني" required error={errors.email} Icon={Mail}>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  dir="ltr"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.email)}
                  className={`${fieldClass} pr-12 text-right ${errors.email ? invalidClass : ""}`}
                />
              </Field>

              <div>
                <p className="mb-2 flex items-center gap-2 font-bold text-gray-900">
                  البلد
                  <span className="text-sm font-normal text-gray-500">اختياري</span>
                </p>
                <CountriesDropdown
                  className="w-full"
                  inputProps={{
                    classNames: {
                      inputWrapper:
                        "h-14 rounded-xl border-2 border-primary/20 bg-white shadow-none data-[hover=true]:bg-white group-data-[focus=true]:border-primary group-data-[focus=true]:bg-white",
                      input: "text-lg text-gray-900",
                    },
                  }}
                  onCountryChange={(e) => setFormData({ ...formData, country: e })}
                />
              </div>

              <Field id="contact-message" label="الرسالة" required error={errors.message} Icon={MessageSquare} top>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="اكتب رسالتك هنا"
                  rows={5}
                  maxLength={2000}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.message)}
                  className={`${fieldClass} min-h-36 resize-y py-4 pr-12 ${errors.message ? invalidClass : ""}`}
                />
                <span className="mt-1 block text-left text-sm text-gray-500" dir="ltr">
                  {formData.message.length} / 2000
                </span>
              </Field>

              <button type="submit" disabled={sending} className={`${solidButton} w-full disabled:opacity-70`}>
                {sending ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    جارٍ الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 -scale-x-100" />
                    ارسال الرسالة
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      )}
    </div>
  );
}
