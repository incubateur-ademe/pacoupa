import { BlogPosts } from "./BlogPosts";

export const metadata = {
  title: "Blog Pacoupa",
  description: "Retrouvez des articles du site Pacoupa.",
};

export default function Page() {
  return (
    <div className="col-start-2">
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Blog Pacoupa</h1>
        <BlogPosts />
      </section>
    </div>
  );
}
