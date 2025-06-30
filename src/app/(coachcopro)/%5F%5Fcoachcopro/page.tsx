"use client";

import { Inter } from "next/font/google";
import { useState } from "react";

import {
  type CoachCoproSearchParams,
  parseParamsCoachCopro,
} from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";

import CoachCopro from "./coachcopro";
// import coachcoproStyles from "./coachcopro.module.css";
import ModalStep1 from "./modal-step-1";
import ModalStep2 from "./modal-step-2";
import ModalStep3 from "./modal-step-3";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // You can customize this
});

export default function Page({ searchParams }: { searchParams: CoachCoproSearchParams }) {
  const [step, setStep] = useState(1);
  const [informationBatiment, setInformationBatimentState] = useState(parseParamsCoachCopro(searchParams));

  function setInformationBatiment(newInfo: Partial<InformationBatiment>) {
    if (!informationBatiment) {
      return;
    }
    setInformationBatimentState({
      ...informationBatiment,
      ...newInfo,
    });
  }

  // if (!state) {
  //   return <Loader />;
  // }

  return (
    <div
      id="coachcopro"
      className={[
        // coachcoproStyles.coachcopro,
        inter.className,
        "relative bg-white/90 size-full inter justify-start items-start flex",
      ].join(" ")}
    >
      {step < 4 && (
        <>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
            <CoachCopro searchParams={searchParams} skeleton />
          </div>
          <div className="w-full h-full flex justify-center items-center bg-transparent z-10 max-h-full overflow-auto p-6">
            {step === 1 && <ModalStep1 onNext={() => setStep(2)} />}
            {step === 2 && (
              <ModalStep2
                informationBatiment={informationBatiment}
                setInformationBatiment={setInformationBatiment}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <ModalStep3
                informationBatiment={informationBatiment}
                setInformationBatiment={setInformationBatiment}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        </>
      )}
      {step === 4 && <CoachCopro searchParams={searchParams} />}
    </div>
  );
}
