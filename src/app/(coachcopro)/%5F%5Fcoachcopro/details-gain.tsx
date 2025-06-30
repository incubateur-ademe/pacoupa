import CloseIcon from "@mui/icons-material/Close";
import MuiButton from "@mui/material/Button";

import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";
import { approximation } from "@/utils/number";

// import { CoachCoproButtonSecondary } from "./components/button";

const approximation1k = approximation(3);
const approximation100 = approximation(2);

export default function DetailsGain({
  onClose,
  solution,
}: {
  onClose: () => void;
  solution: SolutionAvecEnergieCoutAide;
}) {
  const approximationEnveloppe = approximation1k(solution.coutIsolationEnveloppe ?? 0);
  const approximationSysteme = approximation1k(solution.coutInstallationSysteme ?? 0);

  const aidesLogement = approximation100(solution.aidesInstallationSysteme);
  console.log(solution);

  return (
    <>
      <div className="w-full max-w-xl overflow-auto p-8 border-3 border-solid border-[#6B7280] rounded-lg bg-white">
        <div className="flex items-center justify-between w-full mb-4">
          <h2 className="text-2xl font-extrabold m-0">Détails des estimations</h2>
          <MuiButton variant="text" endIcon={<CloseIcon />} onClick={onClose} className="text-black">
            <span className="sr-only">Fermer</span>
          </MuiButton>
        </div>
        <h3 className="text-base font-semibold mb-3">💸 Coût total du projet</h3>
        <div className="p-2 flex flex-col gap-2">
          <div className="flex items-center justify-between w-full">
            <p className="mb-0">Isolation du bâtiment&nbsp;: </p>
            <p className="mb-0 font-semibold">≈ {approximationEnveloppe} €</p>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="mb-0">Installation du système de chauffage&nbsp;: </p>
            <p className="mb-0 font-semibold">≈ {approximationSysteme} €</p>
          </div>
          <hr className="w-full" />
          <div className="flex items-center justify-between w-full">
            <p className="mb-0 font-medium">Total des coûts&nbsp;: </p>
            <p className="mb-0 font-semibold text-[#E41571]">≈ {approximationEnveloppe + approximationSysteme} €</p>
          </div>
        </div>
        <h3 className="text-base font-semibold mt-6 mb-3">💸 Aides nationales minimum</h3>
        <div className="p-2 flex flex-col gap-2">
          {/* <div className="flex items-center justify-between w-full">
            <p className="mb-0">Aides nationales&nbsp;: </p>
            <p className="mb-0 font-semibold">⩾ {aidesLogement} €</p>
          </div> */}
          {/* <hr className="w-full" /> */}
          <div className="flex items-center justify-between w-full">
            <p className="mb-0 font-medium">Total des aides&nbsp;: </p>
            <p className="mb-0 font-semibold text-[#E41571]">≈ {aidesLogement} €</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-4 justify-end">
          <CoachCoproButtonSecondary type="button" onClick={onClose}>
            Retour
          </CoachCoproButtonSecondary>
        </div> */}
      </div>
    </>
  );
}
