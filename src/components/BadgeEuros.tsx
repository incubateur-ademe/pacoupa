import { type PropsWithChildren } from "react";

import { formatEuroNoDecimal } from "@/utils/currency";

import { Badge } from "./Badge";

type Props = {
  icon?: string;
  prefix?: "-" | "≈" | "⩾";
  type?: "neutral" | "success" | "warning";
  value: number;
};

export const BadgeEuros = ({ value, type = "neutral", icon, prefix }: PropsWithChildren<Props>) => (
  <Badge icon={icon} type={type} label={(prefix && `${prefix} `) + formatEuroNoDecimal(value)} size="medium" />
);
