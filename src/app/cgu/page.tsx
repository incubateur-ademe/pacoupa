import CguContent from "@__content/cgu.mdx";
import { type Metadata } from "next";

import { config } from "@/config";
import { Container } from "@/dsfr";
import { H1 } from "@/dsfr/base/typography";
import { anchorHeadingMDXComponents } from "@/mdx-components";

import { sharedMetadata } from "../shared-metadata";

const title = "Conditions générales d'utilisation";
const description = `Les présentes conditions générales d’utilisation (dites «CGU») fixent le cadre juridique du Site Web "${config.name}" et définissent les conditions d’accès et d’utilisation des services par l’Utilisateur.`;
const url = "/cgu";

export const metadata: Metadata = {
  ...sharedMetadata,
  title,
  description,
  openGraph: {
    ...sharedMetadata.openGraph,
    title,
    description,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const Cgu = () => (
  <Container my="4w">
    <H1>{title}</H1>
    <CguContent components={anchorHeadingMDXComponents} />
  </Container>
);

export default Cgu;
