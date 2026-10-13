# Relivio

**Release & Debt Manager**

> *Un nom moderne, fluide et facile à prononcer. Il évoque les releases, leur cycle de vie et l'amélioration continue.*

![Logo](https://img.shields.io/badge/logo-∞_infinity-6366f1)
![Version](https://img.shields.io/badge/version-2.2.0-blue)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)
![Responsive](https://img.shields.io/badge/responsive-100%25-green)
![License](https://img.shields.io/badge/license-MIT-green)
![Bundle Size](https://img.shields.io/badge/bundle-358KB-orange)

## 🎯 Présentation

Relivio est une plateforme DevOps complète qui unifie deux aspects cruciaux de la gestion applicative :

- **🚀 Release Management** : Pilotage complet du cycle de vie des releases, des déploiements et des équipes
- **📦 Dette Technique** : Suivi et gestion des migrations d'applications (ex: Kubernetes 1.24 → OCP 4.14)

### 🎨 Identité visuelle

- **Logo** : Symbole ∞ (infini) représentant le cycle de vie continu des releases
- **Couleurs** : Gradient violet moderne (#6366f1 → #8b5cf6)
- **Style** : Interface épurée, professionnelle et responsive

### ✨ Fonctionnalités clés

- ⌨️ **Raccourcis clavier** : Navigation ultra-rapide (Ctrl+K, Ctrl+D, etc.)
- 🔍 **Recherche globale** : Trouvez instantanément n'importe quelle release ou application
- 🌙 **Mode sombre** : Confort visuel avec persistance automatique
- ⭐ **Favoris** : Épinglez vos éléments importants pour un accès rapide
- 📄 **Export PDF** : Générez des rapports professionnels en un clic
- 📱 **100% Responsive** : S'adapte à tous les écrans

## 📋 Table des matières

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Interface utilisateur](#-interface-utilisateur)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)
- [API et Intégrations](#-api-et-intégrations)
- [Développement](#-développement)
- [FAQ](#-faq)
- [Contribution](#-contribution)
- [Licence](#-licence)
- [Documentation technique](#-documentation-technique)

---

## ✨ Fonctionnalités

### 🚀 RELEASE MANAGEMENT

#### 📊 Dashboard Release
- Vue d'ensemble en temps réel de toutes les releases
- KPIs : nombre de releases, taux de succès, temps moyen de déploiement
- Releases en cours avec statut et progression
- Équipe on-call 24/7
- Prochains déploiements planifiés
- Santé des services en temps réel

#### 📦 Gestion des Releases
- Liste complète des releases avec filtres (statut, priorité)
- Vue détaillée de chaque release :
  - Pipeline de déploiement (DEV → STAGING → PREPROD → PROD)
  - Features, fixes, breaking changes
  - Workflow d'approbation (Tech Lead, QA Lead, Ops Lead)
  - Équipes impliquées
  - Tickets Jira liés
  - Changelog complet
- Gestion des hotfixes et rollbacks

#### 🔍 Registry des Versions
- Tableau des versions installées par environnement
- Santé de chaque service (healthy, degraded, down)
- Dépendances entre services
- Dernières dates de déploiement
- Comparaison des versions entre environnements

#### 📅 Planning des Releases
- Calendrier mensuel des déploiements
- Types d'événements : release, hotfix, maintenance, rollback
- Modal de détails avec équipes et durée
- Liste des événements à venir
- Gestion des fenêtres de maintenance

#### 👥 Gestion des Équipes
- Équipe on-call 24/7 avec contact direct
- Organisation par équipes (Platform, Identity, Payments, etc.)
- Rôles : Release Manager, Tech Lead, QA Lead, Ops Lead, Developer, QA, Ops
- Statut on-call en temps réel

### 📦 GESTION DE LA DETTE TECHNIQUE (Migration)

#### 📊 Tableau de bord Migration
- Vue d'ensemble de la migration avec statistiques en temps réel
- Progression globale et par application
- Alertes sur les applications critiques et problèmes de charts Helm
- Historique des événements récents

#### 📦 Gestion des Applications
- Liste détaillée des applications à migrer
- Suivi de la progression par application
- Gestion des environnements (DEV, STAGING, PREPROD, PROD)
- Monitoring des pods et replicas en temps réel

#### 🔍 Monitoring des Environnements
- État en temps réel des déploiements
- Statut des pods (running, failed, crashloop)
- Détection automatique des incidents
- Filtrage par environnement

#### 📈 Suivi de la Progression
- Pipeline de migration en 6 phases
- Barres de progression par application
- Calendrier prévisionnel
- Statistiques globales

#### 🧠 Prédictions IA
- Estimation de la durée restante par application
- Analyse des facteurs de risque
- Score de confiance
- Recommandations basées sur l'historique

#### 📊 Rapports
- Génération de rapports PDF, Excel, CSV
- Aperçu avec statistiques détaillées
- Sélection de période personnalisable
- Export automatique

### 🔧 OUTILS COMMUNS

#### 🤖 Assistant IA
- Chatbot intelligent pour analyser l'état de la migration
- Réponses contextuelles sur les applications, environnements, charts Helm
- Recommandations automatiques
- Configuration personnalisable (OpenAI, Anthropic, Ollama, Custom)

#### 🔗 Intégration Git
- Connexion à GitLab et GitHub
- Vérification automatique des charts Helm
- Détection des ressources manquantes ou obsolètes
- Synchronisation en temps réel

#### 🔔 Notifications
- Configuration de webhooks (Slack, Teams, Email)
- Alertes sur événements (app bloquée, migration terminée, etc.)
- Activation/désactivation par webhook
- Test de connexion

#### 🔗 Intégration Jira
- Configuration de la connexion Jira
- Synchronisation des tickets
- Affichage des tickets liés aux applications
- Création de nouveaux tickets

#### 📥 Import/Export
- Export en JSON ou CSV
- Import depuis fichiers JSON ou CSV
- Validation automatique des données
- Mapping intelligent des colonnes CSV

### 👤 ESPACE PERSONNEL

#### 👥 Système multi-utilisateurs
- Profils utilisateurs avec espace personnel
- Gestion des applications personnelles
- Configurations Git et IA isolées par utilisateur
- Rôles : Administrateur et Utilisateur

---

## 🆕 Nouveautés v2.0

### 🚀 Release Management (Nouveau module)
- **Dashboard Release** : centre de commande avec KPIs en temps réel
- **Gestion des Releases** : workflow complet avec pipeline de déploiement
- **Registry des Versions** : versions installées par environnement
- **Planning des Releases** : calendrier avec gestion des dépendances
- **Gestion des Équipes** : on-call 24/7 et responsabilités

### 📊 Analytics & Reporting
- **Rapports PDF/Excel** générés automatiquement
- **Graphiques avancés** : burn-down chart, vélocité de migration
- **KPI personnalisables** : SLA de migration, temps moyen par phase
- **Heatmap des risques** : visualisation des zones critiques

### 🔔 Notifications & Alertes
- **Webhooks Slack/Teams** : notifications en temps réel
- **Alertes email** : résumé quotidien/hebdomadaire
- **Alertes sur seuils** : progression bloquée depuis X jours
- **Rappels automatiques** : échéances à approaching

### 📅 Planification Avancée
- **Calendrier de migration** : drag & drop des dates
- **Gestion des dépendances** : graphe des applications dépendantes
- **Fenêtres de maintenance** : planification des créneaux
- **Timeline interactive** : historique visuel

### 🤖 Intelligence Artificielle
- **Prédiction de durée** : estimation du temps de migration
- **Recommandations intelligentes** : ordre optimal de migration
- **Analyse de risques** : scoring automatique des applications
- **Détection de patterns** : identifier les applications similaires

### 🔌 Intégrations DevOps
- **Jira** : synchronisation des tickets
- **GitLab/GitHub** : vérification des charts Helm
- **Prometheus/Grafana** : métriques en temps réel
- **Slack/Teams** : notifications d'équipe

---

## 🏗️ Architecture

### Structure du projet

```
relivio/
├── src/
│   ├── components/                    # Composants React
│   │   ├── 🚀 RELEASE MANAGEMENT
│   │   │   ├── ReleaseDashboard.tsx      # Dashboard releases (KPIs, santé services)
│   │   │   ├── ReleasesList.tsx          # Liste des releases avec filtres
│   │   │   ├── ServicesRegistry.tsx      # Registry des versions par env
│   │   │   ├── ReleaseCalendarView.tsx   # Planning des déploiements
│   │   │   └── TeamsManagement.tsx       # Gestion des équipes et on-call
│   │   │
│   │   ├── 📦 DETTE TECHNIQUE
│   │   │   ├── Dashboard.tsx             # Dashboard migration
│   │   │   ├── ApplicationList.tsx       # Liste des applications
│   │   │   ├── ApplicationDetail.tsx     # Détail d'une application
│   │   │   ├── EnvironmentMonitor.tsx    # Monitoring temps réel
│   │   │   ├── MigrationProgress.tsx     # Suivi de la progression
│   │   │   ├── MigrationCalendar.tsx     # Calendrier de migration
│   │   │   ├── AIPredictions.tsx         # Prédictions IA
│   │   │   └── Reports.tsx               # Rapports et analyses
│   │   │
│   │   ├── 🔧 OUTILS COMMUNS
│   │   │   ├── LLMChat.tsx               # Assistant IA (chatbot)
│   │   │   ├── Notifications.tsx         # Configuration des alertes
│   │   │   ├── JiraIntegration.tsx       # Intégration Jira
│   │   │   └── ImportExport.tsx          # Import/Export JSON/CSV
│   │   │
│   │   └── 👤 ESPACE PERSONNEL
│   │       ├── UserProfile.tsx           # Profil utilisateur
│   │       ├── MyApplications.tsx        # Mes applications perso
│   │       ├── MyGitConfig.tsx           # Mes connexions Git
│   │       ├── MyLLMConfig.tsx           # Configuration IA perso
│   │       └── AdminDashboard.tsx        # Administration (admin)
│   │
│   ├── context/
│   │   └── UserContext.tsx              # État global utilisateur
│   ├── data/
│   │   ├── applications.ts             # Données migration (apps, services)
│   │   └── releases.ts                 # Données releases (releases, équipes)
│   ├── App.tsx                         # Composant principal + routing
│   ├── main.tsx                        # Point d'entrée React
│   └── index.css                       # Styles globaux (Tailwind)
│
├── public/                              # Assets statiques
├── dist/                                # Build de production
├── Dockerfile                           # Configuration Docker multi-stage
├── docker-compose.yml                   # Docker Compose (dev)
├── docker-compose.prod.yml              # Docker Compose (prod)
├── nginx.conf                           # Configuration Nginx
├── .dockerignore                        # Fichiers exclus du build Docker
├── .env.example                         # Template variables d'environnement
├── index.html                           # Point d'entrée HTML
├── package.json                         # Dépendances et scripts
├── tsconfig.json                        # Configuration TypeScript
├── vite.config.js                       # Configuration Vite
├── README.md                            # Documentation principale
├── CHANGELOG.md                         # Historique des versions
├── CONTRIBUTING.md                      # Guide de contribution
└── LICENSE                              # Licence MIT
```

### Architecture technique

#### Frontend
- **React 18.2** : Framework UI avec hooks et contexte
- **TypeScript 5.0** : Typage statique pour la robustesse
- **Vite 6.4** : Build tool ultra-rapide
- **Styles inline** : Pas de dépendance CSS externe (responsive natif)
- **Font Awesome 6** : Icônes professionnelles

#### Navigation
- **Sidebar adaptative** : 
  - Mode ouvert (256px) : Menu complet avec sections repliables
  - Mode fermé (80px) : Icônes principales uniquement
- **Sections repliables** : 5 grandes catégories (Release, Dette, Outils, Personnel, Admin)
- **État persistant** : Mémorisation des sections ouvertes/fermées
- **Responsive** : Grilles adaptatives avec `repeat(auto-fit, minmax(...))`

#### Gestion d'état
- **UserContext** : État global utilisateur (profil, préférences, configs)
- **État local** : `useState` pour les interactions composant
- **Données mockées** : Fichiers `data/*.ts` pour démonstration

#### Responsive Design
- **Polices fluides** : `clamp(20px, 3vw, 24px)` pour adaptation automatique
- **Grilles adaptatives** : `repeat(auto-fit, minmax(min(400px, 100%), 1fr))`
- **Largeurs fluides** : `width: '100%'` au lieu de `maxWidth` fixes
- **Sidebar stable** : `minWidth` et `zIndex` pour éviter les débordements

### Technologies utilisées
- **React 18.2** - Framework UI avec hooks
- **TypeScript 5.0** - Typage statique
- **Vite 6.4** - Build tool ultra-rapide
- **Font Awesome 6** - Icônes professionnelles
- **Styles inline** - Responsive natif sans dépendance CSS

### 🎨 Interface utilisateur

#### Navigation latérale (Sidebar)

La sidebar offre deux modes de navigation :

**Mode ouvert (256px)**
```
┌─────────────────────────┐
│  ∞ Relivio              │
│  Release & Debt Manager │
├─────────────────────────┤
│ ▼ RELEASE MANAGEMENT    │
│   🚀 Dashboard          │
│   📦 Releases           │
│   🔍 Registry Versions  │
│   📅 Planning           │
│   👥 Équipes            │
├─────────────────────────┤
│ ▼ DETTE TECHNIQUE       │
│   📊 Vue d'ensemble     │
│   📦 Applications       │
│   ...                   │
└─────────────────────────┘
```

**Mode fermé (80px)**
```
┌────┐
│ ∞  │
├────┤
│ 🚀 │  ← Release Dashboard
│ 📊 │  ← Vue d'ensemble
│ 🤖 │  ← Assistant IA
│ 👤 │  ← Mon profil
│ 🛡️ │  ← Administration
└────┘
```

**Fonctionnalités**
- ✅ **Sections repliables** : Cliquez sur les titres pour réduire/agrandir
- ✅ **Bouton hamburger** (☰) : Bascule entre mode ouvert/fermé
- ✅ **Tooltips** : En mode fermé, survolez les icônes pour voir les labels
- ✅ **État persistant** : Les sections ouvertes/fermées sont mémorisées
- ✅ **Responsive** : S'adapte à toutes les tailles d'écran

#### Design System

**Couleurs**
- Primaire : `#6366f1` → `#8b5cf6` (gradient violet)
- Succès : `#10b981` (vert)
- Warning : `#f59e0b` (orange)
- Erreur : `#ef4444` (rouge)
- Info : `#3b82f6` (bleu)

**Typographie**
- Titres : `clamp(20px, 3vw, 32px)`
- Sous-titres : `clamp(14px, 2vw, 16px)`
- Corps : `14px`
- Labels : `12px`

**Composants**
- Cards : `border-radius: 12px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.05)`
- Boutons : `border-radius: 8px`, transitions fluides
- Badges : `border-radius: 8px`, couleurs contextuelles

---

## 📋 Prérequis

### Système
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (ou yarn >= 1.22.0)
- **Git** >= 2.30.0

### Navigateurs supportés
- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

### Pour le déploiement
- **Docker** >= 20.10 (optionnel)
- **Nginx** >= 1.18 (pour production)
- **Serveur web** avec support HTTPS

### Pour les intégrations (optionnel)
- Compte **GitLab** avec token d'accès
- Compte **GitHub** avec Personal Access Token
- Clé API **OpenAI** ou **Anthropic** pour l'assistant IA

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-org/socletracker.git
cd socletracker
```

### 2. Installer les dépendances

```bash
npm install
```

ou avec yarn :

```bash
yarn install
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet :

```bash
# Configuration GitLab (optionnel)
VITE_GITLAB_URL=https://gitlab.example.com
VITE_GITLAB_TOKEN=your-gitlab-token

# Configuration GitHub (optionnel)
VITE_GITHUB_TOKEN=your-github-token

# Configuration IA (optionnel)
VITE_OPENAI_API_KEY=your-openai-key
VITE_ANTHROPIC_API_KEY=your-anthropic-key
```

### 4. Lancer en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

### 5. Build de production

```bash
npm run build
```

Les fichiers seront générés dans le dossier `dist/`

---

## 📖 Utilisation

### Première connexion

1. Accédez à l'application via votre navigateur
2. Choisissez votre profil utilisateur (Admin ou User)
3. Cliquez sur "Se connecter"

### Navigation

Le menu latéral est organisé en 5 grandes sections **repliables** avec des icônes professionnelles :

#### Release Management
- **Dashboard** : Centre de commande des releases
- **Releases** : Gestion complète des releases
- **Registry Versions** : Versions installées par environnement
- **Planning** : Calendrier des déploiements
- **Équipes** : Gestion des équipes et on-call

#### Dette Technique (Migration)
- **Vue d'ensemble** : Dashboard migration
- **Applications** : Applications à migrer
- **Environnements** : Monitoring des environnements
- **Progression** : Suivi de l'avancement
- **Calendrier** : Planning de migration
- **Prédictions** : Estimations IA
- **Rapports** : Analyses et exports

#### Outils
- **Assistant IA** : Chatbot intelligent
- **Notifications** : Configuration des alertes
- **Jira** : Intégration tickets
- **Import/Export** : Gestion des données

#### Personnel
- **Mon profil** : Informations et préférences
- **Mes connexions Git** : Vos repositories GitLab/GitHub
- **Mon assistant IA** : Configuration de votre LLM

#### Administration (Admin uniquement)
- **Administration** : Gestion des utilisateurs

**Fonctionnalités de navigation :**
- **Sections repliables** : Cliquez sur les titres de section pour les réduire/agrandir
- **Sidebar rétractable** : Bouton hamburger pour masquer/afficher la barre latérale
- **État persistant** : Les sections ouvertes/fermées sont mémorisées pendant la session
- **Navigation fluide** : Transitions animées entre les sections
- **Icônes professionnelles** : Font Awesome au lieu d'emojis

### Ajouter une application personnelle

1. Allez dans "Mes applications"
2. Cliquez sur "Ajouter une application"
3. Remplissez les informations :
   - Nom de l'application
   - Description
   - Équipe
   - Criticité (Basse/Moyenne/Haute)
4. Cliquez sur "Ajouter"

### Configurer une connexion Git

1. Allez dans "Mes connexions Git"
2. Cliquez sur "Ajouter une connexion Git"
3. Sélectionnez le provider (GitLab/GitHub)
4. Remplissez :
   - URL du serveur
   - Token d'accès
   - Organisation/Groupe
5. Cliquez sur "Ajouter"
6. Testez la connexion avec le bouton "Tester"

### Configurer l'assistant IA

1. Allez dans "Mon assistant IA"
2. Sélectionnez le provider (OpenAI, Anthropic, Ollama, Custom)
3. Choisissez le modèle
4. Entrez votre clé API
5. Ajustez les paramètres :
   - Température (0 = précis, 1 = créatif)
   - Tokens maximum
6. Cliquez sur "Sauvegarder"
7. Testez avec la section "Tester mon assistant"

### Importer des applications

#### Depuis JSON
```json
[
  {
    "id": "app-1",
    "name": "mon-application",
    "description": "Description de l'application",
    "team": "Platform",
    "sourceSocle": "Kubernetes 1.24",
    "targetSocle": "OCP 4.14",
    "migrationStatus": "in_progress",
    "migrationProgress": 50,
    "criticality": "high",
    "estimatedCompletion": "2026-02-01"
  }
]
```

#### Depuis CSV
```csv
ID,Nom,Description,Équipe,Source,Cible,Statut,Progression,Criticité,Échéance
app-1,mon-application,Description,Platform,Kubernetes 1.24,OCP 4.14,in_progress,50,high,2026-02-01
```

1. Allez dans "Import/Export"
2. Sélectionnez le format (JSON ou CSV)
3. Cliquez sur "Choisir un fichier"
4. Sélectionnez votre fichier
5. L'application valide et importe les données

### Exporter des applications

1. Allez dans "Import/Export"
2. Sélectionnez le format d'export (JSON ou CSV)
3. Cliquez sur "Exporter X applications"
4. Le fichier sera téléchargé automatiquement

---

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Requis | Défaut |
|----------|-------------|--------|--------|
| `VITE_GITLAB_URL` | URL du serveur GitLab | Non | - |
| `VITE_GITLAB_TOKEN` | Token d'accès GitLab | Non | - |
| `VITE_GITHUB_TOKEN` | Token d'accès GitHub | Non | - |
| `VITE_OPENAI_API_KEY` | Clé API OpenAI | Non | - |
| `VITE_ANTHROPIC_API_KEY` | Clé API Anthropic | Non | - |
| `VITE_API_URL` | URL de l'API backend | Non | `http://localhost:8080` |

### Configuration Vite

Le fichier `vite.config.js` contient :

```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',  // Chemins relatifs pour le déploiement
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
```

### Personnalisation

#### Modifier les couleurs

Éditez `src/index.css` :

```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #7c3aed;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
}
```

#### Ajouter un nouveau rôle utilisateur

Modifiez `src/context/UserContext.tsx` :

```typescript
type UserRole = 'admin' | 'user' | 'manager';
```

---

## 🌐 Déploiement

### Option 1 : Déploiement statique (Recommandé)

#### Build de production

```bash
npm run build
```

#### Déployer sur Nginx

1. Copiez le contenu de `dist/` vers votre serveur web :

```bash
scp -r dist/* user@server:/var/www/socletracker/
```

2. Configurez Nginx (`/etc/nginx/sites-available/socletracker`) :

```nginx
server {
    listen 80;
    server_name socletracker.example.com;
    root /var/www/socletracker;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache statique
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

3. Redémarrez Nginx :

```bash
sudo systemctl restart nginx
```

#### Déployer sur Apache

```apache
<VirtualHost *:80>
    ServerName socletracker.example.com
    DocumentRoot /var/www/socletracker

    <Directory /var/www/socletracker>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### Option 2 : Docker (Recommandé pour la production)

L'application inclut un Dockerfile optimisé et une configuration docker-compose.

#### Construction de l'image Docker

```bash
# Construire l'image
docker build -t socletracker:latest .

# Vérifier que l'image a été créée
docker images | grep socletracker
```

#### Lancement avec Docker

```bash
# Lancer le conteneur
docker run -d \
  --name socletracker \
  -p 8080:80 \
  --restart unless-stopped \
  socletracker:latest

# Vérifier les logs
docker logs socletracker

# Accéder à l'application
# http://localhost:8080
```

#### Lancement avec Docker Compose

```bash
# Démarrer les services
docker-compose up -d

# Vérifier le statut
docker-compose ps

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

#### Configuration Docker Compose

Le fichier `docker-compose.yml` inclus configure :
- Port mappé : 8080 → 80
- Healthcheck automatique
- Redémarrage automatique
- Réseau dédié

#### Variables d'environnement (optionnel)

Pour personnaliser le déploiement, créez un fichier `.env` :

```env
# Configuration GitLab
VITE_GITLAB_URL=https://gitlab.example.com
VITE_GITLAB_TOKEN=your-token

# Configuration GitHub
VITE_GITHUB_TOKEN=your-token

# Configuration IA
VITE_OPENAI_API_KEY=your-key
VITE_ANTHROPIC_API_KEY=your-key
```

Puis lancez avec :

```bash
docker-compose --env-file .env up -d
```

#### Healthcheck

L'application expose un endpoint de healthcheck :

```bash
# Vérifier que l'application est opérationnelle
curl http://localhost:8080/health
# Réponse : healthy
```

#### Mise à jour

```bash
# Tirer la nouvelle image
docker pull socletracker:latest

# Recréer le conteneur
docker-compose down
docker-compose up -d
```

#### nginx.conf

La configuration nginx incluse dans le Dockerfile :

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Build et run

```bash
# Build l'image
docker build -t socletracker:latest .

# Run le container
docker run -d -p 8080:80 --name socletracker socletracker:latest
```

#### Docker Compose

```yaml
version: '3.8'

services:
  socletracker:
    build: .
    ports:
      - "8080:80"
    environment:
      - VITE_GITLAB_URL=https://gitlab.example.com
      - VITE_OPENAI_API_KEY=your-key
    restart: unless-stopped
```

```bash
docker-compose up -d
```

### Option 3 : Kubernetes

#### Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: socletracker
  labels:
    app: socletracker
spec:
  replicas: 3
  selector:
    matchLabels:
      app: socletracker
  template:
    metadata:
      labels:
        app: socletracker
    spec:
      containers:
      - name: socletracker
        image: your-registry/socletracker:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "128Mi"
            cpu: "100m"
          limits:
            memory: "256Mi"
            cpu: "200m"
```

#### Service

```yaml
apiVersion: v1
kind: Service
metadata:
  name: socletracker
spec:
  selector:
    app: socletracker
  ports:
  - port: 80
    targetPort: 80
  type: ClusterIP
```

#### Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: socletracker
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: socletracker.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: socletracker
            port:
              number: 80
```

### Option 4 : Vercel / Netlify

#### Vercel

```bash
npm i -g vercel
vercel
```

#### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Ou connectez votre repository Git pour un déploiement automatique.

---

## 🔌 API et Intégrations

### GitLab API

L'application utilise l'API GitLab pour vérifier les charts Helm :

```typescript
// Exemple d'appel API
const response = await fetch(`${gitlabUrl}/api/v4/projects/${projectId}/repository/tree`, {
  headers: {
    'PRIVATE-TOKEN': token
  }
});
```

### GitHub API

```typescript
const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
  headers: {
    'Authorization': `token ${githubToken}`
  }
});
```

### OpenAI API

```typescript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  },
  body: JSON.stringify({
    model: 'gpt-4-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7
  })
});
```

### Webhooks de Notifications

L'application supporte l'envoi de webhooks vers Slack, Teams et autres services :

#### Configuration Slack

1. Créez un webhook entrant dans Slack : https://api.slack.com/messaging/webhooks
2. Copiez l'URL du webhook
3. Configurez-la dans "Notifications" > "Ajouter une notification" > "Slack"

#### Exemple de payload Slack

```json
{
  "text": "🚀 Migration terminée",
  "blocks": [
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "*Application :* api-gateway\n*Progression :* 100%\n*Environnement :* PROD"
      }
    }
  ]
}
```

#### Configuration Teams

1. Créez un webhook entrant dans Teams
2. Copiez l'URL du connecteur
3. Configurez-la dans "Notifications" > "Ajouter une notification" > "Teams"

#### Configuration Email

1. Configurez un serveur SMTP dans les variables d'environnement
2. Activez les notifications email dans "Notifications"

### Jira API

L'application s'intègre avec Jira pour synchroniser les tickets :

```typescript
// Récupérer les tickets liés à une application
const response = await fetch(`${jiraUrl}/rest/api/3/search?jql=project=${projectKey}`, {
  headers: {
    'Authorization': `Basic ${btoa(`${email}:${apiToken}`)}`,
    'Content-Type': 'application/json'
  }
});
```

#### Configuration Jira

1. Générez un token API sur https://id.atlassian.com/manage-profile/security/api-tokens
2. Configurez la connexion dans "Jira" > "Configuration"
3. Synchronisez les tickets avec "Synchroniser"

---

## 🛠️ Développement

### Structure des composants

```typescript
// Exemple de composant
export default function MyComponent() {
  const { currentUser } = useUser(); // Contexte utilisateur
  
  return (
    <div>
      <h1>{currentUser.name}</h1>
    </div>
  );
}
```

### Ajout d'une nouvelle fonctionnalité

1. Créez un composant dans `src/components/`
2. Ajoutez-le dans `src/App.tsx`
3. Mettez à jour la navigation si nécessaire
4. Testez avec `npm run dev`

### Tests

```bash
# Lancer les tests
npm test

# Tests avec coverage
npm run test:coverage
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Type checking

```bash
npm run typecheck
```

---

## ❓ FAQ

### L'application affiche une page blanche

**Solution** : Vérifiez que le fichier `vite.config.js` contient `base: './'` pour les chemins relatifs.

### Les icônes ne s'affichent pas

**Solution** : Vérifiez que Font Awesome est chargé dans `index.html` :
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
```

### Comment ajouter un nouvel utilisateur ?

**Solution** : Modifiez le tableau `defaultUsers` dans `src/context/UserContext.tsx`.

### L'assistant IA ne répond pas

**Solution** : Vérifiez que la clé API est configurée dans "Mon assistant IA" et que le provider est correct.

### Comment changer le thème ?

**Solution** : Allez dans "Mon profil" → "Préférences" → "Thème".

---

## 🤝 Contribution

Les contributions sont les bienvenues !

### Processus

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Guidelines

- Respectez la structure du code
- Ajoutez des commentaires en français
- Testez vos modifications
- Mettez à jour la documentation si nécessaire

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📚 Documentation technique

Pour une compréhension approfondie de l'architecture et des choix techniques :

- **[ARCHITECTURE.md](ARCHITECTURE.md)** : Documentation technique complète
  - Architecture des composants
  - Système de navigation (sidebar adaptative)
  - Responsive design
  - Gestion d'état
  - Performance et optimisations
  - Déploiement Docker
  - Sécurité

- **[CHANGELOG.md](CHANGELOG.md)** : Historique complet des versions et changements
- **[CONTRIBUTING.md](CONTRIBUTING.md)** : Guide pour contribuer au projet
- **[.env.example](.env.example)** : Template des variables d'environnement

---

## 📞 Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez l'équipe : support@relivio.dev

---

## 🙏 Remerciements

- React Team pour le framework
- Vite Team pour le build tool
- Font Awesome pour les icônes
- Toute la communauté open source

---

**Développé avec ❤️ par l'équipe Relivio**

*Release & Debt Manager - Le cycle de vie continu de vos applications*
