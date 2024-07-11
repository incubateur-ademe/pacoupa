import { fr } from "@codegouvfr/react-dsfr";
import assert from "assert";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";
import { type SolutionAvecEnergie } from "@/lib/common/domain/values/SolutionAvecEnergie";

import { BadgeEuros } from "./BadgeEuros";
import { BadgePacoupa } from "./BadgePacoupa";
import { DPEImage } from "./img/DPEImage";
import { FlecheImage } from "./img/FlecheImage";

type Props = {
  solution: SolutionAvecEnergie;
};

export const EstimationGains = ({ solution }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const pourcentageGain = Math.round(((solution.cepAvant - solution.cepApres) / solution.cepAvant) * 100);

  return (
    <>
      <Box>
        <Text className="mb-0">Estimation des gains</Text>
        <p className="text-xs font-normal">(isolations comprises)</p>
        <div className="px-2">
          <p className="mt-4 mb-2 text-sm">Gains énergétiques</p>
          <br />
          <div className="flex justify-center items-center bg-red-50">
            <p className="flex flex-col text-xs font-normal">
              Actuel
              <DPEImage lettre={solution.dpeAvant} />
            </p>

            <p className="text-center self-end">
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
          <p className="mt-2 mb-2 text-sm">Gains économiques</p>
          <BadgeEuros label="- 1000 €" type="green" /> / mois
          <p className="text-sm leading-6"> 100€ / logement</p>
        </div>
        <p className="mb-0">Estimation des coûts</p>
        <p className="text-xs font-normal">(rénovations comprises)</p>
        <div className="text-sm font-medium">Coût total du projet</div>
        <BadgeEuros label=" ~ 60 000 €" type="sand" />
        <div className="text-sm font-medium">Aides actionnables</div>
        <BadgeEuros label=" ~ 15 000 €" type="green" />
      </Box>
    </>
  );
};
