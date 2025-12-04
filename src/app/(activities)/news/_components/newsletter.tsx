"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

interface NewsletterSectionProps {
  // إذا أردت تمرير أي بيانات خارجية
}

export default function NewsletterSection({}: NewsletterSectionProps) {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // الرسالة التي ستظهر تحت حقل الإدخال
  const [errorMsg, setErrorMsg] = useState("");

  // للتحكم بظهور النصوص
  const [showText, setShowText] = useState(true);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriberEmail }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        toast("شكراً لاشتراكك في صحيفتنا الاخبارية", {
          description: subscriberEmail,
        });

        setSubscriberEmail("");
        setSent(true);
        setShowText(false); // إخفاء النصوص بعد الاشتراك
        return;
      }

      setErrorMsg(data?.message || "حدثت مشكلة في اضافة البريد الالكتروني");
    } catch {
      setErrorMsg("حدث خطأ عند محاولة الاضافة، حاول مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:w-5/12 flex flex-col items-center lg:items-start">
      <div className="w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] lg:w-[360px] xl:w-[500px] lg:h-[360px] xl:h-[500px]
                      dark:bg-[url('/shapes/ziara-bg_Muharram.svg')] bg-[url('/shapes/ziara-bg.svg')]
                      bg-container rotate-180 bg-center bg-no-repeat flex justify-center items-center
                      text-white relative isolate"
      >
        <div className="absolute w-full h-full bg-[url('/shapes/bg.svg')]" />

        <div className="rotate-180 text-center w-full px-4">
          {/* النصوص تظهر فقط إذا showText true */}
          {showText && (
            <>
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-base md:text-lg lg:text-2xl xl:text-3xl font-semibold tracking-wide"
              >
                اشترك في
              </motion.span>
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base mt-4 md:mt-8 md:text-2xl lg:text-3xl tracking-wide font-normal"
              >
                النشرة البريدية الخاصة
                <br /> بالأعلانات والنشاطات
              </motion.p>
            </>
          )}

          {/* فورم الاشتراك */}
          {!sent ? (
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-4 mt-8"
            >
              <input
                type="email"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                disabled={isSubmitting}
                required
                placeholder="البريد الالكتروني"
                className="rounded-md w-4/6 sm:w-5/6 text-xs md:text-sm px-4 py-2 
                           text-black text-center mx-auto"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-secondary hover:bg-secondary/80 
                           dark:bg-Muharram_secondary dark:hover:bg-Muharram_secondary/80
                           px-4 py-1 xl:px-8 xl:py-2 w-fit mx-auto rounded-md text-sm
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "جاري الاشتراك..." : "اشترك الان"}
              </button>

              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-red-600 text-md mt-1 text-center"
                >
                  {errorMsg}
                </motion.p>
              )}
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-6 pb-32 md:pb-44 items-center "
            >
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-7xl md:text-8xl xl:text-9xl"
              />
              <p className="text-xl md:text-2xl text-center">
                تم الاشتراك بنجاح في النشرة البريدية
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
