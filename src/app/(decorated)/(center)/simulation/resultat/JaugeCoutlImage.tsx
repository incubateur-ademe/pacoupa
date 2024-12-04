import Image from "next/image";

import jauge from "@/img/simulation/resultat/jauge-cout.svg";

type Props = {
  height?: number;
  width?: number;
};

export function JaugeCoutlImage({ height, width }: Props) {
  return (
    <>
      <Image src={jauge as string} width={width} height={height} alt="Un point de jauge de coût d'investissement" />
    </>
  );
}
