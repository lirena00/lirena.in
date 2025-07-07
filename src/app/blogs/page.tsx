"use client";

import { motion } from "motion/react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { useScramble } from "use-scramble";
import { BlogArticles } from "~/components/BlogArticles";

export default function Blogs() {
  const { ref } = useScramble({
    text: "Blogs_",
    speed: 0.5,
    tick: 2,
    step: 1,
    scramble: 5,
    seed: 3,
  });
  return (
    <main className="flex min-h-screen flex-col gap-8 bg-background px-4 py-12 font-mono text-text lg:px-8">
      <Header />
      <div className="container mx-auto max-w-4xl space-y-8 sm:space-y-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="mb-4 text-3xl font-bold text-accent md:text-4xl">
            <span ref={ref} />
          </h1>
          <p className="text-base text-text/60 sm:text-lg">
            A collection of my random thoughts, ideas, and experiences.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <BlogArticles />
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
