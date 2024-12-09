import { fr } from "@codegouvfr/react-dsfr";
import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { H3 } from "@/dsfr/base/typography";

import { Logo } from "./img/Logo";

type Props = {
  content?: React.ReactNode;
  title?: string;
  type: "error" | "info" | "neutral" | "pacoupa" | "success" | "warning";
};

const config: Record<Props["type"], { bgColor: string; contentColor: string; titleColor: string }> = {
  pacoupa: {
    bgColor: "bg-decoration-300",
    titleColor: "text-green-800",
    contentColor: "text-body-700",
  },
  error: {
    bgColor: "bg-calloutred",
    titleColor: "text-green-800",
    contentColor: "text-body-700",
  },
  info: {
    bgColor: "bg-calloutblue",
    titleColor: "text-green-800",
    contentColor: "text-body-700",
  },
  success: {
    bgColor: "bg-calloutgreen",
    titleColor: "text-green-800",
    contentColor: "text-body-700",
  },
  warning: {
    bgColor: "bg-calloutyellow",
    titleColor: "text-green-800",
    contentColor: "text-body-700",
  },
  neutral: {
    bgColor: "bg-white",
    titleColor: "text-green-800",
    contentColor: "text-body-700",
  },
};

export const Callout = ({ content, title, type }: Props) => {
  type = type ?? "info";

  const icon = type === "pacoupa" ? <Logo /> : <i className={fr.cx("ri-information-fill", "fr-icon--sm")} />;

  const { bgColor, titleColor, contentColor } = config[type];

  return (
    <div className={`rounded-[4px] p-2 ${bgColor} w-full`}>
      <div className="flex gap-2">
        <div className="flex-shrink-0 -mt-0.5">{icon}</div>
        <div>
          {title && <H3 className={`text-sm font-medium ${titleColor} mb-0`}>{title}</H3>}
          <div className={cx("text-sm", { "mt-2": !!title }, `${contentColor}`)}>{content}</div>
        </div>
      </div>
    </div>
  );
};
