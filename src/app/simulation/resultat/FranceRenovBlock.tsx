import { fr } from "@codegouvfr/react-dsfr";
import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

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
  const { width = 0 } = useWindowSize({ debounceDelay: 100, initializeWithValue: false });

  const Etape1 = useCallback(() => {
    if (!showToast) return null;

    return (
      <Box className={cx("w-[160px]")}>
        <Card
          header={<i className="ri-share-fill text-green-900" />}
          headerAlign="center"
          content={
            <Box className="text-center">
              <Button
                priority="tertiary no outline"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href).catch(console.error);
                  showToast(true);
                }}
                className="min-h-0 p-0 text-green-700 underline underline-offset-4 hover:!bg-green-50 hover:text-green-700 transition ease-in-out delay-150 hover:scale-110 duration-300"
              >
                Partagez
              </Button>{" "}
              la solution à vos voisins.
            </Box>
          }
          marker="1"
          markerPosition="left"
        />
      </Box>
    );
  }, [showToast]);

  const Etape2 = useCallback(
    () => (
      <Box className={cx("w-[160px]")}>
        <Card
          header={<i className="ri-discuss-fill" />}
          headerAlign="center"
          content={<Box className="text-center">Discutez-en en assemblée générale.</Box>}
          marker="2"
          markerPosition="left"
        />
      </Box>
    ),
    [],
  );

  const Etape3 = useCallback(
    () => (
      <Box className={cx("w-[160px]")}>
        <Card
          header={<i className="ri-phone-fill" />}
          headerAlign="center"
          content={<Box className="text-center">Prenez contact avec un conseiller France Renov’.</Box>}
          marker="3"
          markerPosition="left"
        />
      </Box>
    ),
    [],
  );

  return (
    <>
      {withWorkflow && (
        <Box>
          <H3 className="text-lg font-medium mb-0">Cette solution vous intéresse ?</H3>
          <Text className="text-base font-normal">et maintenant ?</Text>

          {width < breakpoints.getPxValues().sm ? (
            <Box className={cx("flex flex-wrap gap-8 flex-col justify-center items-start px-8")}>
              <Etape1 />
              <Box className="self-end flex gap-8">
                <Mascotte1 />
                <Etape2 />
              </Box>
              <Etape3 />
            </Box>
          ) : (
            <Box className={cx("flex flex-wrap gap-8 justify-center items-stretch")}>
              <Etape1 />
              <Etape2 />
              <Etape3 />
              <Box className="self-center">
                <Mascotte1 />
              </Box>
            </Box>
          )}
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
