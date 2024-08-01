import { CTA } from "@/components/CTA";
import { PlanteImage } from "@/components/img/PlanteImage";
import { Container } from "@/dsfr";
import { H2, Text } from "@/dsfr/base/typography";

export const LaisserGuider = () => {
  return (
    <>
      <Container>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-[1]">
            <H2>Laissez-vous guider</H2>
            <Text variant="xl">
              Ce simulateur détermine, selon les caractéristiques de votre immeuble, les différents types de chauffage
              et leur pertinence écologique et économique.
            </Text>

            <CTA source="landing" />
          </div>

          <div className="relative basis-[200px] grow">
            <PlanteImage />
          </div>
        </div>
      </Container>
    </>
  );
};
