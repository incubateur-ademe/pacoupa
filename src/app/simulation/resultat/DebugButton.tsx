"use client";

import { type PropsWithChildren } from "react";

import { Button } from "@/components/Button";
import { config } from "@/config";
import { type informationsBatimentSchema } from "@/lib/common/domain/InformationsBatiment";
import { type Solution } from "@/lib/common/domain/values/Solution";

type Props = {
  formData: ReturnType<typeof informationsBatimentSchema.safeParse>;
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
