import PolitiqueConfidentialiteCookiesContent from "@__content/politique-de-confidentialite/cookies.mdx";
import PolitiqueConfidentialiteTraitementContent from "@__content/politique-de-confidentialite/traitement.mdx";
import Table from "@codegouvfr/react-dsfr/Table";
import { type Metadata } from "next";

import { MdxLink } from "@/components/mdx/Link";
import { Container } from "@/dsfr";
import { AnchorLink } from "@/dsfr/client";
import { anchorHeadingMDXComponents } from "@/mdx-components";

import { FooterConsentManagementItem } from "../../consentManagement";
import { sharedMetadata } from "../shared-metadata";

const title = "Politique de confidentialité";
const url = "/politique-de-confidentialite";

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

const PolitiqueConfidentialite = () => {
  return (
    <Container my="4w">
      <h1>{title}</h1>
      <PolitiqueConfidentialiteTraitementContent components={anchorHeadingMDXComponents} />
      <AnchorLink anchor="sous-traitants" as="h2">
        Sous-traitants
      </AnchorLink>
      <Table
        bordered
        headers={["Partenaire", "Pays destinataire", "Pays d'hébergement", "Traitement réalisé", "Garantie"]}
        data={[
          [
            "Vercel",
            "États-Unis",
            "France (AWS cdg1)",
            "Hébergement",
            <MdxLink
              key="vercel"
              title="Déclaration de confidentialité Vercel"
              href="https://vercel.com/legal/privacy-policy"
            >
              Déclaration de confidentialité Vercel
            </MdxLink>,
          ],
        ]}
      />
      <PolitiqueConfidentialiteCookiesContent
        components={{
          ...anchorHeadingMDXComponents,
          CookiesTable: () => (
            <Table
              bordered
              headers={[
                "Catégorie de cookie",
                "Nom du cookie",
                "Durée de conservation",
                "Finalités",
                "Éditeur",
                "Destination",
              ]}
              data={[
                ["Mesure d’audience anonymisée", "Matomo", "13 mois", "Mesure d’audience", "Matomo & ADEME", "France"],
              ]}
            />
          ),
          CookiesButton: () => <FooterConsentManagementItem />,
        }}
      />
    </Container>
  );
};

export default PolitiqueConfidentialite;
