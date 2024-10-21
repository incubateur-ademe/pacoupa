"use client";

import { MDXProvider } from "@mdx-js/react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { type ChangeEvent, useState } from "react";

const MdxPlayground = () => {
  const [mdxContent, setMdxContent] = useState<string>("");
  const [renderedContent, setRenderedContent] = useState<MDXRemoteSerializeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleMdxChange = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    const content = event.target.value;
    setMdxContent(content);
    setError(null);

    try {
      setRenderedContent(await serialize(content));
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.toString());
      }
      setRenderedContent(null);
      return;
    }
  };

  return (
    <div className="flex min-h-full col-span-3">
      <textarea
        className="w-1/2 h-full p-4 text-lg"
        value={mdxContent}
        onChange={event => {
          handleMdxChange(event).catch(console.error);
        }}
        placeholder="Enter your MDX content here..."
      />
      <div className="w-1/2 h-full p-4 overflow-y-auto bg-gray-100">
        <MDXProvider>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : renderedContent ? (
            <MDXRemote {...renderedContent} />
          ) : (
            <p>Enter MDX content to see the rendered output.</p>
          )}
        </MDXProvider>
      </div>
    </div>
  );
};

export default MdxPlayground;
