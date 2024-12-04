import { type MetadataRoute } from "next";

import { config } from "@/config";

import { getBlogPosts } from "./(decorated)/(center)/blog/utils";

export const baseUrl = config.host || "https://pacoupa.ademe.fr/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogs = (await getBlogPosts()).map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.frontmatter.publishedAt,
  }));

  const lastModified = new Date().toISOString().split("T")[0];

  const routes = [
    { url: `${baseUrl}/`, lastModified },
    { url: `${baseUrl}/simulation`, lastModified },
    { url: `${baseUrl}/contact`, lastModified },
    { url: `${baseUrl}/faq`, lastModified },
    { url: `${baseUrl}/methodologie`, lastModified },
    { url: `${baseUrl}/accessibilite`, lastModified },
    { url: `${baseUrl}/mentions-legales`, lastModified },
    { url: `${baseUrl}/cgu`, lastModified },
    { url: `${baseUrl}/politique-de-confidentialite`, lastModified },
    { url: `${baseUrl}/politique-des-cookies`, lastModified },
    { url: `${baseUrl}/blog`, lastModified },
  ] as MetadataRoute.Sitemap;

  return [...routes, ...blogs];
}
