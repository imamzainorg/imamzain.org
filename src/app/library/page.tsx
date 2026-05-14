import { Suspense } from "react";
import BookLibraryPage from "./_components/book-library-page";

export const revalidate = 300;

export default function Page() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <BookLibraryPage />
    </Suspense>
  );
}