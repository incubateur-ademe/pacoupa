import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import Image from "next/image";
import { type ReactNode } from "react";

import { CTA } from "@/app/CTA";
import { Box, Container, Grid, GridCol } from "@/dsfr";

import { getGridImageOffset, getHighlight } from "./helper";
import { type MDXBlocProps } from "./type";

interface SubProps {
  content: ReactNode;
  highlight?: MDXBlocProps["highlight"];
  image: ReactNode;
  metadata: Extract<MDXBlocProps["metadata"], { type: "single-image" }>;
  title: ReactNode;
}

export const LandingSingleImageBloc = async ({
  metadata,
  id,
  titleComponent: TitleComponent,
  highlight,
  mobile,
}: MDXBlocProps & { mobile?: boolean }) => {
  if (metadata.type !== "single-image") {
    throw new Error("SingleImageBloc cannot be used with metadata.type !== single-image");
  }

  const Content = ((await import(`@__content/landing/blocs/${id}/bloc.mdx`)) as typeof import("*.mdx")).default;

  const subProps: SubProps = {
    content: <Content />,
    image: <Image className="!relative" src={metadata.image.src} alt={metadata.image.alt} fill />,
    title: <TitleComponent />,
    metadata,
    highlight,
  };

  return mobile ? <LandingSingleImageBlocMobile {...subProps} /> : <LandingSingleImageBlocDesktop {...subProps} />;
};

const LandingSingleImageBlocMobile = ({ content, title, image, metadata, highlight }: SubProps) => (
  <Container className="md:hidden">
    <Grid haveGutters>
      <GridCol>{title}</GridCol>
      <GridCol {...getGridImageOffset(metadata.image.mobile?.size)}>{image}</GridCol>
      <GridCol>{content}</GridCol>
      {highlight && <GridCol>{getHighlight(highlight)}</GridCol>}
      {metadata.cta && (
        <GridCol>
          <CTA source={metadata.cta.source} title={metadata.cta.title} asGroup href={metadata.cta.href}>
            {metadata.cta.title}
          </CTA>
        </GridCol>
      )}
    </Grid>
  </Container>
);

const LandingSingleImageBlocDesktop = ({ content, title, image, metadata, highlight }: SubProps) => (
  <Container className="hidden md:flex">
    <Grid haveGutters className={cx(metadata.image.position === "right" && "flex-row-reverse")}>
      <GridCol base={5}>{image}</GridCol>
      <GridCol base={7}>
        {title}
        <Box className={cx("fr-pt-4w", "fr-pb-2w")}>{content}</Box>
        {highlight && <GridCol>{getHighlight(highlight)}</GridCol>}
        {metadata.cta && (
          <CTA source={metadata.cta.source} title={metadata.cta.title} href={metadata.cta.href}>
            {metadata.cta.title}
          </CTA>
        )}
      </GridCol>
    </Grid>
  </Container>
);
