import { notFound } from "next/navigation";

import { getSolution, getSolutions } from "@/lib/server/solutions-mdx";

const dynamicParams = false;

export async function generateStaticParams() {
  const solutions = await getSolutions();

  return solutions.map(({ id, frontmatter, solutionComponent }) => ({
    id,
    frontmatter,
    solutionComponent,
  }));
}

const SolutionPage = async ({ params }: { params: { id: string } }) => {
  const solution = await getSolution(params.id);

  if (!solution?.frontmatter) {
    notFound();
  }

  return (
    <>
      <h1>Solution {params.id}</h1>

      <pre>frontmatter : {JSON.stringify(solution.frontmatter, null, 2)}</pre>
    </>
  );
};

export default SolutionPage;
