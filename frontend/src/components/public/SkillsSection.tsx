"use client";
import { motion } from "framer-motion";
import { Skill } from "@/types";

const categoryLabels: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  mobile: "Mobile",
  tools: "Outils",
};

const categoryColors: Record<string, string> = {
  frontend: "bg-blue-500",
  backend: "bg-emerald-500",
  mobile: "bg-violet-500",
  tools: "bg-orange-500",
};

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const color = categoryColors[skill.category] ?? "bg-violet-500";
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-300 font-medium">{skill.name}</span>
        <span className="text-gray-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = ["mobile", "frontend", "backend", "tools"];
  const grouped = categories.map((cat) => ({
    cat,
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="py-24 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-violet-400 uppercase tracking-widest text-sm font-medium mb-2">
            Compétences
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Stack technique</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-10">
          {grouped.map(({ cat, skills: catSkills }) =>
            catSkills.length === 0 ? null : (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-semibold text-lg mb-5 text-gray-300">
                  {categoryLabels[cat]}
                </h3>
                <div className="flex flex-col gap-4">
                  {catSkills.map((skill, i) => (
                    <SkillBar key={skill.id} skill={skill} delay={i * 0.05} />
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
