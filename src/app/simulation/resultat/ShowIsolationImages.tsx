import { type PropsWithChildren } from "react";

import { IsolationFenetresImage } from "@/components/img/isolations/IsolationFenetresImage";
import { IsolationMursImage } from "@/components/img/isolations/IsolationMursImage";
import { IsolationSolImage } from "@/components/img/isolations/IsolationSolImage";
import { IsolationToitureImage } from "@/components/img/isolations/IsolationToitureImage";
import { type Solution } from "@/lib/common/domain/values/Solution";
import { type SolutionEnergie } from "@/lib/common/domain/values/SolutionEnergie";

type Props = {
  solution: Solution & SolutionEnergie;
};

export const ShowIsolationImages = ({ solution }: PropsWithChildren<Props>) => {
  return (
    <>
      {solution.etaIsolationPlancherBasApres === "Isolé" && solution.etaIsolationPlancherBasAvant === "Pas isolé" && (
        <IsolationSolImage />
      )}

      {solution.etaIsolationMursApres === "Isolé" && solution.etaIsolationMursAvant === "Pas isolé" && (
        <IsolationMursImage />
      )}

      {solution.etaIsolationMenuiseriesApres === "Isolé" && solution.etaIsolationMenuiseriesAvant === "Pas isolé" && (
        <IsolationFenetresImage />
      )}

      {solution.etaIsolationPlancherHautApres === "Isolé" && solution.etaIsolationPlancherHautAvant === "Pas isolé" && (
        <IsolationToitureImage />
      )}
    </>
  );
};
