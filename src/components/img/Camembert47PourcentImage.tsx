import Image from "next/image";

import camembert1 from "../../../public/img/47-pourcent.svg";

type Props = {
  height?: number;
  width?: number;
};

export function Camembert47PourcentImage({ height, width }: Props) {
  return (
    <>
      <Image
        src={camembert1 as string}
        width={width}
        height={height}
        alt="Diagramme part de la consommations énergétiques françaises - 47%"
      />
    </>
  );
}
