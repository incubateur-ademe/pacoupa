import Image from "next/image";

import monnaie from "../../../public/img/monnaie.svg";

type Props = {
  height?: number;
  width?: number;
};

export function MonnaieImage({ height, width }: Props) {
  return (
    <>
      <Image src={monnaie as string} alt="Pièces de monnaie" width={width} height={height} />
    </>
  );
}
