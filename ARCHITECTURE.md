# Architecture Technique - Relivio

## 📐 Vue d'ensemble

Relivio est une application React monopage (SPA) construite avec TypeScript et Vite. L'architecture suit les principes de composants modulaires avec gestion d'état via Context API.

```
┌─────────────────────────────────────────────────────────────┐
│                        Relivio App                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────────────┐ │
│  │              │  │                                      │ │
│  │   Sidebar    │  │         Main Content Area            │ │
│  │   (256px)    │  │                                      │ │
│  │              │  │  ┌────────────────────────────────┐  │ │
│  │  • Release   │  │  │        Header Bar              │  │ │
│  │  • Dette     │  │  ├────────────────────────────────┤  │ │
│  │  • Outils    │  │  │                                │  │ │
│  │  • Personnel │  │  │      Dynamic Content           │  │ │
│  │  • Admin     │  │  │      (Components)              │  │ │
│  │              │  │  │                                │  │ │
│  └──────────────┘  │  └────────────────────────────────┘  │ │
│                    │                                      │ │
│                    └──────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🏛️ Architecture des composants

### 1. Composant racine : `App.tsx`

**Responsabilités**
- Gestion de l'état global (navigation, sidebar, utilisateur)
- Routing entre les vues
- Layout principal (sidebar + content)
- Authentification

**État géré**
```typescript
{
  currentView: View,              // Vue active
  sidebarOpen: boolean,           // Sidebar ouverte/fermée
  isLoggedIn: boolean,            // Authentification
  expandedSections: {             // Sections repliées
    release: boolean,
    debt: boolean,
    tools: boolean,
    personal: boolean,
    admin: boolean
  }
}
```

### 2. Gestion d'état : `UserContext.tsx`

**Pattern** : Context API de React

**État global utilisateur**
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  team: string;
  applications: Application[];    // Apps personnelles
  gitConfigs: GitConfig[];        // Connexions Git
  llmConfig: LLMConfig;           // Config IA
  preferences: {
    theme: 'light' | 'dark';
    language: 'fr' | 'en';
    notifications: boolean;
  };
}
```

**Actions disponibles**
- `setCurrentUser(user)` : Changer d'utilisateur
- `updateUser(id, updates)` : Mettre à jour le profil
- `addUserApplication(app)` : Ajouter une app
- `addUserGitConfig(config)` : Ajouter connexion Git
- `updateUserLLMConfig(config)` : Mettre à jour config IA

### 3. Structure des données

#### `data/applications.ts`
Données liées à la gestion de la dette technique :
- Applications à migrer
- Services Kubernetes
- Environnements (DEV, STAGING, PREPROD, PROD)
- Charts Helm
- Historique des déploiements

#### `data/releases.ts`
Données liées au release management :
- Releases (version, statut, équipe)
- Déploiements par environnement
- Équipes et rôles
- Calendrier des releases
- KPIs (taux de succès, MTTR, etc.)

## 🎨 Système de navigation

### Sidebar adaptative

**Mode ouvert (256px)**
```
┌─────────────────────────────┐
│ ∞ Relivio                   │
│ Release & Debt Manager      │
├─────────────────────────────┤
│ ▼ 🚀 Release Management     │
│   • Dashboard               │
│   • Releases                │
│   • Registry Versions       │
│   • Planning                │
│   • Équipes                 │
├─────────────────────────────┤
│ ▼ 📦 Dette Technique        │
│   • Vue d'ensemble          │
│   • Applications            │
│   • Environnements          │
│   • Progression             │
│   • Calendrier              │
│   • Prédictions             │
│   • Rapports                │
├─────────────────────────────┤
│ ▼ 🔧 Outils                 │
│   • Assistant IA            │
│   • Notifications           │
│   • Jira                    │
│   • Import/Export           │
├─────────────────────────────┤
│ ▼ 👤 Personnel              │
│   • Mon profil              │
│   • Mes connexions Git      │
│   • Mon assistant IA        │
├─────────────────────────────┤
│ ▼ 🛡️ Administration        │
│   • Administration          │
└─────────────────────────────┘
```

**Mode fermé (80px)**
```
┌──────┐
│  ∞   │
├──────┤
│  🚀  │  → Release Dashboard
│  📊  │  → Vue d'ensemble
│  🤖  │  → Assistant IA
│  👤  │  → Mon profil
│  🛡️  │  → Administration
└──────┘
```

**Implémentation**
```typescript
// État de la sidebar
const [sidebarOpen, setSidebarOpen] = useState(true);

// Sections repliables
const [expandedSections, setExpandedSections] = useState({
  release: true,
  debt: true,
  tools: false,
  personal: false,
  admin: false
});

// Toggle section
const toggleSection = (section: string) => {
  setExpandedSections(prev => ({
    ...prev,
    [section]: !prev[section]
  }));
};
```

## 📱 Responsive Design

### Stratégie

**1. Polices fluides**
```typescript
fontSize: 'clamp(20px, 3vw, 24px)'
// Min: 20px, Préféré: 3vw, Max: 24px
```

**2. Grilles adaptatives**
```typescript
gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))'
// Colonnes de min 400px, max 100%, s'adaptent automatiquement
```

**3. Largeurs fluides**
```typescript
// ❌ À éviter
maxWidth: '1200px'

// ✅ Préférer
width: '100%'
```

**4. Sidebar stable**
```typescript
aside: {
  width: sidebarOpen ? '256px' : '80px',
  minWidth: sidebarOpen ? '256px' : '80px',  // Empêche compression
  zIndex: 10,                                 // Toujours au-dessus
  position: 'relative'
}
```

### Breakpoints implicites

L'application n'utilise pas de breakpoints explicites mais s'adapte fluidement :

