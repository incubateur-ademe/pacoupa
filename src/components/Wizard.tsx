"use client";

import { type PropsWithChildren } from "react";
import { Wizard as WizardBase } from "react-use-wizard";

type Props = Parameters<typeof WizardBase>[0];

/**
 * Wrapper around react-use-wizard/Wizard to be used in server component architecture.
 *
 */
export const Wizard = (props: PropsWithChildren<Props>) => {
  return (
    <>
      <WizardBase {...props}></WizardBase>
    </>
  );
};
