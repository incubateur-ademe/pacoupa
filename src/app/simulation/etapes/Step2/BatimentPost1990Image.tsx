import Image from "next/image";

import batiment from "../../../../../public/img/simulation/batiment-post-1990.svg";

type Props = {
  height?: number;
  width?: number;
};

export function BatimentPost1990Image({ height, width }: Props) {
  return (
    <>
      <Image src={batiment as string} width={width} height={height} alt="Bâtiment après 1990" />
    </>
  );
}
