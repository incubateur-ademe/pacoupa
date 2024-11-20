import { type Metadata } from "next";
import { notFound } from "next/navigation";

import { baseUrl } from "@/app/sitemap";
import { H1 } from "@/dsfr/base/typography";

import { formatDate, getBlogPosts } from "../utils";

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map(post => ({
    slug: post.slug,
  }));
}

type GenerateMetadataProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata | undefined> {
  const post = (await getBlogPosts()).find(post => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, publishedAt: publishedTime, summary: description, image } = post.frontmatter;
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function Blog({ params }: Props) {
  const post = (await getBlogPosts()).find(post => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const Content = post.content;

  return (
    <>
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: post.frontmatter.title,
              datePublished: post.frontmatter.publishedAt,
              dateModified: post.frontmatter.publishedAt,
              description: post.frontmatter.summary,
              image: post.frontmatter.image
                ? `${baseUrl}${post.frontmatter.image}`
                : `/og?title=${encodeURIComponent(post.frontmatter.title)}`,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Organization",
                name: "Blog Pacoupa",
              },
            }),
          }}
        />
        <H1 className="mb-3">{post.frontmatter.title}</H1>
        <div className="flex justify-between items-center mb-2 text-sm">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(post.frontmatter.publishedAt)}</p>
        </div>
        <article className="prose">
          <Content />
        </article>
      </section>
    </>
  );
}
