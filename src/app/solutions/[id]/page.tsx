import { catalogueSolutions } from "@__content/solutions";
import { fr } from "@codegouvfr/react-dsfr";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { produce } from "immer";
import { z } from "zod";

import { Evaluation } from "@/app/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/simulation/resultat/FranceRenovBlock";
import { familleImageMap, typeMap } from "@/app/simulation/resultat/helper";
import { Recommandation } from "@/app/simulation/resultat/Recommandation";
import { Button } from "@/components/Button";
import { Box } from "@/dsfr";
import { H2, H3, Text } from "@/dsfr/base/typography";

// import { sharedMetadata } from "./shared-metadata";

// const title = `Détail d'une solution - ${config.name}`;
// const url = "/solution/[id]";

// export const metadata: Metadata = {
//   ...sharedMetadata,
//   title,
//   openGraph: {
//     ...sharedMetadata.openGraph,
//     title,
//     url,
//   },
//   alternates: {
//     canonical: url,
//   },
// };

const noteSchema = z.enum(["A", "B", "C", "D", "E"]);

const schema = z.object({
  noteCout: noteSchema,
  noteDifficulte: noteSchema,
  noteTravauxCollectif: noteSchema,
  noteTravauxIndividuel: noteSchema,
});

const SolutionPage = ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    hash: string;
    noteCout: string;
    noteDifficulte: string;
    noteTravauxCollectif: string;
    noteTravauxIndividuel: string;
  };
}) => {
  if (!params.id) throw new Error("Erreur lors de l'appel de la page de solution");

  const baseSolution = catalogueSolutions[params.id];

  if (!baseSolution) throw new Error(`Erreur : aucune solution trouvée pour l'id ${params.id}`);

  const { usageCh, usageEcs, usageFr } = baseSolution;

  const validation = schema.safeParse(searchParams);

  if (!validation.success) throw new Error("Erreur lors de l'appel de la page de solution");

  // We enrich the solution with notes found from the context of the simulation.
  const solution = produce(baseSolution, draft => {
    draft.cout.note = validation.data.noteCout;
    draft.difficulte.note = validation.data.noteDifficulte;
    draft.travauxCollectif.note = validation.data.noteTravauxCollectif;
    draft.travauxIndividuel.note = validation.data.noteTravauxIndividuel;
  });

  return (
    <Box className={cx("max-w-[800px]")}>
      <Box className={fr.cx("fr-mt-4w")}>
        <Button
          priority="tertiary"
          iconId="ri-arrow-go-back-line"
          linkProps={{ href: `/simulation/resultat?hash=${searchParams.hash}` }}
        >
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

export default SolutionPage;
