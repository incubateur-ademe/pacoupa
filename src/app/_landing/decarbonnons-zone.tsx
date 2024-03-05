import { fr } from "@codegouvfr/react-dsfr";
import Card from "@codegouvfr/react-dsfr/Card";

import { CTA } from "@/components/CTA";
import { Camembert1Image } from "@/components/img/Camembert1";
import { Camembert2Image } from "@/components/img/Camembert2";
import { Maison2Image } from "@/components/img/Maison2";
import { config } from "@/config";
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
              <Camembert1Image width={150} />

              <p className={fr.cx("fr-text--sm")}>part de la consommations énergétiques françaises </p>

              <Camembert2Image width={150} />

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

                    <CTA source={"Décarbonnons"} title={config.ctaTitle} href="/mentions-legales">
                      {config.ctaTitle}
                    </CTA>
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
