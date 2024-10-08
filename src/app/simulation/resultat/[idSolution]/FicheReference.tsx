import { fichesReference } from "@__content/fiches-reference";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { FranceImage } from "@/components/img/FranceImage";
import { H3, H6 } from "@/dsfr/base/typography";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";

interface FicheReferenceProps {
  solution: SolutionAvecEnergieCoutAide;
}
export const FicheReference: React.FC<FicheReferenceProps> = ({ solution }) => {
  const fiches = Object.values(fichesReference).filter(value => value.solutionId.startsWith(solution.id));

  return (
    <>
      <H3 className="text-lg font-medium mb-4">Exemple d’application</H3>

      {fiches.map((fiche, index) => (
        <Card
          key={index}
          content={
            <div className="grid grid-cols-[80px_1fr] gap-8">
              <div>
                <FranceImage className="" />
              </div>
              <div className="flex flex-col">
                <H6 className="mb-0">{fiche.titrePrincipal}</H6>
                <div className="text-gray-600">{fiche.lieu}</div>
                <div className="self-end">
                  <Button priority="tertiary" onClick={() => {}}>
                    Voir l'exemple
                  </Button>
                </div>
              </div>
            </div>
          }
        />
      ))}
    </>
  );
};
