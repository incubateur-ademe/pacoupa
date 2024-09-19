"use client";

import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog as MuiDialog, DialogContent, DialogContentText, DialogTitle, styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { push } from "@socialgouv/matomo-next";
import Link from "next/link";
import { type Dispatch, type SetStateAction, useCallback, useEffect, useState } from "react";
import { type UrlObject } from "url";
import { useWindowSize } from "usehooks-ts";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Mascotte1 } from "@/components/img/mascotte/Mascotte1";
import { Grid, GridCol } from "@/dsfr";
import { H3, H4, H5, Text } from "@/dsfr/base/typography";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
import { matomoCategory } from "@/lib/matomo-events";
import { fetchBAN } from "@/lib/services/ban";
import { fetchFranceRenovStructure, type FranceRenovStructure } from "@/lib/services/france-renov";

type Props =
  | {
      showToast: Dispatch<SetStateAction<boolean>>;
      withWorkflow: true;
    }
  | {
      showToast?: undefined;
      withWorkflow?: false;
    };

const Dialog = styled(MuiDialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: "0px 16px 50px",
  },
}));

export const FranceRenovBlock = ({ withWorkflow, showToast }: Props = {}) => {
  withWorkflow = withWorkflow || false;
  const [open, setOpen] = useState(false);
  const { store } = usePacoupaSessionStorage();
  const [franceRenovStructure, setFranceRenovStructure] = useState<FranceRenovStructure | undefined>();

  useEffect(() => {
    const runEffect = async () => {
      const codeInsee = (await fetchBAN(store.adresse!)).features[0].properties.citycode;

      try {
        setFranceRenovStructure(await fetchFranceRenovStructure(codeInsee));
      } catch (ignore) {
        // L'API pour récupérer les structures France Renov est optionnelle.
      }
    };

    if (store.adresse) {
      runEffect().catch(error => {
        console.error("Erreur réseau lors de l'appel à la BAN", error);
      });
    }
  }, [store.adresse]);

  const structureWebsite = franceRenovStructure && franceRenovStructure.Site_Internet_Structure;

  let structureHoraires;
  try {
    if (franceRenovStructure?.Horaires_Structure) {
      structureHoraires = JSON.parse(franceRenovStructure.Horaires_Structure) as string[];

      if (!Array.isArray(structureHoraires))
        throw new Error("Les horaires de la structure France Renov sont non valides");
    }
  } catch (error) {
    console.error("Erreur lors de la lecture des horaires de la structure France Renov", error);
  }

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
                    withWorkflow ? matomoCategory.solutionDetails : matomoCategory.resultats,
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
            onClick={() => {
              push([
                "trackEvent",
                withWorkflow ? matomoCategory.solutionDetails : matomoCategory.resultats,
                "Clic Trouver un conseiller",
                "Trouver un conseiller",
              ]);

              setOpen(true);
            }}
          >
            Trouver un conseiller
          </Button>

          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle id="alert-dialog-title" className="!mt-6">
              <H4 className="mb-0">Votre conseiller</H4>
            </DialogTitle>

            <MuiButton
              variant="text"
              endIcon={<CloseIcon />}
              onClick={() => setOpen(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: theme => theme.palette.grey[500],
              }}
            >
              Fermer
            </MuiButton>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <H5>{franceRenovStructure?.Nom_Structure}</H5>

                <Text variant="md" className="font-normal mb-0">
                  Adresse
                </Text>
                <Text variant="md" className="font-medium">
                  {franceRenovStructure?.Adresse_Structure} <br />
                  {franceRenovStructure?.Code_Postal_Structure} {franceRenovStructure?.Commune_Structure}
                </Text>

                <Text variant="md" className="font-normal mb-0">
                  Téléphone
                </Text>
                <Text variant="md" className="font-medium text-primary-700">
                  <Link href={`tel:${franceRenovStructure?.Telephone_Structure}`}>
                    {franceRenovStructure?.Telephone_Structure}
                  </Link>
                </Text>

                <Text variant="md" className="font-normal mb-0">
                  Mail
                </Text>
                <Text variant="md" className="font-medium text-primary-700">
                  <Link href={`mailto:${franceRenovStructure?.Email_Structure}`}>
                    {franceRenovStructure?.Email_Structure}
                  </Link>
                </Text>

                <Text variant="md" className="font-normal mb-0">
                  Site web
                </Text>
                {structureWebsite && (
                  <Text variant="md" className="font-medium text-primary-700">
                    <Link href={structureWebsite as unknown as UrlObject} target="_blank">
                      {structureWebsite}
                    </Link>
                  </Text>
                )}

                {structureHoraires && (
                  <div className="mt-8 border-solid border-l-4 border-y-0 border-r-0 border-primary-700 pl-4">
                    {structureHoraires.map(ligne => (
                      <div key={ligne}>
                        <Text variant="md" className="font-normal mb-0">
                          {ligne}
                        </Text>
                      </div>
                    ))}
                  </div>
                )}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </GridCol>
      </Grid>
    </>
  );
};
