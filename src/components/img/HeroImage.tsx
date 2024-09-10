import Image from "next/image";

import hero from "../../../public/img/hero.svg";

export function HeroImage() {
  return (
    <Image priority={true} src={hero as string} alt="Immeuble à la loupe" sizes="100vw" className="h-auto w-full" />
  );
}
