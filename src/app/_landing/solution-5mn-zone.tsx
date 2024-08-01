import { ComprehensibleImage } from "@/components/img/ComprehensibleImage";
import { CrayonImage } from "@/components/img/CrayonImage";
import { QuestionnaireImage } from "@/components/img/QuestionnaireImage";
import { VCard } from "@/components/VCard";
import { Container } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

export const Solution5mnZone = () => {
  return (
    <div>
      <Container>
        <H2>La solution qui vous correspond en moins de 5min</H2>

        <div className="flex flex-col md:flex-row gap-4 md:gap-32 items-stretch">
          <VCard
            title="Simple"
            desc="Répondez à seulement quelques questions."
            image={<QuestionnaireImage width={80} />}
          />

          <VCard
            title="Personnalisée"
            desc="Déterminez la solution faite pour votre copropriété."
            image={<CrayonImage width={80} />}
          />

          <VCard
            title="Compréhensible"
            desc="Bénéficiez de conseils d’experts accessibles pour tous."
            image={<ComprehensibleImage width={80} />}
          />
        </div>
      </Container>
    </div>
  );
};
