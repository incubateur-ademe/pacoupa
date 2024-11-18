import { getBlogPosts } from "./(default)/blog/utils";

export const baseUrl = "https://portfolio-blog-starter.vercel.app";

export default function sitemap() {
  const blogs = getBlogPosts().map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const routes = ["", "/blog"].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
