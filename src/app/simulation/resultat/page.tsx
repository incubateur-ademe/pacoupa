import { Base64 } from "js-base64";

import { H1 } from "@/dsfr/base/typography";

import { simulationSchema } from "../schema";

const ResultatsPage = ({ searchParams }: { searchParams: { hash: string } }) => {
  // const payload = createPayload();

  const validation = simulationSchema.safeParse(JSON.parse(Base64.decode(searchParams.hash)));

  if (!validation.success) {
    const errors = validation.error.format();

    throw new Error(`Erreur de formatage du hash ${JSON.stringify(errors)}`);
  }

  // TODO : call asynchrone de l'API ou de la méthode de persistence avec le validation.data comme payload

  return (
    <>
      <H1>Résulats de la simulation</H1>
      <p>Voici les solutions applicables à votre situations :</p>
      <pre>{JSON.stringify(validation.data, null, 2)}</pre>
    </>
  );
};

export default ResultatsPage;
