"use client";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

import CoachCopro from "./coachcopro";
import coachcoproStyles from "./coachcopro.module.css";
import ModalStep1 from "./modal-step-1";
import ModalStep2 from "./modal-step-2";
import ModalStep3 from "./modal-step-3";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // You can customize this
});

export default function Page() {
  const [step, setStep] = useState(1);

  useEffect(() => {
    document.getElementById("coachcopro")?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [step]);

  return (
    <div
      id="coachcopro"
      className={[
        coachcoproStyles.coachcopro,
        inter.className,
        "font-inter relative p-6 size-full inter overflow-auto justify-center items-center flex",
        // bg image coachcopro-placeholder.png
        step < 4
          ? "bg-contain bg-center bg-no-repeat bg-[url('/img/coachcopro-placeholder.png')] bg-opacity-10"
          : "bg-white",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-white/90 justify-center items-center flex p-6">
        {step === 1 && <ModalStep1 onNext={() => setStep(2)} />}
        {step === 2 && <ModalStep2 onNext={() => setStep(3)} onBack={() => setStep(1)} />}
        {step === 3 && <ModalStep3 onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step === 4 && <CoachCopro />}
      </div>
    </div>
  );
}
