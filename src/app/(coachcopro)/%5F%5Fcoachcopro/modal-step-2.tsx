import { CoachCoproButtonPrimary, CoachCoproButtonSecondary } from "./components/button";
import { CheckboxesWrapper } from "./components/checkboxes-wrapper";
import { InputWrapper } from "./components/input-wrapper";

export default function ModalStep2({ onNext, onBack }: { onBack: () => void; onNext: () => void }) {
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
          <form>
            <InputWrapper
              label="Adresse"
              placeholder="8 boulevard de la libération, 93200 Saint-denis"
              name="adresse"
            />
            <InputWrapper label="Année de construction" placeholder="1975" name="annee-construction" />
            <InputWrapper label="Nombre de logement" placeholder="10" name="nombre-logement" />
            <CheckboxesWrapper
              label={
                <>
                  Espaces extérieurs <b>communs</b>
                </>
              }
              checkboxes={["Jardin", "Parking extérieur", "Toit terrasse"]}
              name="espaces-ext-communs"
            />
            <CheckboxesWrapper
              label={
                <>
                  Espaces extérieurs <b>privés</b>
                </>
              }
              checkboxes={["Balcon", "Toit terrasse"]}
              name="espaces-ext-prives"
            />
            <CheckboxesWrapper
              label="Travaux d’isolation réalisés il y a moins de 15 ans"
              checkboxes={["Toiture", "Murs", "Sol", "Fenêtres"]}
              name="travaux-isolation"
              className="[&_.fr-fieldset\\_\_content]:grid-cols-4"
            />

            <div className="flex items-center gap-4">
              <CoachCoproButtonPrimary type="button" onClick={onNext}>
                ➜ Suivant
              </CoachCoproButtonPrimary>
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
