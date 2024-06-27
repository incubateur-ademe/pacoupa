import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Evaluation } from "@/app/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/simulation/resultat/FranceRenovBlock";
import { familleImageMap, typeMap } from "@/app/simulation/resultat/helper";
import { Recommandation } from "@/app/simulation/resultat/Recommandation";
import { Button } from "@/components/Button";
import { Box } from "@/dsfr";
import { H2, H3, Text } from "@/dsfr/base/typography";
import { useScrollTop } from "@/lib/client/useScrollTop";
import { type Solution } from "@/lib/common/domain/values/Solution";
import { type SolutionEnergie } from "@/lib/common/domain/values/SolutionEnergie";

type Props = {
  back: () => void;
  solution: Solution & SolutionEnergie;
};

export const DetailSolution = ({ solution, back }: Props) => {
  useScrollTop();

  const { usageCh, usageEcs, usageFr } = solution;

  return (
    <Box className={cx("max-w-[800px]")}>
      <Box className={fr.cx("fr-mt-4w")}>
        <Button priority="tertiary" iconId="ri-arrow-go-back-line" onClick={back}>
          Retour à la liste
        </Button>
      </Box>

      <Box className={cx("flex items-start gap-4", fr.cx("fr-mt-4w"))}>
        <Box>{familleImageMap[solution.familleSolution]}</Box>
        <Box>
          <H2 className={fr.cx("fr-text--xl", "fr-mb-1w")}>{solution.nom}</H2>
          <Badge>{typeMap[solution.type]}</Badge>
        </Box>
      </Box>

      <Box className={fr.cx("fr-mt-2w")}>
        <Text>{solution.description}</Text>
      </Box>

      <Box className={fr.cx("fr-mt-4w")}>
        <Recommandation solution={{ usageCh, usageEcs, usageFr }} />
      </Box>

      <H3 className={fr.cx("fr-text--lg")}>Autres estimations</H3>
      <span className={fr.cx("fr-text--xs")}>(isolations comprises)</span>

      {/* <EstimationGains solution={solution} /> */}

      <Box className={cx("flex", "flex-col", "gap-4")}>
        <Evaluation categorie="environnement" solution={solution} withDetails />
        <hr />
        <Evaluation categorie="cout" solution={solution} withDetails />
        <hr />
        <Evaluation categorie="difficulte" solution={solution} withDetails />
        <hr />
        <Evaluation categorie="travauxCollectif" solution={solution} withDetails />
        <hr />
        <Evaluation categorie="travauxIndividuel" solution={solution} withDetails />
        <hr />
        <Evaluation categorie="acoustique" solution={solution} withDetails />
        <hr />
        <Evaluation categorie="espaceExterieur" solution={solution} withDetails />
        <hr />
        <Evaluation categorie="maturite" solution={solution} withDetails />
        <hr />
      </Box>

      <FranceRenovBlock />
    </Box>
  );
};
