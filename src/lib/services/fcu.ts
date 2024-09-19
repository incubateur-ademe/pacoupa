export type FcuEligibility = {
  distance: number;
  futurNetwork: boolean;
  gestionnaire: string;
  id: string;
  inPDP: boolean;
  isBasedOnIris: boolean;
  isEligible: boolean;
  rateCO2: number;
  rateENRR: number;
};

const FCU_URL = "https://france-chaleur-urbaine.beta.gouv.fr/api/v1/eligibility";

const ERREUR_RESEAU = "Erreur réseau lors de l'appel à FCU";

type FetchFcuEligibilityProps = {
  lat: number;
  lon: number;
};

export const fetchFcuEligibility = async ({ lon, lat }: FetchFcuEligibilityProps): Promise<FcuEligibility> => {
  const searchParams = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
  });

  const fcuRequest = new Request(FCU_URL + "?" + searchParams.toString());

  try {
    const response = await fetch(fcuRequest);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const eligibility = (await response.json()) as Promise<FcuEligibility>;
    return eligibility;
  } catch (err) {
    console.error(ERREUR_RESEAU, err);
    throw new Error(ERREUR_RESEAU);
  }
};
