import Image from "next/image";

import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";

import { CoachCoproButtonPrimary, CoachCoproButtonSecondary } from "./components/button";
import { RadioButtonsWrapper } from "./components/radiobuttons-wrapper";

export default function FormStep2({
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
  return (
    <>
      <div className="w-full max-w-xl overflow-auto p-8 border-3 border-solid border-[#6B7280] rounded-lg bg-white self-start">
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
          options={[
            { label: "Individuel", value: "individuel" },
            { label: "Collectif", value: "collectif" },
          ]}
          // we don't care if default is 'collectif' or 'individuel' because
          // url is with search param `hash` which will prefill the form
          value={informationBatiment?.typeCH ?? "collectif"}
          onChange={typeCH => setInformationBatiment({ typeCH })}
        />
        <RadioButtonsWrapper
          name="energie-principale-de-chauffage"
          label="Énergie principale de chauffage"
          options={[
            { label: "Fioul", value: "fioul" },
            { label: "Gaz", value: "gaz" },
            { label: "Électricité", value: "electricite" },
          ]}
          value={informationBatiment?.energieCH ?? "fioul"}
          onChange={energieCH => setInformationBatiment({ energieCH })}
        />
        <RadioButtonsWrapper
          name="emetteurs-de-chauffage"
          label="Émetteurs de chauffage"
          options={[
            { label: "Radiateurs", value: "radiateurs" },
            { label: "Plancher chauffant", value: "plancher chauffant" },
          ]}
          value={informationBatiment?.emetteur ?? "radiateurs"}
          onChange={emetteursCH => setInformationBatiment({ emetteur: emetteursCH })}
        />
        <RadioButtonsWrapper
          name="type-de-production-d-eau-chaude"
          label="Type de production d’eau chaude"
          options={[
            { label: "Individuel", value: "individuel" },
            { label: "Collectif", value: "collectif" },
          ]}
          value={informationBatiment?.typeECS ?? "individuel"}
          onChange={typeECS => setInformationBatiment({ typeECS })}
        />
        <RadioButtonsWrapper
          name="energie-principale-du-chauffage-de-l-eau"
          label="Énergie principale du chauffage de l’eau"
          options={[
            { label: "Fioul", value: "fioul" },
            { label: "Gaz", value: "gaz" },
            { label: "Ballon électrique", value: "ballon electrique" },
          ]}
          value={informationBatiment?.energieECS ?? "fioul"}
          onChange={energieECS => setInformationBatiment({ energieECS })}
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
