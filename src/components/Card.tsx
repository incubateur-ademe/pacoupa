"use client";

import { cx } from "@codegouvfr/react-dsfr/tools/cx";

type Props = {
  content?: React.ReactNode;
  footer?: React.ReactNode;
  footerAlign?: "center" | "left" | "right";
  fullWidth?: boolean;
  header?: React.ReactNode;
  headerAlign?: "center" | "left" | "right";
  marker?: string;
  markerPosition?: "left" | "right";
  removeShadowOnClick?: boolean;
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

export const Card = ({
  header,
  content,
  marker,
  markerPosition = "right",
  footer,
  headerAlign = "left",
  footerAlign = "right",
  removeShadowOnClick,
}: Props) => {
  return (
    <>
      <div
        className={cx(
          "flex flex-col justify-start items-stretch p-4 gap-1 bg-white border border-solid border-body-700 shadow rounded-lg w-full max-w-lg h-full relative ",
          {
            "transition-transform duration-300 active:shadow-none motion-reduce:transition-none motion-reduce:active:transform-none":
              removeShadowOnClick,
          },
        )}
      >
        {/* Marker */}
        {marker && (
          <div
            className={cx(
              "bg-decoration-300 py-0 px-2 shadow-[1px_1px_0px_#183D2F] rounded-[24px] border-body-700 border border-solid text-sm leading-6 absolute -top-3",
              { "self-start": markerPosition === "left", "self-end": markerPosition === "right" },
            )}
          >
            {marker}
          </div>
        )}

        {/* Title */}
        {header && (
          <div
            className={cx("flex items-center", {
              "self-start": headerAlign === "left",
              "self-center": headerAlign === "center",
              "self-end": headerAlign === "right",
            })}
          >
            {header}
          </div>
        )}

        {/* Body */}
        {content && <div className="grow">{content}</div>}

        {/* Footer */}
        {footer && (
          <div
            className={cx({
              "self-start": footerAlign === "left",
              "self-center": footerAlign === "center",
              "self-end": footerAlign === "right",
            })}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
};

Card.CardHeader = CardHeader;
