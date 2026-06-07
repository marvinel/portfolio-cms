"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl font-bold text-white mb-4 mt-8">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold text-white mt-8 mb-3">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-6 mb-2">{children}</h3>,
          p: ({ children }) => <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc pl-6 mb-4 text-gray-300 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 text-gray-300 space-y-1">{children}</ol>,
          li: ({ children }) => <li className="text-gray-300">{children}</li>,
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return <code className={`${className} block`}>{children}</code>;
            }
            return <code className="bg-gray-800 px-1.5 py-0.5 rounded text-sm text-blue-300">{children}</code>;
          },
          pre: ({ children }) => <pre className="bg-gray-900 border border-gray-800 rounded-lg p-4 mb-4 overflow-x-auto text-sm">{children}</pre>,
          blockquote: ({ children }) => <blockquote className="border-l-4 border-blue-500 pl-4 text-gray-400 mb-4 italic">{children}</blockquote>,
          a: ({ href, children }) => <a href={href} className="text-blue-400 underline hover:text-blue-300" target="_blank" rel="noopener noreferrer">{children}</a>,
          strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
          em: ({ children }) => <em className="italic text-gray-200">{children}</em>,
          hr: () => <hr className="border-gray-800 my-8" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
