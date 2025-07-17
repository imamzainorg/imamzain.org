
export interface Research  {
  id: string; // معرف فريد للبحث  
  slug: string;
  title: string; // عنوان البحث
   abstract?: string; // الملخص (باللغة الأصلية)
   part?: string; // الجزء أو المجلد (اختياري)
   section?: string; // المحور أو القسم (اختياري)
   topic?: string; // موضوع البحث أو المحور الفرعي
  author?: string; // اسم الباحث أو الباحثين
  pdfUrl?: string; // رابط تحميل البحث PDF (اختياري)
  pages?: number; // عدد الصفحات
  publishedYear?: number; // سنة النشر (اختياري)
Description?: string; // وصف البحث (اختياري)
pdfUrl?: string; // رابط تحميل البحث PDF (اختياري)
}

