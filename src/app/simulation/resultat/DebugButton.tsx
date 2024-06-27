"use client";

import { type PropsWithChildren } from "react";

import { Button } from "@/components/Button";
import { config } from "@/config";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type Solution } from "@/lib/common/domain/values/Solution";
import { type SolutionEnergie } from "@/lib/common/domain/values/SolutionEnergie";

type Props = {
  formData: InformationBatiment;
  solutions: Array<Solution & SolutionEnergie>;
};

export const DebugButton = ({ formData, solutions }: PropsWithChildren<Props>) => {
  const debug = () => {
    console.debug("formData & solutions", { formData, solutions });
  };

  return (
    <>
      {config.env !== "prod" && (
        <Button priority="tertiary no outline" iconId="ri-bug-line" onClick={() => debug()}>
          {""}
        </Button>
      )}
    </>
  );
};
