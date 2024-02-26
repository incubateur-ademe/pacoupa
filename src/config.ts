export const config = {
  host: process.env.NEXT_PUBLIC_SITE_URL!,
  name: "PACOUPA",
  tagline: "La solution de paiement de l'ADEME qui récompense vos achats durables",
  env: (process.env.PACOUPA_ENV || "dev") as "dev" | "prod" | "staging",
  matomo: {
    siteId: process.env.NEXT_PUBLIC_MATOMO_SITE_ID!,
    url: process.env.NEXT_PUBLIC_MATOMO_URL!,
  },
  appVersion: process.env.NEXT_PUBLIC_APP_VERSION!,
  appVersionCommit: process.env.NEXT_PUBLIC_APP_VERSION_COMMIT!,
  repositoryUrl: process.env.NEXT_PUBLIC_REPOSITORY_URL!,
  formUrl: "https://tally.so/r/xxxx",
};
