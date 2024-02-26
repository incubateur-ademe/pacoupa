import { CTA } from "@/app/CTA";
import { Container, Grid, GridCol } from "@/dsfr";

import { getHighlight } from "./helper";
import { type MDXBlocProps } from "./type";

export const LandingTextOnlyBloc = async ({
  metadata,
  id,
  titleComponent: TitleComponent,
  highlight,
}: MDXBlocProps & { mobile?: boolean }) => {
  if (metadata.type !== "text-only") {
    throw new Error("SingleImageBloc cannot be used with metadata.type !== text-only");
  }

  const Content = ((await import(`@__content/landing/blocs/${id}/bloc.mdx`)) as typeof import("*.mdx")).default;

  return (
    <Container>
      <Grid haveGutters>
        <GridCol>
          <TitleComponent />
        </GridCol>
        <GridCol className="fr-px-md-4w fr-px-2w">
          <Content />
        </GridCol>
        {highlight && <GridCol>{getHighlight(highlight)}</GridCol>}
        {metadata.cta && (
          <GridCol>
            <CTA source={metadata.cta.source} title={metadata.cta.title} href={metadata.cta.href} asGroup>
              {metadata.cta.title}
            </CTA>
          </GridCol>
        )}
      </Grid>
    </Container>
  );
};
