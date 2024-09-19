const FranceRenov_URL = `https://data.ademe.fr/data-fair/api/v1/datasets/perimetre-espaces-conseil-france-renov/lines`;

type RetourFranceRenov = {
  results: FranceRenovStructure[];
  total: number;
};

export type FranceRenovStructure = {
  Actes_couvert_structure: string;
  Adresse_Structure: string;
  Code_Insee_Commune: string;
  Code_Insee_Commune_Structure: string;
  Code_Insee_Departement: string;
  Code_Insee_EPCI: number;
  Code_Insee_Region: number;
  Code_Postal_Structure: number;
  Commune_Structure: string;
  Email_Structure: string;
  Horaires_Structure: string;
  Id_Structure: string;
  Nom_Commune: string;
  Nom_Departement: string;
  Nom_EPCI: string;
  Nom_Region: string;
  Nom_Structure: string;
  Site_Internet_Structure: string;
  Telephone_Structure: string;
};

const ERREUR_RESEAU = "Erreur réseau lors de l'appel à France Renov";

export const fetchFranceRenovStructure = async (codeInsee: string) => {
  const searchParams = new URLSearchParams({
    q: codeInsee,
    q_fields: "Code_Insee_Commune",
  });

  const request = new Request(FranceRenov_URL + "?" + searchParams.toString());

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = (await response.json()) as RetourFranceRenov;

    if (data.total >= 1) return data.results[0];
  } catch (err) {
    console.error(ERREUR_RESEAU, err);
    throw new Error(ERREUR_RESEAU);
  }
};
