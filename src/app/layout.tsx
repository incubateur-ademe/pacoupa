import "./global.css";
import "react-tooltip/dist/react-tooltip.css";

import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
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
import { NextAppDirEmotionCacheProvider } from "tss-react/next";

import { footerId, PacoupaFooter } from "@/components/PacoupaFooter";
import { PacoupaHeader } from "@/components/PacoupaHeader";
import { Matomo } from "@/components/utils/Matomo";
import { config } from "@/config";
import { ConsentBannerAndConsentManagement } from "@/consentManagement";

import { defaultColorScheme } from "../defaultColorScheme";
import { StartDsfr } from "../StartDsfr";
import { sharedMetadata } from "./shared-metadata";

const contentId = "content";

export const metadata: Metadata = {
  metadataBase: new URL(config.host),
  ...sharedMetadata,
  title: {
    template: `%s - ${config.name}`,
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
    <html lang="fr" {...getHtmlAttributes({ defaultColorScheme, lang: "fr" })} className={cx(GeistSans.variable)}>
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
          <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            <MuiDsfrThemeProvider>
              <ConsentBannerAndConsentManagement />
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
              <div className="min-h-full">
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
                  className="grid grid-cols-[16px_1fr_16px] md:grid-cols-[minmax(90px,_1fr)_minmax(320px,_1200px)_minmax(90px,_1fr)] lg:grid-cols-[minmax(120px,_1fr)_minmax(320px,_1200px)_minmax(120px,_1fr)] xl:grid-cols-[minmax(180px,_1fr)_minmax(900px,_1200px)_minmax(180px,_1fr)] gap-y-12 md:gap-y-24"
                >
                  {children}
                </main>
                {/* <Follow /> */}
                <PacoupaFooter />
              </div>
            </MuiDsfrThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </DsfrProvider>
      </body>
    </html>
  );
};

export default RootLayout;
