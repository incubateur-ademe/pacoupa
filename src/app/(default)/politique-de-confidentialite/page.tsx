import { PrivacyPolicy } from "@incubateur-ademe/legal-pages-react";
import { type Metadata } from "next";

import { config } from "@/config";
import { FooterConsentManagementItem } from "@/consentManagement";

import { sharedMetadata } from "../../shared-metadata";

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
    <div className="col-start-2">
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
          {
            category: "Hébergement de formulaires",
            name: "Tally",
            expiration: "7 jours",
            finalities: "Mesure d’audience",
            editor: "Tally",
            destination: "France",
          },
        ]}
        thirdParties={[
          {
            name: "Vercel",
            country: "États-Unis",
            hostingCountry: "France (AWS cdg1)",
            serviceType: "Hébergement du site web",
            policyUrl: "https://vercel.com/legal/privacy-policy",
          },
          {
            name: "Turso",
            country: "États-Unis",
            hostingCountry: "France, Paris",
            serviceType: "Hébergement des données",
            policyUrl: "https://turso.tech/privacy-policy",
          },
          {
            name: "Matomo",
            country: "États-Unis",
            hostingCountry: "Europe",
            serviceType: "Mesure d’audience anonymisée",
            policyUrl: "https://fr.matomo.org/privacy-policy/",
          },
          {
            name: "Sentry",
            country: "États-Unis",
            hostingCountry: "Europe",
            serviceType: "Surveillance des erreurs",
            policyUrl: "https://sentry.io/privacy/",
          },
          {
            name: "Tally",
            country: "Belgique",
            hostingCountry: "Europe",
            serviceType: "Hébergement de formulaires",
            policyUrl: "https://tally.so/help/terms-and-privacy",
          },
        ]}
      />
    </div>
  );
}
