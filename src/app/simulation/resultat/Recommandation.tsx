import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { ChauffageImage } from "@/components/img/usages/ChauffageImage";
import { ClimatisationImage } from "@/components/img/usages/ClimatisationImage";
import { EcsImage } from "@/components/img/usages/EcsImage";
import { Box } from "@/dsfr";
import { type GetSolutionsParCriteresReturnType } from "@/lib/server/useCases/getSolutionsParCriteres";

export const Recommandation = ({ solution }: { solution: GetSolutionsParCriteresReturnType[number] }) => {
  const { usageCH, usageECS, usageFr } = solution;

  return (
    <Box className={cx("flex", "justify-between", "gap-4")}>
      <div className={cx("flex", "flex-col", "items-center")}>
        <ChauffageImage
          enabled={usageCH === "Oui"}
          alt={
            usageCH === "Oui"
              ? "Solution permettant le chauffage"
              : usageCH === "Non"
                ? "Solution ne permettant pas le chauffage"
                : "Solution permettant potentiellement le chauffage"
          }
        />
        <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Chauffage</span>
      </div>

      <div className={cx("flex", "flex-col", "items-center")}>
        <EcsImage
          enabled={usageECS === "Oui"}
          alt={
            usageECS === "Oui"
              ? "Solution permettant l'eau chaude sanitaire"
              : usageECS === "Non"
                ? "Solution ne permettant pas l'eau chaude sanitaire"
                : "Solution permettant potentiellement l'eau chaude sanitaire"
          }
        />
        <span className={cx(fr.cx("fr-text--xs", "fr-mt-1w"), "text-center")}>
          Eau chaude
          <br /> sanitaire
        </span>
      </div>

      <div className={cx("flex", "flex-col", "items-center")}>
        <ClimatisationImage
          enabled={usageFr === "Oui"}
          alt={
            usageFr === "Oui"
              ? "Solution permettant la climatisation"
              : usageFr === "Non"
                ? "Solution ne permettant pas la climatisation"
                : "Solution permettant potentiellement la climatisation"
          }
        />
        <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Climatisation</span>
      </div>
    </Box>
  );
};
