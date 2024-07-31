import { CTA } from "@/components/CTA";
import { Camembert18PourcentImage } from "@/components/img/Camembert18PourcentImage";
import { Camembert47PourcentImage } from "@/components/img/Camembert47PourcentImage";
import { Maison2Image } from "@/components/img/Maison2";
import { Container, Grid, GridCol } from "@/dsfr";
import { H3, Text } from "@/dsfr/base/typography";

export const DecarbonnonsZone = () => {
  return (
    <>
      <Container className="mb-16">
        <H3 mt="14w">Décarbonons le bâtiment !</H3>
        <Grid haveGutters valign="top">
          <GridCol base={8} className={"flex flex-col justify-center content-center"}>
            <Text>
              Nous devons décarboner les <strong>deux tiers</strong> de notre consommation d’énergie d’origine fossile
              et importée de l’autre bout du monde.
            </Text>
            <H3 as="h5">Le secteur du bâtiment en 2 chiffres</H3>

            <div className="flex">
              <div className="flex flex-col gap-4 items-center p-8">
                <Camembert47PourcentImage width={150} />
                <Text variant="sm" className="text-center">
                  part de la consommation énergétique française
                </Text>
              </div>

              <div className="flex flex-col gap-4 items-center p-8">
                <Camembert18PourcentImage width={150} />
                <Text variant="sm" className="text-center">
                  part des émissions nationales de gaz à effet de serre (GES)
                </Text>
              </div>
            </div>

            <Text>
              Ces émissions sont principalement dues au chauffage et aux besoins thermiques (eau chaude sanitaire,
              cuisson) qui reposent aujourd’hui encore <strong>à plus de 50% sur des énergies fossiles</strong> (fioul,
              gaz fossile).
            </Text>

            <Text>
              Passer d’une énergie fossile à un vecteur décarboné devrait permettre d’abaisser{" "}
              <strong>rapidement</strong> et <strong>très significativement</strong> les émissions de CO2.
            </Text>
            <Text>
              Toutefois, les solutions ne sont pas universelles, pas toutes matures, et ne peuvent s’envisager
              indépendamment de l’isolation et de la sobriété.
            </Text>

            <H3>Pacoupa vous guide dans ce choix</H3>

            <CTA source="landing" />
          </GridCol>

          <GridCol base={4} className="mt-8">
            <Maison2Image width={300} />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};
