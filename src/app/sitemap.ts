import { config } from "@/config";

import { getBlogPosts } from "./(default)/blog/utils";

export const baseUrl = config.host || "https://pacoupa.ademe.fr/";

export default async function sitemap() {
  const blogs = (await getBlogPosts()).map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.publishedAt,
  }));

  const routes = ["", "/blog"].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
