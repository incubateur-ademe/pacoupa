import assert from "assert";
import { type PropsWithChildren } from "react";

import { Text } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
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

const approximation10 = approximation(1);

export const EstimationGains = ({ solution, avecMessage }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const pourcentageGain = Math.round(((solution.cepAvant - solution.cepApres) / solution.cepAvant) * 100);

  const coutAvant = solution.coutAbonnementAvant + solution.coutMaintenanceAvant + solution.factureEnergetiqueAvant;
  const coutApres = solution.coutAbonnementApres + solution.coutMaintenanceApres + solution.factureEnergetiqueApres;

  const gainEconomique = coutApres - coutAvant;

  return (
    <>
      <div className="mb-8">
        <Text className="mb-0">Estimation des gains</Text>
        <Text variant="xs">(isolations comprises)</Text>
        <div className="px-2">
          <Text variant="sm" className="mt-4 mb-2">
            Gains énergétiques
          </Text>
          <div className="grid grid-cols-[1fr_minmax(85px,_1fr)_1fr] gap-1 justify-items-center">
            <Text variant="xs" className="font-normal w-[62px] mb-0">
              Actuel
            </Text>
            <div></div>
            <div></div>

            <DPEImage lettre={solution.dpeAvant} />
            <FlecheImage />
            <DPEImage lettre={solution.dpeApres} />

            <div></div>
            <div className="text-center">
              <Badge
                label={`- ${pourcentageGain}%`}
                type="success"
                title={`CEP initiale: ${solution.cepAvant} | CEP future: ${solution.cepApres}`}
              />
              <Text variant="xs" className="mb-0">
                Gain d'énergie
              </Text>
            </div>
          </div>
          {avecMessage && (
            <div className="mt-0 mb-4">
              <Callout
                type="pacoupa"
                icon={<Logo />}
                content={
                  <Text variant="sm" className="mb-0">
                    Un logement mieux isolé :
                    <ul>
                      <li>Augmente la valeur du bien</li>
                      <li>Est moins sensible aux variations de prix de l’énergie</li>
                      <li>Améliore votre confort</li>
                    </ul>
                  </Text>
                }
              />
            </div>
          )}
          <Text variant="sm" className="mt-2 mb-2">
            Gains économiques
          </Text>
          <BadgeEuros
            value={Math.abs(approximation10(gainEconomique))}
            type="success"
            prefix={Math.sign(gainEconomique) === -1 ? "-" : undefined}
          />{" "}
          /an par logement
        </div>
      </div>
    </>
  );
};
