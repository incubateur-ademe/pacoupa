export const config = {
  host: process.env.NEXT_PUBLIC_SITE_URL!,
  name: "PACOUPA",
  tagline:
    "Conseiller les copropriétaires dans l'installation de systèmes de chauffage décarbonés adaptés à leur logement",
  env: (process.env.PACOUPA_ENV || "dev") as "dev" | "prod" | "staging",
  matomo: {
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!,
    url: process.env.NEXT_PUBLIC_MATOMO_URL!,
  },
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION!,
  appVersionCommit: process.env.NEXT_PUBLIC_APP_VERSION_COMMIT!,
  repositoryUrl: process.env.NEXT_PUBLIC_REPOSITORY_URL!,
  formUrl: "/simulation",
  ctaTitle: "Lancez une simulation",
  tallyButtonLabel: "S'inscrire",
  tallyId: "wvybQ4",
  storeKey: "pacoupa-simulation",
};
