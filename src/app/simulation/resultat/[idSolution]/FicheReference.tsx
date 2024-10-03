import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { H3, H6 } from "@/dsfr/base/typography";
import { type SolutionAvecEnergieCoutAide } from "@/lib/common/domain/values/SolutionAvecEnergieCoutAide";

interface FicheReferenceProps {
  solution: SolutionAvecEnergieCoutAide;
}
export const FicheReference: React.FC<FicheReferenceProps> = ({ solution }) => {
  return (
    <>
      <H3 className="text-lg font-medium mb-4">Exemple d’application</H3>
      <Card
        content={
          <div className="flex gap-8">
            <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              {/* Placeholder for SVG icon */}
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                <path d="M11 11h2v6h-2zm0-4h2v2h-2z" />
              </svg>
            </div>

            <div>
              <H6 className="mb-0">{solution.ficheReference.titrePrincipal}</H6>
              <div className="text-gray-600">{solution.ficheReference.lieu}</div>
            </div>
          </div>
        }
        footer={
          <Button priority="tertiary" onClick={() => {}}>
            Voir l'exemple
          </Button>
        }
      />
    </>
  );
};
