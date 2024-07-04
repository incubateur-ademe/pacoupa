"use client";

import { cx } from "@codegouvfr/react-dsfr/tools/cx";

import { Box } from "@/dsfr";

type Props = {
  content: React.ReactNode;
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
      {image && <Box>{image}</Box>}
      <Box>
        <span className="mb-0 text-lg font-bold">{title}</span>
      </Box>
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
          "flex flex-col justify-start items-center p-4 gap-1 bg-white border-solid border-green-700 shadow rounded-lg max-w-lg h-full relative",
        )}
      >
        {/* Marker */}
        {marker && (
          <Box
            className={cx(
              "bg-green-50 py-0 px-2 shadow-[1px_1px_0px_#183D2F] rounded-[24px] border-green-700 border border-solid text-sm leading-6 absolute -top-3",
              { "self-start": markerPosition === "left", "self-end": markerPosition === "right" },
            )}
          >
            {marker}
          </Box>
        )}

        {/* Title */}
        {header && (
          <Box
            className={cx("flex items-center", {
              "self-start": headerAlign === "left",
              "self-center": headerAlign === "center",
              "self-end": headerAlign === "right",
            })}
          >
            {header}
          </Box>
        )}

        {/* Body */}
        <Box className="grow">{content}</Box>

        {/* Footer */}
        {footer && (
          <Box
            className={cx({
              "self-start": footerAlign === "left",
              "self-center": footerAlign === "center",
              "self-end": footerAlign === "right",
            })}
          >
            {footer}
          </Box>
        )}
      </div>
    </>
  );
};

Card.CardHeader = CardHeader;
