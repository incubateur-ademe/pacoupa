import { type Metadata } from "next";

import { config } from "@/config";

const description =
  "PACOUPA a pour but d'outiller les copropriétaires dans l'installation de systèmes de chauffage décarbonés adaptés à leur logement.";

export const sharedMetadata: Metadata = {
  description,
  openGraph: {
    description,
    type: "website",
    locale: "fr_FR",
    countryName: "France",
    siteName: "PACOUPA",
    images: [
      {
        url: new URL(`/img/hero.svg`, config.host),
        alt: "PACOUPA",
      },
    ],
  },
};
