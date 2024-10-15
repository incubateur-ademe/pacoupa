import Content, { frontmatter } from "@__content/faq/index.mdx";
import { type Metadata } from "next";

import { anchorHeadingMDXComponents } from "@/mdx-components";

import { sharedMetadata } from "../../shared-metadata";

const title = frontmatter.titre;
const url = "/faq";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const FaqPage = () => (
  <>
    <Content components={anchorHeadingMDXComponents} />
  </>
);

export default FaqPage;
