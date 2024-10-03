import Content from "@__content/landing-pages/renovation-energetique-copropriete.mdx";
import { type Metadata } from "next";

import { anchorHeadingMDXComponents } from "@/mdx-components";

import { sharedMetadata } from "../../../shared-metadata";

const title = "La rénovation énergétique en copropriété";
const url = "/landing-pages/renovation-energetique-copropriete";

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
