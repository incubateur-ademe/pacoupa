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

declare type SolutionMDXMetadata = {
  description: string;
  label: string;
  scoreEcologique: string;
  titre: string;
  type: "collectif" | "individuel";
  usageChauffage: "non" | "oui" | "possible";
  usageECS: "non" | "oui" | "possible";
};

declare type LandingPageMDXMetadata = {
  titre: string;
};

declare module "content/solutions/*.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const frontmatter: SolutionMDXMetadata;
}

declare module "@__content/landing-pages/chauffage-energie-renouvelable-copropriete/index.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const frontmatter: LandingPageMDXMetadata;
}
declare module "@__content/landing-pages/ges-batiment-france/index.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const frontmatter: LandingPageMDXMetadata;
}
declare module "@__content/landing-pages/renovation-energetique-copropriete/index.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const frontmatter: LandingPageMDXMetadata;
}

declare module "@__content/faq/index.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const frontmatter: LandingPageMDXMetadata;
}

declare module "@__content/methodologie/index.mdx" {
  const MDXContent: MDXContent;
  export default MDXContent;
  export const frontmatter: LandingPageMDXMetadata;
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
