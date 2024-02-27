import { type MDXProps } from "mdx/types";

export interface MDXBlocProps {
  highlight: {
    component: (props: MDXProps) => JSX.Element;
    metadata: PacoupaMDXLandingHighlightMetadata;
  } | null;
  id: string;
  metadata: PacoupaMDXLandingMetadata;
  titleComponent: (props: MDXProps) => JSX.Element;
}
