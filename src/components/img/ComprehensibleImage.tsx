import Image from "next/image";

import comprehensible from "../../../public/img/comprehensible.svg";

type Props = {
  height?: number;
  width?: number;
};

export function ComprehensibleImage({ height, width }: Props) {
  return (
    <>
      <Image src={comprehensible as string} alt="comprehensible" width={width} height={height} />
    </>
  );
}
