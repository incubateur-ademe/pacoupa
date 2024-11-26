"use client";

import { compileMDX } from "next-mdx-remote/rsc";
import { type ChangeEvent, useState } from "react";

import { defaultMdxComponents } from "@/mdx-components";

export default function MDXEditorPage() {
  const [mdxContent, setMdxContent] = useState<string>("");
  const [renderedContent, setRenderedContent] = useState<React.ReactNode | null>(null);

  const handleRender = async (event: ChangeEvent<HTMLTextAreaElement>) => {
    const mdxContent = event.target.value;
    setMdxContent(mdxContent);

    try {
      const { content } = await compileMDX({
        source: mdxContent,
        components: defaultMdxComponents,
        options: {
          parseFrontmatter: false,
        },
      });

      setRenderedContent(content);
    } catch (error) {
      console.error("MDX Compilation Error:", error);

      setRenderedContent(
        <div className="text-red-500">
          <p>Error rendering MDX</p>
          {error instanceof Error && <p>{error.toString()}</p>}
        </div>,
      );
    }
  };

  return (
    <div className="flex h-full col-span-3">
      <div className="w-1/2 p-4 h-full bg-gray-100">
        <textarea
          className="w-full h-full p-2 border rounded"
          value={mdxContent}
          onChange={event => {
            handleRender(event).catch(console.error);
          }}
          placeholder="Write your MDX here. "
        />
      </div>
      <div className="w-1/2 p-4 bg-white h-full overflow-x-hidden overflow-y-auto">
        <div className="border p-4">{renderedContent}</div>
      </div>
    </div>
  );
}
