"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjects } from "@/lib/api";
import { Project } from "@/types";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    getProjects().then((projects) => {
      setProject(projects.find((p) => p.id === id) ?? null);
    });
  }, [id]);

  if (!project) return <p className="text-gray-500">Chargement...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Modifier — {project.title}</h1>
      <ProjectForm initial={project} />
    </div>
  );
}
