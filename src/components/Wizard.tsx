"use client";

import { type PropsWithChildren } from "react";
import { Wizard as WizardBase } from "react-use-wizard";

type Props = Parameters<typeof WizardBase>[0];

export const Wizard = (props: PropsWithChildren<Props>) => {
  return (
    <>
      <WizardBase {...props}></WizardBase>
    </>
  );
};
