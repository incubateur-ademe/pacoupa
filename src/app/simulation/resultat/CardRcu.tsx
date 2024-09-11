"use client";

import { push } from "@socialgouv/matomo-next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { Card } from "@/components/Card";
import { Text } from "@/dsfr/base/typography";
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
        marker="Meilleure solution"
        content={
          <>
            <div className="mt-4">
              <Callout
                type="info"
                content={
                  <>
                    Certaines zones autour du réseau sont classées comme <strong>prioritaires</strong>. Le raccordement
                    des bâtiments dans ces zones est <strong>obligatoire</strong>.
                  </>
                }
              />
            </div>
            <div className="mt-4">
              <Usage solution={rcuSolution as Solution} />
            </div>

            <Text className="mb-2">Isolations à prévoir</Text>

            <div>
              <Badge label="Aucune" />
            </div>

            <Text className="mb-2 mt-8">Éligibilité au réseau de chaleur</Text>

            <div>
              <Badge label="Éligible" type="success" />
            </div>

            <div className="mt-4">
              Rendez-vous sur le site de France chaleur urbaine pour en savoir plus sur{" "}
              <strong>la faisabilité du raccordement</strong>.
            </div>

            <div className="mt-4">
              <Callout
                type="pacoupa"
                content={
                  <>
                    Les gains et les coûts du réseau de chaleur ne sont pas estimés car ils dépendent fortement de la
                    faisabilité et du gestionnaire de réseau.
                  </>
                }
              />
            </div>
          </>
        }
        header={<Card.CardHeader image={familleImageMap["RCU"]} title="Réseau de chaleur" />}
        footer={
          <div className="justify-self-end">
            <Button
              priority="tertiary no outline"
              linkProps={{
                href: `https://france-chaleur-urbaine.beta.gouv.fr/`,
                onClick: () => {
                  push(["trackEvent", "Page Résultats", "Clic FCU", "Lien FCU"]);
                },
              }}
            >
              france-chaleur-urbaine
            </Button>
          </div>
        }
        footerAlign="center"
      />
    </>
  );
};
