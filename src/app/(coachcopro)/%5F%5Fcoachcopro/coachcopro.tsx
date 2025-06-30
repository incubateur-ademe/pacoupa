"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  checkAndLoadResultatParamsCoachCopro,
  type CheckAndLoadResultatParamsCoachCoproReturnType,
  type CoachCoproSearchParams,
} from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { Badge } from "@/components/Badge";
import { EstimationCouts } from "@/components/EstimationCouts";
import { EstimationGains } from "@/components/EstimationGains";
import { DPEImage } from "@/components/img/DPEImage";
import { FlecheImage } from "@/components/img/FlecheImage";
import { NoDataImage } from "@/components/img/NoDataImage";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { ContextCard } from "./components/context-card";
import { DetailsButton } from "./components/details-button";
import { SolutionCard, SolutionCardSkeleton } from "./components/solution-card";
import { Tag } from "./components/tag";

const initialState: CheckAndLoadResultatParamsCoachCoproReturnType = {
  informationBatiment: {
    adresse: "",
    annee: 0,
    nbLogements: 0,
    typeCH: "individuel",
    energieCH: "fioul",
    emetteur: "radiateurs",
    typeECS: "individuel",
    energieECS: "fioul",
    espacesExterieursCommuns: [],
    espacesExterieursPersonnels: [],
    renovation: [],
  },
  isRcuEligible: false,
  nbSolutions: 0,
  solutions: [],
  travauxNiveauIsolation: "Global",
};

const RCUSolution: SolutionAvecEnergieCoutAide = {
  id: "RCU",
  nom: "Réseau de chaleur",
  familleSolution: "RCU",
  type: "COL",
  typeSysteme: "RCU",
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Oui",
  description:
    "Un réseau de chaleur est un système de distribution de chaleur produite par une centrale énergétique (biomasse, géothermie, incinération, etc.) et acheminée vers plusieurs bâtiments via des canalisations.",
  acoustique: {
    note: "A",
  },
  cout: {
    note: "A",
  },
  difficulte: {
    note: "A",
  },
  travauxCollectif: {
    note: "A",
  },
  travauxIndividuel: {
    note: "A",
  },
  environnement: {
    note: "A",
  },
  espaceExterieur: {
    note: "A",
  },
  maturite: {
    note: "A",
  },
  aidesInstallationSysteme: 0,
  coutAbonnementAvant: 0,
  coutAbonnementApres: 0,
  coutInstallationSysteme: 0,
  coutIsolationEnveloppe: 0,
  coutMaintenanceAvant: 0,
  coutMaintenanceApres: 0,
  factureEnergetiqueAvant: 0,
  factureEnergetiqueApres: 0,
  cepAvant: 0,
  cepApres: 0,
  dpeAvant: "A",
  dpeApres: "A",
  etaIsolationMenuiseriesApres: "Isolé",
  etaIsolationMenuiseriesAvant: "Isolé",
  etaIsolationMursApres: "Isolé",
  etaIsolationMursAvant: "Isolé",
  etaIsolationPlancherBasApres: "Isolé",
  etaIsolationPlancherBasAvant: "Isolé",
  etaIsolationPlancherHautApres: "Isolé",
  etaIsolationPlancherHautAvant: "Isolé",
  gesAvant: 0,
  gesApres: 0,
};

