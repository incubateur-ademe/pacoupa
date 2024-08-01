import { H2, Text } from "@/dsfr/base/typography";

export interface MentionPartProps {
  children?: React.ReactNode | React.ReactNode[];
  description: string;
  divProps?: React.HTMLAttributes<HTMLDivElement>;
  title: string;
}

export const MentionPart = (props: MentionPartProps): JSX.Element => {
  return (
    <div className="mt-6" {...props.divProps}>
      <H2>{props.title}</H2>
      <Text className="mb-4">{props.description}</Text>
      {props.children}
    </div>
  );
};
