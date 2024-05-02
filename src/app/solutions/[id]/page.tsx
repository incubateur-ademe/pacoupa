import { catalogueSolutions } from "@__content/solutions";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Evaluation } from "@/app/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/simulation/resultat/FranceRenovBlock";
import { familleImageMap, typeMap } from "@/app/simulation/resultat/helper";
import { Recommandation } from "@/app/simulation/resultat/Recommandation";
import { Box } from "@/dsfr";
import { H2, H3, Text } from "@/dsfr/base/typography";

const SolutionPage = ({ params }: { params: { id: string } }) => {
  const solution = catalogueSolutions[params.id];

  const { usageCh, usageEcs, usageFr } = solution;

  return (
    <>
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

      <H3 className={fr.cx("fr-text--lg")}>Toutes les évaluations</H3>

      <Box className={cx("flex", "flex-col", "gap-4")}>
        <Evaluation categorie="environnement" solution={solution} />
        <Evaluation categorie="cout" solution={solution} />
        <Evaluation categorie="difficulte" solution={solution} />
        <Evaluation categorie="travauxCollectif" solution={solution} />
        <Evaluation categorie="travauxIndividuel" solution={solution} />
        <Evaluation categorie="acoustique" solution={solution} />
        <Evaluation categorie="espaceExterieur" solution={solution} />
        <Evaluation categorie="maturite" solution={solution} />
      </Box>

      <FranceRenovBlock />
    </>
  );
};

export default SolutionPage;
