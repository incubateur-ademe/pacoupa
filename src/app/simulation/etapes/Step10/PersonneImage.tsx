import Image from "next/image";

import personne from "../../../../../public/img/simulation/personne.svg";

type Props = {
  height?: number;
  width?: number;
};

export function PersonneImage({ height, width }: Props) {
  return (
    <>
      <Image src={personne as string} width={width} height={height} alt="Une personne" />
    </>
  );
}
