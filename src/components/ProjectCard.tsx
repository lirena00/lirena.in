import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

interface Project {
  href: string;
  title: string;
  imageSrc: string;
  description: string;
}

export default function ProjectCard({
  href,
  title,
  imageSrc,
  description,
}: Project) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
    >
      <Link href={href} target="_blank">
        <div className="group relative h-full overflow-hidden rounded-lg border border-accent/20 bg-black/40 font-mono transition-all duration-300 hover:border-accent/70 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.25)]">
          <div className="flex items-center justify-between border-b border-accent/20 bg-accent/10 px-4 py-2.5">
            <div className="font-medium text-gray-200">{title}</div>
          </div>

          <div className="p-5 text-sm">
            <div
              className="absolute inset-0 z-0 opacity-15 transition-all duration-500 group-hover:opacity-30"
              style={{
                backgroundImage: `url(${imageSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(60px)",
              }}
            />
            <p className="relative z-10 text-sm leading-relaxed text-gray-300 sm:text-base">
              {description}
            </p>
          </div>

          <div className="absolute right-3 top-3 flex items-center text-sm font-medium text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
            VIEW <ArrowUpRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
