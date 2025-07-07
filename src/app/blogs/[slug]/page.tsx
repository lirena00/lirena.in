import { posts } from ".velite";
import { MDXContent } from "~/components/MDXContent";
import { notFound } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { Substack } from "~/components/icons/Substack";
import { Devto } from "~/components/icons/Devto";
import { Peerlist } from "~/components/icons/Peerlist";
import type { Viewport } from "next";

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((i) => i.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col gap-8 bg-background px-4 py-8 font-mono text-text sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <Header />

      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 border-b border-accent/30 pb-8">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="mb-6 text-lg text-white/80 sm:text-xl">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
            {post.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-accent" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            )}

            {post.metadata?.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-accent" />
                <span>{Math.ceil(post.metadata.readingTime)} min read</span>
              </div>
            )}

            {post.metadata?.wordCount && (
              <div className="flex items-center gap-1.5">
                <span className="text-accent">•</span>
                <span>{post.metadata.wordCount} words</span>
              </div>
            )}
          </div>

          {post.ext_link && (
            <div className="mt-4 flex flex-wrap gap-3">
              {post.ext_link.peerlist && (
                <a
                  href={post.ext_link.peerlist}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-accent/30 px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  <Peerlist className="h-4 w-4 text-accent" />
                  View on Peerlist
                </a>
              )}
              {post.ext_link.dev_to && (
                <a
                  href={post.ext_link.dev_to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-accent/30 px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  <Devto className="h-4 w-4 text-accent" />
                  View on Dev.to
                </a>
              )}
              {post.ext_link.substack && (
                <a
                  href={post.ext_link.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-accent/30 px-3 py-1.5 text-sm text-white/80 transition-colors hover:bg-accent/10 hover:text-accent"
                >
                  <Substack className="h-4 w-4 text-accent" />
                  View on Substack
                </a>
              )}
            </div>
          )}
        </header>

        <article className="prose prose-invert max-w-none">
          <MDXContent code={post.code} />
        </article>
      </div>
      <Footer />
    </main>
  );
}

export const viewport: Viewport = {
  themeColor: "#32dfa0",
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((i) => i.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  const ogUrl = new URL("https://www.lirena.in/api/og");
  ogUrl.searchParams.set("title", post.title);
  if (post.date) ogUrl.searchParams.set("date", post.date);
  if (post.metadata?.readingTime)
    ogUrl.searchParams.set(
      "readingTime",
      Math.ceil(post.metadata.readingTime).toString(),
    );

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      author: ["saksham kushwaha"],
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}
