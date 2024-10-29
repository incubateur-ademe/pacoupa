import { type PropsWithChildren } from "react";

import { TallyInscriptionButton } from "@/components/TallyInscriptionButton";

type Props = {
  otherProp: string;
};

const TallyPage = ({ children, otherProp }: PropsWithChildren<Props>) => {
  return (
    <>
      <h1>Test tally</h1>

      <TallyInscriptionButton />
    </>
  );
};

export default TallyPage;
