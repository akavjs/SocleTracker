# Changelog

Tous les changements notables de Relivio seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

## [2.1.0] - 2026-01-15

### Amélioré
- ✨ **Sidebar adaptative** : Mode ouvert (256px) et fermé (80px) avec icônes
- 🎨 **Nouvelle identité visuelle** : Logo ∞ (infini) avec gradient violet
- 📱 **Responsive complet** : Polices fluides, grilles adaptatives, largeurs 100%
- 🏗️ **Architecture documentée** : Nouveau fichier ARCHITECTURE.md détaillé
- 🎯 **Navigation améliorée** : Sections repliables, tooltips, état persistant
- 🔧 **Correction bugs** : Sidebar qui disparaissait, débordements responsive

### Ajouté
- 📄 **ARCHITECTURE.md** : Documentation technique complète
- 🎨 **Design System** : Couleurs, typographie, composants standardisés
- 🔄 **Mode sidebar fermé** : Icônes principales avec tooltips
- 📊 **Architecture technique** : Diagrammes et explications détaillées

### Technique
- ♻️ **Refactoring** : Suppression des `maxWidth` fixes au profit de `width: 100%`
- 🎨 **Styles inline** : Pas de dépendance CSS externe
- 📐 **Grilles adaptatives** : `repeat(auto-fit, minmax(...))`
- 🔤 **Polices fluides** : `clamp()` pour adaptation automatique
- 🏗️ **Sidebar stable** : `minWidth` et `zIndex` pour éviter les débordements

## [2.0.0] - 2026-01-15

### Ajouté
- 🆕 **Notifications** : Système de webhooks pour Slack, Teams et Email
- 📊 **Rapports** : Génération de rapports PDF, Excel et CSV
- 📅 **Calendrier de migration** : Planification visuelle avec dépendances
- 🧠 **Prédictions IA** : Estimation de la durée de migration par application
- 🔗 **Intégration Jira** : Synchronisation des tickets de migration
- 🔔 **Alertes configurables** : Notifications sur événements (app bloquée, migration terminée, etc.)
- 📈 **Analytics avancés** : Heatmap des risques, KPI personnalisables
- 🐳 **Docker** : Dockerfile optimisé et docker-compose.yml
- 📝 **Documentation** : README.md complet avec guide de déploiement

### Amélioré
- ⚡ Performance : Build optimisé avec Vite 6.4
- 🎨 UI/UX : Navigation réorganisée avec sections Général/Personnel/Admin
- 🔒 Sécurité : Headers de sécurité dans nginx.conf
- 📱 Responsive : Meilleure adaptation mobile/tablette

### Corrigé
- 🐛 Page blanche : Correction du chemin de base dans vite.config.js
- 🐛 Import CSV : Support complet avec mapping intelligent des colonnes
- 🐛 Thème : Suppression des commentaires chinois dans index.html

## [1.0.0] - 2026-01-10

### Ajouté
- 🎉 Version initiale de SocleTracker
- 📊 Tableau de bord avec statistiques en temps réel
- 📦 Gestion des applications et suivi de migration
- 🔍 Monitoring des environnements (DEV, STAGING, PREPROD, PROD)
- 📈 Suivi de la progression avec pipeline en 6 phases
- 🤖 Assistant IA avec chatbot intelligent
- 🔗 Intégration Git (GitLab/GitHub) pour charts Helm
- 👥 Système multi-utilisateurs avec rôles (Admin/User)
- 📥 Import/Export JSON et CSV
- 🎨 Interface moderne avec Tailwind CSS

---

## Types de changements

- **Ajouté** : Nouvelles fonctionnalités
- **Modifié** : Changements dans les fonctionnalités existantes
- **Déprécié** : Fonctionnalités qui seront supprimées prochainement
- **Supprimé** : Fonctionnalités supprimées
- **Corrigé** : Corrections de bugs
- **Sécurité** : Corrections de vulnérabilités

## Versions

- **Major** (2.0.0) : Changements incompatibles avec les versions précédentes
- **Minor** (1.1.0) : Ajout de fonctionnalités rétro-compatibles
- **Patch** (1.0.1) : Corrections de bugs rétro-compatibles
