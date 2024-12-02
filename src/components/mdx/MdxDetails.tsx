import { type PropsWithChildren } from "react";

import { AnchorLink } from "@/dsfr/client";
import { getLabelFromChildren } from "@/utils/react";
import { slugify } from "@/utils/string";

export const MdxDetails = ({ children }: PropsWithChildren) => {
  return (
    /* using a name for all Details make it like an accordion, with only one item open maximum */
    <details name="details" className="pl-6 marker:text-decoration-700">
      {children}
    </details>
  );
};

export const Question = ({ children }: PropsWithChildren) => {
  return (
    <AnchorLink
      as="summary"
      anchor={slugify(getLabelFromChildren(children))}
      className="mt-2 list-outside focus:!outline-primary-700 text-xl"
    >
      <b>{children}</b>
    </AnchorLink>
  );
};

MdxDetails.Question = Question;

export const Answer = ({ children }: PropsWithChildren) => {
  return <div className="pt-2">{children}</div>;
};

MdxDetails.Answer = Answer;
