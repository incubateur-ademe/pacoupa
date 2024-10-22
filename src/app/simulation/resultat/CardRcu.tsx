"use client";

import { push } from "@socialgouv/matomo-next";

import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Callout } from "@/components/Callout";
import { Card } from "@/components/Card";
import { Text } from "@/dsfr/base/typography";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";
import { matomoCategory } from "@/lib/matomo-events";

import { familleImageMap } from "./helper";

export const CardRcu = () => {
  const { store } = usePacoupaSessionStorage();

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

            <hr />

            <Text className="mb-2">Isolations à prévoir</Text>

            <div>
              <Badge label="Aucune" />
            </div>

            <hr className="mt-8" />

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
        // header={<Card.CardHeader image={familleImageMap["RCU"]} title="Réseau de chaleur" />}
        header={
          <Card.CardHeader
            image={<div className="w-10 h-10 flex items-center justify-center">{familleImageMap["RCU"]}</div>}
            title="Réseau de chaleur"
          />
        }
        footer={
          <div className="justify-self-end">
            <Button
              priority="tertiary no outline"
              linkProps={{
                href: `https://france-chaleur-urbaine.beta.gouv.fr/?heating=${store.typeCH}&address=${store.adresse}`,
                onClick: () => {
                  push(["trackEvent", matomoCategory.resultats, "Clic FCU", "Lien FCU"]);
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
