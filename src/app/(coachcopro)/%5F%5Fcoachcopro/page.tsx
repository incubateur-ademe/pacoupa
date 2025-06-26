"use client";

import { Inter } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

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
  const searchParamsApi = useSearchParams();
  const initialParams = useRef(parseParamsCoachCopro(searchParams));
  // const [step, setStep] = useState(initialParams.current.step);
  const [step, setStep] = useState(1);
  const [informationBatiment, setInformationBatimentState] = useState(initialParams.current.informationBatiment);
  const router = useRouter();

  function onChangeStep(step: number) {
    setStep(step);
    // router.push(
    //   `/__coachcopro?${createSearchParams({
    //     searchParams: searchParamsApi,
    //     name: "step",
    //     value: step.toString(),
    //   })}`,
    // );
  }

  function setInformationBatiment(newInfo: Partial<InformationBatiment>) {
    if (!informationBatiment) {
      return;
    }
    setInformationBatimentState({
      ...informationBatiment,
      ...newInfo,
    });
  }

  console.log({ step });

  // if (!state) {
  //   return <Loader />;
  // }

  return (
    <div
      id="coachcopro"
      className={[
        // coachcoproStyles.coachcopro,
        inter.className,
        "relative p-6 size-full inter overflow-auto justify-center items-center flex",
        // bg image coachcopro-placeholder.png
        step < 4
          ? "bg-contain bg-center bg-no-repeat bg-[url('/img/coachcopro-placeholder.png')] bg-opacity-10"
          : "bg-white",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-white/90 justify-center items-center flex p-6">
        {step === 1 && <ModalStep1 onNext={() => onChangeStep(2)} />}
        {step === 2 && (
          <ModalStep2
            informationBatiment={informationBatiment}
            setInformationBatiment={setInformationBatiment}
            onNext={() => onChangeStep(3)}
            onBack={() => onChangeStep(1)}
          />
        )}
        {step === 3 && (
          <ModalStep3
            informationBatiment={informationBatiment}
            setInformationBatiment={setInformationBatiment}
            onNext={() => onChangeStep(4)}
            onBack={() => onChangeStep(2)}
          />
        )}
        {step === 4 && <CoachCopro searchParams={searchParams} />}
      </div>
    </div>
  );
}
