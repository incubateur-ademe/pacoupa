import Image from "next/image";

import jauge from "@/img/simulation/resultat/jauge-difficulte.svg";

type Props = {
  height?: number;
  width?: number;
};

export function JaugeDifficulteImage({ height, width }: Props) {
  return (
    <>
      <Image
        src={jauge as string}
        width={width}
        height={height}
        alt="Un point de jauge de difficulté de mise en place"
      />
    </>
  );
}
