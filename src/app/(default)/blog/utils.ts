import { readdir } from "fs/promises";
import { type MDXProps } from "mdx/types";
import path from "path";
import { z } from "zod";

const MetadataSchema = z.object({
  image: z.string().optional(),
  publishedAt: z.string(),
  draft: z.boolean().default(true),
  summary: z.string(),
  title: z.string(),
});

export function formatDate(date: string) {
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const fullDate = targetDate.toLocaleString("fr-fr", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate}`;
}

type GetBlogPostsReturn = MDXFormat[];

type MDXFormat = {
  content: (props: MDXProps) => JSX.Element;
  frontmatter: z.infer<typeof MetadataSchema>;
  slug: string;
};

type RemarkCompileReturnWithFilename = {
  default: (props: MDXProps) => JSX.Element;
  filename: string;
  frontmatter: Record<string, unknown>;
};

export const getBlogPosts = async (): Promise<GetBlogPostsReturn> => {
  // List all mdx files.
  const fileNames = (await readdir("content/posts", { withFileTypes: true }))
    .filter(filenode => filenode.isFile())
    .filter(dir => dir.name.endsWith(".mdx"))
    .map(dir => dir.name);

  // Compilation of mdx files.
  const mdxFilesWithUnknownFrontmatter = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    fileNames.map<Promise<RemarkCompileReturnWithFilename>>(async filename => ({
      ...(await import(`@__content/posts/${filename}`)),
      filename,
    })),
  );

  // Transformation and parsing of frontmatter.
  const mdxFiles = mdxFilesWithUnknownFrontmatter.map(file => ({
    content: file.default,
    frontmatter: MetadataSchema.parse(file.frontmatter),
    slug: path.basename(file.filename, path.extname(file.filename)),
  }));

  return mdxFiles;
};
