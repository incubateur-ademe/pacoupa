import Image from "next/image";

import camembert1 from "../../../public/img/47-pourcent.svg";

export function Camembert47PourcentImage() {
  return (
    <>
      <Image
        src={camembert1 as string}
        alt="Diagramme part de la consommations énergétiques françaises - 47%"
        className="w-full h-auto"
      />
    </>
  );
}
