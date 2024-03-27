import Image from "next/image";

import renovation from "../../../../../public/img/simulation/renovation-aucune.svg";

type Props = {
  height?: number;
  width?: number;
};

export function AucuneRenovationImage({ height, width }: Props) {
  return (
    <>
      <Image src={renovation as string} width={width} height={height} alt="Aucune rénovation" />
    </>
  );
}
