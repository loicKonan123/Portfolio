# Portfolio — Plan de création complet

## Stack technique

| Couche | Technologie |
|---|---|
| Frontend public + admin | Next.js 14 (App Router) + Tailwind CSS |
| Backend API | ASP.NET Core 8 — Clean Architecture |
| Base de données | SQL Server (LocalDB en dev, Azure SQL en prod) |
| Auth admin | JWT (même pattern que Booqly) |
| Déploiement frontend | Vercel (gratuit) |
| Déploiement backend | Railway / Azure App Service |
| Stockage images | Cloudinary (gratuit jusqu'à 25GB) |

---

## Architecture du projet

```
portfolio/
├── frontend/                  ← Next.js 14
│   ├── app/
│   │   ├── (public)/          ← site public
│   │   │   └── page.tsx       ← page d'accueil (toutes les sections)
│   │   └── admin/             ← dashboard admin (protégé)
│   │       ├── login/
│   │       ├── projects/
│   │       ├── services/
│   │       ├── skills/
│   │       └── messages/
│   ├── components/
│   │   ├── public/            ← sections du portfolio
│   │   └── admin/             ← composants du dashboard
│   └── lib/
│       └── api.ts             ← client API
│
└── backend/
    └── src/
        ├── Portfolio.Domain/          ← Entités, interfaces, value objects
        ├── Portfolio.Application/     ← CQRS, DTOs, services
        ├── Portfolio.Infrastructure/  ← EF Core, JWT, Email, Cloudinary
        └── Portfolio.API/             ← Controllers, Middleware, Program.cs
```

---

## Backend — Clean Architecture

### Domain (Portfolio.Domain)

```
Entities/
├── Project.cs       ← id, title, description, imageUrl, techStack[], liveUrl, githubUrl, featured, order
├── Service.cs       ← id, title, description, price, icon, featured, order
├── Skill.cs         ← id, name, category (frontend/backend/mobile/tools), level (1-100), iconUrl
├── Message.cs       ← id, name, email, subject, body, isRead, createdAt
└── AdminUser.cs     ← id, email, passwordHash

Interfaces/
├── IProjectRepository.cs
├── IServiceRepository.cs
├── ISkillRepository.cs
├── IMessageRepository.cs
└── IFileStorageService.cs
```

### Application (Portfolio.Application)

```
Features/
├── Projects/
│   ├── Queries/
│   │   ├── GetAllProjects/     GetAllProjectsQuery + Handler
│   │   └── GetProjectById/     GetProjectByIdQuery + Handler
│   └── Commands/
│       ├── CreateProject/      CreateProjectCommand + Handler + Validator
│       ├── UpdateProject/      UpdateProjectCommand + Handler + Validator
│       └── DeleteProject/      DeleteProjectCommand + Handler
├── Services/           (même pattern)
├── Skills/             (même pattern)
├── Messages/
│   ├── Commands/SendMessage/
│   └── Queries/GetAllMessages/
└── Auth/
    └── Commands/Login/         LoginCommand + Handler → retourne JWT

DTOs/
├── ProjectDto.cs
├── ServiceDto.cs
├── SkillDto.cs
└── MessageDto.cs
```

### Infrastructure (Portfolio.Infrastructure)

```
Persistence/
├── PortfolioDbContext.cs
└── Repositories/
    ├── ProjectRepository.cs
    ├── ServiceRepository.cs
    └── ...

Services/
├── JwtService.cs              ← génère les tokens
├── CloudinaryService.cs       ← upload images
└── EmailService.cs            ← SMTP pour les messages de contact

Migrations/                    ← EF Core migrations
```

### API (Portfolio.API)

```
Controllers/
├── ProjectsController.cs      ← GET public + POST/PUT/DELETE admin
├── ServicesController.cs
├── SkillsController.cs
├── MessagesController.cs      ← POST public (contact) + GET admin
└── AuthController.cs          ← POST /login

Middleware/
└── AdminAuthMiddleware.cs     ← vérifie le JWT sur les routes admin
```

---

## Endpoints API

### Public (sans auth)

| Méthode | Route | Description |
|---|---|---|
| GET | /api/projects | Tous les projets (triés par order) |
| GET | /api/projects/featured | Projets mis en avant |
| GET | /api/services | Tous les services |
| GET | /api/skills | Toutes les compétences |
| POST | /api/messages | Envoyer un message de contact |

### Admin (JWT requis)

| Méthode | Route | Description |
|---|---|---|
| POST | /api/auth/login | Connexion admin |
| POST | /api/projects | Créer un projet |
| PUT | /api/projects/:id | Modifier un projet |
| DELETE | /api/projects/:id | Supprimer un projet |
| POST | /api/projects/:id/image | Upload image (Cloudinary) |
| POST | /api/services | Créer un service |
| PUT | /api/services/:id | Modifier |
| DELETE | /api/services/:id | Supprimer |
| POST | /api/skills | Créer une compétence |
| PUT | /api/skills/:id | Modifier |
| DELETE | /api/skills/:id | Supprimer |
| GET | /api/messages | Tous les messages reçus |
| PUT | /api/messages/:id/read | Marquer comme lu |
| DELETE | /api/messages/:id | Supprimer |

---

## Frontend — Next.js 14

### Page publique (one-page scroll)

```
/ (page.tsx)
├── <Navbar />              ← fixe, liens ancres, toggle dark/light
├── <HeroSection />         ← nom, titre, tagline, CTA, avatar
├── <AboutSection />        ← bio, photo, ce que tu fais
├── <ServicesSection />     ← cards des services (depuis API)
├── <ProjectsSection />     ← grid des projets (depuis API)
├── <SkillsSection />       ← barres de progression par catégorie
├── <ContactSection />      ← formulaire → POST /api/messages
└── <Footer />              ← liens sociaux
```

### Dashboard Admin (/admin)

```
/admin/login              ← formulaire email/password → JWT stocké en cookie
/admin/dashboard          ← stats : nb projets, services, messages non lus
/admin/projects           ← liste + boutons Ajouter / Modifier / Supprimer
/admin/projects/new       ← formulaire création projet + upload image
/admin/projects/[id]      ← formulaire modification
/admin/services           ← CRUD services
/admin/skills             ← CRUD compétences
/admin/messages           ← liste des messages de contact (lire / supprimer)
```

### Composants clés

```
components/
├── public/
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── ProjectCard.tsx        ← image, titre, stack, liens GitHub/demo
│   ├── ServiceCard.tsx
│   ├── SkillBar.tsx
│   └── ContactForm.tsx
└── admin/
    ├── AdminLayout.tsx        ← sidebar + header
    ├── ProjectForm.tsx        ← création / modification projet
    ├── ImageUploader.tsx      ← drag & drop → Cloudinary
    ├── DataTable.tsx          ← tableau générique avec actions
    └── StatsCard.tsx
```

---

## Base de données — Schéma SQL

```sql
Projects
  id           UNIQUEIDENTIFIER  PRIMARY KEY
  title        NVARCHAR(100)
  description  NVARCHAR(1000)
  imageUrl     NVARCHAR(500)
  techStack    NVARCHAR(500)     -- JSON array ex: ["Flutter","Dart",".NET"]
  liveUrl      NVARCHAR(200)
  githubUrl    NVARCHAR(200)
  featured     BIT DEFAULT 0
  displayOrder INT DEFAULT 0
  createdAt    DATETIME2

Services
  id           UNIQUEIDENTIFIER  PRIMARY KEY
  title        NVARCHAR(100)
  description  NVARCHAR(500)
  price        NVARCHAR(50)      -- ex: "À partir de 2 500$"
  icon         NVARCHAR(50)      -- nom d'icône Lucide
  featured     BIT DEFAULT 0
  displayOrder INT DEFAULT 0

Skills
  id           UNIQUEIDENTIFIER  PRIMARY KEY
  name         NVARCHAR(50)
  category     NVARCHAR(50)      -- frontend | backend | mobile | tools
  level        INT               -- 0-100
  iconUrl      NVARCHAR(200)

Messages
  id           UNIQUEIDENTIFIER  PRIMARY KEY
  name         NVARCHAR(100)
  email        NVARCHAR(200)
  subject      NVARCHAR(200)
  body         NVARCHAR(2000)
  isRead       BIT DEFAULT 0
  createdAt    DATETIME2

AdminUsers
  id           UNIQUEIDENTIFIER  PRIMARY KEY
  email        NVARCHAR(200)     UNIQUE
  passwordHash NVARCHAR(500)
```

---

## Variables d'environnement

### Backend (appsettings.json)
```json
{
  "ConnectionStrings": { "Default": "..." },
  "Jwt": { "Secret": "...", "Issuer": "Portfolio", "ExpiryMinutes": "1440" },
  "Cloudinary": { "CloudName": "...", "ApiKey": "...", "ApiSecret": "..." },
  "Smtp": { "Host": "smtp.gmail.com", "Port": 587, "Username": "...", "Password": "..." }
}
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## Ordre de développement

### Phase 1 — Backend (3-4h)
- [ ] Créer la solution .NET avec les 4 projets (Domain, Application, Infrastructure, API)
- [ ] Définir les entités Domain
- [ ] Configurer EF Core + migrations initiales
- [ ] Implémenter les repositories (Infrastructure)
- [ ] Implémenter les handlers CQRS (Application)
- [ ] Créer les controllers API
- [ ] Ajouter le middleware JWT
- [ ] Seed data : admin user + projets initiaux (Booqly, FleetTrack, CloudCode...)
- [ ] Tester tous les endpoints via Swagger

### Phase 2 — Frontend public (2-3h)
- [ ] Setup Next.js 14 + Tailwind + shadcn/ui
- [ ] Créer le client API typé (lib/api.ts)
- [ ] Hero section animée (Framer Motion)
- [ ] Section Services (cards depuis API)
- [ ] Section Projets (grid filtrable par technologie)
- [ ] Section Skills (barres animées)
- [ ] Formulaire de contact (validation + feedback)
- [ ] Mode dark / light
- [ ] Responsive mobile complet

### Phase 3 — Dashboard Admin (2-3h)
- [ ] Page de login avec JWT → cookie httpOnly
- [ ] Middleware de protection des routes /admin
- [ ] CRUD Projets avec upload image (Cloudinary)
- [ ] CRUD Services
- [ ] CRUD Skills
- [ ] Boîte de réception messages (marquer lu / supprimer)
- [ ] Page stats / dashboard (compteurs)

### Phase 4 — Déploiement (30min)
- [ ] Backend → Railway (push = déploiement auto)
- [ ] Frontend → Vercel (push = déploiement auto)
- [ ] Variables d'environnement en prod
- [ ] Test end-to-end en production
- [ ] Domaine custom (optionnel)

---

## Résumé

| Ce qu'on construit | Technologie |
|---|---|
| Portfolio public one-page | Next.js 14 + Tailwind + Framer Motion |
| Dashboard admin complet | Next.js /admin + JWT cookie |
| API REST sécurisée | ASP.NET Core 8 |
| Logique métier propre | Clean Architecture + CQRS + MediatR |
| Upload images | Cloudinary |
| Emails de contact | SMTP Gmail |
| Déploiement | Vercel + Railway |

> **Prochain message** → on commence la Phase 1 : création de la solution .NET.
