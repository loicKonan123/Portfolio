"use client";
import { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "@/lib/api";
import { Service } from "@/types";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

const ICONS = ["Smartphone", "Server", "Globe", "Lightbulb", "Code", "Database"];

const empty: Omit<Service, "id"> = {
  title: "",
  description: "",
  price: "",
  icon: "Globe",
  featured: false,
  displayOrder: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState<Omit<Service, "id">>(empty);

  const load = () => getServices().then(setServices);
  useEffect(() => { load(); }, []);

  const startCreate = () => { setForm(empty); setCreating(true); setEditing(null); };
  const startEdit = (s: Service) => { setForm({ title: s.title, description: s.description, price: s.price, icon: s.icon, featured: s.featured, displayOrder: s.displayOrder }); setEditing(s); setCreating(false); };
  const cancel = () => { setCreating(false); setEditing(null); };

  const save = async () => {
    if (editing) { await updateService(editing.id, { ...form, id: editing.id }); }
    else { await createService(form); }
    cancel();
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await deleteService(id);
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Services</h1>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {(creating || editing) && (
        <div className="mb-6 p-6 bg-gray-900 border border-gray-800 rounded-2xl">
          <h2 className="font-semibold mb-4">{editing ? "Modifier" : "Nouveau service"}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Titre</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-600" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Prix</label>
              <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-600" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs text-gray-400 mb-1 block">Description</label>
              <textarea rows={3} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-600 resize-none" />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Icône</label>
              <select value={form.icon} onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-600">
                {ICONS.map((i) => <option key={i}>{i}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">Ordre</label>
              <input type="number" value={form.displayOrder} onChange={(e) => setForm((f) => ({ ...f, displayOrder: Number(e.target.value) }))} className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-600" />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={save} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm"><Check size={14} /> Enregistrer</button>
            <button onClick={cancel} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm"><X size={14} /> Annuler</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {services.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-4 bg-gray-900 border border-gray-800 rounded-xl">
            <div>
              <p className="font-medium">{s.title}</p>
              <p className="text-sm text-gray-500">{s.price}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg"><Pencil size={15} /></button>
              <button onClick={() => remove(s.id)} className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
