"use client";
import { useEffect, useState } from "react";
import { getProjects, getServices, getSkills, getMessages } from "@/lib/api";
import { FolderKanban, Briefcase, Wrench, MessageSquare } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, services: 0, skills: 0, unread: 0 });

  useEffect(() => {
    Promise.all([getProjects(), getServices(), getSkills(), getMessages()]).then(
      ([projects, services, skills, messages]) => {
        setStats({
          projects: projects.length,
          services: services.length,
          skills: skills.length,
          unread: messages.filter((m) => !m.isRead).length,
        });
      }
    );
  }, []);

  const cards = [
    { label: "Projets", value: stats.projects, icon: FolderKanban, color: "text-violet-400" },
    { label: "Services", value: stats.services, icon: Briefcase, color: "text-blue-400" },
    { label: "Compétences", value: stats.skills, icon: Wrench, color: "text-emerald-400" },
    { label: "Messages non lus", value: stats.unread, icon: MessageSquare, color: "text-orange-400" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
              <Icon size={22} className={color} />
            </div>
            <div>
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
