import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loïc Devalin — Développeur Full-Stack",
  description:
    "Portfolio de Loïc Devalin, développeur full-stack spécialisé Flutter, ASP.NET Core et Next.js.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>{children}</body>
    </html>
  );
}
