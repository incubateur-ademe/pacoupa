import { fichesReference } from "@__content/fiches-reference";

import { H3 } from "@/dsfr/base/typography";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";

import { FicheReferenceCard } from "./FicheReferenceCard";

interface FicheReferenceProps {
  solution: SolutionAvecEnergieCoutAide;
}

export const FicheReferenceList: React.FC<FicheReferenceProps> = ({ solution }) => {
  const fiches = Object.values(fichesReference).filter(value => value.solutionId.startsWith(solution.id));

  if (fiches.length === 0) return null;

  return (
    <>
      <H3 className="text-lg font-medium mb-4">Exemple{fiches && fiches.length > 1 ? "s" : ""} d’application</H3>

      <div className="flex flex-col gap-6">
        {fiches.map((fiche, index) => (
          <FicheReferenceCard key={index} fiche={fiche} solution={solution} />
        ))}
      </div>
    </>
  );
};
