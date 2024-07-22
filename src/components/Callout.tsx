import { fr, type FrCxArg } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

import { Logo } from "./img/Logo";

type Props = {
  content?: React.ReactNode;
  icon?: React.ReactNode;
  iconId?: FrCxArg;
  title?: string;
  type: "error" | "info" | "neutral" | "pacoupa" | "success" | "warning";
};

const config: Record<Props["type"], { bgColor: string; contentColor: string; titleColor: string }> = {
  pacoupa: {
    bgColor: "bg-green-50",
    titleColor: "text-green-800",
    contentColor: "text-green-700",
  },
  error: {
    bgColor: "bg-red-50",
    titleColor: "text-green-800",
    contentColor: "text-green-700",
  },
  info: {
    bgColor: "bg-blue-50",
    titleColor: "text-green-800",
    contentColor: "text-green-700",
  },
  success: {
    bgColor: "bg-green-50",
    titleColor: "text-green-800",
    contentColor: "text-green-700",
  },
  warning: {
    bgColor: "bg-yellow-50",
    titleColor: "text-green-800",
    contentColor: "text-green-700",
  },
  neutral: {
    bgColor: "bg-white",
    titleColor: "text-green-800",
    contentColor: "text-green-700",
  },
};

export const Callout = ({ content, iconId, icon, title, type }: PropsWithChildren<Props>) => {
  type = type ?? "info";

  icon =
    type === "pacoupa" ? <Logo /> : icon ?? <i className={fr.cx(iconId ?? "ri-information-fill", "fr-icon--sm")} />;

  const { bgColor, titleColor, contentColor } = config[type];

  return (
    <div className={`rounded-md p-2 ${bgColor}`}>
      <div className="flex">
        <div className="flex-shrink-0 -mt-0.5">{icon}</div>
        <div className="ml-2">
          {title && <h3 className={`text-sm font-medium ${titleColor}`}>{title}</h3>}
          <div className={cx("text-sm", { "mt-2": !!title }, `${contentColor}`)}>{content}</div>
        </div>
      </div>
    </div>
  );
};