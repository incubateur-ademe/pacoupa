import { type MDXComponents } from "mdx/types";
import { Fragment } from "react";

import { MdxLink } from "@/components/mdx/Link";
import { getLabelFromChildren } from "@/utils/react";
import { slugify } from "@/utils/string";

import { CTA } from "./components/CTA";
import { MdxCallout } from "./components/mdx/MdxCallout";
import { MdxCard } from "./components/mdx/MdxCard";
import { MdxDetails } from "./components/mdx/MdxDetails";
import { MdxImage } from "./components/mdx/MdxImage";
import { MdxSpacer } from "./components/mdx/MdxSpacer";
import { AnchorLink } from "./dsfr/client";

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

export const defaultMdxComponents: MDXComponents = {
  a: MdxLink,
  CTA,
  Card: MdxCard,
  Details: MdxDetails,
  Spacer: MdxSpacer,
  Callout: MdxCallout,

  Image: props => <MdxImage {...props} />,
  ...anchorHeadingMDXComponents,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
  };
}
