import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Evaluation } from "@/app/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/simulation/resultat/FranceRenovBlock";
import { familleImageMap, typeMap } from "@/app/simulation/resultat/helper";
import { Button } from "@/components/Button";
import { EstimationGains } from "@/components/EstimationGains";
import { Box } from "@/dsfr";
import { H2, H3, Text } from "@/dsfr/base/typography";
import { useScrollTop } from "@/lib/client/useScrollTop";
import { type SolutionAvecEnergie } from "@/lib/common/domain/values/SolutionAvecEnergie";

import { Usage } from "./Usage";

type Props = {
  back: () => void;
  solution: SolutionAvecEnergie;
};

export const DetailSolution = ({ solution, back }: Props) => {
  useScrollTop();

  const typeComponent = typeMap[solution.type];

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
          {typeComponent && <Badge>{typeComponent}</Badge>}
        </Box>
      </Box>

      <Box className={fr.cx("fr-mt-2w")}>
        <Text>{solution.description}</Text>
      </Box>

      <Box className={fr.cx("fr-mt-4w")}>
        <Usage solution={solution} withTitle={true} />
      </Box>

      <H3 className={fr.cx("fr-text--lg")}>Autres </H3>
      <span className={fr.cx("fr-text--xs")}>(isolations comprises)</span>

      <EstimationGains solution={solution} />

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
