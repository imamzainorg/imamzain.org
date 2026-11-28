// وصف الفيديو كما هو على يوتيوب: نص عادي بأسطره، والروابط فيه تصير قابلة للضغط.
const URL_PATTERN = /(https?:\/\/[^\s<>"']+)/g;

// علامات الترقيم بآخر الرابط تكون عادة من الجملة مو من الرابط
const TRAILING = /[.,;:!?)\]،؛؟»]+$/;

export default function VideoDescription({ text }: { text: string }) {
  if (!text.trim()) return null;

  const parts = text.trim().split(URL_PATTERN);

  return (
    <section
      aria-label="وصف الفيديو"
      className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-sm leading-7 text-slate-300 whitespace-pre-line break-words"
    >
      {parts.map((part, i) => {
        // الأجزاء ذات الرقم الفردي هي الروابط (من split بمجموعة التقاط)
        if (i % 2 === 0) return part;
        const trailing = part.match(TRAILING)?.[0] ?? "";
        const href = trailing ? part.slice(0, -trailing.length) : part;
        return (
          <span key={i}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-block max-w-full break-all text-secondary underline-offset-2 hover:underline"
              dir="ltr"
            >
              {href}
            </a>
            {trailing}
          </span>
        );
      })}
    </section>
  );
}
