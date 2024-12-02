import { ComprehensibleImage } from "@/components/img/ComprehensibleImage";
import { CrayonImage } from "@/components/img/CrayonImage";
import { QuestionnaireImage } from "@/components/img/QuestionnaireImage";
import { VCard } from "@/components/VCard";
import { H2 } from "@/dsfr/base/typography";

export const Solution5mnZone = () => {
  return (
    <>
      <H2>La solution qui vous correspond en moins de 5min</H2>

      <div className="grid justify-center grid-col-1 md:grid-cols-3 gap-4">
        <div className="max-w-[280px]">
          <VCard
            title="Simple"
            desc="Répondez à seulement quelques questions."
            image={<Details.QuestionnaireImage width={80} />}
          />
        </div>

        <div className="max-w-[280px]">
          <VCard
            title="Personnalisée"
            desc="Déterminez la solution faite pour votre copropriété."
            image={<CrayonImage width={80} />}
          />
        </div>
        <div className="max-w-[280px]">
          <VCard
            title="Compréhensible"
            desc="Bénéficiez de conseils d’experts accessibles pour tous."
            image={<ComprehensibleImage width={80} />}
          />
        </div>
      </div>
    </>
  );
};
