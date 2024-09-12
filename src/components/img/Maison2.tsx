import Image from "next/image";

import maison2 from "../../../public/img/maison2.svg";

export function Maison2Image() {
  return <Image priority src={maison2 as string} alt="Logo maison" className="w-full h-auto" />;
}
