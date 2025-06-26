"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  checkAndLoadResultatParamsCoachCopro,
  type CheckAndLoadResultatParamsCoachCoproReturnType,
  type CoachCoproSearchParams,
} from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";
import { createSearchParams } from "@/utils/searchParams";

import { ContextCard } from "./components/context-card";
import { DetailsButton } from "./components/details-button";
import { SolutionCard } from "./components/solution-card";
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

export default function CoachCopro({ searchParams }: { searchParams: CoachCoproSearchParams }) {
  const router = useRouter();
  const searchParamsApi = useSearchParams();

  const [state, setState] = useState<CheckAndLoadResultatParamsCoachCoproReturnType | null>(initialState);

  useEffect(() => {
    if (searchParams.hash) {
      checkAndLoadResultatParamsCoachCopro(searchParams).then(setState).catch(console.error);
    }
  }, [searchParams]);

  function onChangeTravauxNiveauIsolation(travauxNiveauIsolation: TravauxNiveauIsolation) {
    router.push(
      `/__coachcopro?${createSearchParams({
        searchParams: searchParamsApi,
        name: "travauxNiveauIsolation",
        value: travauxNiveauIsolation,
      })}`,
      // @ts-expect-error scroll is not a boolean
      { scroll: "false" },
    );
  }

  return (
    <div className="size-full justify-center">
      <div className="flex flex-col items-start max-w-6xl">
        <h1 className="text-2xl font-black !text-[#111827] mb-2">Mon potentiel réno</h1>
        <div className="flex w-full h-[1px] bg-[#E5E7EB] mb-2" />
        <p className="text-lg font-medium text-[#4B556A] mb-14">
          Retrouvez ici différents scénarios de rénovation énergétique pour votre copro
        </p>

        <div className="flex justify-start lg:gap-x-12 flex-col lg:flex-row">
          <div className="basis-full lg:basis-2/3">
            <h2 className="text-lg font-bold color-[#111827] mb-4">Définissez votre scénario de rénovation</h2>
            <div className="mb-4 text-[#4b5563]">
              <span className="text-lg font-normal mr-2">1 —</span>
              <span className="text-base font-normal">Choisissez un contexte de rénovation</span>
            </div>
            <ContextCard
              title="Atteindre la rénovation énergétique globale"
              description={`Rénovation des postes qui ne l’ont pas été depuis ces 15 dernières années`}
              imageSrc="/img/vignette_1.svg"
              onClick={() => {
                onChangeTravauxNiveauIsolation("Global");
              }}
            />
            <ContextCard
              title="Changement du système de chauffage uniquement"
              description="Conserver l’état actuel des autres postes de travaux"
              imageSrc="/img/vignette_2.svg"
              onClick={() => onChangeTravauxNiveauIsolation("Partiel")}
            />

            <div className="mb-8 mt-12 text-[#4b5563]">
              <span className="text-lg font-normal mr-2">2 —</span>
              <span className="text-base font-normal">
                Choisissez une des 3 solutions de chauffage ENR adaptée à votre projet de rénovation
              </span>
            </div>
            <SolutionCard
              title="Réseau de chaleur"
              description="Un réseau de chaleur est un système de distribution de chaleur
                  produite par une centrale énergétique (biomasse, géothermie,
                  incinération, etc.) et acheminée vers plusieurs bâtiments via
                  des canalisations."
              imageSrc="/img/vignette_3.svg"
              eligible
            />
            <SolutionCard
              title="Pompe à chaleur air/eau"
              description="La pompe à chaleur (PAC) air / eau prélève de la chaleur dans
                  l'air extérieur, augmente son niveau de température et la
                  transfère à un circuit d'eau."
              imageSrc="/img/vignette_4.svg"
              active
            />
            <SolutionCard
              title="Hybride pompe à chaleur + chaudière"
              description="La solution hybride combine une pompe à chaleur (PAC) avec une
                  chaudière pour assurer l'appoint."
              imageSrc="/img/vignette_5.svg"
            />
            <button className="p-0 h-[38px] self-end text-base font-bold text-[#111827] border-0 border-b-2 border-solid border-[#111827] hover:!bg-transparent">
              Pourquoi ces solutions ?
            </button>
          </div>

          <div className="basis-full lg:basis-1/3 mt-12 lg:mt-0">
            <div className="w-full border border-solid border-[#f3f4f6] rounded-lg mb-2 p-4">
              <h2 className="text-lg font-bold !text-[#111827] mb-4">Estimation des gains de mon scénario</h2>
              <div className="space-y-4 mb-4">
                <div>
                  <div className="text-base font-medium text-[#111827]">🌿 Gain d'énergie</div>
                  <div className="flex items-center justify-center mt-2 w-64 h-11 max-w-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/img/coach-copro/vignette_6.svg" alt="" className="size-full" />
                  </div>
                </div>
                <div>
                  <div className="text-base font-medium mb-2 text-[#111827]">🧾 Économie sur les factures</div>
                  <div className="text-lg font-medium text-[#e41571]">De 1 100€ à 1 500€/an</div>
                </div>
                <div>
                  <div className="text-base font-medium mb-2 text-[#111827]">💰 Coût total du projet</div>
                  <div className="text-lg font-medium text-[#e41571]">De 50 000€ à 70 000€</div>
                </div>
                <div>
                  <div className="text-base font-medium mb-2 text-[#111827]">🏦 Aides nationales minimum</div>
                  <div className="text-lg font-medium text-[#e41571]">De 20 000€ à 30 000€</div>
                </div>
              </div>
              <DetailsButton text="Voir le détail" />
            </div>

            <div className="w-full border border-solid border-[#f3f4f6] rounded-lg p-4">
              <h2 className="text-lg font-bold !text-[#111827] mb-4">Exemple d'application</h2>
              <div className="relative w-full h-44 mb-2">
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
              </div>
              <div className="flex items-center mb-2">
                <span className="text-lg font-bold text-[#111827] mr-2">Résidence Hermann Sabran</span>
                <span className="text-lg font-normal text-[#535F57]">— Lyon (Rhône)</span>
              </div>
              <div className="flex gap-4 mb-4">
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
                  <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">3 154 m2</div>
                </div>
                <div className="flex flex-col items-center justify-between flex-1">
                  <Image
                    src="/img/coach-copro/copro-application-vignette-3.svg"
                    alt=""
                    height={24}
                    width={24}
                    className="mb-1"
                  />
                  <div className="flex items-center text-center h-8 text-xs font-medium text-[#111827]">Année 1978</div>
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
                <div className="flex justify-between border-0 border-l-2 border-solid border-[#E0E0E0] pl-2 mb-2">
                  <div className="py-2">
                    <div className="text-lg font-normal mb-1 text-[#535F57]">Chauffage</div>
                    <div className="flex items-center">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-5.svg"
                        alt=""
                        height={16}
                        width={16}
                        className="mr-1"
                      />
                      <span className="text-lg font-bold text-[#111827] mr-2">Fioul</span>
                      <Tag variant="primary" />
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="text-lg font-normal mb-1 text-[#535F57]">Eau chaude</div>
                    <div className="flex items-center">
                      <Image
                        src="/img/coach-copro/copro-application-vignette-6.svg"
                        alt=""
                        height={16}
                        width={16}
                        className="mr-1"
                      />
                      <span className="text-lg font-bold text-[#111827] mr-2">Électrique</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
