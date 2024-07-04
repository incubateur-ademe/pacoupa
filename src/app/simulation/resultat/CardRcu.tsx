import { fr } from "@codegouvfr/react-dsfr";

import { BadgePacoupa } from "@/components/BadgePacoupa";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { Card } from "@/components/Card";
import { Box } from "@/dsfr";
import { type Solution } from "@/lib/common/domain/values/Solution";

import { familleImageMap } from "./helper";
import { Usage } from "./Usage";

const rcuSolution = {
  usageCh: "Oui",
  usageEcs: "Oui",
  usageFr: "Non",
  type: "COL",
} satisfies Pick<Solution, "type" | "usageCh" | "usageEcs" | "usageFr">;

export const CardRcu = () => {
  return (
    <>
      <Card
        content={
          <>
            <Box className="mt-4">
              <Callout
                type="info"
                content={
                  <>
                    Certaines zones autour du réseau sont classées comme <strong>prioritaires</strong>. Le raccordement
                    des bâtiments dans ces zones est <strong>obligatoire</strong>.
                  </>
                }
              />
            </Box>
            <Box className="mt-4">
              <Usage solution={rcuSolution as Solution} />
            </Box>

            <p className="mb-2">Isolations à prévoir</p>

            <Box>
              <BadgePacoupa label="Aucune" />
            </Box>

            <p className="mb-2 mt-8">Éligibilité au réseau de chaleur</p>

            <Box>
              <BadgePacoupa label="Éligible" type="green" />
            </Box>

            <Box className={fr.cx("fr-mt-2w")}>
              Rendez-vous sur le site de France chaleur urbaine pour en savoir plus sur{" "}
              <strong>la faisabilité du raccordement</strong>.
            </Box>

            <Box className="mt-4">
              <Callout
                type="pacoupa"
                content={
                  <>
                    Les gains et les coûts du réseau de chaleur ne sont pas estimés car ils dépendent fortement de la
                    faisabilité et du gestionnaire de réseau.
                  </>
                }
              />
            </Box>
          </>
        }
        header={<Card.CardHeader image={familleImageMap["RCU"]} title="Réseau de chaleur" />}
        footer={
          <Box className="justify-self-end">
            <Button
              priority="tertiary no outline"
              linkProps={{
                href: `https://france-chaleur-urbaine.beta.gouv.fr/`,
              }}
            >
              france-chaleur-urbaine
            </Button>
          </Box>
        }
        footerAlign="center"
      />
    </>
  );
};
