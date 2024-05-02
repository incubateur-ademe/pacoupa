import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Badge } from "@mui/material";

import { ChauffageImage } from "@/components/img/usages/ChauffageImage";
import { ClimatisationImage } from "@/components/img/usages/ClimatisationImage";
import { EcsImage } from "@/components/img/usages/EcsImage";
import { Grid, GridCol } from "@/dsfr";
import { type GetSolutionsParCriteresReturnType } from "@/lib/server/useCases/getSolutionsParCriteres";

export const Recommandation = ({
  solution,
}: {
  solution: Pick<GetSolutionsParCriteresReturnType[number], "usageCH" | "usageECS" | "usageFr">;
}) => {
  const { usageCH, usageECS, usageFr } = solution;

  return (
    <>
      <Grid haveGutters valign="top">
        <GridCol base={4} className={"flex justify-center items-center"}>
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
        </GridCol>

        <GridCol base={4} className={"flex justify-center items-center"}>
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
        </GridCol>

        <GridCol base={4} className={"flex justify-center items-center"}>
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
                    : "La climatisation ne sera pas possible avec des radiateurs à eau. Il faudra soit les remplacer par des ventilo-convecteurs, soit utiliser un plancher rafraichissant (si présent)."
              }
            />
          </Badge>
        </GridCol>
      </Grid>

      <Grid>
        <GridCol base={4} className={"flex justify-center items-start"}>
          <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Chauffage</span>
        </GridCol>
        <GridCol base={4} className={"flex justify-center items-start"}>
          <span className={cx(fr.cx("fr-text--xs", "fr-mt-1w"), "text-center")}>
            Eau chaude
            <br /> sanitaire
          </span>
        </GridCol>
        <GridCol base={4} className={"flex justify-center items-start"}>
          <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Climatisation</span>
        </GridCol>
      </Grid>
    </>
  );
};
