import { Container } from "@/dsfr";
import { H2 } from "@/dsfr/base/typography";

import { RaisonCard1, RaisonCard2, RaisonCard3 } from "./cards";
import { RaisonsZoneMobile } from "./RaisonsZoneMobile";

export const RaisonsZone = () => {
  return (
    <Container>
      <H2 className="text-pretty">On a tous une bonne raison</H2>

      <RaisonsZoneDesktop />
      <RaisonsZoneMobile />
    </Container>
  );
};

const RaisonsZoneDesktop = () => (
  <div className="hidden md:grid grid-cols-5 gap-8">
    <div className="col-span-3">
      <RaisonCard1 />
    </div>

    <div className="col-start-2 col-span-3">
      <RaisonCard2 />
    </div>

    <div className="col-start-3 col-span-3">
      <RaisonCard3 />
    </div>
  </div>
);
