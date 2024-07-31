import { H2 } from "@/dsfr/base/typography";

export interface MentionPartProps {
  children?: React.ReactNode | React.ReactNode[];
  description: string;
  divProps?: React.HTMLAttributes<HTMLDivElement>;
  title: string;
}

export const MentionPart = (props: MentionPartProps): JSX.Element => {
  return (
    <div className="fr-mt-3w" {...props.divProps}>
      <H2>{props.title}</H2>
      <p className="fr-mb-2w">{props.description}</p>
      {props.children}
    </div>
  );
};
