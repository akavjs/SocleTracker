# Guide de Contribution

Merci de votre intérêt à contribuer à Relivio ! Ce document fournit les instructions pour contribuer au projet.

## 📋 Table des matières

- [Code de conduite](#-code-de-conduite)
- [Comment contribuer](#-comment-contribuer)
- [Style de code](#-style-de-code)
- [Processus de pull request](#-processus-de-pull-request)
- [Structure du projet](#-structure-du-projet)
- [Tests](#-tests)
- [Documentation](#-documentation)

## 🤝 Code de conduite

Ce projet adhère au [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). En participant, vous êtes censé respecter ce code.

## 🚀 Comment contribuer

### Signaler un bug

1. Vérifiez que le bug n'a pas déjà été signalé dans les [Issues](https://github.com/your-org/socletracker/issues)
2. Si le bug n'existe pas, créez une nouvelle issue en utilisant le template "Bug Report"
3. Incluez :
   - Description claire du problème
   - Étapes pour reproduire
   - Comportement attendu vs observé
   - Environnement (OS, navigateur, version)
   - Logs ou captures d'écran si pertinent

### Suggérer une amélioration

1. Vérifiez que l'amélioration n'a pas déjà été suggérée dans les Issues
2. Créez une nouvelle issue avec le template "Feature Request"
3. Décrivez :
   - Le problème que cela résout
   - La solution proposée
   - Les alternatives considérées
   - L'impact sur les utilisateurs

### Soumettre du code

1. Fork le repository
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Faites vos modifications
4. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
5. Push vers la branche (`git push origin feature/AmazingFeature`)
6. Ouvrez une Pull Request

## 💻 Style de code

### TypeScript

- Utilisez TypeScript pour tous les nouveaux fichiers
- Évitez `any`, préférez des types explicites
- Nommez les interfaces avec un suffixe `Interface` si nécessaire
- Utilisez des types union pour les enums

```typescript
// ✅ Bon
interface User {
  id: string;
  name: string;
  email: string;
}

type UserRole = 'admin' | 'user' | 'viewer';

// ❌ À éviter
const user: any = getUser();
```

### React

- Utilisez des composants fonctionnels avec hooks
- Nommez les composants en PascalCase
- Séparez la logique métier dans des hooks personnalisés
- Utilisez le contexte pour l'état global

```typescript
// ✅ Bon
export default function UserProfile() {
  const { user, updateUser } = useUser();
  
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

// ❌ À éviter
class UserProfile extends React.Component {
  // ...
}
```

### CSS / Tailwind

- Utilisez Tailwind CSS pour le styling
- Évitez les styles inline sauf pour les valeurs dynamiques
- Organisez les classes par catégorie (layout, spacing, colors)

```typescript
// ✅ Bon
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow">

// ❌ À éviter
<div style={{ display: 'flex', alignItems: 'center' }}>
```

### Commits

Suivez la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```
feat: ajouter la gestion des notifications
fix: corriger le calcul de la progression
docs: mettre à jour le README
style: formater le code avec Prettier
refactor: réorganiser les composants
test: ajouter des tests pour UserProfile
chore: mettre à jour les dépendances
```

## 🔄 Processus de pull request

1. **Vérifiez les tests** : Assurez-vous que tous les tests passent
   ```bash
   npm run test
   npm run typecheck
   npm run lint
   ```

2. **Mettez à jour la documentation** : Si vous ajoutez une fonctionnalité, mettez à jour le README

3. **Ajoutez des tests** : Pour les nouvelles fonctionnalités, ajoutez des tests unitaires

4. **Décrivez vos changements** : Dans la PR, expliquez :
   - Ce que vous avez fait
   - Pourquoi vous l'avez fait
   - Comment tester les changements
   - Les captures d'écran si pertinent

5. **Demandez une review** : Assignez au moins un reviewer

6. **Corrigez les commentaires** : Répondez aux commentaires et poussez les corrections

## 📁 Structure du projet

```
socletracker/
├── src/
│   ├── components/          # Composants React
│   │   ├── Dashboard.tsx
│   │   ├── UserProfile.tsx
│   │   └── ...
│   ├── context/             # Contextes React
│   │   └── UserContext.tsx
│   ├── data/                # Données et types
│   │   └── applications.ts
│   ├── App.tsx              # Composant principal
│   ├── main.tsx             # Point d'entrée
│   └── index.css            # Styles globaux
├── public/                  # Assets statiques
├── Dockerfile               # Configuration Docker
├── docker-compose.yml       # Docker Compose
├── nginx.conf               # Configuration Nginx
├── README.md                # Documentation principale
├── CHANGELOG.md             # Historique des versions
└── package.json             # Dépendances
```

### Ajouter un composant

1. Créez le fichier dans `src/components/`
2. Exportez le composant par défaut
3. Importez-le dans `src/App.tsx`
4. Ajoutez-le à la navigation si nécessaire

```typescript
// src/components/MyNewComponent.tsx
export default function MyNewComponent() {
  return <div>Mon nouveau composant</div>;
}

// src/App.tsx
import MyNewComponent from './components/MyNewComponent';
```

## 🧪 Tests

### Tests unitaires

```bash
# Lancer tous les tests
npm run test

# Lancer les tests en mode watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Tests d'intégration

Pour les tests d'intégration, utilisez React Testing Library :

```typescript
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('affiche le nom de l\'utilisateur', () => {
  render(<UserProfile user={{ name: 'Jean Dupont' }} />);
  expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
});
```

## 📝 Documentation

### README

- Mettez à jour le README pour toute nouvelle fonctionnalité
- Incluez des exemples de code
- Ajoutez des captures d'écran pour les changements UI

### Comments

- Commentez le code complexe
- Utilisez JSDoc pour les fonctions publiques

```typescript
/**
 * Calcule la progression de la migration
 * @param applications - Liste des applications
 * @returns Pourcentage de progression global
 */
function calculateProgress(applications: Application[]): number {
  // ...
}
```

### CHANGELOG

- Mettez à jour le CHANGELOG pour chaque PR
- Suivez le format [Keep a Changelog](https://keepachangelog.com/)

## 🐳 Développement avec Docker

```bash
# Construire l'image
docker build -t socletracker-dev .

# Lancer en mode développement
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules socletracker-dev npm run dev
```

## ❓ Questions ?

Si vous avez des questions, n'hésitez pas à :
- Ouvrir une [issue](https://github.com/your-org/socletracker/issues)
- Contacter l'équipe : contrib@socletracker.com

Merci de contribuer à SocleTracker ! 🚀
