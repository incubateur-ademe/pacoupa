import Image from "next/image";

import hesitation from "../../../public/img/hesitation.svg";

type Props = {
  height?: number;
  width?: number;
};

export function HesitationImage({ height, width }: Props) {
  return (
    <>
      <Image src={hesitation as string} fill alt="Hesitation" className="object-fit" />
    </>
  );
}
