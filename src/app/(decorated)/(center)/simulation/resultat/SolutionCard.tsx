"use client";

import { type PropsWithChildren } from "react";

import { Card } from "@/components/Card";
import { EstimationCouts } from "@/components/EstimationCouts";
import { EstimationGains } from "@/components/EstimationGains";
import { PlusIcon } from "@/components/img/PlusIcon";
import { type GesteIsolation } from "@/lib/common/domain/values/GesteIsolation";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";

import { familleImageMap } from "./helper";
import { Isolation } from "./Isolation";

type Props = {
  gestes: GesteIsolation[];
  marker?: string;
  solution: SolutionAvecEnergieCoutAide;
};

export const SolutionCard = ({ solution, gestes, marker }: PropsWithChildren<Props>) => {
  return (
    <Card
      removeShadowOnClick
      {...(marker && { marker })}
      content={
        <>
          <div className="mt-6">
            <Isolation gestes={gestes} />
          </div>

          <hr className="mt-8 pb-4" />

          <EstimationGains solution={solution} />

          <hr className="my-0" />

          <div className="-mt-10">
            <EstimationCouts solution={solution} />
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
        <>
          <div className="group-hover:scale-105 transition-transform motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 flex gap-2 justify-between items-center pb-2 mt-8 border-b-2 border-t-0 border-x-0 border-solid border-[#304436] hover:!border-[#80b990] hover:!text-[#80b990] active:!text-[#92e3a9] shadow-none px-0 font-bold">
            <div className="w-4 h-4">
              <PlusIcon />
            </div>
            En savoir plus
          </div>
        </>
      }
    />
  );
};
