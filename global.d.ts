/* eslint-disable import/no-default-export */
interface PacoupaMDXImage {
  readonly alt: string;
  readonly mobile?: {
    readonly size?: "large" | "medium" | "small";
  };
  readonly src: string;
}

declare type PacoupaMDXLandingMetadata = PacoupaHeroMDXMetadata &
  (
    | {
        cards: Array<{
          readonly image: PacoupaMDXImage;
          readonly title?: string;
        }>;
        type: "alternated";
      }
    | {
        image: PacoupaMDXImage & {
          /** @default "left" */
          position?: "left" | "right";
        };
        type: "single-image";
      }
    | {
        type: "text-only";
      }
  );

declare type PacoupaMDXLandingHighlightMetadata =
  | {
      readonly size?: "large" | "small";
    }
  | undefined;

declare type PacoupaHeroMDXMetadata =
  | {
      readonly cta?: {
        readonly href?: string;
        readonly source: string;
        readonly title?: string;
      };
    }
  | undefined;

declare type PacoupaFAQMDXMetadata = PacoupaHeroMDXMetadata & {
  readonly question: string;
};

declare type MDXContent = typeof import("*.mdx").default;

declare module "@__content/landing/blocs/*/title.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const metadata: PacoupaMDXLandingMetadata;
}

declare module "@__content/landing/blocs/*/highlight.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const metadata: PacoupaMDXLandingHighlightMetadata;
}

declare module "@__content/landing/faq/*.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const metadata: PacoupaFAQMDXMetadata;
}

declare module "@__content/landing/hero_title.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const metadata: PacoupaHeroMDXMetadata;
}

declare module "@__content/mentions-legales.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const metadata: PacoupaHeroMDXMetadata;
}

declare module "@codegouvfr/react-dsfr/*.svg" {
  export interface SVG {
    height: number;
    src: string;
    width: number;
  }

  const content: SVG;

  export = content;
}
