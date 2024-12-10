import { type Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Button } from "@/components/Button";
import { config } from "@/config";
import { H2 } from "@/dsfr/base/typography";
import { cn } from "@/utils/cn";

import { formatDate, getBlogPost, getBlogPosts } from "../utils";

const baseUrl = config.host;

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
  const post = await getBlogPost(params.slug);
  if (!post) {
    return;
  }

  const { title, publishedAt, summary, image } = post.frontmatter;
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: "article",
      publishedTime: publishedAt,
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
      description: summary,
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
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const { title, publishedAt, summary, image } = post.frontmatter;
  const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  const Content = post.content;

  return (
    <div className="max-w-[680px] mx-auto">
      <section>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              datePublished: publishedAt,
              dateModified: publishedAt,
              description: summary,
              image: ogImage,
              url: `${baseUrl}/blog/${post.slug}`,
              author: {
                "@type": "Organization",
                name: `${config.name || "Pacoupa"} - ADEME`,
              },
            }),
          }}
        />

        <Button
          priority="tertiary no outline"
          iconId="ri-arrow-left-line"
          iconPosition="left"
          title="Retour"
          linkProps={{
            href: "/blog",
            title: "Retour à la liste des articles",
          }}
          className={cn("pl-0")}
        >
          Retour
        </Button>

        {image && (
          <div className="mb-8 relative w-full h-[400px]">
            <Image src={image} alt="Image de décoration de l'article" fill className="rounded-lg object-cover" />
          </div>
        )}
        <H2 as="h3" className="my-3">
          {title}
        </H2>
        <div className="flex justify-between items-center mb-2 text-sm">
          <p className="text-sm font-thin text-neutral-600 dark:text-neutral-400">{formatDate(publishedAt)}</p>
        </div>
        <article className="prose">
          <Content />
        </article>
      </section>
    </div>
  );
}
