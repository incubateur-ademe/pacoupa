import { fr } from "@codegouvfr/react-dsfr";
import { breakpoints } from "@codegouvfr/react-dsfr/fr/breakpoints";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { Evaluation } from "@/app/simulation/resultat/Evaluation";
import { FranceRenovBlock } from "@/app/simulation/resultat/FranceRenovBlock";
import { familleImageMap } from "@/app/simulation/resultat/helper";
import { Button } from "@/components/Button";
import { EstimationCouts } from "@/components/EstimationCouts";
import { EstimationGains } from "@/components/EstimationGains";
import { Box } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";
import { useScrollTop } from "@/lib/client/useScrollTop";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { Isolation } from "./Isolation";
import { computeIsolations } from "./ShowIsolationImages";
import { Usage } from "./Usage";

type Props = {
  back: () => void;
  informationBatiment: InformationBatiment;
  solution: SolutionAvecEnergieCoutAide;
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

export const DetailSolution = ({ solution, informationBatiment, travauxNiveauIsolation, back }: Props) => {
  useScrollTop();
  const [showToast, setShowToast] = useState(false);

  const { width = 0 } = useWindowSize({ debounceDelay: 100, initializeWithValue: false });

  const gestes = computeIsolations(solution);

  const handleClose = (event: Event | React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setShowToast(false);
  };

  return (
    <Box className="max-w-[800px]">
      <Box className="sticky top-0 bg-white z-10 pb-4 pt-4">
        <Box className="flex justify-between">
          <Button priority="tertiary" iconId="ri-arrow-go-back-line" onClick={back}>
            Retour à la liste
          </Button>
          <Button
            priority="tertiary"
            iconId="ri-share-fill"
            iconPosition="right"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href).catch(console.error);
              setShowToast(true);
            }}
          >
            {width > breakpoints.getPxValues().sm ? "Partager la solution" : ""}
          </Button>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={showToast}
            onClose={handleClose}
            autoHideDuration={4000}
            message="L'URL a bien été copiée 🚀."
          ></Snackbar>
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

      <EstimationGains solution={solution} informationBatiment={informationBatiment} avecMessage />

      <EstimationCouts solution={solution} informationBatiment={informationBatiment} />

      <Text className="font-medium mt-8 mb-0">Autres estimations</Text>
      <span className={fr.cx("fr-text--xs")}>(isolations comprises)</span>

      <Box className="flex flex-col gap-4 mt-4">
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

      <FranceRenovBlock withWorkflow={true} showToast={setShowToast} />
    </Box>
  );
};
