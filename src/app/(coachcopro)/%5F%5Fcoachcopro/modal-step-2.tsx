import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";

import { CoachCoproButtonPrimary, CoachCoproButtonSecondary } from "./components/button";
import { CheckboxesWrapper } from "./components/checkboxes-wrapper";
import { InputWrapper } from "./components/input-wrapper";

export default function ModalStep2({
  onNext,
  onBack,
  informationBatiment,
  setInformationBatiment,
}: {
  informationBatiment?: InformationBatiment;
  onBack: () => void;
  onNext: () => void;
  setInformationBatiment: (informationBatiment: Partial<InformationBatiment>) => void;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!informationBatiment?.adresse || !informationBatiment?.annee || !informationBatiment?.nbLogements) {
      let error = "";
      if (!informationBatiment?.adresse) {
        error += "L'adresse est obligatoire. ";
      }
      if (!informationBatiment?.annee) {
        error += "L'année de construction est obligatoire. ";
      }
      if (!informationBatiment?.nbLogements) {
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
      <div className="w-full max-w-xl overflow-auto p-8 border-3 border-solid border-[#6B7280] rounded-lg bg-white self-start">
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
              value={informationBatiment?.adresse ?? ""}
              onChange={adresse => setInformationBatiment({ adresse })}
            />
            <InputWrapper
              label="Année de construction"
              placeholder="1975"
              name="annee-construction"
              value={informationBatiment?.annee ? String(informationBatiment.annee) : ""}
              onChange={value => setInformationBatiment({ annee: Number(value) })}
            />
            <InputWrapper
              label="Nombre de logement"
              placeholder="10"
              name="nombre-logement"
              value={informationBatiment?.nbLogements ? String(informationBatiment.nbLogements) : ""}
              onChange={value => setInformationBatiment({ nbLogements: Number(value) })}
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
              values={informationBatiment?.espacesExterieursCommuns || []}
              onChange={espacesExterieursCommuns => setInformationBatiment({ espacesExterieursCommuns })}
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
              values={informationBatiment?.espacesExterieursPersonnels || []}
              onChange={espacesExterieursPersonnels => setInformationBatiment({ espacesExterieursPersonnels })}
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
              values={informationBatiment?.renovation || []}
              onChange={renovation => setInformationBatiment({ renovation })}
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
