# Guide utilisateur — Portfolio Full Stack

## Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Architecture du projet](#2-architecture-du-projet)
3. [Démarrage rapide](#3-démarrage-rapide)
4. [Site public — Fonctionnalités](#4-site-public--fonctionnalités)
5. [Dashboard Admin — Fonctionnalités](#5-dashboard-admin--fonctionnalités)
6. [API Backend — Endpoints](#6-api-backend--endpoints)
7. [Base de données](#7-base-de-données)
8. [Sécurité](#8-sécurité)
9. [Déploiement](#9-déploiement)
10. [Variables d'environnement](#10-variables-denvironnement)

---

## 1. Vue d'ensemble

Portfolio professionnel full-stack composé de deux parties :

- **Site public** — présentation one-page visible par tous (recruteurs, clients)
- **Dashboard admin** — interface privée pour gérer le contenu du site

```
Portfolio
├── frontend/     ← Next.js 14 (site public + admin)
├── backend/      ← ASP.NET Core 8 (API REST)
└── Portfolio.sln ← Solution .NET
```

---

## 2. Architecture du projet

### Backend — Clean Architecture

La logique est divisée en 4 couches indépendantes qui ne dépendent jamais dans le mauvais sens :

```
Portfolio.Domain          ← Entités métier pures (pas de dépendances externes)
      ↑
Portfolio.Application     ← Logique métier (CQRS avec MediatR)
      ↑
Portfolio.Infrastructure  ← Accès données (EF Core, JWT, Cloudinary, BCrypt)
      ↑
Portfolio.API             ← Points d'entrée HTTP (Controllers, Swagger)
```

**Pourquoi cette architecture ?**
- Changer de base de données (ex: PostgreSQL) ne touche qu'Infrastructure
- Changer de framework (ex: gRPC) ne touche qu'API
- La logique métier dans Application est testable indépendamment

#### Pattern CQRS (Command Query Responsibility Segregation)

Chaque action est soit une **Query** (lecture), soit une **Command** (écriture) :

```
GetAllProjectsQuery     → lit les projets depuis la BDD
CreateProjectCommand    → crée un nouveau projet
UpdateProjectCommand    → modifie un projet existant
DeleteProjectCommand    → supprime un projet
```

Chaque Query/Command a son propre Handler qui fait le travail. MediatR fait le lien.

#### Pipeline de validation

Avant chaque Command, FluentValidation vérifie automatiquement les données via un `ValidationBehavior` enregistré dans le pipeline MediatR. Si les données sont invalides → HTTP 400 avec les erreurs.

---

### Frontend — Next.js 14 App Router

```
frontend/src/
├── app/
│   ├── page.tsx              ← Site public (server component, fetch API au build)
│   └── admin/
│       ├── layout.tsx        ← Layout admin (protégé par AdminGuard)
│       ├── login/page.tsx    ← Page de connexion
│       ├── page.tsx          ← Dashboard (stats)
│       ├── projects/         ← CRUD projets
│       ├── services/         ← CRUD services
│       ├── skills/           ← CRUD compétences
│       └── messages/         ← Boîte de réception
├── components/
│   ├── public/               ← Composants du site public
│   └── admin/                ← Composants du dashboard
├── lib/
│   ├── api.ts                ← Client API typé (fetch vers le backend)
│   └── auth.ts               ← Gestion JWT (cookie)
└── types/
    └── index.ts              ← Types TypeScript partagés
```

---

## 3. Démarrage rapide

### Prérequis
- .NET 8 SDK
- Node.js 18+
- SQL Server LocalDB (inclus avec Visual Studio)

### Lancer le backend

```bash
# Dans le dossier portfolio/
dotnet run --project backend/src/Portfolio.API/Portfolio.API.csproj --urls "http://localhost:5001"
```

Au premier démarrage, le backend :
1. Crée automatiquement la base de données `PortfolioDB`
2. Applique les migrations EF Core
3. Insère les données initiales (admin + projets + services + compétences)

### Lancer le frontend

```bash
cd frontend
npm install    # seulement la première fois
npm run dev    # → http://localhost:3000
```

### Accès

| URL | Description |
|---|---|
| http://localhost:3000 | Site public |
| http://localhost:3000/admin/login | Connexion admin |
| http://localhost:5001/swagger | Documentation API interactive |

### Identifiants admin (par défaut)

```
Email    : devalinloic@gmail.com
Password : Admin123!
```

---

## 4. Site public — Fonctionnalités

Le site est une **single page** avec navigation par ancres. Le contenu vient entièrement de l'API.

### Sections

#### Navbar
- Fixe en haut, transparente puis fond sombre au scroll
- Liens vers toutes les sections
- Bouton **Admin** (icône dashboard) pour accéder au dashboard
- Responsive : menu hamburger sur mobile

#### Hero
- Nom, titre, tagline animés (Framer Motion)
- Liens GitHub, LinkedIn, Email
- CTA "Voir mes projets" et "Me contacter"
- Flèche animée vers le bas

#### À propos
- Texte de présentation
- 3 cartes : Mobile / Backend / Web

#### Services
- Cards chargées depuis l'API (`GET /api/services`)
- Icône Lucide, titre, description, prix
- Hover avec bordure violette

#### Projets
- Grid de cards depuis l'API (`GET /api/projects`)
- **Filtrage par technologie** — cliquer sur un badge filtre les projets
- Chaque card : image (ou placeholder), titre, description, stack, liens GitHub/Demo

#### Compétences
- Barres de progression animées au scroll (Framer Motion `whileInView`)
- Groupées par catégorie : Mobile / Frontend / Backend / Outils
- Niveau 0–100 avec animation fluide

#### Contact
- Formulaire → `POST /api/messages`
- Validation client + feedback visuel
- État de succès avec icône check
- Bouton "Envoyer un autre message"

#### Footer
- Copyright
- Liens sociaux (GitHub, LinkedIn, Email)

---

## 5. Dashboard Admin — Fonctionnalités

Accessible sur `/admin`. **Redirige automatiquement vers `/admin/login`** si non connecté.

### Connexion

- Formulaire email + mot de passe
- Appel `POST /api/auth/login` → reçoit un JWT
- JWT stocké dans un cookie (1 jour, `sameSite: strict`)
- Après connexion → redirection vers le dashboard

### Sidebar

Navigation latérale avec 5 sections :
- Dashboard (stats globales)
- Projets
- Services
- Compétences
- Messages

Bouton "Déconnexion" en bas → supprime le cookie et redirige vers `/admin/login`.

---

### Dashboard (stats)

Affiche 4 compteurs en temps réel :
- Nombre de projets
- Nombre de services
- Nombre de compétences
- Nombre de **messages non lus** (badge orange)

---

### Gestion des Projets

**Liste** (`/admin/projects`) :
- Tous les projets avec leur stack technique
- Boutons : modifier (crayon), supprimer (corbeille)
- Liens rapides GitHub / Demo
- Bouton **"Ajouter"** → formulaire de création

**Formulaire** (`/admin/projects/new` ou `/admin/projects/:id`) :
- Titre + description
- Stack technique : saisie libre avec tags (Entrée pour valider, × pour retirer)
- URL GitHub + URL Live (optionnels)
- Ordre d'affichage (tri sur le site public)
- Case "Projet mis en avant" (featured)
- **Upload image** → envoyée sur Cloudinary, URL stockée en base

---

### Gestion des Services

Interface inline (pas de page séparée) :
- Titre, description, prix, icône, ordre
- Sélecteur d'icône parmi : `Smartphone`, `Server`, `Globe`, `Lightbulb`, `Code`, `Database`
- Modification directement dans la liste

---

### Gestion des Compétences

Interface inline groupée par catégorie :
- Nom, catégorie (`frontend` / `backend` / `mobile` / `tools`), niveau
- **Slider** 0–100 pour ajuster le niveau visuellement
- Barre de progression en temps réel dans la liste

---

### Boîte de réception (Messages)

Interface à 2 colonnes :
- **Colonne gauche** : liste des messages (icône enveloppe ouverte = lu, violette = non lu)
- **Colonne droite** : contenu complet du message sélectionné

Fonctionnalités :
- Cliquer sur un message le marque automatiquement comme lu (`PUT /api/messages/:id/read`)
- Bouton **"Répondre par email"** ouvre le client mail avec `mailto:` pré-rempli
- Bouton corbeille pour supprimer

---

## 6. API Backend — Endpoints

### Public (sans authentification)

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/projects` | Tous les projets (triés par `displayOrder`) |
| `GET` | `/api/projects/featured` | Projets mis en avant uniquement |
| `GET` | `/api/services` | Tous les services |
| `GET` | `/api/skills` | Toutes les compétences |
| `POST` | `/api/messages` | Envoyer un message de contact |
| `POST` | `/api/auth/login` | Connexion admin → retourne JWT |

### Admin (JWT requis — header `Authorization: Bearer <token>`)

| Méthode | Route | Description |
|---|---|---|
| `POST` | `/api/projects` | Créer un projet |
| `PUT` | `/api/projects/:id` | Modifier un projet |
| `DELETE` | `/api/projects/:id` | Supprimer un projet |
| `POST` | `/api/projects/:id/image` | Upload image (Cloudinary) |
| `POST` | `/api/services` | Créer un service |
| `PUT` | `/api/services/:id` | Modifier un service |
| `DELETE` | `/api/services/:id` | Supprimer un service |
| `POST` | `/api/skills` | Créer une compétence |
| `PUT` | `/api/skills/:id` | Modifier une compétence |
| `DELETE` | `/api/skills/:id` | Supprimer une compétence |
| `GET` | `/api/messages` | Tous les messages reçus |
| `PUT` | `/api/messages/:id/read` | Marquer comme lu |
| `DELETE` | `/api/messages/:id` | Supprimer un message |

### Swagger UI

Disponible sur `http://localhost:5001/swagger`. Permet de tester tous les endpoints directement dans le navigateur. Pour les routes protégées, cliquer **Authorize** et entrer `Bearer <votre_token>`.

---

## 7. Base de données

Schéma SQL Server LocalDB (`PortfolioDB`) :

```sql
Projects    — id, title, description, imageUrl, techStack (JSON), liveUrl, githubUrl,
              featured, displayOrder, createdAt

Services    — id, title, description, price, icon, featured, displayOrder

Skills      — id, name, category, level (0-100), iconUrl

Messages    — id, name, email, subject, body, isRead, createdAt

AdminUsers  — id, email, passwordHash (BCrypt)
```

### Gestion des migrations

```bash
# Créer une nouvelle migration après modification d'une entité
dotnet ef migrations add NomDeLaMigration \
  --project backend/src/Portfolio.Infrastructure \
  --startup-project backend/src/Portfolio.API

# Appliquer les migrations
dotnet ef database update \
  --project backend/src/Portfolio.Infrastructure \
  --startup-project backend/src/Portfolio.API
```

---

## 8. Sécurité

### Authentification JWT
- Token signé HS256 avec une clé secrète configurée dans `appsettings.json`
- Expiry : 24h (configurable via `Jwt:ExpiryMinutes`)
- Stocké côté client dans un cookie (`sameSite: strict`)
- Toutes les routes admin sont protégées par `[Authorize]`

### Mots de passe
- Hashés avec **BCrypt** (coût par défaut ~12 rounds)
- Le mot de passe n'est jamais stocké en clair

### Validation des entrées
- FluentValidation sur toutes les Commands (longueur max, format email, ranges)
- Retourne HTTP 400 avec les messages d'erreur en cas d'échec

### CORS
- Configuré pour autoriser uniquement `localhost:3000` en développement
- À mettre à jour avec le domaine de production

### Protection frontend
- `AdminGuard` vérifie la présence du cookie JWT avant chaque accès à une page admin
- Redirection automatique vers `/admin/login` si absent

---

## 9. Déploiement

### Frontend → Vercel

```bash
# Depuis le dossier frontend/
npx vercel --prod
```

Variables d'environnement à configurer sur Vercel :
```
NEXT_PUBLIC_API_URL=https://votre-api.railway.app/api
```

### Backend → Railway

1. Créer un projet sur [railway.app](https://railway.app)
2. Connecter le repo GitHub
3. Configurer le répertoire source : `backend/src/Portfolio.API`
4. Ajouter une base SQL Server (ou passer à PostgreSQL avec le package EF Core adapté)
5. Variables d'environnement à configurer :

```
ConnectionStrings__Default=<connection string prod>
Jwt__Secret=<clé secrète longue et aléatoire>
Cloudinary__CloudName=<votre cloud name>
Cloudinary__ApiKey=<votre api key>
Cloudinary__ApiSecret=<votre api secret>
AdminEmail=<votre email>
AdminPassword=<mot de passe fort>
```

---

## 10. Variables d'environnement

### Backend — `appsettings.json`

```json
{
  "ConnectionStrings": {
    "Default": "Server=(localdb)\\mssqllocaldb;Database=PortfolioDB;..."
  },
  "Jwt": {
    "Secret": "clé secrète min. 32 caractères",
    "Issuer": "Portfolio",
    "Audience": "PortfolioApp",
    "ExpiryMinutes": "1440"
  },
  "Cloudinary": {
    "CloudName": "votre_cloud_name",
    "ApiKey": "votre_api_key",
    "ApiSecret": "votre_api_secret"
  },
  "AdminEmail": "votre@email.com",
  "AdminPassword": "MotDePasseFort123!"
}
```

> **Note Cloudinary** : sans configuration, les uploads d'images échouent mais tout le reste fonctionne. Créer un compte gratuit sur [cloudinary.com](https://cloudinary.com) pour activer l'upload.

### Frontend — `.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

---

## Résumé technique

| Élément | Technologie |
|---|---|
| Site public | Next.js 14 App Router + Tailwind CSS + Framer Motion |
| Dashboard admin | Next.js 14 + Tailwind CSS |
| API REST | ASP.NET Core 8 |
| Architecture backend | Clean Architecture + CQRS + MediatR |
| Validation | FluentValidation (pipeline automatique) |
| Base de données | SQL Server LocalDB + EF Core 8 |
| Authentification | JWT (HS256, 24h) |
| Hachage mot de passe | BCrypt |
| Upload images | Cloudinary |
| Icônes | Lucide React |
| Animations | Framer Motion |
| Types | TypeScript strict |
