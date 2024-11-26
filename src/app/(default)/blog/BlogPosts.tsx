import Image from "next/image";
import Link from "next/link";

import { H2 } from "@/dsfr/base/typography";

import { formatDate, getBlogPosts } from "./utils";

export async function BlogPosts() {
  const allPosts = await getBlogPosts();
  const [firstPost, ...restPosts] = allPosts.sort((a, b) => {
    if (new Date(a.frontmatter.publishedAt) > new Date(b.frontmatter.publishedAt)) {
      return -1;
    }
    return 1;
  });

  return (
    <>
      <div className="mb-4 md:mb-8">
        <Link key={firstPost.slug} className="flex flex-col space-y-1 bg-none" href={`/blog/${firstPost.slug}`}>
          {firstPost.frontmatter.image && (
            <div className="mb-8 relative w-full h-[400px]">
              <Image
                src={firstPost.frontmatter.image}
                alt="Image de décoration de l'article"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="w-full flex flex-col justify-center items-start">
            <H2 as="h4" className="text-neutral-900 tracking-tight mb-1 text-pretty">
              {firstPost.frontmatter.title}
            </H2>
            <p className="text-neutral-600 tabular-nums text-sm">{formatDate(firstPost.frontmatter.publishedAt)}</p>
            <p className="line-clamp-5 md:line-clamp-6">{firstPost.frontmatter.summary}</p>
          </div>
        </Link>
      </div>
      <div className="grid grid-col-1 lg:grid-cols-2 gap-2 md:gap-8">
        {restPosts.map(post => (
          <div key={post.slug} className="mb-8">
            <Link className="flex flex-col space-y-1 bg-none" href={`/blog/${post.slug}`}>
              {post.frontmatter.image && (
                <div className="mb-4 relative w-full h-[400px]">
                  <Image
                    src={post.frontmatter.image}
                    alt="Image de décoration de l'article"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="w-full flex flex-col justify-center items-start">
                <H2 as="h5" className="text-neutral-900 tracking-tight mb-1 text-pretty">
                  {post.frontmatter.title}
                </H2>
                <p className="text-neutral-600 tabular-nums text-sm mb-2">{formatDate(post.frontmatter.publishedAt)}</p>
                <p className="line-clamp-3 md:line-clamp-4 lg:line-clamp-5">{post.frontmatter.summary}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
