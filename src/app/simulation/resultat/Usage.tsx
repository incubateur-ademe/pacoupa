import { Badge as BadgeMui, Tooltip } from "@mui/material";

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
      <div className="flex gap-1">
        {withTitle && <Text className="font-medium mb-1">Usage</Text>}

        {typeComponent}
      </div>

      <Grid haveGutters valign="top" className="mt-4">
        {usageCh !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-center"}>
            <BadgeMui variant="dot" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
              <Tooltip
                title={
                  usageCh === "Oui"
                    ? "Solution permettant le chauffage"
                    : "Solution permettant potentiellement le chauffage"
                }
                arrow
              >
                <div className="size-10">
                  <ChauffageImage />
                </div>
              </Tooltip>
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
              <Tooltip
                title={
                  usageEcs === "Oui"
                    ? "Solution permettant l'eau chaude sanitaire"
                    : "Solution permettant potentiellement l'eau chaude sanitaire"
                }
                arrow
              >
                <div className="size-10">
                  <EcsImage />
                </div>
              </Tooltip>
            </BadgeMui>
          </GridCol>
        )}

        {usageFr !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-center"}>
            <BadgeMui variant="dot" color={usageFr === "Oui" ? "success" : "info"}>
              <Tooltip
                title={
                  usageFr === "Oui"
                    ? "Solution permettant la climatisation"
                    : "La climatisation ne sera pas possible avec des radiateurs à eau. Il faudra soit les remplacer par des ventilo-convecteurs, soit utiliser un plancher rafraichissant (si présent)."
                }
                arrow
              >
                <div className="size-10">
                  <ClimatisationImage />
                </div>
              </Tooltip>
            </BadgeMui>
          </GridCol>
        )}
      </Grid>
      <Grid>
        {usageCh !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-start"}>
            <Text inline variant="xs" className="mt-2">
              Chauffage
            </Text>
          </GridCol>
        )}
        {usageEcs !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-start"}>
            <Text inline variant="xs" className="mt-2">
              Eau chaude
            </Text>
          </GridCol>
        )}
        {usageFr !== "Non" && (
          <GridCol base={4} className={"flex justify-center items-start"}>
            <Text inline variant="xs" className="mt-2">
              Climatisation
            </Text>
          </GridCol>
        )}
      </Grid>
    </>
  );
};
