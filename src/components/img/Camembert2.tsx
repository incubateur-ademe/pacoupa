import Image from "next/image";

import camembert2 from "../../../public/img/camembert2.svg";

type Props = {
  height?: number;
  width?: number;
};

export function Camembert2Image({ height, width }: Props) {
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
