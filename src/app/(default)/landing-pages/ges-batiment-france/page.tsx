import Content from "@__content/landing-pages/ges-batiment-france.mdx";
import { type Metadata } from "next";

import { anchorHeadingMDXComponents } from "@/mdx-components";

import { sharedMetadata } from "../../../shared-metadata";

const title = "Quelle part du bâtiment dans l’émission de Gaz à Effet de Serre (GES) en France et comment la réduire ?";
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