- **Mobile (< 768px)** : Sidebar fermée par défaut, grilles en colonne
- **Tablette (768px - 1024px)** : Sidebar fermée, grilles 2 colonnes
- **Desktop (> 1024px)** : Sidebar ouverte, grilles multi-colonnes

## 🔐 Système d'authentification

### Rôles utilisateur

**Admin**
- Accès à toutes les sections
- Gestion des utilisateurs
- Configuration globale

**User**
- Accès aux sections Release et Dette
- Configuration personnelle
- Pas d'accès à l'administration

### Implémentation

```typescript
// Filtrage des items de navigation
const filteredNavItems = navItems.filter(item => {
  if (item.adminOnly && currentUser?.role !== 'admin') {
    return false;
  }
  return true;
});

// Protection des vues
const renderContent = () => {
  switch (currentView) {
    case 'admin':
      return currentUser?.role === 'admin' 
        ? <AdminDashboard /> 
        : <div>Accès refusé</div>;
    // ...
  }
};
```

## 📦 Gestion des données

### Données mockées

Pour la démonstration, les données sont stockées dans des fichiers TypeScript :

```typescript
// data/releases.ts
export const releases: Release[] = [
  {
    id: 'rel-001',
    version: 'v2.5.0',
    name: 'Release Janvier 2026',
    status: 'released',
    // ...
  }
];

export const services: Service[] = [
  {
    id: '1',
    name: 'api-gateway',
    currentVersion: {
      dev: '2.6.0',
      staging: '2.5.0',
      preprod: '2.5.0',
      prod: '2.5.1'
    },
    // ...
  }
];
```

### Structure des données

**Release**
```typescript
interface Release {
  id: string;
  version: string;
  name: string;
  status: 'planned' | 'in_progress' | 'deploying' | 'released' | 'rolled_back';
  priority: 'critical' | 'high' | 'medium' | 'low';
  releaseManager: string;
  teams: string[];
  plannedDate: string;
  deployments: Deployment[];
  features: string[];
  fixes: string[];
  approvals: Approval[];
}
```

**Application (Dette technique)**
```typescript
interface Application {
  id: string;
  name: string;
  description: string;
  team: string;
  sourceSocle: string;
  targetSocle: string;
  migrationStatus: 'not_started' | 'in_progress' | 'completed' | 'blocked';
  migrationProgress: number;
  deployments: DeploymentInfo[];
  helmChart: HelmChart;
}
```

## 🚀 Performance

### Optimisations

**1. Build Vite**
- Tree-shaking automatique
- Code splitting par route
- Minification CSS/JS
- Compression Gzip

**2. React**
- Composants fonctionnels (pas de re-renders inutiles)
- `useState` local (pas de re-renders globaux)
- Context API (évite prop drilling)

**3. Styles inline**
- Pas de chargement CSS externe
- Pas de requêtes supplémentaires
- Rendu immédiat

### Métriques de build

```
✓ 51 modules transformés
dist/index.html                   0.71 kB │ gzip:  0.42 kB
dist/assets/index-XXX.css        25.70 kB │ gzip:  5.50 kB
dist/assets/index-XXX.js        348.41 kB │ gzip: 80.91 kB
✓ built in 3.16s
```

## 🐳 Déploiement

### Docker multi-stage

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

### Configuration Nginx

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache statiques
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔒 Sécurité

### Headers HTTP

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
```

### Bonnes pratiques

- ✅ Pas de `dangerouslySetInnerHTML`
- ✅ Tokens API stockés localement (pas partagés)
- ✅ Validation des entrées utilisateur
- ✅ Pas de données sensibles dans le code

## 🧪 Tests

### Structure de tests recommandée

```
src/
├── components/
│   ├── __tests__/
│   │   ├── ReleaseDashboard.test.tsx
│   │   ├── ReleasesList.test.tsx
│   │   └── ...
├── context/
│   └── __tests__/
│       └── UserContext.test.tsx
```

### Outils recommandés

- **Jest** : Test runner
- **React Testing Library** : Tests de composants
- **MSW** : Mock Service Worker pour les API

## 📊 Métriques DORA

L'application suit les 4 métriques clés DORA :

1. **Deployment Frequency** : Fréquence de déploiement
2. **Lead Time for Changes** : Temps de mise en production
3. **Mean Time to Recovery (MTTR)** : Temps moyen de récupération
4. **Change Failure Rate** : Taux d'échec des changements

Ces métriques sont affichées dans le Dashboard Release.

## 🔄 Cycle de vie d'une release

```
1. Planification
   └─→ Création de la release dans Relivio

2. Développement
   └─→ Ajout des features/fixes

3. Approbation
   └─→ Workflow d'approbation (Tech Lead, QA, Ops)

4. Déploiement
   └─→ Pipeline : DEV → STAGING → PREPROD → PROD

5. Monitoring
   └─→ Suivi de la santé des services

6. Clôture
   └─→ Release marquée comme "released"
```

## 🎯 Roadmap technique

### Court terme
- [ ] Tests unitaires (Jest + RTL)
- [ ] Tests E2E (Playwright)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Documentation API

### Moyen terme
- [ ] Backend API (Node.js/Express)
- [ ] Base de données (PostgreSQL)
- [ ] Authentification OAuth2
- [ ] Webhooks pour intégrations

### Long terme
- [ ] Microservices architecture
- [ ] Kubernetes deployment
- [ ] Multi-tenant support
- [ ] Mobile app (React Native)

## 📚 Ressources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [DORA Metrics](https://dora.dev/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)

---

**Dernière mise à jour** : Janvier 2026  
**Version** : 2.1.0  
**Auteur** : Équipe Relivio
