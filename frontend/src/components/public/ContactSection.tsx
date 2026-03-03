"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { sendMessage } from "@/lib/api";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await sendMessage(form);
      setSent(true);
      setForm({ name: "", email: "", subject: "", body: "" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-violet-400 uppercase tracking-widest text-sm font-medium mb-2">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Parlons de votre projet</h2>
          <p className="text-gray-500">
            Une idée ? Un projet ? Envoyez-moi un message et je vous répondrai sous 24h.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-16 text-center"
          >
            <CheckCircle size={48} className="text-emerald-400" />
            <h3 className="text-xl font-semibold">Message envoyé !</h3>
            <p className="text-gray-500">Je vous répondrai dans les plus brefs délais.</p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-violet-400 hover:text-violet-300 mt-2"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              className="grid sm:grid-cols-2 gap-5"
            >
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Nom</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors"
                  placeholder=""
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors"
                  placeholder=""
                />
              </div>
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <label className="block text-sm text-gray-400 mb-1.5">Sujet</label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors"
                placeholder=""
              />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <label className="block text-sm text-gray-400 mb-1.5">Message</label>
              <textarea
                required
                rows={5}
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 transition-colors resize-none"
                placeholder="Décrivez votre projet..."
              />
            </motion.div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <motion.button
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-xl font-medium transition-colors"
            >
              <Send size={16} />
              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </motion.button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
