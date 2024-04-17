"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { store } from "@/lib/client/store";

export const NouvelleSimulation = () => {
  const router = useRouter();

  const handleClick = () => {
    store.clear();
    router.push("/simulation");
  };

  return (
    <>
      <Button priority="tertiary no outline" iconId="ri-arrow-right-line" onClick={() => handleClick()}>
        Je veux démarrer une nouvelle simulation
      </Button>
    </>
  );
};
