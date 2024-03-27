import Image from "next/image";

import renovation from "../../../../../public/img/simulation/renovation-globale.svg";

type Props = {
  height?: number;
  width?: number;
};

export function RenovationGlobaleImage({ height, width }: Props) {
  return (
    <>
      <Image src={renovation as string} width={width} height={height} alt="Bâtiment de 1946 à 1974" />
    </>
  );
}
