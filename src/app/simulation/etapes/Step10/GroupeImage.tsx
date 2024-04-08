import Image from "next/image";

import groupe from "../../../../../public/img/simulation/groupe.svg";

type Props = {
  height?: number;
  width?: number;
};

export function GroupeImage({ height, width }: Props) {
  return (
    <>
      <Image src={groupe as string} width={width} height={height} alt="Un groupe" />
    </>
  );
}
