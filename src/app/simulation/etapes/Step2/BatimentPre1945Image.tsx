import Image from "next/image";

import batiment from "../../../../../public/img/simulation/batiment-pre-1945.svg";

type Props = {
  height?: number;
  width?: number;
};

export function BatimentPre1945Image({ height, width }: Props) {
  return (
    <>
      <Image src={batiment as string} width={width} height={height} alt="Bâtiment avant 1945" />
    </>
  );
}
