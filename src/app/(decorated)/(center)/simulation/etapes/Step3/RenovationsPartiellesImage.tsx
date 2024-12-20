import Image from "next/image";

import renovation from "@/img/simulation/renovations-partielles.svg";

type Props = {
  height?: number;
  width?: number;
};

export function RenovationsPartiellesImage({ height, width }: Props) {
  return (
    <>
      <Image src={renovation as string} width={width} height={height} alt="Bâtiment de 1946 à 1974" />
    </>
  );
}
