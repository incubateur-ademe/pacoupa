import { fr } from "@codegouvfr/react-dsfr";

import { Card } from "@/components/Card";
import { Camembert18PourcentImage } from "@/components/img/Camembert18PourcentImage";
import { Camembert47PourcentImage } from "@/components/img/Camembert47PourcentImage";
import { Maison2Image } from "@/components/img/Maison2";
import { TallyButton } from "@/components/TallyButton";
import { Container, Grid, GridCol, P } from "@/dsfr";
import { H3 } from "@/dsfr/base/typography";

export const DecarbonnonsZone = () => {
  return (
    <>
      <Container>
        <H3 mt="10w">Décarbonons le bâtiment !</H3>

        <P>
          Nous devons décarboner les deux tiers de notre consommation d’énergie d’origine fossile et importée de l’autre
          bout du monde.
        </P>

        <Container>
          <Grid haveGutters valign="top">
            <GridCol base={4} className={"flex flex-col justify-center content-center"}>
              <H3 as="h5">Le secteur du batiment en 2 chiffres</H3>

              <Maison2Image width={300} />
            </GridCol>

            <GridCol base={4} className={"flex flex-col items-center"}>
              <Camembert47PourcentImage width={150} />

              <p className={fr.cx("fr-text--sm")}>part de la consommation énergétique française</p>

              <Camembert18PourcentImage width={150} />

              <p className={fr.cx("fr-text--sm")}>part des émissions nationales de gaz à effet de serre (GES)</p>
            </GridCol>

            <GridCol base={4} className={"flex flex-col justify-center content-center gap-6"}>
              <Card
                border
                shadow
                desc={
                  <P>
                    Ces émissions sont principalement dues au chauffage et aux besoins thermiques (eau chaude sanitaire,
                    cuisson) qui reposent aujourd’hui encore <strong>à plus de 50% sur des énergies fossiles</strong>{" "}
                    (fioul, gaz fossile).
                  </P>
                }
                // imageUrl="/img/chaudiere-cassee.svg"
                size="small"
                title=""
                titleAs="h4"
              />
              <Card
                border
                shadow
                desc={
                  <>
                    <P>
                      Passer d’une énergie fossile à un vecteur décarboné devrait permettre d’abaisser{" "}
                      <strong>rapidement</strong> et <strong>très significativement</strong> les émissions de CO2.
                    </P>
                    <P>
                      Toutefois, les solutions ne sont pas universelles, pas toutes matures, et ne peuvent s’envisager
                      indépendamment de l’isolation et de la sobriété.
                    </P>

                    <TallyButton />
                  </>
                }
                // imageUrl="/img/chaudiere-cassee.svg"
                size="small"
                title=""
                titleAs="h4"
              />
            </GridCol>
          </Grid>
        </Container>
      </Container>
    </>
  );
};
