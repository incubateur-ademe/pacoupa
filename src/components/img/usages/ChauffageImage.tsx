import Image from "next/image";

import chauffage from "../../../../public/img/simulation/resultat/ch.svg";

type Props = {
  alt: string;
  height?: number;
  width?: number;
};

export function ChauffageImage({ width, height, alt }: Props) {
  return (
    <>
      <Image src={chauffage as string} width={width} height={height} alt={alt} title={alt} />
    </>
  );
}
