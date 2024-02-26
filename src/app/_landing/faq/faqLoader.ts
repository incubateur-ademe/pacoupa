import { readdir } from "fs/promises";

export type MDXFAQ = typeof import("@__content/landing/faq/*.mdx");
type Imported = MDXFAQ & {
  id: string;
};

export const loadFaq = async () => {
  const ids = (await readdir("content/landing/faq")).map(file => file.replace(".mdx", ""));

  const imported = (
    await Promise.all(
      ids.map<Promise<Imported>>(async id => ({
        ...((await import(`@__content/landing/faq/${id}.mdx`)) as MDXFAQ),
        id,
      })),
    )
  )
    .map(({ default: questionComponent, metadata, id }) => ({
      questionComponent,
      metadata,
      id,
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));

  return imported;
};
