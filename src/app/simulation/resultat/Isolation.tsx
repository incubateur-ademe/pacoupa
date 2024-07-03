import { BadgePacoupa } from "@/components/BadgePacoupa";
import { Callout } from "@/components/Callout";
import { Box } from "@/dsfr";
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
      <p className="mb-2">Isolations à prévoir</p>
      <Box>
        <BadgePacoupa
          label={
            travauxNiveauIsolation === "Global"
              ? "Isolation globale"
              : travauxNiveauIsolation === "Partiel"
                ? "Isolation partielle"
                : "Aucune"
          }
        />
      </Box>
      <Box className="mt-4 flex justify-center gap-8">
        <ShowIsolationImages gestes={gestes} />
      </Box>
      {gestes.length > 0 && (
        <Box className="my-4">
          <Callout
            type="warning"
            content={<>Ces isolations sont indispensables pour la mise en place de ce système.</>}
          />
        </Box>
      )}
    </>
  );
};
