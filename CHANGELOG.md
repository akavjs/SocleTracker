# Changelog

Tous les changements notables de SocleTracker seront documentés dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

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
