import Image from "next/image";

import { type CheckAndLoadResultatParamsReturnType } from "@/app/(decorated)/(center)/simulation/resultat/helper";

import { CoachCoproButtonPrimary } from "./components/button";

export default function ModalStep1({
  onNext,
  state,
}: {
  onNext: () => void;
  state: CheckAndLoadResultatParamsReturnType;
}) {
  return (
    <>
      <div className="basis-[700px] p-8 pt-16 border-3 border-solid border-[#6B7280] rounded-lg bg-white">
        <div className="flex items-center gap-2 mb-8">
          <Image src="/img/coach-copro.png" alt="" width={68} height={68} />
          <Image src="/img/cross.svg" alt="" width={12} height={12} />
          <Image src="/img/ademe.svg" alt="" width={52} height={63} />
        </div>

        <h2 className="mb-2 text-2xl font-extrabold text-[#4B5563]">
          Calculez le potentiel rénovation de votre copro.
        </h2>
        <p className="font-medium mb-8 text-base leading-5 text-[#4b5563]">
          Vérifiez et complétez les informations de votre bâtiment afin de pouvoir calculer le potentiel de rénovation
          énergétique de votre copropriété. Cette simulation de rénovation est <strong>gratuite</strong> et{" "}
          <strong>neutre</strong>.
        </p>

        <CoachCoproButtonPrimary
          type="button"
          onClick={onNext}
          className="p-2 rounded-lg font-bold text-white bg-[#E41571] hover:!bg-[#E41571]/70"
        >
          ➜ Vérifier et compléter les informations du bâtiment
        </CoachCoproButtonPrimary>
      </div>
    </>
  );
}
