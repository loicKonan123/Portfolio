"use client";
import { useEffect, useState } from "react";
import { getMessages, markMessageRead, deleteMessage } from "@/lib/api";
import { Message } from "@/types";
import { MailOpen, Trash2, Mail } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);

  const load = () => getMessages().then(setMessages);
  useEffect(() => { load(); }, []);

  const openMessage = async (m: Message) => {
    setSelected(m);
    if (!m.isRead) {
      await markMessageRead(m.id);
      load();
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce message ?")) return;
    await deleteMessage(id);
    if (selected?.id === id) setSelected(null);
    load();
  };

  const unread = messages.filter((m) => !m.isRead).length;

  return (
    <div className="flex gap-6 h-[calc(100vh-4rem)]">
      {/* List */}
      <div className="w-80 shrink-0 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Messages</h1>
          {unread > 0 && (
            <span className="px-2 py-0.5 bg-violet-600 text-xs rounded-full">{unread} non lus</span>
          )}
        </div>
        <div className="flex flex-col gap-2 overflow-y-auto flex-1">
          {messages.map((m) => (
            <button
              key={m.id}
              onClick={() => openMessage(m)}
              className={`text-left p-3 rounded-xl border transition-colors ${
                selected?.id === m.id
                  ? "bg-violet-600/20 border-violet-700/50"
                  : m.isRead
                  ? "bg-gray-900 border-gray-800 hover:border-gray-700"
                  : "bg-gray-900 border-violet-900/40 hover:border-violet-800/60"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {m.isRead ? (
                  <MailOpen size={14} className="text-gray-500 shrink-0" />
                ) : (
                  <Mail size={14} className="text-violet-400 shrink-0" />
                )}
                <span className={`text-sm font-medium truncate ${!m.isRead ? "text-white" : "text-gray-300"}`}>
                  {m.name}
                </span>
              </div>
              <p className="text-xs text-gray-500 truncate">{m.subject}</p>
              <p className="text-xs text-gray-600 mt-0.5">
                {new Date(m.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Detail */}
      <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {selected ? (
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-800 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-lg mb-1">{selected.subject}</h2>
                <p className="text-sm text-gray-400">
                  De <span className="text-gray-200">{selected.name}</span> ({selected.email}) ·{" "}
                  {new Date(selected.createdAt).toLocaleString("fr-FR")}
                </p>
              </div>
              <button
                onClick={() => remove(selected.id)}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selected.body}</p>
            </div>
            <div className="p-4 border-t border-gray-800">
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-medium transition-colors"
              >
                <Mail size={15} /> Répondre par email
              </a>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-600">
            <div className="text-center">
              <MailOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Sélectionnez un message</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
