import { BadgePacoupa } from "@/components/BadgePacoupa";
import { Callout } from "@/components/Callout";
import { Box } from "@/dsfr";
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
      {estGlobalementRenove && (
        <Box className="mt-4 flex justify-center gap-8">
          <Callout
            type="pacoupa"
            content={
              <div className="leading-6">
                <strong>Super nouvelle !</strong>
                <br /> Vous habitez dans un immeuble qui est énergiquement déjà très performant ! Il n’y a plus qu’à
                changer le chauffage 🙌
              </div>
            }
          />
        </Box>
      )}
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
