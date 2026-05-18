import Breadcrumbs from "@/components/breadcrumb";
import { Post } from "@/types/post";
import { dataFetcher } from "@/lib/dataFetcher";
import ArchivesClient from "./_components/archives-client";

export const revalidate = 300;

export default async function Page() {
  const posts = await dataFetcher<Post[]>("posts.json");

  return (
    <div className="">
      <Breadcrumbs
        links={[
          { name: "الصفحة الرئيسية", url: "/" },
          { name: "الأخبار", url: "/news" },
          { name: "ارشيف الأخبار", url: "/news/archives" },
        ]}
      />
      <ArchivesClient posts={posts} />
    </div>
  );
}
