"use client";

import { push } from "@socialgouv/matomo-next";
import { useSearchParams } from "next/navigation";
import { type PropsWithChildren } from "react";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EstimationCouts } from "@/components/EstimationCouts";
import { EstimationGains } from "@/components/EstimationGains";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type GesteIsolation } from "@/lib/common/domain/values/GesteIsolation";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { matomoCategory } from "@/lib/matomo-events";

import { familleImageMap } from "./helper";
import { Isolation } from "./Isolation";

type Props = {
  gestes: GesteIsolation[];
  informationBatiment: InformationBatiment;
  marker?: string;
  solution: SolutionAvecEnergieCoutAide;
};

export const SolutionCard = ({ solution, informationBatiment, gestes, marker }: PropsWithChildren<Props>) => {
  const searchParams = useSearchParams();

  return (
    <div className="transition-transform motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 hover:scale-105">
      <Card
        removeShadowOnHover
        {...(marker && { marker })}
        content={
          <>
            <div className="mt-6">
              <Isolation gestes={gestes} />
            </div>

            <hr className="mt-8 pb-4" />

            <EstimationGains solution={solution} informationBatiment={informationBatiment} />

            <hr className="my-0" />

            <div className="-mt-10">
              <EstimationCouts solution={solution} informationBatiment={informationBatiment} />
            </div>
          </>
        }
        header={
          <Card.CardHeader
            image={
              <div className="w-10 h-10 flex items-center justify-center">
                {familleImageMap[solution.familleSolution]}
              </div>
            }
            title={solution.nom}
          />
        }
        footer={
          <div className="mt-8">
            <Button
              priority="tertiary"
              iconId="ri-add-line"
              iconPosition="left"
              linkProps={{
                href: `/simulation/resultat/${solution.id}?${searchParams.toString()}`,

                onClick: () => {
                  push(["trackEvent", matomoCategory.resultats, "Clic Découvrir", "Découvrir"]);
                },
              }}
            >
              En savoir plus
            </Button>
          </div>
        }
      />
    </div>
  );
};
