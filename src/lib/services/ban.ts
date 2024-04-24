export type FeatureCollection = {
  geometry: {
    coordinates: [lon: number, lat: number];
    type: "Point";
  };
  properties: {
    city: string;
    citycode: string;
    context: string;
    housenumber: string;
    id: string;
    importance: number;
    label: string;
    name: string;
    postcode: "44260";
    score: number;
    street: string;
    type: string;
    x: number;
    y: number;
  };
  type: "Feature";
};

const URL_BAN = "https://api-adresse.data.gouv.fr/search/";

const defaultMaxResults = 7;

export const fetchBAN = async (query: string): Promise<{ features: FeatureCollection[] }> => {
  const searchParams = new URLSearchParams({
    q: query,
    limit: defaultMaxResults.toString(),
    type: "housenumber",
    autocomplete: "1",
  });

  const banRequest = new Request(URL_BAN + "?" + searchParams.toString());

  try {
    const result = await fetch(banRequest);
    const proposals = (await result.json()) as Promise<{ features: FeatureCollection[] }>;
    return proposals;
  } catch (err) {
    console.error("Erreur réseau lors de l'appel à la BAN", err);
    throw new Error("Erreur réseau lors de l'appel à la BAN");
  }
};
