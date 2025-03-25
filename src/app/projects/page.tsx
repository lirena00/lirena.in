"use client";
import { projects } from "~/utils/project";
import ProjectCard from "~/components/ProjectCard";
import Footer from "~/components/Footer";

export default function Projects() {
  return (
    <main className="flex min-h-screen flex-col bg-background p-4 font-mono text-text md:p-12 lg:p-24">
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold md:text-4xl">Projects</h1>
        <p className="max-w-2xl text-lg text-text/60">
          A showcase of my work, including web applications, tools, and other
          creative ventures.
        </p>
      </div>

      <div className="grid flex-grow grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
      <Footer />
    </main>
  );
}
