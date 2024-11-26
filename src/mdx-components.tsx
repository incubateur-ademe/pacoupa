import { type MDXComponents } from "mdx/types";
import { Fragment, type PropsWithChildren } from "react";

import { MdxLink } from "@/components/mdx/Link";
import { getLabelFromChildren } from "@/utils/react";
import { slugify } from "@/utils/string";

import { Card } from "./components/Card";
import { CTA } from "./components/CTA";
import { AnchorLink } from "./dsfr/client";

export const Details = ({ children }: PropsWithChildren) => {
  return (
    /* using a name for all Details make it like an accordion, with only one item open maximum */
    <details name="details" className="pl-6 marker:text-decoration-700">
      {children}
    </details>
  );
};

export const Question = ({ children }: PropsWithChildren) => {
  return (
    <AnchorLink as="summary" anchor={slugify(getLabelFromChildren(children))} className="mt-2 list-outside">
      <b>{children}</b>
    </AnchorLink>
  );
};
export const Reponse = ({ children }: PropsWithChildren) => {
  return <div className="pt-2">{children}</div>;
};

export const Separateur = ({ niveau }: { niveau: number }) => {
  return <div className={`mt-${niveau ?? "4"}`} />;
};

export const anchorHeadingMDXComponents: MDXComponents = {
  h1: props => <AnchorLink as="h1" anchor={slugify(getLabelFromChildren(props.children))} {...props} />,
  h2: props => <AnchorLink as="h2" anchor={slugify(getLabelFromChildren(props.children))} {...props} />,
  h3: props => <AnchorLink as="h3" anchor={slugify(getLabelFromChildren(props.children))} {...props} />,
};

/**
 * Avoid unauthorized HTML tags inside p tags. (e.g. no p inside p, no div inside p, etc.)
 */
export const paragraphContentMDXComponents: MDXComponents = {
  p: Fragment,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: MdxLink,
    CTA,
    Card,
    Details,
    Question,
    Reponse,
    Separateur,
    ...anchorHeadingMDXComponents,
    ...components,
  };
}
