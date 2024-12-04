import { cx } from "@codegouvfr/react-dsfr/tools/cx";
import { type PropsWithChildren } from "react";

type Props = {
  fullWidth?: boolean;
  title?: string;
};

type CardHeaderProps = { image?: JSX.Element; title: React.ReactNode };

export const CardHeader = ({ image, title }: CardHeaderProps) => {
  return (
    <div className="flex gap-4 items-center mt-2">
      {image && <>{image}</>}
      <h3 className="text-base font-bold leading-6 text-balance mb-0">{title}</h3>
    </div>
  );
};

type HeaderProps = {
  headerAlign?: "center" | "left" | "right";
};

const MdxCardTitle = ({ children, headerAlign }: PropsWithChildren<HeaderProps>) => {
  return (
    <div
      className={cx("flex items-center", {
        "self-start": headerAlign === "left",
        "self-center": headerAlign === "center",
        "self-end": headerAlign === "right",
      })}
    >
      <h4>{children}</h4>
    </div>
  );
};

const MdxCardBody = ({ children }: PropsWithChildren) => {
  return <div className="grow">{children}</div>;
};

type MarkerProps = {
  markerPosition: "left" | "right";
};

const MdxCardMarker = ({ markerPosition, children }: PropsWithChildren<MarkerProps>) => {
  return (
    <div
      className={cx(
        "bg-decoration-300 py-0 px-2 shadow-[1px_1px_0px_#183D2F] rounded-[24px] border-body-700 border border-solid text-sm leading-6 absolute -top-3",
        { "self-start": markerPosition === "left", "self-end": markerPosition === "right" },
      )}
    >
      {children}
    </div>
  );
};

export const MdxCard = ({ children, fullWidth }: PropsWithChildren<Props>) => {
  return (
    <>
      <div
        className={cx(
          "flex flex-col justify-start items-stretch p-4 gap-1 bg-white border border-solid border-body-700 shadow rounded-lg w-full relative ",
          {
            "max-w-lg": !fullWidth,
          },
        )}
      >
        {children}
      </div>
    </>
  );
};

MdxCard.Title = MdxCardTitle;
MdxCard.Body = MdxCardBody;
MdxCard.Marker = MdxCardMarker;
