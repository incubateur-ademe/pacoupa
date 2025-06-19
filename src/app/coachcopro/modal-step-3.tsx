import Image from "next/image";

import { CoachCoproButtonPrimary, CoachCoproButtonSecondary } from "./components/button";
import { RadioButtonsWrapper } from "./components/radiobuttons-wrapper";

export default function ModalStep3({ onNext, onBack }: { onBack: () => void; onNext: () => void }) {
  return (
    <>
      <div className="w-[592px] p-8 border-3 border-solid border-[#6B7280] rounded-lg bg-white self-start">
        <div className="flex items-center gap-1 mb-4">
          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#E41571]">
            <Image src="/img/checked.svg" alt="" width={8} height={8}></Image>
          </div>
          <span className="w-5 h-[1px] bg-[#848688]" />
          <div className="flex items-center justify-center w-4 h-4 rounded-full border border-solid border-[#E41571]">
            <div className="w-2 h-2 rounded bg-[#E41571]" />
          </div>
        </div>
        <h2 className="text-2xl font-extrabold !text-[#4b5563] mb-2">Vérifiez les informations de votre chauffage</h2>
        <p className="text-lg font-medium !text-[#4b5563] mb-8">
          Ces informations vont nous permettre de calculer le potentiel rénovation de votre bâtiment
        </p>

        <RadioButtonsWrapper
          name="type-de-chauffage"
          label="Type de chauffage"
          checkboxes={["Individuel", "Collectif"]}
        />
        <RadioButtonsWrapper
          name="energie-principale-de-chauffage"
          label="Énergie principale de chauffage"
          checkboxes={["Fioul", "Gaz", "Électricité"]}
        />
        <RadioButtonsWrapper
          name="emetteurs-de-chauffage"
          label="Émetteurs de chauffage"
          checkboxes={["Radiateurs", "Plancher chauffant"]}
        />
        <RadioButtonsWrapper
          name="type-de-production-d-eau-chaude"
          label="Type de production d’eau chaude"
          checkboxes={["Individuel", "Collectif"]}
        />
        <RadioButtonsWrapper
          name="energie-principale-du-chauffage-de-l-eau"
          label="Énergie principale du chauffage de l’eau"
          checkboxes={["Fioul", "Gaz", "Électricité"]}
        />

        <div className="flex items-center gap-4">
          <CoachCoproButtonPrimary type="button" onClick={onNext}>
            ➜ Terminer
          </CoachCoproButtonPrimary>
          <CoachCoproButtonSecondary type="button" onClick={onBack}>
            Retour
          </CoachCoproButtonSecondary>
        </div>
      </div>
    </>
  );
}
