import { PrivacyPolicy } from "@incubateur-ademe/legal-pages-react";
import { config } from "dotenv";
import { type Metadata } from "next";

import { FooterConsentManagementItem } from "@/consentManagement";
import { Container } from "@/dsfr";

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

export default function PolitiqueConfidentialite() {
  return (
    <Container my="4w">
      <PrivacyPolicy
        includeBetaGouv
        cookieConsentButton={<FooterConsentManagementItem />}
        siteName={config.name}
        cookies={[
          {
            category: "Mesure d’audience anonymisée",
            name: "Matomo",
            expiration: "13 mois",
            finalities: "Mesure d’audience",
            editor: "Matomo & ADEME",
            destination: "France",
          },
        ]}
        thirdParties={[
          {
            name: "Vercel",
            country: "États-Unis",
            hostingCountry: "France (AWS cdg1)",
            serviceType: "Hébergement",
            policyUrl: "https://vercel.com/legal/privacy-policy",
          },
          // {
          //   name: "<Renseigner le nom du service>",
          //   country: "<Pays d’origine du service>",
          //   hostingCountry:
          //     "<Si le service permet de changer la localisation du stockage ou du transit des données, le préciser>",
          //   serviceType: "<Renseigner le type service (Hébergement, bdd, etc.)>",
          //   policyUrl: "<Ajouter le lien de la politique de confidentialité du service>",
          // },
        ]}
      />
    </Container>
  );
}
