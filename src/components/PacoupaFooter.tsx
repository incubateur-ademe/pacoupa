import { Footer } from "@codegouvfr/react-dsfr/Footer";
import { type HeaderProps } from "@codegouvfr/react-dsfr/Header";

import { config } from "@/config";
import { FooterPersonalDataPolicyItem } from "@/consentManagement";

import styles from "./PacoupaFooter.module.scss";

export const footerId = "footer";

const operatorLogo: HeaderProps["operatorLogo"] = {
  imgUrl: "/img/ademe-logo-2022-1.svg",
  alt: "ADEME",
  orientation: "vertical",
};

export const PacoupaFooter = () => {
  return (
    <div className={styles.border}>
      <Footer
        id={footerId}
        accessibility="non compliant"
        accessibilityLinkProps={{ href: "/accessibilite" }}
        contentDescription={`${config.name} est un service développé par l'accélérateur de la transition écologique de l'ADEME.`}
        operatorLogo={operatorLogo}
        className={styles.footerPacoupa}
        bottomItems={[
          {
            text: "CGU",
            linkProps: { href: "/cgu" },
          },
          <FooterPersonalDataPolicyItem key="FooterPersonalDataPolicyItem" />,
          {
            text: "Politique des cookies",
            linkProps: { href: "/politique-des-cookies" },
          },
          // {
          //   ...headerFooterDisplayItem,
          //   iconId: "fr-icon-theme-fill",
          // },
          // <FooterConsentManagementItem key="FooterConsentManagementItem" />,
          {
            text: <>▲&nbsp;Propulsé par Vercel</>,
            linkProps: {
              href: "https://vercel.com/?utm_source=ademe&utm_campaign=oss",
              className: "font-geist-sans",
            },
          },
          {
            text: `Version ${config.appVersion}.${config.appVersionCommit.slice(0, 7)}`,
            linkProps: {
              href: `${config.repositoryUrl}/commit/${config.appVersionCommit}` as never,
            },
          },
        ]}
        termsLinkProps={{ href: "/mentions-legales" }}
        license={
          <>
            Sauf mention contraire, tous les contenus de ce site sont sous{" "}
            <a href={`${config.repositoryUrl}/blob/main/LICENSE`} target="_blank" rel="noreferrer">
              licence Apache 2.0
            </a>
          </>
        }
        linkList={[
          {
            categoryName: "Nos partenaires",
            links: [
              {
                linkProps: {
                  href: "https://france-renov.gouv.fr",
                },
                text: "France Renov'",
              },
              {
                linkProps: {
                  href: "https://www.dossierfacile.logement.gouv.fr",
                },
                text: "Dossier Facile",
              },
              {
                linkProps: {
                  href: "https://france-chaleur-urbaine.beta.gouv.fr",
                },
                text: "France Chaleur Urbaine",
              },
              {
                linkProps: {
                  href: "https://mesaidesreno.beta.gouv.fr",
                },
                text: "Mes aides Réno",
              },
              {
                linkProps: {
                  href: "https://zerologementvacant.beta.gouv.fr",
                },
                text: "Zéro Logement Vacant",
              },
            ],
          },
          {
            categoryName: "Liens utiles",
            links: [
              {
                linkProps: {
                  href: "https://beta.gouv.fr/startups/pacoupa.html",
                },
                text: "À propos",
              },
              {
                linkProps: {
                  href: "mailto:pacoupa@beta.gouv.fr",
                },
                text: "Contact",
              },
            ],
          },
          {
            categoryName: "En savoir plus",
            links: [
              {
                linkProps: {
                  href: "/landing-pages/renovation-energetique-copropriete",
                },
                text: "La rénovation énergétique en copropriété",
              },
              {
                linkProps: {
                  href: "/landing-pages/chauffage-energie-renouvelable-copropriete",
                },
                text: "Les systèmes de chauffage à énergie renouvelable (ENR) pour les copropriétés",
              },
              {
                linkProps: {
                  href: "/landing-pages/ges-batiment-france",
                },
                text: "Quelle part du bâtiment dans l’émission de Gaz à Effet de Serre (GES) en France et comment la réduire?",
              },
            ],
          },
        ]}
      />
    </div>
  );
};
