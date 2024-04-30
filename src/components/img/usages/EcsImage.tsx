import Image from "next/image";

import ecs from "../../../../public/img/simulation/resultat/ecs.svg";

type Props = {
  alt: string;
  height?: number;
  width?: number;
};

export function EcsImage({ width, height, alt }: Props) {
  return (
    <>
      <Image src={ecs as string} width={width} height={height} alt={alt} title={alt} />
    </>
  );
}
