"use client";
import { motion } from "framer-motion";
import { Smartphone, Server, Globe, Lightbulb, LucideIcon } from "lucide-react";
import { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Server,
  Globe,
  Lightbulb,
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] ?? Globe;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="group p-6 bg-gray-900 border border-gray-800 rounded-2xl hover:border-violet-700/60 hover:bg-gray-900/80 transition-all"
    >
      <div className="w-12 h-12 bg-violet-600/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-violet-600/20 transition-colors">
        <Icon size={22} className="text-violet-400" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
      <p className="text-violet-400 font-medium text-sm">{service.price}</p>
    </motion.div>
  );
}

export default function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section id="services" className="py-24 px-6 bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-violet-400 uppercase tracking-widest text-sm font-medium mb-2">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold">Ce que je propose</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
