import { LegalNotice } from "@incubateur-ademe/legal-pages-react";
import { type Metadata } from "next";

import { config } from "@/config";
import { Container } from "@/dsfr";

import { sharedMetadata } from "../shared-metadata";

const title = "Mentions légales";
const url = "/mentions-legales";

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

export default function MentionsLegales() {
  return (
    <Container my="4w">
      <LegalNotice
        includeBetaGouv
        siteName={config.name}
        siteUrl={process.env.NEXT_PUBLIC_SITE_URL!}
        licenceUrl="https://github.com/incubateur-ademe/pacoupa/blob/main/LICENSE"
        privacyPolicyUrl="/politique-de-confidentialite"
        siteHost={{
          name: "Vercel Inc.",
          address: "440 N Barranca Ave #4133<br/>Covina, CA 91723",
          country: "États-Unis",
          email: "privacy@vercel.com",
        }}
      />
    </Container>
  );
}
