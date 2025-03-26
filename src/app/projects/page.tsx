"use client";
import { projects } from "~/utils/project";
import ProjectCard from "~/components/ProjectCard";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { useScramble } from "use-scramble";

export default function Projects() {
  const { ref } = useScramble({
    text: "Projects_",
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
            A showcase of my work and projects. I build things that I would
            genuinely use and enjoy, because most of my projects are born out of
            the principle &quot;scratching my own itch&quot;.
          </p>
        </div>

        <div className="grid flex-grow grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
