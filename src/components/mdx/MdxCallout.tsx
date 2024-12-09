import { type PropsWithChildren } from "react";

import { Callout } from "../Callout";

type Props = {
  title?: string;
  type: "error" | "info" | "neutral" | "pacoupa" | "success" | "warning";
};

export const MdxCallout = ({ children, type, title }: PropsWithChildren<Props>) => {
  return <Callout content={children} type={type ?? "pacoupa"} title={title} />;
};
