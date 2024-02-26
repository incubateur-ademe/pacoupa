import HeroBlocContent from "@__content/landing/hero_bloc.mdx";
import HeroTitleContent, { metadata as heroMetadata } from "@__content/landing/hero_title.mdx";
import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type Metadata } from "next";
import { Fragment } from "react";

import { config } from "@/config";
import { Box, CenteredContainer, Container } from "@/dsfr";
import { CollapsedSectionDynamicGroup } from "@/dsfr/base/client/CollapsedSectionDynamicGroup";

import { LandingAlternatedBloc } from "./_landing/blocs/alternated";
import { loadBlocs } from "./_landing/blocs/blocLoader";
import { LandingSingleImageBloc } from "./_landing/blocs/single-image";
import { LandingTextOnlyBloc } from "./_landing/blocs/text-only";
import { loadFaq } from "./_landing/faq/faqLoader";
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

const Home = async () => {
  if (config.env === "prod") {
    return <ErrorDisplay code="construction" noRedirect />;
  }

  const [blocs, faqQuestions] = await Promise.all([loadBlocs(), loadFaq()]);

  return (
    <>
      <Box as="section" pb="4w" className={cx(styles.hero, fr.cx("fr-pt-md-9w", "fr-pt-2w", "fr-mb-0"))}>
        <LandingHero metadata={heroMetadata} titleComponent={HeroTitleContent} blocComponent={HeroBlocContent} />
        <LandingHero mobile metadata={heroMetadata} titleComponent={HeroTitleContent} blocComponent={HeroBlocContent} />
      </Box>
      {blocs.map(({ titleComponent, metadata, id, highlight }) => (
        <Container as="section" pt="4w" className={cx("fr-hr", styles.block)} key={id} fluid>
          {(() => {
            switch (metadata.type) {
              case "single-image":
                return (
                  <Fragment key={id}>
                    <LandingSingleImageBloc
                      id={id}
                      metadata={metadata}
                      highlight={highlight}
                      titleComponent={titleComponent}
                    />
                    <LandingSingleImageBloc
                      mobile
                      id={id}
                      metadata={metadata}
                      highlight={highlight}
                      titleComponent={titleComponent}
                    />
                  </Fragment>
                );
              case "alternated":
                return (
                  <LandingAlternatedBloc
                    key={id}
                    id={id}
                    metadata={metadata}
                    highlight={highlight}
                    titleComponent={titleComponent}
                  />
                );
              case "text-only":
                return (
                  <LandingTextOnlyBloc
                    key={id}
                    id={id}
                    metadata={metadata}
                    highlight={highlight}
                    titleComponent={titleComponent}
                  />
                );
              default:
                return null;
            }
          })()}
        </Container>
      ))}
      <Box as="section" className="fr-hr">
        <CenteredContainer className="fr-pt-6w fr-pt-md-12w">
          <h2>FAQ</h2>
          <CollapsedSectionDynamicGroup
            className="fr-mb-6w"
            data={faqQuestions.map(({ id, metadata, questionComponent: Question }) => ({
              id,
              content: <Question />,
              title: metadata.question,
            }))}
          />

          <CTA source="faq" asGroup />
        </CenteredContainer>
      </Box>
    </>
  );
};
export default Home;
