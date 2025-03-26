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
    <header className="flex items-center justify-between px-4 py-2 font-mono text-gray-400 md:px-12 lg:px-24">
      <div className="hover:text-gray-300">
        <Link href="/">
          <span className="text-accent">[h]</span>ome
        </Link>
      </div>
      <div className="hover:text-gray-300">
        <Link href="/projects">
          <span className="text-accent">[p]</span>rojects
        </Link>
      </div>

      <div className="hover:text-gray-300">
        <Link href="/blogs">
          <span className="text-accent">[b]</span>logs
        </Link>
      </div>
      <div className="hidden hover:text-gray-300 md:block">
        <Link href="#connect">
          <span className="text-accent">[c]</span>onnect
        </Link>
      </div>
    </header>
  );
}
