import { Alert } from "@mui/material";
import { type PropsWithChildren } from "react";

import { Logo } from "./img/Logo";

export const CalloutPacoupa = ({ children }: PropsWithChildren) => {
  return (
    <Alert severity="success" icon={<Logo />}>
      {children}
    </Alert>
  );
};
