import Content from "@__content/landing-pages/chauffage-energie-renouvelable-copropriete.mdx";
import { type Metadata } from "next";

import { anchorHeadingMDXComponents } from "@/mdx-components";

import { sharedMetadata } from "../../../shared-metadata";

const title = "Les systèmes de chauffage à énergie renouvelable (ENR) pour les copropriétés";
const url = "/landing-pages/chauffage-energie-renouvelable-copropriete";

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
