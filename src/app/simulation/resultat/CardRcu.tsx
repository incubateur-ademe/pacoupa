import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Box, P } from "@/dsfr";
import { H4, Text } from "@/dsfr/base/typography";
import { type GetSolutionsParCriteresReturnType } from "@/lib/server/useCases/getSolutionsParCriteres";

import { familleImageMap, typeMap } from "./helper";
import { Recommandation } from "./Recommandation";

const rcuSolution = {
  usageCH: "Oui",
  usageECS: "Oui",
  usageFr: "Non",
} satisfies Pick<GetSolutionsParCriteresReturnType[number], "usageCH" | "usageECS" | "usageFr">;

export const CardRcu = () => {
  return (
    <>
      <Card
        desc={
          <>
            <Box className={fr.cx("fr-mt-2w")}>
              <Text>
                Le réseau de chaleur est un système de canalisations qui permettent d’acheminer vers un ensemble de
                bâtiments de la chaleur produite localement, à partir d’énergies renouvelables et de récupération.
              </Text>
            </Box>

            <Recommandation solution={rcuSolution} />

            <H4 className={cx(fr.cx("fr-text--sm", "fr-mb-1w"), "font-normal")}>⚠️ Réglementation</H4>

            <P>
              Plus de 500 réseaux de chaleur sont désormais “classés”, ce qui signifie que certains bâtiments ont
              l'obligation de se raccorder. Testez votre éligibilité sur le site de france chaleur urbaine.
            </P>
          </>
        }
        horizontal
        size="small"
        title={
          <Box className={cx("flex items-start gap-4")}>
            <Box>{familleImageMap["RCU"]}</Box>
            <Box>
              <span className={cx("mb-0", fr.cx("fr-text--xl"))}>Réseau de chaleur</span>
              <br />
              <Badge>{typeMap["COL"]}</Badge>
            </Box>
          </Box>
        }
        titleAs="h3"
        end={
          <Button
            priority="tertiary no outline"
            linkProps={{
              href: `https://france-chaleur-urbaine.beta.gouv.fr/`,
            }}
          >
            france-chaleur-urbaine
          </Button>
        }
      />
    </>
  );
};
