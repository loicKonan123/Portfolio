"use client";
import { useEffect, useState } from "react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/lib/api";
import { Skill } from "@/types";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

const CATEGORIES = ["frontend", "backend", "mobile", "tools"] as const;

const empty: Omit<Skill, "id"> = {
  name: "",
  category: "frontend",
  level: 80,
  iconUrl: null,
};

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Skill, "id">>(empty);

  const load = () => getSkills().then(setSkills);
  useEffect(() => { load(); }, []);

  const startCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const startEdit = (s: Skill) => { setForm({ name: s.name, category: s.category, level: s.level, iconUrl: s.iconUrl }); setEditing(s); setCreating(false); };
  const cancel = () => { setCreating(false); setEditing(null); };

  const save = async () => {
    if (editing) { await updateSkill(editing.id, { ...form, id: editing.id }); }
    else { await createSkill(form); }
    cancel();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await deleteSkill(id);
    load();
  };

  const grouped = CATEGORIES.map((cat) => ({
    cat,
    skills: skills.filter((s) => s.category === cat),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Compétences</h1>
        <button onClick={startCreate} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-medium transition-colors">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {(creating || editing) && (
        <div className="mb-6 p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h2 className="font-semibold mb-4">{editing ? "Modifier" : "Nouvelle compétence"}</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Nom</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-600" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Catégorie</label>
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Skill["category"] }))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-600">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Niveau — {form.level}%</label>
              <input type="range" min={0} max={100} value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: Number(e.target.value) }))} className="w-full accent-violet-600" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm"><Check size={14} /> Enregistrer</button>
            <button onClick={cancel} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"><X size={14} /> Annuler</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        {grouped.map(({ cat, skills: catSkills }) => catSkills.length === 0 ? null : (
          <div key={cat}>
            <h3 className="font-semibold text-gray-400 text-sm uppercase tracking-wider mb-3">{cat}</h3>
            <div className="flex flex-col gap-2">
              {catSkills.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-800 rounded-xl">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{s.name}</span>
                      <span className="text-gray-500">{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(s)} className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg"><Pencil size={13} /></button>
                    <button onClick={() => remove(s.id)} className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg"><Trash2 size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
