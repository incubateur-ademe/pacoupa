import Image from "next/image";

import plante from "../../../public/img/plante.svg";

export function PlanteImage() {
  return (
    <>
      <Image src={plante as string} fill alt="Plante" className="object-contain" />
    </>
  );
}
