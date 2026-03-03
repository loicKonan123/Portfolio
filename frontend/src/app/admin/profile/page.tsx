"use client";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "@/lib/api";
import { SiteProfile } from "@/types";

export default function ProfilePage() {
  const [form, setForm] = useState<Omit<SiteProfile, "id">>({
    name: "",
    title: "",
    tagline: "",
    bio1: "",
    bio2: "",
    githubUrl: "",
    linkedinUrl: "",
    email: "",
    mobileHighlight: "",
    backendHighlight: "",
    webHighlight: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then((p) => {
        if (p) {
          const { id: _id, ...rest } = p;
          setForm(rest);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const set = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await updateProfile(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("Erreur lors de la sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-400">Chargement…</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Profil public</h1>
      <p className="text-gray-500 text-sm mb-8">
        Ces informations s&apos;affichent dans les sections Hero et À propos du site.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identité */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-violet-400 mb-2">Identité</h2>

          <Field label="Nom complet" value={form.name} onChange={set("name")} />
          <Field label="Titre (sous le nom)" value={form.title} onChange={set("title")} />
          <Field
            label="Tagline (accroche)"
            value={form.tagline}
            onChange={set("tagline")}
            textarea
          />
        </section>

        {/* Bio */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-violet-400 mb-2">Biographie</h2>
          <Field
            label="Paragraphe 1"
            value={form.bio1}
            onChange={set("bio1")}
            textarea
            rows={4}
          />
          <Field
            label="Paragraphe 2"
            value={form.bio2}
            onChange={set("bio2")}
            textarea
            rows={3}
          />
        </section>

        {/* Liens sociaux */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-violet-400 mb-2">Liens sociaux</h2>
          <Field label="GitHub URL" value={form.githubUrl} onChange={set("githubUrl")} />
          <Field label="LinkedIn URL" value={form.linkedinUrl} onChange={set("linkedinUrl")} />
          <Field label="Email" value={form.email} onChange={set("email")} type="email" />
        </section>

        {/* Highlights */}
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-violet-400 mb-2">Cartes « À propos »</h2>
          <Field
            label="Mobile (description)"
            value={form.mobileHighlight}
            onChange={set("mobileHighlight")}
          />
          <Field
            label="Backend (description)"
            value={form.backendHighlight}
            onChange={set("backendHighlight")}
          />
          <Field
            label="Web (description)"
            value={form.webHighlight}
            onChange={set("webHighlight")}
          />
        </section>

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && (
          <p className="text-green-400 text-sm">Profil mis à jour avec succès !</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg font-medium transition-colors"
        >
          {saving ? "Sauvegarde…" : "Enregistrer"}
        </button>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  rows?: number;
  type?: string;
}

function Field({ label, value, onChange, textarea, rows = 2, type = "text" }: FieldProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
        />
      )}
    </div>
  );
}