export default function CoachCopro({
  searchParams,
  skeleton = false,
}: {
  searchParams: CoachCoproSearchParams;
  skeleton?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [{ solutions, nbSolutions, isRcuEligible }, setState] =
    useState<CheckAndLoadResultatParamsCoachCoproReturnType>(initialState);
  const [travauxNiveauIsolation, setTravauxNiveauIsolation] = useState<TravauxNiveauIsolation>("Global");
  const [activeSolution, setActiveSolution] = useState<SolutionAvecEnergieCoutAide | null>(null);

  const cepAvant = activeSolution?.cepAvant ?? 0;
  const cepApres = activeSolution?.cepApres ?? 0;
  const pourcentageGain = Math.round(((cepAvant - cepApres) / cepAvant) * 100) || 12;

  useEffect(() => {
    if (searchParams.hash && !skeleton) {
      checkAndLoadResultatParamsCoachCopro(searchParams, travauxNiveauIsolation)
        .then(newState => {
          if (newState) {
            setState(newState);
            setActiveSolution(newState.solutions[0]);
          }
          setIsLoading(false);
        })
        .catch(console.error);
    }
  }, [searchParams, travauxNiveauIsolation, skeleton]);

  return (
    <>
      <div className="flex justify-start flex-col lg:flex-row size-full overflow-auto lg:overflow-hidden">
        <div className="basis-full lg:basis-2/3 p-6 lg:overflow-auto [scrollbar-width:none]">
          <h1 className="text-2xl font-black !text-[#111827] mb-2">Mon potentiel réno</h1>
          <hr className="flex w-full h-[1px] mb-2" />
          <p className="text-lg font-medium text-[#4B556A] mb-14">
            Retrouvez ici différents scénarios de rénovation énergétique pour votre copro
          </p>
          <h2 className="text-lg font-bold color-[#111827] mb-4">Définissez votre scénario de rénovation</h2>
          <div className="mb-4 text-[#4b5563]">
            <span className="text-lg font-normal mr-2">1 —</span>
            <span className="text-base font-normal">Choisissez un contexte de rénovation</span>
          </div>
          <ContextCard
            title="Atteindre la rénovation énergétique globale"
            description={`Rénovation des postes qui ne l’ont pas été depuis ces 15 dernières années`}
            imageSrc="/img/coach-copro/vignette_1.svg"
            onClick={() => {
              setTravauxNiveauIsolation("Global");
            }}
            active={travauxNiveauIsolation === "Global"}
          />
          <ContextCard
            title="Changement du système de chauffage uniquement"
            description="Conserver l’état actuel des autres postes de travaux"
            imageSrc="/img/coach-copro/vignette_2.svg"
            onClick={() => setTravauxNiveauIsolation("Partiel")}
            active={travauxNiveauIsolation === "Partiel"}
          />

          <div className="mb-8 mt-12 text-[#4b5563]">
            {isLoading ? (
              <>
                <div className="mb-4">
                  <span className="text-lg font-normal mr-2">2 —</span>
                  <span className="text-base font-normal">
                    Choisissez une des solutions de chauffage ENR adaptée à votre projet de rénovation
                  </span>
                </div>
                <SolutionCardSkeleton />
                <SolutionCardSkeleton />
                <SolutionCardSkeleton />
                <SolutionCardSkeleton />
                <SolutionCardSkeleton />
              </>
            ) : nbSolutions === 0 ? (
              <>
                <div className="text-center my-16">
                  <NoDataImage />
                </div>
                <p>
                  Nous n’avons trouvé <strong>aucune solution</strong> ENR compatible pour votre bâtiment.
                </p>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <span className="text-lg font-normal mr-2">2 —</span>
                  <span className="text-base font-normal">
                    {nbSolutions > 1 ? <>Choisissez une des {nbSolutions} solutions</> : <>Voici la solution</>} de
                    chauffage ENR adaptée à votre projet de rénovation
                  </span>
                </div>
                {isRcuEligible && (
                  <SolutionCard
                    title={RCUSolution.nom}
                    description={RCUSolution.description ?? ""}
                    familleSolution={RCUSolution.familleSolution}
                    eligible
                    onClick={() => setActiveSolution(RCUSolution)}
                    active={activeSolution?.id === RCUSolution.id}
                  />
                )}
                {solutions.map(solution => {
                  return (
                    <SolutionCard
                      key={solution.id}
                      title={solution.nom}
                      description={solution.description ?? ""}
                      familleSolution={solution.familleSolution}
                      onClick={() => setActiveSolution(solution)}
                      active={activeSolution?.id === solution.id}
                    />
                  );
                })}
                <Link
                  href="/methodologie"
                  target="_blank"
                  className="p-0 h-[38px] self-end text-base font-bold text-[#111827] hover:!bg-transparent"
                >
                  Pourquoi ces solutions ?
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="basis-full lg:basis-1/3 mt-12 lg:mt-0 p-6 lg:sticky lg:top-4 lg:overflow-auto [scrollbar-width:none]">
          <>
            <div className="w-full border border-solid border-[#f3f4f6] rounded-lg mb-2 p-4">
              <h2 className="text-lg font-bold !text-[#111827] mb-4">Estimation des gains de mon scénario</h2>
              {activeSolution ? (
                <div className="space-y-4 mb-4">
                  <div>
                    <h4 className="text-base font-medium text-[#111827] mb-2">🌿 Gain d'énergie</h4>
                    {activeSolution?.id === RCUSolution.id ? (
                      <>
                        Les gains et les coûts du réseau de chaleur ne sont pas estimés car ils dépendent fortement de
                        la faisabilité et du gestionnaire de réseau.
                      </>
                    ) : (
                      <div className="grid grid-cols-[64px_1fr_64px] gap-1 justify-items-center">
                        <DPEImage lettre={activeSolution?.dpeAvant ?? "A"} />
                        <div className="relative w-full">
                          <div className="flex items-center justify-center w-full h-full pr-4">
                            <FlecheImage className="w-20 h-8 absolute top-0 bottom-0 right-4 bg-transparent" />
                            <div className="flex-1 h-0.5 basis-full bg-[#304436]" />
                          </div>

                          <div className="text-center absolute top-0 mx-auto w-full">
                            <Badge
                              label={`- ${pourcentageGain}%`}
                              type="success"
                              title={`CEP initiale: ${cepAvant} | CEP future: ${cepApres}`}
                            />
                          </div>
                        </div>
                        <DPEImage lettre={activeSolution?.dpeApres ?? "A"} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-base font-medium mb-2 text-[#111827]">🧾 Économie sur les factures</div>

                    <div className="text-lg font-medium text-[#e41571]">
                      <EstimationGains solution={activeSolution} justeGains />
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-medium mb-2 text-[#111827]">💰 Coût total du projet</div>
                    <div className="text-lg font-medium text-[#e41571]">
                      <EstimationCouts solution={activeSolution} justeCouts />
                    </div>
                  </div>
                  <div>
                    <div className="text-base font-medium mb-2 text-[#111827]">🏦 Aides nationales minimum</div>
                    <div className="text-lg font-medium text-[#e41571]">
                      <EstimationCouts solution={activeSolution} justeAides />
                    </div>
                  </div>
                  <DetailsButton text="Voir le détail" />
                </div>
              ) : (
                <>
                  <SolutionCardSkeleton />
                  <SolutionCardSkeleton />
                </>
              )}
            </div>

            <div className="w-full border border-solid border-[#f3f4f6] rounded-lg p-4">
              <h2 className="text-lg font-bold !text-[#111827] mb-4">Exemple d'application</h2>
              {activeSolution ? (
                <div className="space-y-4 mb-4">
                  {/* <div className="relative w-full h-44 mb-2">
                    <Image
                      src="/img/coach-copro/coach-copro-application-placeholder.png"
                      alt=""
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between">
                      <div className="flex items-center justify-center gap-2 h-4" />
                      <div className="flex-1 flex items-center justify-between px-2">
                        <button className="flex items-center hover:!bg-transparent">
                          <Image src="/img/coach-copro/arrow-left.svg" alt="" height={15} width={10} className="h-5" />
                        </button>
                        <button className="flex items-center hover:!bg-transparent">
                          <Image src="/img/coach-copro/arrow-right.svg" alt="" height={15} width={10} className="h-5" />
                        </button>
                      </div>
                      <div className="flex items-center justify-center gap-2 h-4">
                        <span className="flex w-4 h-2 bg-white rounded-lg border border-solid border-[#111827]" />
                        <span className="flex w-2 h-2 rounded-full border border-solid border-white" />
                        <span className="flex w-2 h-2 rounded-full border border-solid border-white" />
                      </div>
                    </div>
                  </div> */}
                  <div className="flex items-center mb-2">
                    <span className="text-lg font-bold text-[#111827] mr-2">Résidence Hermann Sabran</span>
                    <span className="text-lg font-normal text-[#535F57]">— Lyon (Rhône)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4 w-full md:grid-cols-4">
                    <div className="flex flex-col items-center justify-between flex-1">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-1.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="mb-1"
                      />
                      <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                        70 logements
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between flex-1">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-2.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="mb-1"
                      />
                      <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                        3 154 m2
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between flex-1">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-3.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="mb-1"
                      />
                      <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                        Année 1978
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-between flex-1">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-4.svg"
                        alt=""
                        height={24}
                        width={24}
                        className="mb-1"
                      />
                      <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">
                        Chauffage collectif
                      </div>
                    </div>
                  </div>

                  <div className="pl-2 mb-2">
                    <p className="text-lg font-medium text-[#111827] mb-2">Remplacement du chauffage</p>
                    <div className="flex flex-col justify-between border-0 border-l-2 border-solid border-[#E0E0E0] pl-2 mb-2">
                      <div className="py-2 flex flex-col basis-full md:basis-1/2">
                        <div className="text-lg font-normal mb-1 text-[#535F57]">Chauffage</div>
                        <div className="flex md:items-center flex-col md:flex-row items-start">
                          <div className="flex items-center">
                            <Image
                              src="/img/coach-copro/copro-application-vignette-5.svg"
                              alt=""
                              height={16}
                              width={16}
                              className="mr-1"
                            />
                            <span className="text-lg font-bold text-[#111827] mr-2">Fioul</span>
                          </div>
                          <Tag variant="primary" />
                        </div>
                      </div>
                      <div className="py-2 flex flex-col basis-full md:basis-1/2">
                        <div className="text-lg font-normal mb-1 text-[#535F57]">Eau chaude</div>
                        <div className="flex md:items-center flex-col md:flex-row items-start">
                          <div className="flex items-center">
                            <Image
                              src="/img/coach-copro/copro-application-vignette-6.svg"
                              alt=""
                              height={16}
                              width={16}
                              className="mr-1"
                            />
                            <span className="text-lg font-bold text-[#111827] mr-2">Électrique</span>
                          </div>
                          <Tag variant="primary" />
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-medium text-[#111827] mb-2">par</p>
                    <div className="border-0 border-l-2 border-solid border-[#E0E0E0] p-2 mb-2">
                      <div className="text-lg font-normal mb-1 text-[#535F57]">Chauffage et eau chaude</div>
                      <div className="flex items-center">
                        <Image
                          src="/img/coach-copro/copro-application-vignette-7.svg"
                          alt=""
                          height={16}
                          width={16}
                          className="mr-1"
                        />
                        <span className="text-lg font-bold text-[#E41571] mr-2">Pompe à chaleur air/eau</span>
                        <Tag variant="secondary" />
                      </div>
                    </div>
                  </div>
                  <DetailsButton text="Voir le détail" className="ml-2" />
                </div>
              ) : (
                <>
                  <SolutionCardSkeleton />
                  <SolutionCardSkeleton />
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}
