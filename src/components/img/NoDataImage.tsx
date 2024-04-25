import Image from "next/image";

import noData from "../../../public/img/simulation/resultat/no-data.svg";

type Props = {
  height?: number;
  width?: number;
};

export function NoDataImage({ width, height }: Props) {
  return (
    <>
      <Image src={noData as string} width={width} height={height} alt="Pas de résultat trouvé" aria-hidden />
    </>
  );
}
