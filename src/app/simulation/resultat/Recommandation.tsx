import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Badge } from "@mui/material";

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
        <Badge
          variant="dot"
          color={usageCH === "Oui" ? "success" : usageCH === "Non" ? "error" : "info"}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
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
        </Badge>
        <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Chauffage</span>
      </div>

      <div className={cx("flex", "flex-col", "items-center")}>
        <Badge
          variant="dot"
          color={usageECS === "Oui" ? "success" : usageECS === "Non" ? "error" : "info"}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
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
        </Badge>
        <span className={cx(fr.cx("fr-text--xs", "fr-mt-1w"), "text-center")}>
          Eau chaude
          <br /> sanitaire
        </span>
      </div>

      <div className={cx("flex", "flex-col", "items-center")}>
        <Badge
          variant="dot"
          color={usageFr === "Oui" ? "success" : usageFr === "Non" ? "error" : "info"}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
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
        </Badge>
        <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Climatisation</span>
      </div>
    </Box>
  );
};
