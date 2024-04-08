// eslint-disable-next-line import/no-unresolved
import "server-only";

import { readdir } from "fs/promises";
// eslint-disable-next-line import/named
import { cache } from "react";

export type SolutionMDX = typeof import("content/solutions/*.mdx");

type Imported = SolutionMDX & {
  id: string;
};

/**
 * Get all solutions from mdx files.
 */
export const getSolutions = async () => {
  const ids = (await readdir("content/solutions/")).map(file => file.replace(".mdx", ""));

  const imported = (
    await Promise.all(
      ids.map<Promise<Imported>>(async id => ({
        ...((await import(`/content/solutions/${id}.mdx`)) as SolutionMDX),
        id,
      })),
    )
  )
    .map(({ default: solutionComponent, frontmatter, id }) => ({
      solutionComponent,
      frontmatter,
      id,
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));

  return imported;
};

/**
 * Get a solution by its id.
 *
 * @example getSolution("00") for RCU
 */
export const getSolution = cache(async (id: string) => {
  const solutions = await getSolutions();

  return solutions.find(solution => solution.id === id);
});
