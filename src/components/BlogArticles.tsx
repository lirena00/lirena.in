"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";
import { posts } from "../../.velite";

export function BlogArticles() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[0, 1, 2].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="group relative h-full overflow-hidden rounded-md border border-accent/20 bg-black/40">
              <div className="flex border-b border-accent/20 bg-accent/10 px-3 py-1.5">
                <div className="h-5 w-3/4 rounded bg-accent/20"></div>
              </div>
              <div className="p-4">
                <div className="h-12 rounded bg-accent/10"></div>
              </div>
              <div className="flex items-center justify-between px-4 py-2">
                <div className="h-3 w-1/4 rounded bg-accent/10"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const publishedPosts = posts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (publishedPosts.length === 0) {
    return (
      <div className="rounded-md border border-accent/20 bg-black/30 p-6 text-center">
        <h3 className="text-accent">No articles found</h3>
        <p className="mt-2 text-sm text-gray-400">
          Check back soon for new content!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {publishedPosts.map((post, index) => (
        <motion.div
          key={post.slug}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`/blogs/${post.slug}`}>
            <div className="group relative h-full overflow-hidden rounded-md border border-accent/20 bg-black/40 font-mono transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)]">
              <div className="flex items-center border-b border-accent/20 bg-accent/10 px-3 py-1.5">
                <div className="font-medium text-gray-300">{post.title}</div>
              </div>

              <div className="p-4">
                {post.description && (
                  <p className="mb-3 line-clamp-2 overflow-hidden text-ellipsis text-sm text-gray-300">
                    {post.description}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {post.metadata?.readingTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {Math.ceil(post.metadata.readingTime)} min read
                      </span>
                    </div>
                  )}

                  {post.metadata?.wordCount && (
                    <div className="flex items-center gap-1">
                      <span>•</span>
                      <span>{post.metadata.wordCount} words</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute right-2 top-2 flex items-center text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                READ <ArrowUpRight className="ml-1 h-4 w-4" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
