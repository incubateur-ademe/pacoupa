import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Tooltip } from "@mui/material";
import assert from "assert";
import { type PropsWithChildren } from "react";

import { Box } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { formatEuroNoDecimal } from "@/utils/currency";
import { approximation } from "@/utils/number";

import { BadgeEuros } from "./BadgeEuros";
import { Callout } from "./Callout";

type Props = {
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCoutAide;
};

const approximation10k = approximation(4);
const approximation1k = approximation(3);
const approximation100 = approximation(2);

export const EstimationCouts = ({ solution, informationBatiment }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const approximationEnveloppeImmeuble = approximation10k(
    (solution.coutIsolationEnveloppe ?? 0) * informationBatiment.nbLogements,
  );
  const approximationSystemeImmeuble = approximation10k(
    (solution.coutInstallationSysteme ?? 0) * informationBatiment.nbLogements,
  );

  const approximationEnveloppe = approximation1k(solution.coutIsolationEnveloppe ?? 0);
  const approximationSysteme = approximation1k(solution.coutInstallationSysteme ?? 0);

  const aidesLogement = approximation100(solution.aidesInstallationSysteme);
  const aidesImmeuble = approximation1k(solution.aidesInstallationSysteme * informationBatiment.nbLogements);

  return (
    <>
      <Box className="mb-6">
        <Text className="mb-0">Estimation des coûts</Text>
        <p className="text-xs font-normal">(rénovations comprises)</p>

        <div className="px-2">
          <p className="flex items-baseline mt-4 mb-2 text-sm font-medium">
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
          </p>
          <div>
            <BadgeEuros
              value={approximationEnveloppeImmeuble + approximationSystemeImmeuble}
              type="warning"
              prefix="≈"
            />
            <p className="text-sm leading-6">
              {formatEuroNoDecimal(approximationEnveloppe + approximationSysteme)} /logement
            </p>
          </div>

          <p className="mt-4 mb-2 text-sm font-medium">Aides nationales</p>
          <div>
            <BadgeEuros value={aidesImmeuble} type="success" prefix="⩾" />
            <p className="text-sm leading-6">{formatEuroNoDecimal(aidesLogement)} /logement</p>
          </div>

          <div className="mt-4">
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
        </div>
      </Box>
    </>
  );
};
