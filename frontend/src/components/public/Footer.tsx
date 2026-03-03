"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="border-t border-gray-800 py-10 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Loïc Devalin. Tous droits réservés.
        </span>
        <div className="flex gap-5">
          <a
            href="https://github.com/devalinloic"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-white transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href="https://linkedin.com/in/devalinloic"
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-white transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="mailto:devalinloic@gmail.com"
            className="text-gray-600 hover:text-white transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
