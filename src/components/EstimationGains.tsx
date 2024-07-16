import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Tooltip } from "@mui/material";
import assert from "assert";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCout } from "@/lib/common/domain/values/SolutionAvecEnergie";
import { formatEuroNoDecimal } from "@/utils/currency";
import { approximation } from "@/utils/number";

import { BadgeEuros } from "./BadgeEuros";
import { BadgePacoupa } from "./BadgePacoupa";
import { Callout } from "./Callout";
import { DPEImage } from "./img/DPEImage";
import { FlecheImage } from "./img/FlecheImage";

type Props = {
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCout;
};

const approximation10k = approximation(4);
const approximation1k = approximation(3);
const approximation100 = approximation(2);
const approximation10 = approximation(1);

export const EstimationGains = ({ solution, informationBatiment }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const pourcentageGain = Math.round(((solution.cepAvant - solution.cepApres) / solution.cepAvant) * 100);

  const coutAvant = solution.coutAbonnementAvant + solution.coutMaintenanceAvant + solution.factureEnergetiqueAvant;
  const coutApres = solution.coutAbonnementApres + solution.coutMaintenanceApres + solution.factureEnergetiqueApres;

  const gainEconomique = coutApres - coutAvant;

  const approximationEnveloppeImmeuble = approximation10k(
    (solution.coutIsolationEnveloppe ?? 0) * informationBatiment.nbLogements,
  );
  const approximationSystemeImmeuble = approximation10k(
    (solution.coutInstallationSysteme ?? 0) * informationBatiment.nbLogements,
  );

  const approximationEnveloppe = approximation1k(solution.coutIsolationEnveloppe ?? 0);
  const approximationSysteme = approximation1k(solution.coutInstallationSysteme ?? 0);

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
            value={Math.abs(approximation100(gainEconomique)) * informationBatiment.nbLogements}
            type="green"
            prefix={gainEconomique < 0 ? "-" : undefined}
          />{" "}
          / an
          <p className="text-sm leading-6">
            {Math.sign(gainEconomique) === -1 && "- "}
            {formatEuroNoDecimal(Math.abs(approximation10(gainEconomique)))} / logement
          </p>
        </div>
        <p className="mb-0">Estimation des coûts</p>
        <p className="text-xs font-normal">(rénovations comprises)</p>
        <div className="px-2">
          <div className="text-sm font-medium mb-3">
            Coût total du projet
            <Tooltip
              title={
                <>
                  <ul>
                    <li>coût isolation enveloppe : {formatEuroNoDecimal(approximationEnveloppeImmeuble)}</li>
                    <li>coût installation systeme : {formatEuroNoDecimal(approximationSystemeImmeuble)}</li>
                  </ul>
                </>
              }
              arrow
            >
              <span className={cx(fr.cx("ri-information-line", "fr-icon--sm"), "ml-2")} />
            </Tooltip>
          </div>
          <div>
            <BadgeEuros value={approximationEnveloppeImmeuble + approximationSystemeImmeuble} type="sand" prefix="≈" />
            <p className="text-sm leading-6">
              {formatEuroNoDecimal(approximationEnveloppe + approximationSysteme)} / logement
            </p>

            <Callout
              type="warning"
              content={
                <>
                  Les données financières sont des premières estimations. Elles doivent faire l'objet d'études plus
                  approfondies.
                </>
              }
            />
          </div>
          {/* <div className="text-sm font-medium mt-4 mb-3">Aides actionnables</div>
          <BadgeEuros label=" ~ 15 000 €" type="green" /> */}
        </div>
      </Box>
    </>
  );
};
