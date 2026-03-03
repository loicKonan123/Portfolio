"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, deleteProject } from "@/lib/api";
import { Project } from "@/types";
import { Plus, Pencil, Trash2, Github, ExternalLink } from "lucide-react";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const load = () => getProjects().then(setProjects);
  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await deleteProject(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Projets</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Ajouter
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{p.title}</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {p.techStack.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white">
                  <Github size={16} />
                </a>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white">
                  <ExternalLink size={16} />
                </a>
              )}
              <Link
                href={`/admin/projects/${p.id}`}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Pencil size={15} />
              </Link>
              <button
                onClick={() => handleDelete(p.id)}
                className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
