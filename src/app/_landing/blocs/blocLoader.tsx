import { readdir } from "fs/promises";

import { type MDXBlocProps } from "./type";

export type MDXTitle = typeof import("@__content/landing/blocs/*/title.mdx");
export type MDXHighlight = typeof import("@__content/landing/blocs/*/highlight.mdx");
type Imported = MDXTitle & {
  id: string;
};

export const loadBlocs = async (): Promise<MDXBlocProps[]> => {
  const ids = (await readdir("content/landing/blocs", { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const imported = (
    await Promise.all(
      ids.map<Promise<Imported>>(async id => ({
        ...((await import(`@__content/landing/blocs/${id}/title.mdx`)) as MDXTitle),
        id,
      })),
    )
  )
    .map<Omit<MDXBlocProps, "highlight">>(({ default: titleComponent, metadata, id }) => ({
      titleComponent,
      metadata,
      id,
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));

  const highlights = (
    await Promise.all(
      ids.map<Promise<MDXHighlight | null>>(async id => {
        try {
          return (await import(`@__content/landing/blocs/${id}/highlight.mdx`)) as MDXHighlight;
        } catch {
          // not found
          return null;
        }
      }),
    )
  ).map<MDXBlocProps["highlight"]>(highlight => {
    if (!highlight) {
      return null;
    }
    return {
      component: highlight.default,
      metadata: highlight.metadata,
    };
  });

  return imported.map((bloc, index) => ({
    ...bloc,
    highlight: highlights[index],
  }));
};
