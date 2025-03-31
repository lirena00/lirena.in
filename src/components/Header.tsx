"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Header() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "h") {
        router.push("/");
      }
      if (e.key === "p") {
        router.push("/projects");
      }
      if (e.key === "b") {
        router.push("/blogs");
      }
      if (e.key === "c") {
        router.push("/#connect");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="flex w-full justify-center">
      <header className="relative flex w-full max-w-4xl items-center justify-between gap-4 px-4 py-2 font-mono text-sm text-gray-400 sm:text-base md:px-12 lg:px-24">
        <div className="hover:text-gray-300">
          <Link href="/">
            <span className="text-accent">[h] </span>home
          </Link>
        </div>
        <div className="hover:text-gray-300">
          <Link href="/projects">
            <span className="text-accent">[p] </span>projects
          </Link>
        </div>

        <div className="hover:text-gray-300">
          <Link href="/blogs">
            <span className="text-accent">[b] </span>blogs
          </Link>
        </div>
        <div className="hidden hover:text-gray-300 md:block">
          <Link href="#connect">
            <span className="text-accent">[c] </span>connect
          </Link>
        </div>
      </header>
    </div>
  );
}
