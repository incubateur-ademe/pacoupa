import AccessibiliteContent from "@__content/accessibilite.mdx";
import { type Metadata } from "next";

import { Container } from "@/dsfr";
import { H1 } from "@/dsfr/base/typography";
import { anchorHeadingMDXComponents } from "@/mdx-components";

import { sharedMetadata } from "../shared-metadata";

const title = "Déclaration d'accessibilité";
const url = "/accessibilite";
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

const Accessibilite = () => (
  <Container className="my-8">
    <H1>{title}</H1>
    <AccessibiliteContent components={anchorHeadingMDXComponents} />
  </Container>
);

export default Accessibilite;
