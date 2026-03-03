"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group flex flex-col bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-violet-700/50 transition-all"
    >
      {/* Image placeholder */}
      <div className="h-44 bg-gradient-to-br from-violet-900/40 to-indigo-900/30 flex items-center justify-center">
        {project.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl font-bold text-violet-700 opacity-40">
            {project.title.charAt(0)}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 bg-violet-900/30 text-violet-300 rounded-full border border-violet-800/30"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Github size={15} /> Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink size={15} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const allTechs = ["Tous", ...Array.from(new Set(projects.flatMap((p) => p.techStack)))];
  const [filter, setFilter] = useState("Tous");

  const filtered =
    filter === "Tous" ? projects : projects.filter((p) => p.techStack.includes(filter));

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-violet-400 uppercase tracking-widest text-sm font-medium mb-2">
            Projets
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Mes réalisations</h2>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {allTechs.slice(0, 8).map((tech) => (
              <button
                key={tech}
                onClick={() => setFilter(tech)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                  filter === tech
                    ? "bg-violet-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
