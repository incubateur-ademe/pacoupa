import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog as MuiDialog, DialogContent, DialogTitle, styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { push } from "@socialgouv/matomo-next";
import Image from "next/image";
import { type PropsWithChildren, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { Card } from "@/components/Card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/Carousel";
import { FranceImage } from "@/components/img/FranceImage";
import { ChauffageImage } from "@/components/img/usages/ChauffageImage";
import { EcsImage } from "@/components/img/usages/EcsImage";
import { H6 } from "@/dsfr/base/typography";
import { type FicheReference } from "@/lib/common/domain/values/FicheReference";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { matomoCategory } from "@/lib/matomo-events";

import { familleImageMap } from "../helper";
import { Usage } from "../Usage";
import { DoorImage } from "./DoorImage";
import { HemletImage } from "./HelmetImage";
import { SurfaceImage } from "./SurfaceImage";

type Props = {
  fiche: FicheReference;
  solution: SolutionAvecEnergieCoutAide;
};

const Dialog = styled(MuiDialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: "0px 16px 50px",
  },
  "& .MuiDialogTitle-root": {
    "padding-right": "0px",
  },
  "& .MuiPaper-root": {
    borderRadius: "0.5rem",
  },
}));

type FicheDialogProps = {
  fiche: FicheReference;
  open: boolean;
  setOpen: (open: boolean) => void;
  solution: SolutionAvecEnergieCoutAide;
};

const FicheDialog = ({ open, setOpen, fiche, solution }: FicheDialogProps) => {
  const { width = 0 } = useWindowSize({ debounceDelay: 100, initializeWithValue: false });

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={width > breakpoints.getPxValues().sm ? false : true}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title" className="!mt-4 !mr-0  !text-[22px] !text-body-500 !pl-4">
          <div className="flex justify-between items-center">
            Exemple d’application
            <MuiButton
              variant="text"
              endIcon={<CloseIcon />}
              onClick={() => setOpen(false)}
              sx={{
                color: theme => theme.palette.grey[500],
              }}
            >
              <span className="sr-only">Fermer</span>
            </MuiButton>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="grid grid-cols-[80px_1fr]">
            <div>
              <FranceImage className="" />
            </div>
            <div className="flex flex-col">
              <H6 className="mb-0 text-balance">{fiche.titrePrincipal}</H6>
              <div className="text-gray-600 text-balance">{fiche.lieu}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 place-content-center mt-8">
            {fiche.nbLogements ? (
              <div className="flex flex-col justify-center items-center">
                <div className="w-10">
                  <DoorImage />
                </div>
                <div className="text-center">{fiche.nbLogements} logements</div>
              </div>
            ) : null}
            {fiche.nbm2 ? (
              <div className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10">
                    <SurfaceImage />
                  </div>
                  <div className="text-center">{new Intl.NumberFormat("fr-FR").format(fiche.nbm2)} m&sup2;</div>
                </div>
              </div>
            ) : null}
            {fiche.anneeConstruction ? (
              <div className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-10">
                    <HemletImage />
                  </div>
                  <div className="text-center">{fiche.anneeConstruction}</div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col md:flex-row mt-8 gap-8 justify-start items-center md:items-start">
            <Card
              content={
                <div className="">
                  <div className="text-base font-medium">Solution initiale</div>

                  {fiche.estNeuf ? (
                    <div className="mt-4">Construction neuve</div>
                  ) : (
                    <>
                      <div className="mt-4">
                        <div className="flex items-center">
                          <div className="text-sm font-normal leading-6 size-6 mr-1">
                            <ChauffageImage />
                          </div>
                          Chauffage
                        </div>
                        <div className="text-sm font-bold ml-7 mt-1">{fiche.avantChauffage ?? "inconnu"}</div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center">
                          <div className="text-sm font-normal leading-6 size-6 mr-1">
                            <EcsImage />
                          </div>
                          Eau chaude
                        </div>
                        <div className="text-sm font-bold ml-7 mt-1">{fiche.avantECS ?? "Inconnu"}</div>
                      </div>
                    </>
                  )}
                </div>
              }
            />

            <Card
              content={
                <>
                  <div className="">
                    <div className="text-base font-medium">Solution installée</div>

                    <Card.CardHeader
                      image={
                        <div className="w-10 h-10 flex items-center justify-center">
                          {familleImageMap[solution.familleSolution]}
                        </div>
                      }
                      title={<div className="text-balance">{solution.nom}</div>}
                    />
                    <div className="mt-4">
                      <Usage solution={solution} />
                    </div>

                    {!!fiche.detailMaterielsInstalles.length && (
                      <>
                        <div className="text-sm font-medium">Détail des matériels installés</div>
                        <ul className="text-sm">
                          {fiche.detailMaterielsInstalles.map((materiel, index) => (
                            <li key={index}>{materiel}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </>
              }
            />
          </div>

          <div>
            {fiche.avantages && fiche.avantages.length >= 1 && (
              <>
                <h3 className="text-base font-medium mt-8">Les + du projet</h3>
                <Callout
                  type="pacoupa"
                  content={
                    fiche.avantages.length == 1 ? (
                      <div className="text-sm">{fiche.avantages[0]}</div>
                    ) : (
                      <ul className="text-sm">
                        {fiche.avantages.map((avantage, index) => (
                          <li key={index}>{avantage}</li>
                        ))}
                      </ul>
                    )
                  }
                />
              </>
            )}
          </div>

          <div>
            {fiche.images && fiche.images.length >= 1 && (
              <>
                <h3 className="text-base font-medium mt-8">Galerie</h3>

                <Carousel>
                  <CarouselContent>
                    {fiche.images.map(image => (
                      <>
                        <CarouselItem>
                          <div className="relative w-[calc(100%-2rem)] h-[300px] mx-auto">
                            <Image
                              src={image}
                              alt={fiche.titrePrincipal}
                              sizes="300px"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </CarouselItem>
                      </>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-medium mt-8">Réalisation</h3>

            {fiche.maitreOuvrage && (
              <div>
                <div className="text-sm font-normal leading-6">Maître d'ouvrage</div>
                <div className="text-sm font-medium">{fiche.maitreOuvrage}</div>
              </div>
            )}
            {fiche.bureauEtude && (
              <div>
                <div className="text-sm font-normal leading-6">Bureau d'étude</div>
                <div className="text-sm font-medium">{fiche.bureauEtude}</div>
              </div>
            )}
            {fiche.installateur && (
              <div>
                <div className="text-sm font-normal leading-6">Installateur</div>
                <div className="text-sm font-medium">{fiche.installateur}</div>
              </div>
            )}
            {fiche.anneeLivraison && (
              <div>
                <div className="text-sm font-normal leading-6">Livraison</div>
                <div className="text-sm font-medium">{fiche.anneeLivraison}</div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export const FicheReferenceCard = ({ fiche, solution }: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        content={
          <div className="grid grid-cols-[80px_1fr] gap-8">
            <div>
              <FranceImage className="" />
            </div>
            <div className="flex flex-col">
              <H6 className="mb-0">{fiche.titrePrincipal}</H6>
              <div className="text-gray-600">{fiche.lieu}</div>
              <div className="self-end">
                <Button
                  priority="tertiary"
                  onClick={() => {
                    push(["trackEvent", matomoCategory.resultats, "Clic fiche de référence", "Fiche de référence"]);

                    setOpen(true);
                  }}
                >
                  Voir l'exemple
                </Button>

                <FicheDialog open={open} setOpen={setOpen} fiche={fiche} solution={solution} />
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
