# 🚀 Guide des fonctionnalités légères - Relivio v2.2

## ✨ Nouvelles fonctionnalités ajoutées

Cette version ajoute 5 fonctionnalités légères qui améliorent significativement l'expérience utilisateur sans alourdir l'application.

---

## ⌨️ 1. Raccourcis clavier

### Raccourcis disponibles

| Raccourci | Action |
|-----------|--------|
| `Ctrl + K` | Ouvrir la recherche globale |
| `Ctrl + D` | Basculer le mode sombre |
| `Ctrl + F` | Activer le mode focus |
| `Shift + ?` | Afficher les raccourcis |
| `Esc` | Fermer les modales |

### Utilisation

Les raccourcis sont automatiquement actifs. Ils sont désactivés lorsque vous tapez dans un champ de texte pour éviter les conflits.

**Pour voir tous les raccourcis :**
- Appuyez sur `Shift + ?`
- Ou cliquez sur l'icône clavier dans le header

---

## 🔍 2. Recherche globale

### Fonctionnalités

- Recherche instantanée dans toutes les releases, applications et services
- Navigation rapide avec les flèches du clavier
- Sélection avec `Entrée`
- Fermeture avec `Esc`

### Comment l'utiliser

1. **Ouvrir** : `Ctrl + K` ou cliquez sur l'icône de recherche
2. **Taper** : Commencez à taper votre recherche
3. **Naviguer** : Utilisez `↑` et `↓` pour naviguer dans les résultats
4. **Sélectionner** : Appuyez sur `Entrée` ou cliquez sur un résultat
5. **Fermer** : Appuyez sur `Esc` ou cliquez en dehors

### Exemples de recherche

- `v2.5` → Trouve toutes les releases v2.5.x
- `api-gateway` → Trouve l'application api-gateway
- `platform` → Trouve toutes les applications de l'équipe Platform
- `blocked` → Trouve les releases bloquées

---

## 🌙 3. Mode sombre

### Fonctionnalités

- Bascule entre mode clair et sombre
- Préférence sauvegardée automatiquement
- Appliqué à toute l'interface

### Comment l'utiliser

**Méthode 1 :** Cliquez sur l'icône lune/soleil dans le header

**Méthode 2 :** Utilisez le raccourci `Ctrl + D`

### Persistance

Votre préférence est sauvegardée dans le localStorage et sera restaurée à votre prochaine visite.

---

## ⭐ 4. Favoris / Épingles

### Fonctionnalités

- Épingler vos releases et applications favorites
- Accès rapide depuis la sidebar
- Persistance via localStorage
- Organisation par type (release, application, service)

### Comment l'utiliser

1. **Ajouter un favori** : Cliquez sur l'icône étoile ⭐ à côté d'une release ou application
2. **Retirer un favori** : Cliquez à nouveau sur l'étoile
3. **Accéder aux favoris** : Section "Favoris" dans la sidebar

### Composant FavoriteButton

```typescript
import { FavoriteButton } from './hooks/useFavorites';

<FavoriteButton
  id="rel-001"
  type="release"
  name="Release v2.5.0"
  view="releases"
  size="medium"
/>
```

### Hook useFavorites

```typescript
import { useFavorites } from './hooks/useFavorites';

const { favorites, toggleFavorite, isFavorite } = useFavorites();

// Vérifier si c'est un favori
const isFav = isFavorite('rel-001', 'release');

// Ajouter/retirer des favoris
toggleFavorite({
  id: 'rel-001',
  type: 'release',
  name: 'Release v2.5.0',
  view: 'releases'
});
```

---

## 📄 5. Export PDF

### Fonctionnalités

- Export de n'importe quelle vue en PDF
- Utilisation de `window.print()` natif
- Styles d'impression optimisés
- En-tête et pied de page automatiques

### Comment l'utiliser

1. **Naviguez** vers la vue que vous voulez exporter
2. **Cliquez** sur l'icône PDF dans le header
3. **Sélectionnez** "Enregistrer en PDF" dans la boîte de dialogue d'impression

### Vues exportables

