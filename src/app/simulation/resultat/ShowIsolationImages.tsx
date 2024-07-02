import { IsolationFenetresImage } from "@/components/img/isolations/IsolationFenetresImage";
import { IsolationMursImage } from "@/components/img/isolations/IsolationMursImage";
import { IsolationSolImage } from "@/components/img/isolations/IsolationSolImage";
import { IsolationToitureImage } from "@/components/img/isolations/IsolationToitureImage";
import { type GesteIsolation } from "@/lib/common/domain/values/GesteIsolation";
import { type Solution } from "@/lib/common/domain/values/Solution";
import { type SolutionEnergie } from "@/lib/common/domain/values/SolutionEnergie";

type Props = {
  gestes: GesteIsolation[];
};

export const computeIsolations = (solution: Solution & SolutionEnergie): GesteIsolation[] => {
  const result: GesteIsolation[] = [];

  if (solution.etaIsolationPlancherBasApres === "Isolé" && solution.etaIsolationPlancherBasAvant === "Pas isolé")
    result.push("sol");

  if (solution.etaIsolationMursApres === "Isolé" && solution.etaIsolationMursAvant === "Pas isolé") result.push("murs");

  if (solution.etaIsolationMenuiseriesApres === "Isolé" && solution.etaIsolationMenuiseriesAvant === "Pas isolé")
    result.push("fenetres");

  if (solution.etaIsolationPlancherHautApres === "Isolé" && solution.etaIsolationPlancherHautAvant === "Pas isolé")
    result.push("toiture");

  return result;
};

export const ShowIsolationImages = ({ gestes }: Props) => {
  return (
    <>
      {gestes.includes("sol") && <IsolationSolImage />}

      {gestes.includes("murs") && <IsolationMursImage />}

      {gestes.includes("fenetres") && <IsolationFenetresImage />}

      {gestes.includes("toiture") && <IsolationToitureImage />}
    </>
  );
};
