"use client";
import { motion, Variants } from "framer-motion";
import { Code2, Smartphone, Globe } from "lucide-react";
import { SiteProfile } from "@/types";

interface Props {
  profile: SiteProfile | null;
}

const defaults = {
  bio1: "Développeur full-stack passionné par la création d'applications qui allient performance, maintenabilité et expérience utilisateur. Je travaille aussi bien côté mobile avec Flutter que côté web avec Next.js, et j'applique les principes de Clean Architecture sur mes backends ASP.NET Core.",
  bio2: "Mon objectif : livrer des produits robustes et évolutifs, qu'il s'agisse d'un MVP ou d'une application à grande échelle.",
  mobileHighlight: "Applications iOS & Android avec Flutter — UI fluide, performances natives.",
  backendHighlight: "API REST scalables avec ASP.NET Core, Clean Architecture et CQRS.",
  webHighlight: "Sites et applications modernes avec Next.js, React et Tailwind CSS.",
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AboutSection({ profile }: Props) {
  const p = profile ?? defaults;

  const highlights = [
    { icon: <Smartphone size={20} className="text-violet-400" />, title: "Mobile", desc: p.mobileHighlight },
    { icon: <Code2 size={20} className="text-violet-400" />, title: "Backend", desc: p.backendHighlight },
    { icon: <Globe size={20} className="text-violet-400" />, title: "Web", desc: p.webHighlight },
  ];

  return (
    <section id="about" className="pt-10 pb-24 px-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-violet-400 uppercase tracking-widest text-sm font-medium mb-2">
          À propos
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Qui suis-je ?</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 leading-relaxed mb-6">{p.bio1}</p>
            <p className="text-gray-400 leading-relaxed mb-8">{p.bio2}</p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium transition-colors"
            >
              Travaillons ensemble →
            </a>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {highlights.map((h) => (
              <motion.div
                key={h.title}
                variants={cardItem}
                whileHover={{ x: 4 }}
                className="flex gap-4 p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-violet-800/50 transition-colors cursor-default"
              >
                <div className="mt-0.5 shrink-0">{h.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1">{h.title}</h3>
                  <p className="text-sm text-gray-500">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
