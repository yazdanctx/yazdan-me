import ReactMarkdown from "react-markdown";

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-white underline underline-offset-2"
          >
            {children}
          </a>
        ),
        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4 space-y-1">
            {children}
          </ol>
        ),
        code: ({ children }) => (
          <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-zinc-800 p-4 rounded-lg mb-4 overflow-x-auto text-sm">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
