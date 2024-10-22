import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Tooltip } from "@mui/material";
import assert from "assert";
import { type PropsWithChildren } from "react";

import { Text } from "@/dsfr/base/typography";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { formatEuroNoDecimal } from "@/utils/currency";
import { approximation } from "@/utils/number";

import { BadgeEuros } from "./BadgeEuros";

type Props = {
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCoutAide;
};

const approximation1k = approximation(3);
const approximation100 = approximation(2);

export const EstimationCouts = ({ solution }: PropsWithChildren<Props>) => {
  assert(solution.cepAvant && solution.cepApres, "cepAvant and cepApres should be defined");

  const approximationEnveloppe = approximation1k(solution.coutIsolationEnveloppe ?? 0);
  const approximationSysteme = approximation1k(solution.coutInstallationSysteme ?? 0);

  const aidesLogement = approximation100(solution.aidesInstallationSysteme);

  return (
    <>
      <div className="mt-8">
        <Text className="mb-0">Estimation des coûts</Text>
        <Text variant="xs">(isolations comprises)</Text>

        <div className="px-2">
          <Text variant="sm" className="flex items-baseline mt-4 mb-2">
            Coût total du projet
            <Tooltip
              title={
                <>
                  <ul>
                    <li>coût isolation enveloppe : {formatEuroNoDecimal(approximationEnveloppe)}</li>
                    <li>coût installation systeme : {formatEuroNoDecimal(approximationSysteme)}</li>
                  </ul>
                </>
              }
              arrow
            >
              <span className={cx(fr.cx("ri-information-line", "fr-icon--sm"), "ml-2")} />
            </Tooltip>
          </Text>
          <div>
            <BadgeEuros value={approximationEnveloppe + approximationSysteme} type="warning" prefix="≈" />{" "}
            <span className="text-sm">par logement</span>
          </div>

          <Text variant="sm" className="mt-10 mb-2">
            Aides nationales
          </Text>
          <div>
            <BadgeEuros value={aidesLogement} type="success" prefix="⩾" /> <span className="text-sm">par logement</span>
          </div>
        </div>
      </div>
    </>
  );
};
