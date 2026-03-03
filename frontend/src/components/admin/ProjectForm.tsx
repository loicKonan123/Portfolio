"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject, updateProject, uploadProjectImage } from "@/lib/api";
import { Project } from "@/types";

interface Props {
  initial?: Project;
}

const emptyForm = {
  title: "",
  description: "",
  techStack: [] as string[],
  liveUrl: "",
  githubUrl: "",
  featured: false,
  displayOrder: 0,
};

export default function ProjectForm({ initial }: Props) {
  const router = useRouter();
  const [form, setForm] = useState(
    initial
      ? {
          title: initial.title,
          description: initial.description,
          techStack: initial.techStack,
          liveUrl: initial.liveUrl ?? "",
          githubUrl: initial.githubUrl ?? "",
          featured: initial.featured,
          displayOrder: initial.displayOrder,
        }
      : emptyForm
  );
  const [techInput, setTechInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addTech = () => {
    const t = techInput.trim();
    if (t && !form.techStack.includes(t)) {
      setForm((f) => ({ ...f, techStack: [...f.techStack, t] }));
    }
    setTechInput("");
  };

  const removeTech = (t: string) =>
    setForm((f) => ({ ...f, techStack: f.techStack.filter((x) => x !== t) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        liveUrl: form.liveUrl || null,
        githubUrl: form.githubUrl || null,
      };
      if (initial) {
        await updateProject(initial.id, { id: initial.id, ...payload } as Project);
        if (imageFile) await uploadProjectImage(initial.id, imageFile);
      } else {
        const created = await createProject(payload as Omit<Project, "id" | "imageUrl" | "createdAt">);
        if (imageFile) await uploadProjectImage(created.id, imageFile);
      }
      router.push("/admin/projects");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl flex flex-col gap-5">
      <div>
        <label className="block text-sm text-gray-400 mb-1.5">Titre</label>
        <input
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1.5">Description</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1.5">Stack technique</label>
        <div className="flex gap-2 mb-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
            className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-violet-600"
            placeholder="Ex: Flutter (Entrée pour ajouter)"
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm"
          >
            Ajouter
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.techStack.map((t) => (
            <span
              key={t}
              className="flex items-center gap-1.5 text-xs bg-violet-900/30 text-violet-300 border border-violet-800/30 px-2.5 py-1 rounded-full"
            >
              {t}
              <button type="button" onClick={() => removeTech(t)} className="hover:text-red-400">
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">URL GitHub</label>
          <input
            value={form.githubUrl}
            onChange={(e) => setForm((f) => ({ ...f, githubUrl: e.target.value }))}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
            placeholder="https://github.com/..."
          />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">URL Live</label>
          <input
            value={form.liveUrl}
            onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
            placeholder="https://monprojet.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Ordre d&apos;affichage</label>
          <input
            type="number"
            value={form.displayOrder}
            onChange={(e) => setForm((f) => ({ ...f, displayOrder: Number(e.target.value) }))}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-600"
          />
        </div>
        <div className="flex items-end pb-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 accent-violet-600"
            />
            <span className="text-sm text-gray-400">Projet mis en avant</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1.5">Image du projet</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
          className="text-sm text-gray-400 file:mr-3 file:px-3 file:py-1.5 file:bg-gray-800 file:border-0 file:rounded-lg file:text-sm file:text-gray-300 file:cursor-pointer"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-xl text-sm font-medium transition-colors"
        >
          {loading ? "Enregistrement..." : initial ? "Mettre à jour" : "Créer le projet"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
