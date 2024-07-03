import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Mascotte1 } from "@/components/img/mascotte/Mascotte1";
import { Box, Grid, GridCol } from "@/dsfr";
import { H3, Text } from "@/dsfr/base/typography";

type Props =
  | {
      showToast: Dispatch<SetStateAction<boolean>>;
      withWorkflow: true;
    }
  | {
      showToast?: undefined;
      withWorkflow?: false;
    };

export const FranceRenovBlock = ({ withWorkflow, showToast }: Props = {}) => {
  withWorkflow = withWorkflow || false;

  return (
    <>
      {withWorkflow && (
        <Box>
          <H3 className="text-lg font-medium mb-0">Cette solution vous intéresse ?</H3>
          <Text className="text-base font-normal">et maintenant ?</Text>

          <Box className={cx("flex flex-wrap flex-col xl:flex-row gap-8 xl:justify-center")}>
            <Box className={cx("w-[200px]")}>
              <Card
                header={
                  <Button
                    priority="tertiary no outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href).catch(console.error);
                      showToast(true);
                    }}
                  >
                    <i className="ri-share-fill text-green-900" />
                  </Button>
                }
                headerAlign="center"
                content={<Box className="text-center">Partagez la solution à vos voisins.</Box>}
                marker="1"
                markerPosition="left"
              />
            </Box>

            <Box className={cx("w-[200px]")}>
              <Card
                header={<i className="ri-discuss-fill" />}
                headerAlign="center"
                content={<Box className="text-center">Discutez-en en assemblée générale.</Box>}
                marker="2"
                markerPosition="left"
              />
            </Box>

            <Box className={cx("w-[200px]")}>
              <Card
                header={<i className="ri-phone-fill" />}
                headerAlign="center"
                content={<Box className="text-center">Prenez contact avec un conseiller France Renov’.</Box>}
                marker="3"
                markerPosition="left"
              />
            </Box>

            <Mascotte1 />
          </Box>
        </Box>
      )}
      <Grid className={cx("mt-8")}>
        <GridCol>
          Bénéficiez <strong>gratuitement</strong> de l’aide d’un conseiller <strong>France Rénov’</strong> pour vous
          guider dans les premières étapes de votre projet.
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
