"use client";

import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { push } from "@socialgouv/matomo-next";
import { type Dispatch, type SetStateAction, useCallback } from "react";
import { useWindowSize } from "usehooks-ts";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Mascotte1 } from "@/components/img/mascotte/Mascotte1";
import { Grid, GridCol } from "@/dsfr";
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
      <div className="flex-1">
        <Card
          header={<i className="ri-share-fill text-green-900" />}
          headerAlign="center"
          content={
            <div className="text-center">
              <Button
                priority="tertiary no outline"
                onClick={() => {
                  push([
                    "trackEvent",
                    withWorkflow ? "Page Détails solution" : "Page Résultats",
                    "Clic Partager France Renov",
                    "Partager France Renov",
                  ]);

                  navigator.clipboard.writeText(window.location.href).catch(console.error);
                  showToast(true);
                }}
                className="min-h-0 p-0 text-body-700 underline underline-offset-4 hover:!bg-decoration-300 hover:text-body-700 transition ease-in-out delay-150 hover:scale-110 duration-300"
              >
                Partagez
              </Button>{" "}
              la solution à vos voisins.
            </div>
          }
          marker="1"
          markerPosition="left"
        />
      </div>
    );
  }, [showToast, withWorkflow]);

  const Etape2 = useCallback(
    () => (
      <div className="flex-1">
        <Card
          header={<i className="ri-discuss-fill" />}
          headerAlign="center"
          content={<div className="text-center">Discutez-en en assemblée générale.</div>}
          marker="2"
          markerPosition="left"
        />
      </div>
    ),
    [],
  );

  const Etape3 = useCallback(
    () => (
      <div className="flex-1">
        <Card
          header={<i className="ri-phone-fill" />}
          headerAlign="center"
          content={<div className="text-center">Prenez contact avec un conseiller France Renov’.</div>}
          marker="3"
          markerPosition="left"
        />
      </div>
    ),
    [],
  );

  return (
    <>
      {withWorkflow && (
        <div>
          <H3 className="text-lg font-medium mb-0">Cette solution vous intéresse ?</H3>
          <Text variant="md">et maintenant ?</Text>

          {width < breakpoints.getPxValues().sm ? (
            <div className={cx("flex flex-wrap gap-8 flex-col justify-center items-start px-8")}>
              <Etape1 />
              <div className="self-end flex gap-8">
                <Mascotte1 />
                <Etape2 />
              </div>
              <Etape3 />
            </div>
          ) : (
            <div className={cx("flex flex-wrap gap-8 justify-center items-stretch")}>
              <Etape1 />
              <Etape2 />
              <Etape3 />
              <div className="self-center">
                <Mascotte1 />
              </div>
            </div>
          )}
        </div>
      )}
      <Grid className={cx("mt-8")}>
        <GridCol>
          Bénéficiez <strong>gratuitement</strong> de l’aide d’un conseiller <strong>France Rénov’</strong> pour vous
          guider dans les premières étapes de votre projet.
        </GridCol>

        <GridCol className="mt-12">
          <Button
            linkProps={{
              href: "https://france-renov.gouv.fr/preparer-projet/trouver-conseiller",
              onClick: () => {
                push([
                  "trackEvent",
                  withWorkflow ? "Page Détails solution" : "Page Résultats",
                  "Clic Trouver un conseiller",
                  "Trouver un conseiller",
                ]);
              },
            }}
          >
            Trouver un conseiller
          </Button>
        </GridCol>
      </Grid>
    </>
  );
};
