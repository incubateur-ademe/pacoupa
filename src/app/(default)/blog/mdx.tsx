import { MDXRemote } from "next-mdx-remote/rsc";

import { anchorHeadingMDXComponents } from "@/mdx-components";

interface CustomMDXProps {
  components?: Record<string, React.ComponentType>;
  source: string;
}

export function CustomMDX(props: CustomMDXProps) {
  return <MDXRemote {...props} components={{ ...anchorHeadingMDXComponents, ...(props.components || {}) }} />;
}
