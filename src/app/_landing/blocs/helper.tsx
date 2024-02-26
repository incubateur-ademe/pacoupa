import Highlight from "@codegouvfr/react-dsfr/Highlight";

import { type ColsNumberType } from "@/dsfr";
import { paragraphContentMDXComponents } from "@/mdx-components";

import { type MDXBlocProps } from "./type";

const BASE = 12;
type ImageSize = NonNullable<NonNullable<CarteVerteMDXImage["mobile"]>["size"]>;
const OFFSETS: Record<ImageSize, ColsNumberType> = {
  large: 0 as ColsNumberType,
  medium: 2,
  small: 4,
};

export const getGridImageOffset = (size = "medium" as ImageSize) => {
  const offset = OFFSETS[size] ?? OFFSETS.medium;
  return {
    base: (BASE - offset) as ColsNumberType,
    offset: (offset / 2) as ColsNumberType,
  };
};

export const getHighlight = (highlight?: MDXBlocProps["highlight"]) => {
  if (!highlight) {
    return null;
  }
  const { component: Content, metadata: { size } = {} } = highlight;
  return (
    <Highlight size={size === "small" ? "sm" : "lg"}>
      <Content components={paragraphContentMDXComponents} />
    </Highlight>
  );
};
