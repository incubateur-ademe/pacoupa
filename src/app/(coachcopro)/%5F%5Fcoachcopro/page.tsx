"use client";

import { Inter } from "next/font/google";
import { useState } from "react";

import {
  type CoachCoproSearchParams,
  parseParamsCoachCopro,
} from "@/app/(decorated)/(center)/simulation/resultat/helper";
import { type InformationBatiment } from "@/lib/common/domain/InformationBatiment";

import CoachCopro from "./coachcopro";
import FormStep1 from "./form-step-1";
import FormStep2 from "./form-step-2";
import Onboarding from "./onboarding";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // You can customize this
});

const defaultInformationBatiment: InformationBatiment = {
  adresse: "",
  anneeConstruction: "",
  // @ts-expect-error should be number
  nbLogements: undefined,
  espacesExterieursCommuns: [],
  espacesExterieursPersonnels: [],
  renovation: [],
  typeCH: "collectif",
  energieCH: "gaz",
  emetteur: "radiateurs",
  typeECS: "collectif",
  energieECS: "gaz",
};

export default function Page({ searchParams }: { searchParams: CoachCoproSearchParams }) {
  const [step, setStep] = useState(process.env.NODE_ENV === "development" ? 1 : 1);
  const [informationBatiment, setInformationBatimentState] = useState(
    parseParamsCoachCopro(searchParams) || defaultInformationBatiment,
  );

  function setInformationBatiment(newInfo: Partial<InformationBatiment>) {
    setInformationBatimentState({
      ...informationBatiment,
      ...newInfo,
    });
  }

  return (
    <div
      id="coachcopro"
      className={[inter.className, "relative bg-white/90 size-full inter justify-start items-start flex"].join(" ")}
    >
      {step < 4 && (
        <>
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
            <CoachCopro informationBatiment={informationBatiment} skeleton onBack={() => {}} />
          </div>
          <div className="w-full h-full flex justify-center items-center bg-transparent z-10 max-h-full overflow-auto p-6">
            {step === 1 && <Onboarding onNext={() => setStep(2)} />}
            {step === 2 && (
              <FormStep1
                informationBatiment={informationBatiment}
                setInformationBatiment={setInformationBatiment}
                onNext={() => setStep(3)}
                onBack={() => setStep(1)}
              />
            )}
            {step === 3 && (
              <FormStep2
                informationBatiment={informationBatiment}
                setInformationBatiment={setInformationBatiment}
                onNext={() => setStep(4)}
                onBack={() => setStep(2)}
              />
            )}
          </div>
        </>
      )}
      {step === 4 && <CoachCopro informationBatiment={informationBatiment} onBack={() => setStep(3)} />}
    </div>
  );
}
