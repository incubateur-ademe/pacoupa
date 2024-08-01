import { fr } from "@codegouvfr/react-dsfr";
import Card from "@codegouvfr/react-dsfr/Card";

import { CTA } from "@/components/CTA";

import { Container, Grid, GridCol } from "../layout";
import { Text } from "./typography";

export const Follow = () => (
  <div className={fr.cx("fr-follow")}>
    <Container>
      <Grid>
        {/* <GridCol base={6}>
          <div className={fr.cx("fr-follow__newsletter")}>
            <div>
              <H5>Contact</H5>
              <Text variant="sm">
                Si vous n'avez pas trouvé de réponses à vos questions, contactez-nous à{" "}
                <Link href="mailto:pacoupa@beta.gouv.fr" target="_blank">
                  pacoupa@beta.gouv.fr
                </Link>
              </Text>
            </div>
          </div>
        </GridCol> */}
        <GridCol base={6} offset={6}>
          <Card
            imageUrl=""
            border
            shadow
            desc={
              <>
                <Text>
                  <strong>Tenez vous informé des nouveautés.</strong>
                </Text>

                <CTA source="landing" />
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
  </div>
);
