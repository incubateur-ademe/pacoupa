import { readdir } from "fs/promises";
import { type MDXProps } from "mdx/types";
import path from "path";
import { z } from "zod";

const prefixImages = "/img/blog";

const MetadataSchema = z.object({
  image: z
    .string()
    .optional()
    .transform(value => (value ? `${prefixImages}/${value}` : undefined)),
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

const sluggify = (filename: string) => {
  const slugRegex = /^[a-z0-9-]+$/;

  const slug = path.basename(filename, path.extname(filename));

  if (!slugRegex.test(slug)) {
    throw new Error(`Invalid slug found in ${filename}: ${slug}`);
  }

  return slug;
};

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

/**
 * Get all MDX slugs and check if slug are valid.
 *
 * @returns Get all MDX slugs
 */
const getMDXFilenames = async () =>
  (await readdir("content/posts", { withFileTypes: true }))
    .filter(filenode => filenode.isFile())
    .filter(dir => dir.name.endsWith(".mdx"))
    .map(dir => dir.name);

const loadMDXFiles = async (fileNames: string[]) => {
  // Compilation of mdx files.
  const mdxFilesWithUnknownFrontmatter = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    fileNames.map<Promise<RemarkCompileReturnWithFilename>>(async filename => ({
      ...(await import(`@__content/posts/${filename}`)),
      filename,
    })),
  );

  // Check if frontmatter and slug are valid.
  for (const file of mdxFilesWithUnknownFrontmatter) {
    if (!file.frontmatter) {
      throw new Error(`No frontmatter found in ${file.filename}`);
    }
    const result = MetadataSchema.safeParse(file.frontmatter);

    if (!result.success) {
      throw new Error(`Invalid frontmatter found in ${file.filename}: ${JSON.stringify(result.error.errors, null, 2)}`);
    }

    sluggify(file.filename);
  }

  // Transform data and parse frontmatter.
  const mdxFiles = mdxFilesWithUnknownFrontmatter.map(file => ({
    content: file.default,
    frontmatter: MetadataSchema.parse(file.frontmatter),
    slug: sluggify(file.filename),
  }));

  return mdxFiles;
};

/**
 * Return all blog posts in MDX format.
 */
export const getBlogPosts = async (): Promise<MDXFormat[]> => {
  const fileNames = await getMDXFilenames();

  return await loadMDXFiles(fileNames);
};

/**
 * Return the blog post with the given slug.
 */
export const getBlogPost = async (slug: string): Promise<MDXFormat> => {
  const fileNames = await getMDXFilenames();

  // Find the file that matches the given slug.
  const matchingFile = fileNames.find(filename => sluggify(filename));

  if (!matchingFile) {
    throw new Error(`No blog post found with slug: ${slug}`);
  }

  const file = (await import(`@__content/posts/${matchingFile}`)) as RemarkCompileReturnWithFilename;

  return {
    content: file.default,
    frontmatter: MetadataSchema.parse(file.frontmatter),
    slug,
  };
};
