import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import CloseIcon from "@mui/icons-material/Close";
import { Dialog as MuiDialog, DialogContent, DialogTitle, styled } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { push } from "@socialgouv/matomo-next";
import { type PropsWithChildren, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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
  "& .MuiPaper-root": {
    borderRadius: "0.5rem",
  },
}));

export const FicheReferenceCard = ({ fiche, solution }: PropsWithChildren<Props>) => {
  const [open, setOpen] = useState(false);
  const { width = 0 } = useWindowSize({ debounceDelay: 100, initializeWithValue: false });

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

                <Dialog
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  fullScreen={width > breakpoints.getPxValues().sm ? false : true}
                  fullWidth
                  maxWidth="md"
                >
                  <DialogTitle id="alert-dialog-title" className="!mt-8 !text-[22px] !text-body-500 !pl-4">
                    Exemple d’application
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

                  {/* There are warnings in the dev console on this because Mui Dialog add a p which is not convenient at all.*/}
                  {/* We don't want to add <br/> and inline-block everywhere. So the best option is to live with this React warnings.*/}

                  <DialogContent>
                    {/* <H5>{franceRenovStructure?.Nom_Structure}</H5>

              <Text variant="md" className="font-normal mb-0">
                Adresse
              </Text> */}

                    <div className="grid grid-cols-[80px_1fr] gap-8">
                      <div>
                        <FranceImage className="" />
                      </div>
                      <div className="flex flex-col">
                        <H6 className="mb-0">{fiche.titrePrincipal}</H6>
                        <div className="text-gray-600">{fiche.lieu}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 place-content-center">
                      {fiche.nbLogements && (
                        <div className="flex flex-col items-center">
                          <div className="w-10">
                            <DoorImage />
                          </div>
                          {fiche.nbLogements} logements
                        </div>
                      )}
                      {fiche.nbm2 && (
                        <div className="text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-10">
                              <SurfaceImage />
                            </div>
                            {fiche.nbm2} m&sup2;
                          </div>
                        </div>
                      )}
                      {fiche.anneeConstruction && (
                        <div className="text-center">
                          <div className="flex flex-col items-center">
                            <div className="w-10">
                              <HemletImage />
                            </div>
                            {fiche.anneeConstruction}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center mt-8">
                      <Card
                        content={
                          <div className="min-w-80">
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

                            {/* <div className="mt-4">
                      <div className="flex items-center">
                        <div className="text-sm font-normal leading-6 size-6 mr-1">
                          <ClimatisationImage />
                        </div>
                        Climatisation
                      </div>
                      <div className="text-sm font-bold ml-7 mt-1">Aucune</div>
                    </div> */}
                          </div>
                        }
                      />
                    </div>

                    <div className="flex justify-center mt-8">
                      <Card
                        content={
                          <>
                            <div className="min-w-80">
                              <div className="text-base font-medium">Solution initiale</div>

                              <Card.CardHeader
                                image={
                                  <div className="w-10 h-10 flex items-center justify-center">
                                    {familleImageMap[solution.familleSolution]}
                                  </div>
                                }
                                title={solution.nom}
                              />
                              <div className="mt-4">
                                <Usage solution={solution} />
                              </div>

                              <div>Détail des matériels installés</div>
                            </div>
                          </>
                        }
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};
