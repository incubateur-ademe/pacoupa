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
    <>
      <Card
        {...(marker && { marker })}
        content={
          <>
            <div className="mt-8">
              <Isolation gestes={gestes} />
            </div>
            <hr className="mt-10" />

            <EstimationGains solution={solution} informationBatiment={informationBatiment} />

            <EstimationCouts solution={solution} informationBatiment={informationBatiment} />
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
          <div className="mt-12">
            <Button
              priority="primary"
              linkProps={{
                href: `/simulation/resultat/${solution.id}?${searchParams.toString()}`,

                onClick: () => {
                  push(["trackEvent", matomoCategory.resultats, "Clic Découvrir", "Découvrir"]);
                },
              }}
            >
              Découvrir
            </Button>
          </div>
        }
      />
    </>
  );
};
