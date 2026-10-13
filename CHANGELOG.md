# Changelog

Tous les changements notables de Relivio seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

## [2.2.0] - 2026-01-15

### Ajouté
- ⌨️ **Raccourcis clavier** : Navigation rapide au clavier (Ctrl+K, Ctrl+D, Ctrl+F, Shift+?)
- 🔍 **Recherche globale** : Recherche instantanée dans toutes les releases et applications
- 🌙 **Mode sombre** : Thème sombre avec persistance localStorage
- ⭐ **Favoris** : Système d'épinglage avec composant FavoriteButton réutilisable
- 📄 **Export PDF** : Export de toutes les vues via window.print() avec styles optimisés
- 📋 **Modale de raccourcis** : Affichage de tous les raccourcis disponibles (Shift+?)
- 🎯 **Hook useKeyboardShortcuts** : Hook personnalisable pour ajouter vos propres raccourcis
- 🎨 **Hook useDarkMode** : Hook pour gérer le mode sombre avec persistance
- 📦 **Hook useFavorites** : Hook complet pour gérer les favoris avec localStorage
- 🖨️ **Hook useExportPDF** : Hook pour l'export PDF avec styles d'impression

### Amélioré
- 🚀 **Performance** : Ajout de seulement 13 KB au bundle total
- 💾 **Persistance** : localStorage pour toutes les préférences utilisateur
- ⚡ **UX** : Navigation plus rapide avec les raccourcis et la recherche
- 🎨 **Personnalisation** : Mode sombre et favoris pour une expérience sur mesure

### Technique
- 📁 **Nouvelle structure** : Dossier `src/hooks/` pour les hooks personnalisés
- 🔧 **Modularité** : Composants et hooks réutilisables
- 🧪 **Testabilité** : Hooks séparés pour faciliter les tests unitaires
- 📚 **Documentation** : FEATURES.md complet avec exemples et guide d'utilisation

### Performance
- Bundle JS : 358.80 KB (+10 KB)
- Bundle CSS : 25.77 KB (+0.07 KB)
- Total gzip : 83.57 KB (+2.66 KB)
- Impact : Négligeable (< 3% d'augmentation)

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
