import { Project, Service, Skill, Message, SiteProfile } from "@/types";
import Cookies from "js-cookie";

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001/api";

function authHeaders(): HeadersInit {
  const token = Cookies.get("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...authHeaders(), ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message ?? "Request failed");
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

// --- Auth ---
export const login = (email: string, password: string) =>
  request<{ token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

// --- Projects ---
export const getProjects = () => request<Project[]>("/projects");
export const getFeaturedProjects = () => request<Project[]>("/projects/featured");
export const createProject = (data: Omit<Project, "id" | "imageUrl" | "createdAt">) =>
  request<Project>("/projects", { method: "POST", body: JSON.stringify(data) });
export const updateProject = (id: string, data: Omit<Project, "imageUrl" | "createdAt">) =>
  request<Project>(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteProject = (id: string) =>
  request<void>(`/projects/${id}`, { method: "DELETE" });
export const uploadProjectImage = async (id: string, file: File): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append("file", file);
  const token = Cookies.get("token");
  const res = await fetch(`${BASE}/projects/${id}/image`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  return res.json();
};

// --- Services ---
export const getServices = () => request<Service[]>("/services");
export const createService = (data: Omit<Service, "id">) =>
  request<Service>("/services", { method: "POST", body: JSON.stringify(data) });
export const updateService = (id: string, data: Service) =>
  request<Service>(`/services/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteService = (id: string) =>
  request<void>(`/services/${id}`, { method: "DELETE" });

// --- Skills ---
export const getSkills = () => request<Skill[]>("/skills");
export const createSkill = (data: Omit<Skill, "id">) =>
  request<Skill>("/skills", { method: "POST", body: JSON.stringify(data) });
export const updateSkill = (id: string, data: Skill) =>
  request<Skill>(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteSkill = (id: string) =>
  request<void>(`/skills/${id}`, { method: "DELETE" });

// --- Profile ---
export const getProfile = () => request<SiteProfile>("/profile");
export const updateProfile = (data: Omit<SiteProfile, "id">) =>
  request<SiteProfile>("/profile", { method: "PUT", body: JSON.stringify(data) });

// --- Messages ---
export const getMessages = () => request<Message[]>("/messages");
export const sendMessage = (data: { name: string; email: string; subject: string; body: string }) =>
  request<Message>("/messages", { method: "POST", body: JSON.stringify(data) });
export const markMessageRead = (id: string) =>
  request<void>(`/messages/${id}/read`, { method: "PUT" });
export const deleteMessage = (id: string) =>
  request<void>(`/messages/${id}`, { method: "DELETE" });
