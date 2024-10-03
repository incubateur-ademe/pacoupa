import Content, { frontmatter } from "@__content/landing-pages/ges-batiment-france.mdx";
import { type Metadata } from "next";

import { anchorHeadingMDXComponents } from "@/mdx-components";

import { sharedMetadata } from "../../../shared-metadata";

const title = frontmatter.titre;
const url = "/landing-pages/ges-batiment-france";

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

const LandingPage = () => (
  <>
    <Content components={anchorHeadingMDXComponents} />
  </>
);

export default LandingPage;
