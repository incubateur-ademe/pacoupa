import AccessibiliteContent from "@__content/accessibilite.mdx";
import { type Metadata } from "next";

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
  <div className="col-start-2">
    <H1>{title}</H1>
    <AccessibiliteContent components={anchorHeadingMDXComponents} />
  </div>
);

export default Accessibilite;
