"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

type Article = {
  title: string;
  link: string;
  pubDate: string;
  excerpt: string;
};

export function SubstackArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await fetch("/api/substack");

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }

        const data = await response.json();
        setArticles(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-4">
        {[0].map(
          (
            _,
            i, // change this once I have more than 1 article ofc
          ) => (
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
          ),
        )}
      </div>
    );
  }

  // Show error state
  if (error || articles.length === 0) {
    return (
      <div className="rounded-md border border-accent/20 bg-black/30 p-6 text-center">
        <h3 className="text-accent">No articles found</h3>
        <p className="mt-2 text-sm text-gray-400">
          {error ?? "Check back soon for new content!"}
        </p>
      </div>
    );
  }

  // Show actual articles
  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Link href={`${article.link}/?utm_source=portfolio`} target="_blank">
            <div className="group relative h-full overflow-hidden rounded-md border border-accent/20 bg-black/40 font-mono transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.15)]">
              <div className="items-center</div> flex border-b border-accent/20 bg-accent/10 px-3 py-1.5">
                <div className="font-medium text-gray-300">{article.title}</div>
              </div>
              <p className="mb-2 line-clamp-2 overflow-hidden text-ellipsis p-4 text-sm text-gray-300">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-xs text-gray-400">
                  {new Date(article.pubDate).toLocaleDateString()}
                </span>

                <div className="absolute right-2 top-2 flex items-center text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  READ <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
