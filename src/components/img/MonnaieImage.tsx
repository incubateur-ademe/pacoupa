import Image from "next/image";

import monnaie from "../../../public/img/monnaie.svg";

export function MonnaieImage() {
  return (
    <>
      <Image src={monnaie as string} alt="Pièces de monnaie" className="w-full h-auto" />
    </>
  );
}
