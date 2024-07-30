import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { Badge as BadgeMui } from "@mui/material";

import { ChauffageImage } from "@/components/img/usages/ChauffageImage";
import { ClimatisationImage } from "@/components/img/usages/ClimatisationImage";
import { EcsImage } from "@/components/img/usages/EcsImage";
import { Grid, GridCol } from "@/dsfr";
import { Text } from "@/dsfr/base/typography";
import { type Solution } from "@/lib/common/domain/values/Solution";

import { typeMap } from "./helper";

type Props = { solution: Solution; withTitle?: boolean };

export const Usage = ({ solution, withTitle }: Props) => {
  const { usageCh, usageEcs, usageFr, type } = solution;

  const typeComponent = typeMap[type];

  return (
    <>
      {withTitle && <Text className="font-medium mb-1">Usage</Text>}

      {typeComponent}

      <Grid haveGutters valign="top" className="mt-4">
        {usageCh !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-center"}>
            <BadgeMui variant="dot" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
              <ChauffageImage
                enabled={true}
                alt={
                  usageCh === "Oui"
                    ? "Solution permettant le chauffage"
                    : "Solution permettant potentiellement le chauffage"
                }
              />
            </BadgeMui>
          </GridCol>
        )}

        {usageEcs !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-center"}>
            <BadgeMui
              variant="dot"
              // color={usageEcs === "Oui" ? "success" : usageEcs === "Non" ? "error" : "info"}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <EcsImage
                enabled={true}
                alt={
                  usageEcs === "Oui"
                    ? "Solution permettant l'eau chaude sanitaire"
                    : "Solution permettant potentiellement l'eau chaude sanitaire"
                }
              />
            </BadgeMui>
          </GridCol>
        )}

        {usageFr !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-center"}>
            <BadgeMui variant="dot" color={usageFr === "Oui" ? "success" : "info"}>
              <ClimatisationImage
                enabled={true}
                alt={
                  usageFr === "Oui"
                    ? "Solution permettant la climatisation"
                    : "La climatisation ne sera pas possible avec des radiateurs à eau. Il faudra soit les remplacer par des ventilo-convecteurs, soit utiliser un plancher rafraichissant (si présent)."
                }
              />
            </BadgeMui>
          </GridCol>
        )}
      </Grid>
      <Grid>
        {usageCh !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-start"}>
            <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Chauffage</span>
          </GridCol>
        )}
        {usageEcs !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-start"}>
            <span className={cx(fr.cx("fr-text--xs", "fr-mt-1w"), "text-center")}>Eau chaude</span>
          </GridCol>
        )}
        {usageFr !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-start"}>
            <span className={fr.cx("fr-text--xs", "fr-mt-1w")}>Climatisation</span>
          </GridCol>
        )}
      </Grid>
    </>
  );
};
