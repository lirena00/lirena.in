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
        className="overflow-x-auto rounded-lg border border-accent/20 bg-black/40 p-4 pr-12 text-sm leading-relaxed text-white/90 sm:text-base"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-accent/20 bg-black/60 p-2 text-accent opacity-0 transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 focus:opacity-100 group-hover:opacity-100"
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
      className="mb-6 mt-8 text-2xl font-bold leading-tight text-white first:mt-0 sm:text-3xl md:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-8 text-xl font-semibold leading-tight text-white/95 first:mt-0 sm:text-2xl md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-6 text-lg font-medium leading-tight text-white/90 first:mt-0 sm:text-xl md:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-accent underline decoration-accent/50 underline-offset-2 transition-all duration-200 hover:text-accent/80 hover:decoration-accent/80"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded-md border border-accent/20 bg-accent/10 px-1.5 py-0.5 font-mono text-sm text-accent sm:px-2 sm:py-1"
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
      className="my-6 border-l-4 border-accent/50 bg-accent/5 p-4 text-sm italic leading-relaxed text-white/80 sm:p-6 sm:text-base"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-4 ml-4 list-disc space-y-2 text-sm text-white/75 sm:ml-6 sm:text-base"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-4 ml-4 list-decimal space-y-2 text-sm text-white/75 sm:ml-6 sm:text-base"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed text-white/75" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-white/90" {...props}>
      {children}
    </em>
  ),

  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src={src}
      alt={alt}
      className="mx-auto my-6 max-w-full rounded-lg border border-accent/20 sm:my-8"
      {...props}
    />
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
