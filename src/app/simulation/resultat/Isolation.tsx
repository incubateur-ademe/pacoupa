import { Badge } from "@/components/Badge";
import { Callout } from "@/components/Callout";
import { Text } from "@/dsfr/base/typography";
import { type GesteIsolation } from "@/lib/common/domain/values/GesteIsolation";
import { type TravauxNiveauIsolation } from "@/lib/common/domain/values/TravauxNiveauIsolation";

import { ShowIsolationImages } from "./ShowIsolationImages";

type Props = {
  gestes: GesteIsolation[];
  travauxNiveauIsolation: TravauxNiveauIsolation;
};

export const Isolation = ({ gestes, travauxNiveauIsolation }: Props) => {
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
