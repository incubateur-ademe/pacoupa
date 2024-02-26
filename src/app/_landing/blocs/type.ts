import { type MDXProps } from "mdx/types";

export interface MDXBlocProps {
  highlight: {
    component: (props: MDXProps) => JSX.Element;
    metadata: CarteVerteMDXLandingHighlightMetadata;
  } | null;
  id: string;
  metadata: CarteVerteMDXLandingMetadata;
  titleComponent: (props: MDXProps) => JSX.Element;
}
