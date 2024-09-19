export type FeatureCollection = {
  geometry: {
    coordinates: [lon: number, lat: number];
    type: "Point";
  };
  properties: {
    city: string;
    citycode: string; // INSEE code
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

const BAN_URL = "https://api-adresse.data.gouv.fr/search/";

const defaultMaxResults = 7;

const ERREUR_RESEAU = "Erreur réseau lors de l'appel à la BAN";

export const fetchBAN = async (query: string): Promise<{ features: FeatureCollection[] }> => {
  const searchParams = new URLSearchParams({
    q: query,
    limit: defaultMaxResults.toString(),
    type: "housenumber",
    autocomplete: "1",
  });

  const banRequest = new Request(BAN_URL + "?" + searchParams.toString());

  try {
    const response = await fetch(banRequest);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const proposals = (await response.json()) as Promise<{ features: FeatureCollection[] }>;
    return proposals;
  } catch (err) {
    console.error(ERREUR_RESEAU, err);
    throw new Error(ERREUR_RESEAU);
  }
};