- ✅ Dashboard Release
- ✅ Liste des releases
- ✅ Registry des versions
- ✅ Planning des releases
- ✅ Gestion des équipes
- ✅ Dashboard Migration
- ✅ Liste des applications
- ✅ Monitoring des environnements
- ✅ Progression de la migration
- ✅ Tous les autres composants

### Styles d'impression

Les styles suivants sont automatiquement appliqués :
- Masquage de la sidebar et du header
- Optimisation des tableaux avec bordures
- Évite les sauts de page dans les cartes
- Ajout d'en-tête et pied de page

---

## 🎨 Personnalisation

### Ajouter vos propres raccourcis

```typescript
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

const myShortcuts = [
  {
    key: 'n',
    ctrl: true,
    action: () => console.log('Nouvelle release'),
    description: 'Créer une nouvelle release'
  }
];

useKeyboardShortcuts(myShortcuts);
```

### Modifier les couleurs du mode sombre

Dans `src/hooks/useDarkMode.ts` :

```typescript
if (isDarkMode) {
  document.body.style.background = '#1a1a1a'; // Fond sombre
  document.body.style.color = '#e5e7eb';       // Texte clair
}
```

### Personnaliser l'export PDF

Dans `src/hooks/useExportPDF.ts` :

```typescript
const printStyles = `
  @media print {
    @page {
      margin: 2cm;
      @top-center {
        content: "Mon Entreprise - ${title}";
      }
    }
  }
`;
```

---

## 📊 Performance

### Impact sur le bundle

| Fonctionnalité | Taille ajoutée | Impact |
|----------------|----------------|--------|
| Raccourcis clavier | ~2 KB | Minimal |
| Recherche globale | ~5 KB | Faible |
| Mode sombre | ~1 KB | Négligeable |
| Favoris | ~3 KB | Minimal |
| Export PDF | ~2 KB | Minimal |
| **Total** | **~13 KB** | **Très faible** |

### Optimisations

- ✅ Code splitting automatique
- ✅ Lazy loading des composants
- ✅ localStorage pour la persistance
- ✅ Pas de dépendances externes supplémentaires
- ✅ Styles inline pour le mode sombre

---

## 🔧 Configuration

### Variables d'environnement

Aucune variable d'environnement supplémentaire n'est nécessaire. Toutes les fonctionnalités utilisent le localStorage pour la persistance.

### Clés localStorage utilisées

- `relivio-dark-mode` : Préférence du mode sombre
- `relivio-favorites` : Liste des favoris

---

## 🐛 Dépannage

### Les raccourcis ne fonctionnent pas

**Problème** : Les raccourcis clavier ne réagissent pas

**Solution** :
- Vérifiez que vous n'êtes pas dans un champ de texte
- Vérifiez que la modale des raccourcis n'est pas déjà ouverte
- Rechargez la page

### La recherche ne trouve rien

**Problème** : La recherche ne retourne aucun résultat

**Solution** :
- Vérifiez l'orthographe
- Essayez avec des termes plus courts
- Vérifiez que les données sont bien chargées

### Le mode sombre ne se sauvegarde pas

**Problème** : Le mode sombre est réinitialisé au rechargement

**Solution** :
- Vérifiez que le localStorage est activé dans votre navigateur
- Vérifiez que vous n'êtes pas en navigation privée
- Videz le cache et rechargez

### L'export PDF est vide

**Problème** : Le PDF exporté ne contient rien

**Solution** :
- Attendez que la page soit complètement chargée
- Vérifiez que vous n'avez pas de filtre actif qui masque le contenu
- Essayez avec un autre navigateur

---

## 📚 Ressources

- [Documentation ARCHITECTURE.md](./ARCHITECTURE.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🎯 Prochaines étapes

Ces 5 fonctionnalités sont la base. Vous pouvez maintenant :

1. **Ajouter des favoris** à vos composants existants avec `FavoriteButton`
2. **Créer vos propres raccourcis** avec `useKeyboardShortcuts`
3. **Personnaliser l'export PDF** pour chaque vue
4. **Étendre la recherche** à d'autres types de données
5. **Améliorer le mode sombre** avec plus de thèmes

---

**Version** : 2.2.0  
**Dernière mise à jour** : Janvier 2026  
**Temps de développement** : ~12 heures  
**Impact performance** : +13 KB (négligeable)
