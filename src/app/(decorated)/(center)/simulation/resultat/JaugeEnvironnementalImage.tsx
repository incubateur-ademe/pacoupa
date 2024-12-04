import Image from "next/image";

import jauge from "@/img/simulation/resultat/jauge-environnemental.svg";

type Props = {
  height?: number;
  width?: number;
};

export function JaugeEnvironnementalImage({ height, width }: Props) {
  return (
    <>
      <Image src={jauge as string} width={width} height={height} alt="Un point de jauge environnemental" />
    </>
  );
}
