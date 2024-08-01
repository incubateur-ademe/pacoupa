import { CTA } from "@/components/CTA";
import { Camembert18PourcentImage } from "@/components/img/Camembert18PourcentImage";
import { Camembert47PourcentImage } from "@/components/img/Camembert47PourcentImage";
import { Maison2Image } from "@/components/img/Maison2";
import { Container } from "@/dsfr";
import { H2, H3, Text } from "@/dsfr/base/typography";

export const DecarbonnonsZone = () => {
  return (
    <>
      <Container>
        <H2>Décarbonons le bâtiment !</H2>
        <Text variant="xl">
          Nous devons décarboner les <strong>deux tiers</strong> de notre consommation d’énergie d’origine fossile et
          importée de l’autre bout du monde.
        </Text>

        <div className="flex flex-col md:flex-row gap-8 md:gap-32">
          <div>
            <H3 as="h4">Le secteur du bâtiment en 2 chiffres</H3>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col gap-2 items-center px-8">
                <Camembert47PourcentImage width={150} />
                <Text variant="md" className="text-center mb-0">
                  part de la consommation énergétique française
                </Text>
              </div>

              <div className="flex flex-col gap-2 items-center px-8">
                <Camembert18PourcentImage width={150} />
                <Text variant="md" className="text-center mb-0">
                  part des émissions nationales de gaz à effet de serre (GES)
                </Text>
              </div>
            </div>

            <div className="mt-12">
              <Text variant="lg">
                Ces émissions sont principalement dues au chauffage et aux besoins thermiques (eau chaude sanitaire,
                cuisson) qui reposent aujourd’hui encore <strong>à plus de 50% sur des énergies fossiles</strong>{" "}
                (fioul, gaz fossile).
              </Text>

              <Text variant="lg">
                Passer d’une énergie fossile à un <strong>vecteur décarboné</strong> devrait permettre d’abaisser{" "}
                rapidement et très significativement les émissions de CO2.
              </Text>
              <Text variant="lg">
                Toutefois, les solutions ne sont pas universelles, pas toutes matures, et ne peuvent s’envisager
                indépendamment de <strong>l’isolation</strong> et de la <strong>sobriété</strong>.
              </Text>

              <H3 className="mt-8">Pacoupa vous guide dans ce choix</H3>

              <CTA source="landing" />
            </div>
          </div>

          <div>
            <Maison2Image width={300} />
          </div>
        </div>
      </Container>
    </>
  );
};
