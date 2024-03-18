import Image from "next/image";

import camembert2 from "../../../public/img/18-pourcent.svg";

type Props = {
  height?: number;
  width?: number;
};

export function Camembert18PourcentImage({ height, width }: Props) {
  return (
    <>
      <Image
        src={camembert2 as string}
        width={width}
        height={height}
        alt="part des émissions nationales de gaz à effet de serre (GES) - 18%"
      />
    </>
  );
}
