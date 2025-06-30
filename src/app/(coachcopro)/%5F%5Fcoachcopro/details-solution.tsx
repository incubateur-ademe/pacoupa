import CloseIcon from "@mui/icons-material/Close";
import MuiButton from "@mui/material/Button";

import { familleImageMap } from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { Isolation } from "@/app/(decorated)/(center)/simulation/resultat/Isolation";
import { calculeIsolationsManquantes } from "@/app/(decorated)/(center)/simulation/resultat/ShowIsolationImages";
import { Usage } from "@/app/(decorated)/(center)/simulation/resultat/Usage";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { Evaluation } from "@/app/(decorated)/(center)/simulation/resultat/Evaluation";

export default function DetailsSolution({
  onClose,
  solution,
}: {
  onClose: () => void;
  solution: SolutionAvecEnergieCoutAide;
}) {
  const gestes = calculeIsolationsManquantes(solution);
  return (
    <>
      <div className="w-full max-w-xl p-8 border-3 border-solid border-[#6B7280] rounded-lg bg-white">
        <div className="flex flex-row justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            <div>{familleImageMap[solution.familleSolution]}</div>
            <div>
              <h2 className="text-xl font-bold mb-0 text-balance">{solution.nom}</h2>
              <p className="text-sm font-normal">{solution.description}</p>
            </div>
          </div>
          <MuiButton variant="text" endIcon={<CloseIcon />} onClick={onClose} className="text-black">
            <span className="sr-only">Fermer</span>
          </MuiButton>
        </div>
        <div className="space-y-4 mb-4 flex-col flex">
        <h3 className="text-base font-semibold mb-3">Usage</h3>
          <Usage solution={solution} />
          {/* <Isolation gestes={gestes} /> */}

        <h3 className="text-base font-semibold mb-3">Caractéristique de la solution</h3>
        <Evaluation categorie="difficulte" solution={solution} withDetails />

        <Evaluation categorie="travauxCollectif" solution={solution} withDetails />

        <Evaluation categorie="travauxIndividuel" solution={solution} withDetails />
        <Evaluation categorie="acoustique" solution={solution} withDetails />

<Evaluation categorie="espaceExterieur" solution={solution} withDetails />

<Evaluation categorie="maturite" solution={solution} withDetails />
        </div>

      </div>
    </>
  );
}
