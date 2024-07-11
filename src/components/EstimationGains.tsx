import { fr } from "@codegouvfr/react-dsfr";
import assert from "assert";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCout } from "@/lib/common/domain/values/SolutionAvecEnergie";
import { formatEuroNoDecimal } from "@/utils/currency";

import { BadgeEuros } from "./BadgeEuros";
import { BadgePacoupa } from "./BadgePacoupa";
import { DPEImage } from "./img/DPEImage";
import { FlecheImage } from "./img/FlecheImage";

type Props = {
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCout;
};

export const EstimationGains = ({ solution, informationBatiment }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const pourcentageGain = Math.round(((solution.cepAvant - solution.cepApres) / solution.cepAvant) * 100);

  const coutAvant = solution.coutAbonnementAvant + solution.coutMaintenanceAvant + solution.factureEnergetiqueAvant;
  const coutApres = solution.coutAbonnementApres + solution.coutMaintenanceApres + solution.factureEnergetiqueApres;

  const gainEconomique = coutApres - coutAvant;

  console.log({ solution });

  return (
    <>
      <Box className="mb-8">
        <Text className="mb-0">Estimation des gains</Text>
        <p className="text-xs font-normal">(isolations comprises)</p>
        <div className="px-2">
          <div className="mt-4 mb-2 text-sm font-medium">Gains énergétiques</div>
          <div className="grid grid-cols-[1fr_minmax(85px,_1fr)_1fr] gap-1 justify-items-center">
            <div className="text-xs font-normal w-[62px]">Actuel</div>
            <div></div>
            <div></div>

            <DPEImage lettre={solution.dpeAvant} />
            <FlecheImage />
            <DPEImage lettre={solution.dpeApres} />

            <div></div>
            <div className="text-center">
              <BadgePacoupa label={`- ${pourcentageGain}%`} type="green" />
              <p className={fr.cx("fr-text--xs")}>Gain d'énergie</p>
            </div>
          </div>
          <p className="mt-2 mb-2 text-sm font-medium">Gains économiques</p>
          <BadgeEuros
            value={Math.abs(gainEconomique) * informationBatiment.nbLogements}
            type="green"
            prefix={gainEconomique < 0 ? "-" : undefined}
          />{" "}
          / mois
          <p className="text-sm leading-6">{formatEuroNoDecimal(Math.abs(gainEconomique))} / logement</p>
        </div>
        <p className="mb-0">Estimation des coûts</p>
        <p className="text-xs font-normal">(rénovations comprises)</p>
        <div className="px-2">
          <div className="text-sm font-medium mb-3">Coût total du projet</div>
          <div
            title={`coût isolation enveloppe = ${solution.coutIsolationEnveloppe} \ncoût installation systeme = ${solution.coutInstallationSysteme}`}
          >
            <BadgeEuros
              value={(solution.coutIsolationEnveloppe ?? 0) + solution.coutInstallationSysteme}
              type="sand"
              prefix="≈"
            />
          </div>
          {/* <div className="text-sm font-medium mt-4 mb-3">Aides actionnables</div>
          <BadgeEuros label=" ~ 15 000 €" type="green" /> */}
        </div>
      </Box>
    </>
  );
};
