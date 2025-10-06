"use client";
import * as runtime from "react/jsx-runtime";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import React from "react";

const CodeBlock = ({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (typeof children === "string") {
      await navigator.clipboard.writeText(children);
    } else {
      const textContent = extractTextFromChildren(children);
      await navigator.clipboard.writeText(textContent);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const extractTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === "string") return children;
    if (typeof children === "number") return children.toString();
    if (Array.isArray(children)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return children.map((child) => extractTextFromChildren(child)).join("");
    }
    if (React.isValidElement(children)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      return extractTextFromChildren(children.props.children);
    }
    return "";
  };

  return (
    <div className="group relative my-6">
      <pre
        className="border-accent/20 overflow-x-auto rounded-lg border bg-black/40 p-4 pr-12 text-sm leading-relaxed text-white/90 sm:text-base"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="border-accent/20 text-accent hover:border-accent/40 hover:bg-accent/10 absolute top-2 right-2 rounded-md border bg-black/60 p-2 opacity-0 transition-all duration-200 group-hover:opacity-100 focus:opacity-100"
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
};

const sharedComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-12 mb-8 text-3xl leading-tight font-bold text-white first:mt-0 sm:text-4xl md:text-5xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-10 mb-6 text-2xl leading-tight font-semibold text-white/95 first:mt-0 sm:text-3xl md:text-4xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 mb-4 text-xl leading-tight font-medium text-white/90 first:mt-0 sm:text-2xl md:text-3xl"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-6 mb-3 text-lg leading-snug font-medium text-white/85 first:mt-0 sm:text-xl"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="mt-5 mb-2 text-base leading-snug font-medium text-white/80 first:mt-0 sm:text-lg"
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="mt-4 mb-2 text-sm leading-snug font-medium text-white/75 first:mt-0 sm:text-base"
      {...props}
    >
      {children}
    </h6>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="mb-6 text-base leading-relaxed text-white/85 sm:text-lg sm:leading-relaxed"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-accent decoration-accent/60 hover:text-accent/90 hover:decoration-accent font-medium underline underline-offset-4 transition-all duration-200"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="border-accent/30 bg-accent/15 text-accent rounded-md border px-2 py-1 font-mono text-sm font-medium sm:text-base"
      {...props}
    >
      {children}
    </code>
  ),
  pre: CodeBlock,
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-accent/60 bg-accent/10 my-8 border-l-4 p-6 text-base leading-relaxed text-white/90 italic sm:p-8 sm:text-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-6 ml-6 list-disc space-y-3 text-base text-white/85 sm:ml-8 sm:text-lg"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-6 ml-6 list-decimal space-y-3 text-base text-white/85 sm:ml-8 sm:text-lg"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="marker:text-accent/70 leading-relaxed text-white/85"
      {...props}
    >
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-bold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="text-white/95 italic" {...props}>
      {children}
    </em>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-accent/30 my-12" {...props} />
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src={src}
      alt={alt}
      className="border-accent/20 mx-auto my-8 max-w-full rounded-lg border shadow-lg sm:my-10"
      {...props}
    />
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-8 overflow-x-auto">
      <table
        className="border-accent/20 min-w-full border-collapse rounded-lg border text-sm sm:text-base"
        {...props}
      >
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-accent/30 bg-accent/10 border-b px-4 py-3 text-left font-semibold text-white sm:px-6"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-accent/20 border-b px-4 py-3 text-white/85 sm:px-6"
      {...props}
    >
      {children}
    </td>
  ),
};

const useMDXComponent = (
  code: string,
): React.ComponentType<{
  components?: Record<string, React.ComponentType>;
}> => {
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  const fn = new Function("runtime", code) as (
    runtime: typeof import("react/jsx-runtime"),
  ) => {
    default: React.ComponentType<{
      components?: Record<string, React.ComponentType>;
    }>;
  };
  return fn(runtime).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};
