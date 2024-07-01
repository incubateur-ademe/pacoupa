import { fr } from "@codegouvfr/react-dsfr";
import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { useWindowSize } from "usehooks-ts";

import { Evaluation } from "@/app/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/simulation/resultat/FranceRenovBlock";
import { familleImageMap } from "@/app/simulation/resultat/helper";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { EstimationGains } from "@/components/EstimationGains";
import { Logo } from "@/components/img/Logo";
import { Box } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";
import { useScrollTop } from "@/lib/client/useScrollTop";
import { type SolutionAvecEnergie } from "@/lib/common/domain/values/SolutionAvecEnergie";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { Isolation } from "./Isolation";
import { computeIsolations } from "./ShowIsolationImages";
import { Usage } from "./Usage";

type Props = {
  back: () => void;
  solution: SolutionAvecEnergie;
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

export const DetailSolution = ({ solution, back, travauxNiveauIsolation }: Props) => {
  useScrollTop();
  const { width = 0 } = useWindowSize({ debounceDelay: 100, initializeWithValue: false });

  const gestes = computeIsolations(solution);

  return (
    <Box className={cx("max-w-[800px]")}>
      <Box className={cx("sticky", "top-0", "bg-white", "z-10", "pb-4", "pt-4")}>
        <Box className={cx("flex", "justify-between")}>
          <Button priority="tertiary" iconId="ri-arrow-go-back-line" onClick={back}>
            Retour à la liste
          </Button>
          <Button
            priority="tertiary"
            iconId="ri-share-fill"
            iconPosition="right"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).catch(console.error);
            }}
          >
            {width > breakpoints.getPxValues().sm ? "Partager la solution" : ""}
          </Button>
        </Box>

        <Box className={cx("flex items-start gap-4", fr.cx("fr-mt-4w"))}>
          <Box>{familleImageMap[solution.familleSolution]}</Box>
          <Box>
            <H2 className={fr.cx("fr-text--xl", "fr-mb-1w")}>{solution.nom}</H2>
          </Box>
        </Box>
      </Box>

      <Box className={fr.cx("fr-mt-2w")}>
        <Text>{solution.description}</Text>
      </Box>

      <Box className="mt-4">
        <Usage solution={solution} withTitle={true} />
      </Box>

      <hr />

      <Box>
        <Isolation gestes={gestes} travauxNiveauIsolation={travauxNiveauIsolation} />
      </Box>

      <hr className="mt-8" />

      <Box>
        <EstimationGains solution={solution} />
      </Box>

      <Box className="mt-0">
        <Callout
          type="pacoupa"
          icon={<Logo />}
          content={
            <>
              Un logement mieux isolé :
              <ul>
                <li>Augmente la valeur du bien</li>
                <li>Est moins sensible aux variations de prix de l’énergie</li>
                <li>Améliore votre confort</li>
              </ul>
            </>
          }
        />
      </Box>

      <Text className="font-medium mt-8 mb-0">Autres estimations</Text>
      <span className={fr.cx("fr-text--xs")}>(isolations comprises)</span>

      <Box className={cx("flex", "flex-col", "gap-4", "mt-4")}>
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

      <FranceRenovBlock withWorkflow={true} />
    </Box>
  );
};
