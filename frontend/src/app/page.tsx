import { getProjects, getServices, getSkills, getProfile } from "@/lib/api";

export const dynamic = "force-dynamic"; // toujours fetch frais, jamais de cache
import Navbar from "@/components/public/Navbar";
import HeroSection from "@/components/public/HeroSection";
import AboutSection from "@/components/public/AboutSection";
import ServicesSection from "@/components/public/ServicesSection";
import ProjectsSection from "@/components/public/ProjectsSection";
import SkillsSection from "@/components/public/SkillsSection";
import ContactSection from "@/components/public/ContactSection";
import Footer from "@/components/public/Footer";

export default async function HomePage() {
  const [projects, services, skills, profile] = await Promise.all([
    getProjects().catch(() => []),
    getServices().catch(() => []),
    getSkills().catch(() => []),
    getProfile().catch(() => null),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <ServicesSection services={services} />
        <ProjectsSection projects={projects} />
        <SkillsSection skills={skills} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
