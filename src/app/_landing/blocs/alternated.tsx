import Card from "@codegouvfr/react-dsfr/Card";

import { CTA } from "@/app/CTA";
import { Container, Grid, GridCol, type GridColProps } from "@/dsfr";
import { paragraphContentMDXComponents } from "@/mdx-components";

import styles from "./alternated.module.scss";
import { getHighlight } from "./helper";
import { type MDXBlocProps } from "./type";

// based on 12 columns grid
const colSizeMap: Array<GridColProps["base"]> = [6, 5, 4, 3, 2, 2, 1, 1, 1, 1, 1, 1];

export const LandingAlternatedBloc = async ({
  metadata,
  id,
  titleComponent: TitleComponent,
  highlight,
}: MDXBlocProps & { mobile?: boolean }) => {
  if (metadata.type !== "alternated") {
    throw new Error("AlternatedBloc cannot be used with metadata.type !== alternated");
  }

  // import(`@__content/landing/blocs/${id}/bloc_01.mdx`),
  const contents = (
    (await Promise.all(
      metadata.cards.map(
        (_, index) => import(`@__content/landing/blocs/${id}/bloc_${index < 9 ? "0" : ""}${index + 1}.mdx`),
      ),
    )) as Array<typeof import("*.mdx")>
  ).map(({ default: Content }, index) => <Content key={`bloc_${index}`} components={paragraphContentMDXComponents} />);

  const md = colSizeMap[metadata.cards.length - 1];
  return (
    <Container>
      <Grid haveGutters align="center">
        <GridCol>
          <TitleComponent />
        </GridCol>
        {contents.map((content, index) => (
          <GridCol key={index} md={md}>
            <Card
              shadow
              title={metadata.cards[index].title}
              imageUrl={metadata.cards[index].image.src}
              imageAlt={metadata.cards[index].image.alt}
              desc={content}
              size="large"
              classes={{
                img: styles["border-img"],
                imgTag: `!aspect-auto`,
              }}
            />
          </GridCol>
        ))}
        {highlight && <GridCol>{getHighlight(highlight)}</GridCol>}
        {metadata.cta && (
          <GridCol mt={highlight ? "0" : "2w"}>
            <CTA source={metadata.cta.source} title={metadata.cta.title} href={metadata.cta.href} asGroup>
              {metadata.cta.title}
            </CTA>
          </GridCol>
        )}
      </Grid>
    </Container>
  );
};
