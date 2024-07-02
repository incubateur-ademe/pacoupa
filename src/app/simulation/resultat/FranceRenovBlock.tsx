import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type Dispatch, type SetStateAction } from "react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Box, Grid, GridCol } from "@/dsfr";
import { H3, Text } from "@/dsfr/base/typography";

type Props =
  | {
      setOpen: Dispatch<SetStateAction<boolean>>;
      withWorkflow: true;
    }
  | {
      setOpen?: undefined;
      withWorkflow?: false;
    };

export const FranceRenovBlock = ({ withWorkflow, setOpen }: Props = {}) => {
  withWorkflow = withWorkflow || false;

  return (
    <>
      {withWorkflow && (
        <Box>
          <H3 className="text-lg font-medium mb-0">Cette solution vous intéresse ?</H3>
          <Text className="text-base font-normal">et maintenant ?</Text>

          <Box className={cx("flex flex-wrap gap-4")}>
            <Card
              title={
                <Box className={cx("flex", "justify-between")}>
                  <i className="ri-number-1" />
                  <Button
                    priority="tertiary"
                    iconId="ri-share-fill"
                    iconPosition="right"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href).catch(console.error);
                      setOpen(true);
                    }}
                  >
                    {""}
                  </Button>
                </Box>
              }
              desc={<>Partagez la solution à vos voisins.</>}
              horizontal
              size="small"
              titleAs="h3"
              className={cx("w-[250px]")}
            />

            <Card
              title={
                <Box className={cx("flex", "justify-between")}>
                  <i className="ri-number-2" />
                  <i className="ri-discuss-fill" />
                </Box>
              }
              desc={<>Discutez-en en assemblée générale.</>}
              horizontal
              size="small"
              titleAs="h3"
              className={cx("w-[250px]")}
            />
            <Card
              title={
                <Box className={cx("flex", "justify-between")}>
                  <i className="ri-number-3" />
                  <i className="ri-phone-fill" />
                </Box>
              }
              desc={<>Prenez contact avec un conseiller France Renov’.</>}
              horizontal
              size="small"
              titleAs="h3"
              className={cx("w-[250px]")}
            />
          </Box>
        </Box>
      )}
      <Grid className={cx("mt-8")}>
        {/* <GridCol className={fr.cx("fr-mt-6w")}> */}
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
