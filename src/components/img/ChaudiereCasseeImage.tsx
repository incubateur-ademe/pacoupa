import Image from "next/image";

import chaudiere from "../../../public/img/chaudiere-cassee.svg";

export function ChaudiereCasseeImage() {
  return (
    <>
      <Image src={chaudiere as string} alt="Chaudiere en panne" className="w-full h-auto" />
    </>
  );
}
