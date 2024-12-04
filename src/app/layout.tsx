import "./global.css";
import "react-tooltip/dist/react-tooltip.css";

import MuiDsfrThemeProvider from "@codegouvfr/react-dsfr/mui";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { type PropsWithChildren, Suspense } from "react";
import { NextAppDirEmotionCacheProvider } from "tss-react/next";

import { Matomo } from "@/components/utils/Matomo";
import { config } from "@/config";

import { defaultColorScheme } from "../defaultColorScheme";
import { StartDsfr } from "../StartDsfr";
import { sharedMetadata } from "./shared-metadata";

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
    <html
      lang="fr"
      {...getHtmlAttributes({ defaultColorScheme, lang: "fr" })}
      className={cx(GeistSans.variable, "h-full")}
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
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />

        <Suspense>
          <Matomo env={config.env} />
        </Suspense>
      </head>
      <body className="h-full">
        <DsfrProvider lang="fr">
          <NextAppDirEmotionCacheProvider options={{ key: "css" }}>
            <MuiDsfrThemeProvider>{children} </MuiDsfrThemeProvider>
          </NextAppDirEmotionCacheProvider>
        </DsfrProvider>
      </body>
    </html>
  );
};

export default RootLayout;
