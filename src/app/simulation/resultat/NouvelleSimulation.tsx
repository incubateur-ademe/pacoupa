"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { usePacoupaSessionStorage } from "@/lib/client/usePacoupaSessionStorage";

export const NouvelleSimulation = () => {
  const router = useRouter();

  const { resetStore } = usePacoupaSessionStorage();

  const handleClick = () => {
    resetStore();
    router.push("/simulation");
  };

  return (
    <>
      <Button priority="tertiary" iconId="ri-arrow-right-line" onClick={() => handleClick()}>
        Démarrer une nouvelle simulation
      </Button>
    </>
  );
};
