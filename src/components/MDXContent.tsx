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
    <div className="relative">
      <pre
        className="mb-4 overflow-x-auto rounded-md border border-accent/20 bg-black/30 p-4 pr-12 text-white/80"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 rounded-md border border-accent/20 bg-black/50 p-2 text-accent transition-colors hover:bg-accent/10"
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
};

const sharedComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mb-4 mt-8 text-2xl font-semibold text-white/90 sm:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mb-3 mt-6 text-xl font-medium text-white/80 sm:text-2xl"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed text-white/70" {...props}>
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
      className="text-accent underline transition-colors hover:text-accent/80"
      {...props}
    >
      {children}
    </a>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="rounded border border-accent/20 bg-accent/10 px-2 py-1 font-mono text-sm text-accent"
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
      className="my-4 border-l-4 border-accent/50 bg-accent/5 p-4 italic text-white/70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="mb-4 list-inside list-disc space-y-2 text-white/70"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="mb-4 list-inside list-decimal space-y-2 text-white/70"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="text-white/70" {...props}>
      {children}
    </li>
  ),

  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-white/80" {...props}>
      {children}
    </em>
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-accent/30" {...props} />
  ),
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src={src}
      alt={alt}
      className="my-4 max-w-full rounded-lg border-2 border-accent/20"
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
  const fn = new Function(code) as () => {
    default: React.ComponentType<{
      components?: Record<string, React.ComponentType>;
    }>;
  };
  return fn({ ...runtime }).default;
};

interface MDXProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export const MDXContent = ({ code, components }: MDXProps) => {
  const Component = useMDXComponent(code);
  return <Component components={{ ...sharedComponents, ...components }} />;
};
