"use client";
import { motion, Variants } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SiteProfile } from "@/types";

interface Props {
  profile: SiteProfile | null;
}

const defaults = {
  name: "Loïc Devalin",
  title: "Développeur Full-Stack · Flutter · ASP.NET Core · Next.js",
  tagline:
    "Je conçois des applications mobiles et web performantes, avec une architecture propre et une expérience utilisateur soignée.",
  githubUrl: "https://github.com/loicKonan123",
  linkedinUrl: "https://linkedin.com/in/devalinloic",
  email: "devalinloic@gmail.com",
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function HeroSection({ profile }: Props) {
  const p = profile ?? defaults;
  const parts = p.name.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.13 } } }}
        className="relative z-10 max-w-3xl"
      >
        <motion.p variants={item} className="text-violet-400 font-medium mb-4 tracking-widest uppercase text-sm">
          Bonjour, je suis
        </motion.p>

        <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          {firstName}{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            {lastName}
          </span>
        </motion.h1>

        <motion.p variants={item} className="text-xl md:text-2xl text-gray-400 mb-8 font-light">
          {p.title}
        </motion.p>

        <motion.p variants={item} className="text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
          {p.tagline}
        </motion.p>

        <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#projects"
            className="px-8 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl font-medium transition-colors"
          >
            Voir mes projets
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-gray-700 hover:border-gray-500 rounded-xl font-medium text-gray-300 hover:text-white transition-colors"
          >
            Me contacter
          </a>
        </motion.div>

        <motion.div variants={item} className="flex gap-6 justify-center">
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Github size={22} />
            </a>
          )}
          {p.linkedinUrl && (
            <a
              href={p.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Linkedin size={22} />
            </a>
          )}
          {p.email && (
            <a
              href={`mailto:${p.email}`}
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Mail size={22} />
            </a>
          )}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-gray-400 animate-bounce"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
