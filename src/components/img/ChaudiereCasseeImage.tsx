import Image from "next/image";

import chaudiere from "../../../public/img/chaudiere-cassee.svg";

type Props = {
  height?: number;
  width?: number;
};

export function ChaudiereCasseeImage({ height, width }: Props) {
  return (
    <>
      <Image src={chaudiere as string} alt="Chaudiere en panne" width={width} height={height} />
    </>
  );
}
