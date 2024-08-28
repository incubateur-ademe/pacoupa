import { Badge } from "@/components/Badge";
import { Callout } from "@/components/Callout";
import { RaisingHands } from "@/components/img/twemoji/RaisingHands";
import { Text } from "@/dsfr/base/typography";
import { type GesteIsolation } from "@/lib/common/domain/values/GesteIsolation";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { ShowIsolationImages } from "./ShowIsolationImages";

type Props = {
  estGlobalementRenove: boolean;
  gestes: GesteIsolation[];
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

export const Isolation = ({ gestes, travauxNiveauIsolation, estGlobalementRenove }: Props) => {
  return (
    <>
      <Text className="mb-2">Isolations à prévoir</Text>
      <div>
        <Badge
          label={
            travauxNiveauIsolation === "Global"
              ? "Isolation globale"
              : travauxNiveauIsolation === "Partiel"
                ? "Isolation partielle"
                : "Aucune"
          }
        />
      </div>
      <div className="mt-4 flex justify-center gap-8">
        <ShowIsolationImages gestes={gestes} />
      </div>
      {estGlobalementRenove && (
        <div className="mt-4 flex justify-center gap-8">
          <Callout
            type="pacoupa"
            content={
              <Text variant="sm" className="leading-6 mb-0">
                <strong>Super nouvelle !</strong>
                <br /> Vous habitez dans un immeuble qui est énergiquement déjà très performant ! Il n’y a plus qu’à
                changer le chauffage&nbsp;
                <span className="inline-block w-[20px] align-middle">
                  <RaisingHands />
                </span>
              </Text>
            }
          />
        </div>
      )}
      {gestes.length > 0 && (
        <div className="my-4">
          <Callout
            type="warning"
            content={
              <Text variant="sm" className="mb-0">
                Ces isolations sont indispensables pour la mise en place de ce système.
              </Text>
            }
          />
        </div>
      )}
    </>
  );
};
