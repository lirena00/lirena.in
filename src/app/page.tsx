"use client";

import Head from "next/head";
import Link from "next/link";
import { projects } from "~/utils/project";
import { useScramble } from "use-scramble";
import { ArrowUpRight, Terminal } from "lucide-react";
import { motion } from "motion/react";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import ProjectCard from "~/components/ProjectCard";

import { X } from "~/components/icons/X";
import { Stackoverflow } from "~/components/icons/Stackoverflow";
import { Leetcode } from "~/components/icons/Leetcode";
import { Linkedin } from "~/components/icons/Linkedin";
import { Mail } from "~/components/icons/Mail";
import { Github } from "~/components/icons/Github";
import { Substack } from "~/components/icons/Substack";

import { Python } from "~/components/icons/Python";
import { Cplusplus } from "~/components/icons/Cplusplus";
import { Javascript } from "~/components/icons/Javascript";
import { Typescript } from "~/components/icons/Typescript";
import { Css } from "~/components/icons/Css";
import { Drizzle } from "~/components/icons/Drizzle";
import { Figma } from "~/components/icons/Figma";
import { Html } from "~/components/icons/Html";
import { Git } from "~/components/icons/Git";
import { Mongo } from "~/components/icons/Mongo";
import { Nextjs } from "~/components/icons/Nextjs";
import { Reactjs } from "~/components/icons/Reactjs";
import { Tailwind } from "~/components/icons/Tailwind";
import { Prisma } from "~/components/icons/Prisma";
import { Psql } from "~/components/icons/Psql";
import { Supabase } from "~/components/icons/Supabase";
import { Svelte } from "~/components/icons/Svelte";

import { SubstackArticles } from "~/components/SubstackArticles";

// Simplified tech icon with minimal animations
const TechIcon = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    className="group relative flex flex-col items-center justify-center rounded-md border border-accent/20 bg-black/30 p-4 transition-all duration-300 hover:border-accent hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)]"
  >
    <div className="absolute inset-0 rounded-md bg-accent/5 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100"></div>
    <div className="relative z-10 text-[1.7em] text-white/90 transition-all duration-300 group-hover:text-accent">
      {icon}
    </div>
    <p className="relative z-10 mt-2 font-mono text-xs text-white/70 group-hover:text-accent/90">
      {name}
    </p>
  </motion.div>
);

