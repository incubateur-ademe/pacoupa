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

const FCU_URL = "https://france-chaleur-urbaine-dev.osc-fr1.scalingo.io/api/v1/eligibility";

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
    const result = await fetch(fcuRequest);
    const eligibility = (await result.json()) as Promise<FcuEligibility>;
    return eligibility;
  } catch (err) {
    console.error("Erreur réseau lors de l'appel à FCU", err);
    throw new Error("Erreur réseau lors de l'appel à FCU");
  }
};
