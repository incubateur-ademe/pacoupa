import Image from "next/image";

import camembert2 from "../../../public/img/18-pourcent.svg";

export function Camembert18PourcentImage() {
  return (
    <>
      <Image
        src={camembert2 as string}
        alt="part des émissions nationales de gaz à effet de serre (GES) - 18%"
        className="w-full h-auto"
      />
    </>
  );
}
