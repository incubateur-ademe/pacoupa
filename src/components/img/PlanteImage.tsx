import Image from "next/image";

import plante from "../../../public/img/plante.svg";

type Props = {
  height?: number;
  width?: number;
};

export function PlanteImage({ height, width }: Props) {
  return (
    <>
      <Image src={plante as string} width={width} height={height} alt="Plante" />
    </>
  );
}
