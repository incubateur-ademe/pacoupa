import Image from "next/image";

import climatisation from "../../../../public/img/simulation/resultat/fr.svg";

type Props = {
  alt: string;
  height?: number;
  width?: number;
};

export function ClimatisationImage({ width, height, alt }: Props) {
  return (
    <>
      <Image src={climatisation as string} width={width} height={height} alt={alt} title={alt} />
    </>
  );
}
