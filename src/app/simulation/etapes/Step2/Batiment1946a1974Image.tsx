import Image from "next/image";

import batiment from "../../../../../public/img/simulation/batiment-1946-1974.svg";

type Props = {
  height?: number;
  width?: number;
};

export function Batiment1946a1974Image({ height, width }: Props) {
  return (
    <>
      <Image src={batiment as string} width={width} height={height} alt="Bâtiment de 1946 à 1974" />
    </>
  );
}
