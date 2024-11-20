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
      <div className="mb-8">
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
          <div className="w-full flex flex-col justify-center items-center space-x-0 md:space-x-2">
            <H2 as="h4" className="text-neutral-900 dark:text-neutral-100 tracking-tight mb-1">
              {firstPost.frontmatter.title}
            </H2>
            <p className="text-neutral-600 tabular-nums text-sm">{formatDate(firstPost.frontmatter.publishedAt)}</p>
            <p>{firstPost.frontmatter.summary}</p>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-8">
        {restPosts.map(post => (
          <div key={post.slug} className="mb-8">
            <Link className="flex flex-col space-y-1 bg-none" href={`/blog/${post.slug}`}>
              {post.frontmatter.image && (
                <div className="mb-8 relative w-full h-[400px]">
                  <Image
                    src={post.frontmatter.image}
                    alt="Image de décoration de l'article"
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="w-full flex flex-col justify-center items-center space-x-0 md:space-x-2">
                <H2 as="h5" className="text-neutral-900 tracking-tight mb-1">
                  {post.frontmatter.title}
                </H2>
                <p className="text-neutral-600 dark:text-gray-500 tabular-nums text-sm">
                  {formatDate(post.frontmatter.publishedAt)}
                </p>
                <p>{post.frontmatter.summary}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
