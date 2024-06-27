import { fr } from "@codegouvfr/react-dsfr";
import assert from "assert";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { type Solution } from "@/lib/common/domain/values/Solution";
import { type SolutionEnergie } from "@/lib/common/domain/values/SolutionEnergie";

import { BadgePacoupa } from "./BadgePacoupa";
import { DPEImage } from "./img/DPEImage";
import { FlecheImage } from "./img/FlecheImage";

type Props = {
  solution: Solution & SolutionEnergie;
};

export const EstimationGains = ({ solution }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const pourcentageGain = Math.round(((solution.cepAvant - solution.cepApres) / solution.cepAvant) * 100);

  return (
    <>
      <Box className="mt-8">
        <hr />
        <p className="mb-0">Estimation des gains</p>
        <span className={fr.cx("fr-text--xs")}>(isolations comprises)</span>
        <br />
        <p className="mt-4 mb-2">Gains énergétiques</p>

        <span className={fr.cx("fr-text--xs")}>Actuel</span>
        <br />
        <div className="flex">
          <DPEImage lettre={solution.dpeAvant} />

          <p className="text-center">
            <span className="ml-4 mr-4">
              <FlecheImage />
            </span>
            <br />
            <BadgePacoupa label={`- ${pourcentageGain}%`} />

            <br />
            <span className={fr.cx("fr-text--xs")}>Gain d'énergie</span>
          </p>
          <DPEImage lettre={solution.dpeApres} />
        </div>
      </Box>
    </>
  );
};
