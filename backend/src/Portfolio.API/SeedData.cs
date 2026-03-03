using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Common.Interfaces;
using Portfolio.Domain.Entities;
using Portfolio.Infrastructure.Persistence;
using System.Text.Json;

namespace Portfolio.API;

public static class SeedData
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        using var scope = services.CreateScope();
        var ctx = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();
        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();

        await ctx.Database.MigrateAsync();

        // Admin user
        var adminEmail = config["AdminEmail"] ?? "devalinloic@gmail.com";
        var adminPassword = config["AdminPassword"] ?? "Admin123!";

        if (!await ctx.AdminUsers.AnyAsync())
        {
            ctx.AdminUsers.Add(AdminUser.Create(adminEmail, hasher.Hash(adminPassword)));
        }

        // Projects
        if (!await ctx.Projects.AnyAsync())
        {
            var projects = new[]
            {
                Project.Create(
                    "Booqly",
                    "Application mobile de réservation de rendez-vous entre clients et professionnels. Gestion complète des disponibilités, notifications push et paiements intégrés.",
                    JsonSerializer.Serialize(new[] { "Flutter", "Dart", "ASP.NET Core", "SQL Server", "Clean Architecture" }),
                    null,
                    "https://github.com/devalinloic/booqly",
                    featured: true,
                    displayOrder: 1),

                Project.Create(
                    "Portfolio",
                    "Portfolio développeur full-stack avec dashboard admin. Site one-page animé avec gestion de contenu (projets, services, compétences) via une API REST sécurisée.",
                    JsonSerializer.Serialize(new[] { "Next.js 14", "TypeScript", "Tailwind CSS", "ASP.NET Core", "EF Core" }),
                    null,
                    "https://github.com/devalinloic/portfolio",
                    featured: true,
                    displayOrder: 2),

                Project.Create(
                    "FleetTrack",
                    "Système de gestion de flotte automobile en temps réel. Suivi GPS des véhicules, alertes de maintenance, rapports d'utilisation et gestion des conducteurs.",
                    JsonSerializer.Serialize(new[] { "React", "Node.js", "PostgreSQL", "Socket.io", "Docker" }),
                    null,
                    null,
                    featured: true,
                    displayOrder: 3),
            };

            ctx.Projects.AddRange(projects);
        }

        // Services
        if (!await ctx.Services.AnyAsync())
        {
            var svcList = new[]
            {
                Domain.Entities.Service.Create(
                    "Application Mobile",
                    "Développement d'applications iOS et Android avec Flutter. UI soignée, performances optimales et expérience utilisateur fluide.",
                    "À partir de 3 000$",
                    "Smartphone",
                    featured: true,
                    displayOrder: 1),

                Domain.Entities.Service.Create(
                    "API & Backend",
                    "Architecture propre (Clean Architecture + CQRS) avec ASP.NET Core. API REST sécurisée, scalable et bien documentée via Swagger.",
                    "À partir de 2 000$",
                    "Server",
                    featured: true,
                    displayOrder: 2),

                Domain.Entities.Service.Create(
                    "Application Web",
                    "Sites et applications web modernes avec Next.js et React. SSR, performances optimisées et design responsive mobile-first.",
                    "À partir de 2 500$",
                    "Globe",
                    featured: true,
                    displayOrder: 3),

                Domain.Entities.Service.Create(
                    "Consultation Tech",
                    "Audit de code, choix d'architecture, revue de performance et conseils sur la stack technique pour vos projets.",
                    "150$/heure",
                    "Lightbulb",
                    featured: false,
                    displayOrder: 4),
            };

            ctx.Services.AddRange(svcList);
        }

        // Skills
        if (!await ctx.Skills.AnyAsync())
        {
            var skills = new[]
            {
                // Mobile
                Skill.Create("Flutter", "mobile", 92),
                Skill.Create("Dart", "mobile", 90),
                // Frontend
                Skill.Create("Next.js", "frontend", 85),
                Skill.Create("React", "frontend", 83),
                Skill.Create("TypeScript", "frontend", 80),
                Skill.Create("Tailwind CSS", "frontend", 88),
                // Backend
                Skill.Create("ASP.NET Core", "backend", 88),
                Skill.Create("C#", "backend", 87),
                Skill.Create("SQL Server", "backend", 82),
                Skill.Create("EF Core", "backend", 85),
                Skill.Create("Node.js", "backend", 72),
                // Tools
                Skill.Create("Git", "tools", 90),
                Skill.Create("Docker", "tools", 70),
                Skill.Create("Azure", "tools", 65),
            };

            ctx.Skills.AddRange(skills);
        }

        // Site Profile
        if (!await ctx.SiteProfiles.AnyAsync())
        {
            ctx.SiteProfiles.Add(SiteProfile.Create(
                name: "Loïc Devalin",
                title: "Développeur Full-Stack · Flutter · ASP.NET Core · Next.js",
                tagline: "Je conçois des applications mobiles et web performantes, avec une architecture propre et une expérience utilisateur soignée.",
                bio1: "Développeur full-stack passionné par la création d'applications qui allient performance, maintenabilité et expérience utilisateur. Je travaille aussi bien côté mobile avec Flutter que côté web avec Next.js, et j'applique les principes de Clean Architecture sur mes backends ASP.NET Core.",
                bio2: "Mon objectif : livrer des produits robustes et évolutifs, qu'il s'agisse d'un MVP ou d'une application à grande échelle.",
                githubUrl: "https://github.com/loicKonan123",
                linkedinUrl: "https://linkedin.com/in/devalinloic",
                email: "devalinloic@gmail.com",
                mobileHighlight: "Applications iOS & Android avec Flutter — UI fluide, performances natives.",
                backendHighlight: "API REST scalables avec ASP.NET Core, Clean Architecture et CQRS.",
                webHighlight: "Sites et applications modernes avec Next.js, React et Tailwind CSS."));
        }

        await ctx.SaveChangesAsync();
    }
}
