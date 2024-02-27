import HeroBlocContent from "@__content/landing/hero_bloc.mdx";
import HeroTitleContent, { metadata as heroMetadata } from "@__content/landing/hero_title.mdx";
import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type Metadata } from "next";

import { config } from "@/config";
import { Box, CenteredContainer } from "@/dsfr";

import { LandingHero } from "./_landing/hero";
import { CTA } from "./CTA";
import { ErrorDisplay } from "./ErrorDisplay";
import styles from "./index.module.scss";
import { sharedMetadata } from "./shared-metadata";

const url = "/";

export const metadata: Metadata = {
  ...sharedMetadata,
  openGraph: {
    ...sharedMetadata.openGraph,
    url,
  },
  alternates: {
    canonical: url,
  },
};

const Home = () => {
  if (config.env === "prod") {
    return <ErrorDisplay code="construction" noRedirect />;
  }

  return (
    <>
      <Box as="section" pb="4w" className={cx(styles.hero, fr.cx("fr-pt-md-9w", "fr-pt-2w", "fr-mb-0"))}>
        <LandingHero metadata={heroMetadata} titleComponent={HeroTitleContent} blocComponent={HeroBlocContent} />
      </Box>

      <Box as="section" className="fr-hr">
        <CenteredContainer className="fr-pt-6w fr-pt-md-12w">
          <h2>FAQ</h2>

          <CTA source="faq" asGroup />
        </CenteredContainer>
      </Box>
    </>
  );
};
export default Home;
