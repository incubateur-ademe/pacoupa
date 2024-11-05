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
import { Herb } from "./img/twemoji/Herb";
import { MoneyBag } from "./img/twemoji/MoneyBag";

type Props = {
  avecMessage?: boolean;
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCoutAide;
  withTitle?: boolean;
};

const approximation10 = approximation(1);

export const EstimationGains = ({ solution, avecMessage, withTitle }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const pourcentageGain = Math.round(((solution.cepAvant - solution.cepApres) / solution.cepAvant) * 100);

  const coutAvant = solution.coutAbonnementAvant + solution.coutMaintenanceAvant + solution.factureEnergetiqueAvant;
  const coutApres = solution.coutAbonnementApres + solution.coutMaintenanceApres + solution.factureEnergetiqueApres;

  const gainEconomique = coutApres - coutAvant;

  return (
    <>
      <div className="mb-8">
        {withTitle && (
          <div className="mb-4">
            <Text className="mb-0">Estimation des gains</Text>
            <Text variant="xs" className="mb-0">
              (isolations comprises)
            </Text>
          </div>
        )}
        <div className="px-2">
          <Text variant="sm" className="flex gap-1 mt-0 mb-2 items-center font-medium">
            <span className="inline-block w-[20px] leading-[0rem]" aria-hidden>
              <Herb />
            </span>
            Gains énergétiques estimés
          </Text>
          <div className="grid grid-cols-[1fr_minmax(85px,_1fr)_1fr] gap-1 justify-items-center">
            <Text variant="xs" className="font-normal w-[62px] mb-0">
              Actuel
            </Text>
            <div></div>
            <div></div>

            <DPEImage lettre={solution.dpeAvant} />
            <div className="relative">
              <FlecheImage />

              <div className="text-center absolute top-1">
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
            <DPEImage lettre={solution.dpeApres} />
          </div>
          {avecMessage && (
            <div className="mt-8 mb-4">
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
          <Text variant="sm" className="flex gap-1 mt-8 mb-2 items-center font-medium">
            <span className="inline-block w-[20px] leading-[0rem]" aria-hidden>
              <MoneyBag />
            </span>
            Gains économiques estimés
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
