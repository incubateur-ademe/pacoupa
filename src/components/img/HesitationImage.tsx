import Image from "next/image";

import hesitation from "../../../public/img/hesitation.svg";

export function HesitationImage() {
  return (
    <>
      <Image src={hesitation as string} fill alt="Hesitation" className="object-fit" />
    </>
  );
}