// Simplified section title component
const SectionTitle = ({ title }: { title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
    className="mb-6 flex items-center font-mono"
  >
    <div className="flex items-center rounded-md border border-accent/30 bg-accent/10 px-3 py-1.5">
      <Terminal size={18} className="mr-2 text-accent" />
      <h2 className="text-xl font-bold text-white">
        {title}
        <span className="blink text-accent">_</span>
      </h2>
    </div>
  </motion.div>
);

export default function HomePage() {
  const { ref } = useScramble({
    text: "Saksham Kushwaha",
    speed: 0.5,
    tick: 2,
    step: 1,
    scramble: 5,
    seed: 3,
  });

  return (
    <>
      <Head>
        <title>Saksham Kushwaha | lirena00 | Portfolio</title>
        <meta
          name="description"
          content="Saksham Kushwaha (lirena00), a 19-year-old CS undergrad, is a full-stack developer, programmer, and artist passionate about AI, web development, and creative storytelling."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col gap-8 bg-background px-4 py-12 font-mono text-text lg:px-8">
        <Header />
        <div className="container mx-auto max-w-4xl space-y-16">
          {/* Hero Section - simplified animation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex h-[85vh] flex-col items-center justify-center py-16 text-center"
          >
            <div className="mb-6 inline-block rounded-lg border-2 border-accent px-4 py-1 text-sm font-medium text-accent">
              Developer • Artist • Wannabe Writer
            </div>
            <h1 className="mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              <span ref={ref} className="font-mono text-accent" />
            </h1>
            <p className="max-w-2xl text-xl text-gray-400">
              A weeb who loves to code, draw and write.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="#connect"
                className="group relative inline-flex items-center overflow-hidden rounded-md bg-accent px-6 py-2.5 font-semibold text-black transition hover:bg-accent/80"
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <span className="transition-all group-hover:me-4">
                  Get in touch
                </span>
              </Link>
              <Link
                href="#projects"
                className="inline-flex items-center rounded-md border border-accent px-6 py-2.5 font-semibold text-accent transition hover:bg-accent/10"
              >
                View projects
              </Link>
            </div>
          </motion.div>

          {/* About Section */}
          <section id="about" className="space-y-6">
            <SectionTitle title="aboutMe" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="rounded-lg border border-accent/20 bg-black/40 p-8 backdrop-blur-sm"
            >
              <div className="space-y-4 text-lg leading-relaxed tracking-tighter text-text/90">
                <p>
                  i&apos;m a 19-year-old undergrad developer, always eager to
                  learn new things whenever i get the chance. i&apos;m all about{" "}
                  <span className="font-medium text-accent">
                    scratching my own itch,{" "}
                  </span>
                  building tools that i&apos;d genuinely use and enjoy myself.
                </p>
                <p>
                  when i&apos;m not coding, you&apos;ll catch me lost in
                  <span className="font-medium text-accent">
                    {" "}
                    anime{" "}
                  </span>or{" "}
                  <span className="font-medium text-accent">manga</span>, or{" "}
                  <span className="font-medium text-accent">
                    sketching random drawings
                  </span>{" "}
                  inspired by the stories swirling around in my head.
                </p>
              </div>
            </motion.div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="space-y-6">
            <SectionTitle title="myProjects" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.slice(0, 4).map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>

            <Link
              href="/projects"
              target="_blank"
              className="group flex w-fit items-center gap-1 rounded-md border border-accent/20 bg-black/30 px-5 py-2.5 font-mono text-sm text-white/80 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]"
            >
              <span>View all projects</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </section>

          {/* Substack Section */}
          <section id="articles" className="space-y-6">
            <SectionTitle title="latestArticles" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
            >
              <SubstackArticles />
            </motion.div>

            <Link
              href="https://lirena00.substack.com"
              target="_blank"
              className="group flex w-fit items-center gap-1 rounded-md border border-accent/20 bg-black/30 px-5 py-2.5 font-mono text-sm text-white/80 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]"
            >
              <span>Read all articles</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </section>

          {/* Skills Section */}
          <section id="tech-stack" className="space-y-6">
            <SectionTitle title="techStack" />

            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {[
                { icon: <Python />, name: "Python" },
                { icon: <Cplusplus />, name: "C++" },
                { icon: <Javascript />, name: "JavaScript" },
                { icon: <Typescript />, name: "TypeScript" },
                { icon: <Html />, name: "HTML" },
                { icon: <Css />, name: "CSS" },
                { icon: <Tailwind />, name: "Tailwind" },
                { icon: <Reactjs />, name: "React" },
                { icon: <Nextjs />, name: "Next.js" },
                { icon: <Svelte />, name: "Svelte" },
                { icon: <Prisma />, name: "Prisma" },
                { icon: <Drizzle />, name: "Drizzle" },
                { icon: <Psql />, name: "PostgreSQL" },
                { icon: <Mongo />, name: "MongoDB" },
                { icon: <Supabase />, name: "Supabase" },
                { icon: <Git />, name: "Git" },
                { icon: <Figma />, name: "Figma" },
              ].map((tech, i) => (
                <TechIcon key={i} icon={tech.icon} name={tech.name} />
              ))}
            </div>
          </section>

          {/* Connect Section */}
          <section id="connect" className="space-y-6">
            <SectionTitle title="connect" />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="rounded-lg border border-accent/20 bg-black/40 p-6 backdrop-blur-sm"
            >
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    href: "https://github.com/LiReNa00?utm_source=portfolio",
                    icon: <Github />,
                    label: "GitHub",
                  },
                  {
                    href: "https://www.linkedin.com/in/sakshamkushwaha?utm_source=portfolio",
                    icon: <Linkedin />,
                    label: "LinkedIn",
                  },
                  {
                    href: "https://twitter.com/LiReNa00?utm_source=portfolio",
                    icon: <X />,
                    label: "Twitter",
                  },
                  {
                    href: "https://leetcode.com/lirena00/?utm_source=portfolio",
                    icon: <Leetcode />,
                    label: "LeetCode",
                  },
                  {
                    href: "https://lirena00.substack.com/?utm_source=portfolio",
                    icon: <Substack />,
                    label: "Substack",
                  },
                  {
                    href: "https://stackoverflow.com/users/13875145/saksham-kushwaha?utm_source=portfolio",
                    icon: <Stackoverflow />,
                    label: "Stack Overflow",
                  },
                  {
                    href: "mailto:sakshamkushwaha12776@gmail.com",
                    icon: <Mail />,
                    label: "Email",
                  },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                  >
                    <div className="group flex items-center rounded-md border border-accent/20 bg-black/30 px-4 py-3 transition-all hover:border-accent hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.2)]">
                      <div className="mr-2 text-white/90 transition-all duration-300 group-hover:text-accent">
                        {social.icon}
                      </div>
                      <span className="font-mono text-xs text-white/80 group-hover:text-accent">
                        {social.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
