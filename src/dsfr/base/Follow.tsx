import { fr } from "@codegouvfr/react-dsfr";
import Card from "@codegouvfr/react-dsfr/Card";

import { CTA } from "@/components/CTA";
import { config } from "@/config";

import { Container, Grid, GridCol } from "../layout";
import { Box, P } from "./Box";

export const Follow = () => (
  <Box className={fr.cx("fr-follow")}>
    <Container>
      <Grid>
        {/* <GridCol base={6}>
          <Box className={fr.cx("fr-follow__newsletter")}>
            <div>
              <p className="fr-h5">Contact</p>
              <p className="fr-text--sm">
                Si vous n'avez pas trouvé de réponses à vos questions, contactez-nous à{" "}
                <Link href="mailto:pacoupa@beta.gouv.fr" target="_blank">
                  pacoupa@beta.gouv.fr
                </Link>
              </p>
            </div>
          </Box>
        </GridCol> */}
        <GridCol base={6} offset={6}>
          <Card
            border
            shadow
            desc={
              <>
                <P>
                  <strong>Tenez vous informé des nouveautés.</strong>
                </P>
                <CTA source="footer" title={config.ctaTitle} href="/mentions-legales">
                  {config.ctaTitle}
                </CTA>
              </>
            }
            imageAlt=""
            size="small"
            title=""
            titleAs="h4"
          />
        </GridCol>
      </Grid>
    </Container>
  </Box>
);
