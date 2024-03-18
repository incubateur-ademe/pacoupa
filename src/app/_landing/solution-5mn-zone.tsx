import { ComprehensibleImage } from "@/components/img/ComprehensibleImage";
import { CrayonImage } from "@/components/img/CrayonImage";
import { QuestionnaireImage } from "@/components/img/QuestionnaireImage";
import { VCard } from "@/components/VCard";
import { Box, Container } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

export const Solution5mnZone = () => {
  return (
    <Box>
      <Container>
        <H2 mt="16w">La solution qui vous correspond en moins de 5min</H2>

        <Box className="flex flex-col md:flex-row gap-8 items-stretch">
          <VCard
            title="Simple"
            desc="Répondez à seulement quelques questions."
            image={<QuestionnaireImage width={80} />}
          />

          <VCard
            title="Personnalisée"
            desc="Déterminez la solution faites pour votre copropriété."
            image={<CrayonImage width={80} />}
          />

          <VCard
            title="Compréhensible"
            desc="Bénéficiez de conseils d’experts accessibles pour tous."
            image={<ComprehensibleImage width={80} />}
          />
        </Box>
      </Container>
    </Box>
  );
};
