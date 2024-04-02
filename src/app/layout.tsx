import "./global.css";
import "react-tooltip/dist/react-tooltip.css";

import { fr } from "@codegouvfr/react-dsfr";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { SkipLinks } from "@codegouvfr/react-dsfr/SkipLinks";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { type PropsWithChildren, Suspense } from "react";

import { footerId, PacoupaFooter } from "@/components/PacoupaFooter";
import { PacoupaHeader } from "@/components/PacoupaHeader";
import { Matomo } from "@/components/utils/Matomo";
import { config } from "@/config";
import { Container } from "@/dsfr";

import { defaultColorScheme } from "../defaultColorScheme";
import { StartDsfr } from "../StartDsfr";
import styles from "./layout.module.scss";
import { sharedMetadata } from "./shared-metadata";

const contentId = "content";

export const metadata: Metadata = {
  metadataBase: new URL(config.host),
  ...sharedMetadata,
  title: {
    template: `${config.name} - %s`,
    default: config.name,
  },
  openGraph: {
    title: {
      template: `${config.name} - %s`,
      default: config.name,
    },
    ...sharedMetadata.openGraph,
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html
      lang="fr"
      {...getHtmlAttributes({ defaultColorScheme, lang: "fr" })}
      className={cx(GeistSans.variable, styles.app)}
    >
      <head>
        <StartDsfr />
        <DsfrHead
          Link={Link}
          preloadFonts={[
            "Marianne-Light",
            "Marianne-Light_Italic",
            "Marianne-Regular",
            "Marianne-Regular_Italic",
            "Marianne-Medium",
            "Marianne-Medium_Italic",
            "Marianne-Bold",
            "Marianne-Bold_Italic",
            //"Spectral-Regular",
            //"Spectral-ExtraBold"
          ]}
        />
        <Script src="https://tally.so/widgets/embed.js" />

        <Suspense>
          <Matomo env={config.env} />
        </Suspense>
      </head>
      <body>
        <DsfrProvider lang="fr">
          {/* <ConsentBannerAndConsentManagement /> */}
          <SkipLinks
            links={[
              {
                anchor: `#${contentId}`,
                label: "Contenu",
              },
              {
                anchor: `#${footerId}`,
                label: "Pied de page",
              },
            ]}
          />
          {/* <Notice
            isClosable={false}
            title="Le simulateur est en phase de construction. Inscrivez-vous et nous vous préviendrons lors de sa sortie."
          /> */}

          {/* <Banner
            title={<>Le simulateur est en construction. Inscrivez-vous et nous vous préviendrons lors de sa sortie.</>}
          /> */}
          <div className={styles.app}>
            {/* <Header
              brandTop={<Brand />}
              homeLinkProps={{
                href: "/",
                title: `Accueil - ${config.name}`,
              }}
              serviceTitle={
                <>
                  {config.name}{" "}
                  <Badge as="span" noIcon severity="success">
                    Beta
                  </Badge>
                </>
              }
              // serviceTagline={config.tagline}
              operatorLogo={operatorLogo}
            /> */}
            <PacoupaHeader />

            <main
              role="main"
              id={contentId}
              // className={styles.content}
              className={cx(styles.content, fr.cx("fr-py-4w"))}
            >
              <Container>{children}</Container>
            </main>
            {/* <Follow /> */}
            <PacoupaFooter />
          </div>
        </DsfrProvider>
      </body>
    </html>
  );
};

export default RootLayout;
