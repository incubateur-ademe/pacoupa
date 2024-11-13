/* eslint-disable jsx-a11y/anchor-has-content */
import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { type AnchorHTMLAttributes, createElement } from "react";

import { type Any } from "@/utils/types";

type TableProps = {
  headers: string[];
  rows: string[][];
};

function Table(data: TableProps) {
  const headers = data.headers.map((header, index) => <th key={index}>{header}</th>);
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

type CustomLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

function CustomLink(props: CustomLinkProps) {
  const { href, ...restProps } = props;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...restProps}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: ImageProps) {
  const { alt, ...restProps } = props;

  return <Image alt={alt} className="rounded-lg" {...restProps} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: string }) => {
    const slug = slugify(children);
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components: Record<string, React.ComponentType<Any>> = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Table,
};

interface CustomMDXProps {
  components?: Record<string, React.ComponentType>;
  source: string;
}

export function CustomMDX(props: CustomMDXProps) {
  return <MDXRemote {...props} components={{ ...components, ...(props.components || {}) }} />;
}
