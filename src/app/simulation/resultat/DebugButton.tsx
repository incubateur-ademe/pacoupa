"use client";

import { type PropsWithChildren } from "react";

import { Button } from "@/components/Button";
import { config } from "@/config";
import { type Solution } from "@/lib/enums";

import { type simulationSchema } from "../schema";

type Props = {
  formData: ReturnType<typeof simulationSchema.safeParse>;
  solutions: Solution[];
};

export const DebugButton = ({ formData, solutions }: PropsWithChildren<Props>) => {
  const debug = () => {
    console.debug("formData & solutions", { formData, solutions });
  };

  return (
    <>
      {config.env !== "prod" && (
        <Button priority="tertiary no outline" iconId="ri-bug-line" onClick={() => debug()}>
          {""}
        </Button>
      )}
    </>
  );
};
