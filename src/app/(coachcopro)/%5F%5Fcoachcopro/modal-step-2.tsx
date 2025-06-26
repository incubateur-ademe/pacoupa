import { useState } from "react";

import { type CheckAndLoadResultatParamsReturnType } from "@/app/(decorated)/(center)/simulation/resultat/helper";

import { CoachCoproButtonPrimary, CoachCoproButtonSecondary } from "./components/button";
import { CheckboxesWrapper } from "./components/checkboxes-wrapper";
import { InputWrapper } from "./components/input-wrapper";

export default function ModalStep2({
  onNext,
  onBack,
  state,
}: {
  onBack: () => void;
  onNext: () => void;
  state: CheckAndLoadResultatParamsReturnType;
}) {
  const [adresse, setAdresse] = useState(state.informationBatiment.adresse);
  const [anneeConstruction, setAnneeConstruction] = useState(
    state.informationBatiment.annee ? String(state.informationBatiment.annee) : "",
  );
  const [nombreLogement, setNombreLogement] = useState(
    state.informationBatiment.nbLogements ? String(state.informationBatiment.nbLogements) : "",
  );
  const [espacesExtComuns, setEspacesExtComuns] = useState<
    CheckAndLoadResultatParamsReturnType["informationBatiment"]["espacesExterieursCommuns"]
  >(state.informationBatiment.espacesExterieursCommuns);
  const [espacesExtPrives, setEspacesExtPrives] = useState<
    CheckAndLoadResultatParamsReturnType["informationBatiment"]["espacesExterieursPersonnels"]
  >(state.informationBatiment.espacesExterieursPersonnels);
  const [renovation, setRenovation] = useState<
    CheckAndLoadResultatParamsReturnType["informationBatiment"]["renovation"]
  >(state.informationBatiment.renovation);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!adresse || !anneeConstruction || !nombreLogement) {
      let error = "";
      if (!adresse) {
        error += "L'adresse est obligatoire. ";
      }
      if (!anneeConstruction) {
        error += "L'année de construction est obligatoire. ";
      }
      if (!nombreLogement) {
        error += "Le nombre de logement est obligatoire. ";
      }
      alert(error);
      return;
    } else {
      onNext();
    }
  };

  return (
    <>
      <div className="w-[592px] p-8 border-3 border-solid border-[#6B7280] rounded-lg bg-white self-start">
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center justify-center w-4 h-4 rounded-full border border-solid border-[#E41571]">
            <div className="w-2 h-2 rounded bg-[#E41571]" />
          </div>
          <span className="w-5 h-[1px] bg-[#848688]" />
          <div className="flex items-center justify-center w-4 h-4 rounded-full border border-solid border-[#E41571]"></div>
        </div>
        <h2 className="text-2xl font-extrabold !text-[#4b5563] mb-2">Vérifiez les informations de votre bâtiment</h2>
        <div className="text-lg font-medium text-[#4b5563] mb-8">
          Ces informations vont nous permettre de calculer le potentiel rénovation de votre bâtiment
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <InputWrapper
              label="Adresse"
              placeholder="8 boulevard de la libération, 93200 Saint-denis"
              name="adresse"
              value={adresse}
              onChange={setAdresse}
            />
            <InputWrapper
              label="Année de construction"
              placeholder="1975"
              name="annee-construction"
              value={anneeConstruction}
              onChange={setAnneeConstruction}
            />
            <InputWrapper
              label="Nombre de logement"
              placeholder="10"
              name="nombre-logement"
              value={nombreLogement}
              onChange={setNombreLogement}
            />
            <CheckboxesWrapper
              label={
                <>
                  Espaces extérieurs <b>communs</b>
                </>
              }
              checkboxes={[
                { value: "jardin", label: "Jardin" },
                { value: "parking exterieur", label: "Parking extérieur" },
                { value: "toit terrasse", label: "Toit terrasse" },
              ]}
              name="espaces-ext-communs"
              values={espacesExtComuns || []}
              onChange={setEspacesExtComuns}
            />
            <CheckboxesWrapper
              label={
                <>
                  Espaces extérieurs <b>privés</b>
                </>
              }
              checkboxes={[
                { value: "balcon", label: "Balcon" },
                { value: "toit terrasse", label: "Toit terrasse" },
              ]}
              name="espaces-ext-prives"
              values={espacesExtPrives || []}
              onChange={setEspacesExtPrives}
            />
            <CheckboxesWrapper
              label="Travaux d’isolation réalisés il y a moins de 15 ans"
              checkboxes={[
                { value: "toiture", label: "Toiture" },
                { value: "murs", label: "Murs" },
                { value: "sol", label: "Sol" },
                { value: "fenetres", label: "Fenetres" },
              ]}
              name="travaux-isolation"
              className="[&_.fr-fieldset\\_\_content]:grid-cols-4"
              values={renovation || []}
              onChange={setRenovation}
            />

            <div className="flex items-center gap-4">
              <CoachCoproButtonPrimary type="submit">➜ Suivant</CoachCoproButtonPrimary>
              <CoachCoproButtonSecondary type="button" onClick={onBack}>
                Retour
              </CoachCoproButtonSecondary>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
