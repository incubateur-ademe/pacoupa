"use client";

import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { H3 } from "@/dsfr/base/typography";

type Props = {
  content?: React.ReactNode;
  footer?: React.ReactNode;
  footerAlign?: "center" | "left" | "right";
  header?: React.ReactNode;
  headerAlign?: "center" | "left" | "right";
  marker?: string;
  markerPosition?: "left" | "right";
};

type CardHeaderProps = { image?: JSX.Element; title: React.ReactNode };

export const CardHeader = ({ image, title }: CardHeaderProps) => {
  return (
    <div className="flex gap-4 items-center self-start">
      {image && <div>{image}</div>}
      <H3 as="h6">{title}</H3>
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
}: Props) => {
  return (
    <>
      <div
        className={cx(
          "flex flex-col justify-start items-stretch p-4 gap-1 bg-white border border-solid border-body-700 shadow rounded-lg max-w-lg h-full relative",
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
