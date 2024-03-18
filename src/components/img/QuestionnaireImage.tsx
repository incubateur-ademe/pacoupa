import Image from "next/image";

import questionnaire from "../../../public/img/questionnaire.svg";

type Props = {
  height?: number;
  width?: number;
};

export function QuestionnaireImage({ height, width }: Props) {
  return (
    <>
      <Image src={questionnaire as string} alt="Questionnaire" width={width} height={height} />
    </>
  );
}
