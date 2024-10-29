export const config = {
  host: process.env.NEXT_PUBLIC_SITE_URL!,
  name: "Pacoupa",
  tagline:
    "Conseiller les copropriétaires dans l'installation de systèmes de chauffage décarbonés adaptés à leur logement",
  env: (process.env.PACOUPA_ENV || "dev") as "dev" | "preprod" | "prod",
  matomo: {
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!,
    url: process.env.NEXT_PUBLIC_MATOMO_URL!,
  },
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION!,
  appVersionCommit: process.env.NEXT_PUBLIC_APP_VERSION_COMMIT!,
  repositoryUrl: process.env.NEXT_PUBLIC_REPOSITORY_URL!,
  formUrl: "/simulation",
  ctaTitle: "Lancer la simulation",
  tally: {
    inscription: {
      label: "S'inscrire",
      id: "wvybQ4",
    },
    contact: {
      id: "n9JZBV",
      label: "Contactez-nous",
    },
    feedback: {
      id: "3j9oPa",
      label: "Donnez-nous votre avis",
    },
  },
  storeKey: "pacoupa-simulation",
  cacheDuration: 1000 * 60 * 60, // 1 heure
};
