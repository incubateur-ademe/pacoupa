import { fr } from "@codegouvfr/react-dsfr";
import assert from "assert";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { formatEuroNoDecimal } from "@/utils/currency";
import { approximation } from "@/utils/number";

import { Badge } from "./Badge";
import { BadgeEuros } from "./BadgeEuros";
import { Callout } from "./Callout";
import { DPEImage } from "./img/DPEImage";
import { FlecheImage } from "./img/FlecheImage";
import { Logo } from "./img/Logo";

type Props = {
  avecMessage?: boolean;
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCoutAide;
};

const approximation100 = approximation(2);
const approximation10 = approximation(1);

export const EstimationGains = ({ solution, informationBatiment, avecMessage }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const pourcentageGain = Math.round(((solution.cepAvant - solution.cepApres) / solution.cepAvant) * 100);

  const coutAvant = solution.coutAbonnementAvant + solution.coutMaintenanceAvant + solution.factureEnergetiqueAvant;
  const coutApres = solution.coutAbonnementApres + solution.coutMaintenanceApres + solution.factureEnergetiqueApres;

  const gainEconomique = coutApres - coutAvant;

  return (
    <>
      <Box className="mb-8">
        <Text className="mb-0">Estimation des gains</Text>
        <p className="text-xs font-normal">(isolations comprises)</p>
        <div className="px-2">
          <p className="mt-4 mb-2 text-sm font-medium">Gains énergétiques</p>
          <div className="grid grid-cols-[1fr_minmax(85px,_1fr)_1fr] gap-1 justify-items-center">
            <div className="text-xs font-normal w-[62px]">Actuel</div>
            <div></div>
            <div></div>

            <DPEImage lettre={solution.dpeAvant} />
            <FlecheImage />
            <DPEImage lettre={solution.dpeApres} />

            <div></div>
            <div className="text-center">
              <Badge label={`- ${pourcentageGain}%`} type="success" />
              <p className={fr.cx("fr-text--xs")}>Gain d'énergie</p>
            </div>
          </div>
          {avecMessage && (
            <Box className="mt-0 mb-4">
              <Callout
                type="pacoupa"
                icon={<Logo />}
                content={
                  <>
                    Un logement mieux isolé :
                    <ul>
                      <li>Augmente la valeur du bien</li>
                      <li>Est moins sensible aux variations de prix de l’énergie</li>
                      <li>Améliore votre confort</li>
                    </ul>
                  </>
                }
              />
            </Box>
          )}
          <p className="mt-2 mb-2 text-sm font-medium">Gains économiques</p>
          <BadgeEuros
            value={Math.abs(approximation100(gainEconomique)) * informationBatiment.nbLogements}
            type="success"
            prefix={gainEconomique < 0 ? "-" : undefined}
          />{" "}
          /an
          <div className="text-sm leading-6 mb-0">
            {Math.sign(gainEconomique) === -1 && "- "}
            {formatEuroNoDecimal(Math.abs(approximation10(gainEconomique)))} /logement
          </div>
        </div>
      </Box>
    </>
  );
};
