"use client";

import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

const Newsletter = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  // الرسالة التي ستظهر تحت حقل الإدخال
  const [errorMsg, setErrorMsg] = useState("");

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
        return;
      }

      // رسالة خطأ من API
      setErrorMsg(data?.message || "حدثت مشكلة في اضافة البريد الالكتروني");
    } catch {
      setErrorMsg("حدث خطأ عند محاولة الاضافة، حاول مرة أخرى");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-8">
      {!sent ? (
        <div className="flex flex-col items-center w-full gap-2">
          {/* Input */}
          <input
            type="email"
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            disabled={isSubmitting}
            required
            placeholder="البريد الالكتروني"
            className="rounded-md w-4/6 sm:w-5/6 text-xs md:text-sm px-4 py-2 
                       text-black text-center"
          />

          {/* Button */}
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

          {/* Error Message */}
          {errorMsg && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-red-600 text-xs mt-1"
            >
              {errorMsg}
            </motion.p>
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-6 pb-20 items-center pt-20"
        >
          <FontAwesomeIcon icon={faCircleCheck} className="text-7xl lg:text-9xl" />
          <p>تم الاشتراك بنجاح في النشرة البريدية</p>
        </motion.div>
      )}
    </form>
  );
};

export default Newsletter;
