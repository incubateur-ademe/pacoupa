import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Camembert18PourcentImage } from "@/components/img/Camembert18PourcentImage";
import { Camembert47PourcentImage } from "@/components/img/Camembert47PourcentImage";
import { Maison2Image } from "@/components/img/Maison2";
import { TallyButton } from "@/components/TallyButton";
import { Box, Container, Grid, GridCol, P } from "@/dsfr";
import { H3 } from "@/dsfr/base/typography";

export const DecarbonnonsZone = () => {
  return (
    <>
      <Container>
        <H3 mt="14w">Décarbonons le bâtiment !</H3>
        <Grid haveGutters valign="top">
          <GridCol base={8} className={"flex flex-col justify-center content-center"}>
            <P>
              Nous devons décarboner les deux tiers de notre consommation d’énergie d’origine fossile et importée de
              l’autre bout du monde.
            </P>
            <H3 as="h5">Le secteur du batiment en 2 chiffres</H3>

            <Box className="flex">
              <Box className="flex flex-col gap-4 items-center p-8">
                <Camembert47PourcentImage width={150} />
                <p className={cx(fr.cx("fr-text--sm"), "text-center")}>part de la consommation énergétique française</p>
              </Box>

              <Box className="flex flex-col gap-4 items-center p-8">
                <Camembert18PourcentImage width={150} />
                <p className={cx(fr.cx("fr-text--sm"), "text-center")}>
                  part des émissions nationales de gaz à effet de serre (GES)
                </p>
              </Box>
            </Box>

            <P>
              Ces émissions sont principalement dues au chauffage et aux besoins thermiques (eau chaude sanitaire,
              cuisson) qui reposent aujourd’hui encore <strong>à plus de 50% sur des énergies fossiles</strong> (fioul,
              gaz fossile).
            </P>

            <P>
              Passer d’une énergie fossile à un vecteur décarboné devrait permettre d’abaisser{" "}
              <strong>rapidement</strong> et <strong>très significativement</strong> les émissions de CO2.
            </P>
            <P>
              Toutefois, les solutions ne sont pas universelles, pas toutes matures, et ne peuvent s’envisager
              indépendamment de l’isolation et de la sobriété.
            </P>

            <H3>Pacoupa vous guide dans ce choix</H3>

            <TallyButton />
          </GridCol>

          <GridCol base={4} className="mt-8">
            <Maison2Image width={300} />
          </GridCol>
        </Grid>
      </Container>
    </>
  );
};
