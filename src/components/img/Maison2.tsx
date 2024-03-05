import Image from "next/image";

import maison2 from "../../../public/img/maison2.svg";

type Props = {
  height?: number;
  width?: number;
};

export function Maison2Image({ width, height }: Props) {
  return (
    <>
      <Image src={maison2 as string} width={width} height={height} alt="Logo maison" />
    </>
  );
}
