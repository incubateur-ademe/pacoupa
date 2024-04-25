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
      <Button priority="tertiary no outline" iconId="ri-arrow-right-line" onClick={() => handleClick()}>
        Je démarre une nouvelle simulation
      </Button>
    </>
  );
};
