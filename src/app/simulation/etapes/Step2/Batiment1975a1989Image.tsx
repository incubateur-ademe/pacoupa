import Image from "next/image";

import batiment from "../../../../../public/img/simulation/batiment-1975-1989.svg";

type Props = {
  height?: number;
  width?: number;
};

export function Batiment1975a1989Image({ height, width }: Props) {
  return (
    <>
      <Image src={batiment as string} width={width} height={height} alt="Bâtiment de 1975 à 1989" />
    </>
  );
}
