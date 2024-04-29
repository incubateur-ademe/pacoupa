import { fr } from "@codegouvfr/react-dsfr";

import { Button } from "@/components/Button";
import { Grid, GridCol } from "@/dsfr";

export const FranceRenovBlock = () => {
  return (
    <>
      <Grid>
        <GridCol className={fr.cx("fr-mt-6w")}>
          Pour plus d’informations sur votre projet de rénovation, contactez un conseiller{" "}
          <strong>France Rénov’</strong>.
        </GridCol>

        <GridCol className={fr.cx("fr-mt-6w")}>
          <Button
            linkProps={{
              href: "https://france-renov.gouv.fr/preparer-projet/trouver-conseiller",
            }}
          >
            Trouver un conseiller
          </Button>
        </GridCol>
      </Grid>
    </>
  );
};
