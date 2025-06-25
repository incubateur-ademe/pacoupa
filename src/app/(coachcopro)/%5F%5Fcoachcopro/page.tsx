"use client";

import { cx } from "@codegouvfr/react-dsfr/fr/cx";
import { Inter } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  checkAndLoadResultatParams,
  type CheckAndLoadResultatParamsReturnType,
  type ResultatSearchParams,
} from "@/app/(decorated)/(center)/simulation/resultat/helper";
import Loader from "@/components/Loader";
import { createSearchParams } from "@/utils/searchParams";

import CoachCopro from "./coachcopro";
import ModalStep1 from "./modal-step-1";
import ModalStep2 from "./modal-step-2";
import ModalStep3 from "./modal-step-3";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // You can customize this
});

interface CoachCoproSearchParams extends ResultatSearchParams {
  step: string;
}

export default function Page({ searchParams }: { searchParams: CoachCoproSearchParams }) {
  const searchParamsApi = useSearchParams();
  const step = Number(searchParams.step ?? 1);
  const router = useRouter();
  const [state, setState] = useState<CheckAndLoadResultatParamsReturnType | undefined>(undefined);

  const onChangeStep = (step: number) => {
    router.push(
      `/__coachcopro?${createSearchParams({
        searchParams: searchParamsApi,
        name: "step",
        value: step.toString(),
      })}`,
    );
  };

  useEffect(() => {
    checkAndLoadResultatParams(searchParams).then(setState).catch(console.error);
  }, [searchParams]);

  console.log(state);

  if (!state) {
    return <Loader />;
  }

  return (
    <div
      id="coachcopro"
      className={cx(
        // coachcoproStyles.coachcopro,
        // @ts-expect-error inter.className is not typed
        inter.className,
        "relative p-6 size-full inter overflow-auto justify-center items-center flex",
        // bg image coachcopro-placeholder.png
        step < 4
          ? "bg-contain bg-center bg-no-repeat bg-[url('/img/coachcopro-placeholder.png')] bg-opacity-10"
          : "bg-white",
      )}
    >
      <div className="absolute inset-0 bg-white/90 justify-center items-center flex p-6">
        {step === 1 && <ModalStep1 state={state} onNext={() => onChangeStep(2)} />}
        {step === 2 && <ModalStep2 state={state} onNext={() => onChangeStep(3)} onBack={() => onChangeStep(1)} />}
        {step === 3 && <ModalStep3 state={state} onNext={() => onChangeStep(4)} onBack={() => onChangeStep(2)} />}
        {step === 4 && <CoachCopro state={state} />}
      </div>
    </div>
  );
}
