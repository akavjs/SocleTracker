# Secrets requis pour GitHub Actions

Ce document liste les secrets GitHub nécessaires pour les workflows CI/CD.

## 🔐 Secrets requis

### Pour le workflow Docker Build

Aucun secret requis pour les builds de base. Les workflows utilisent automatiquement `GITHUB_TOKEN`.

### Pour le déploiement Kubernetes

| Secret | Description | Requis pour |
|--------|-------------|-------------|
| `KUBECONFIG` | Configuration kubectl pour accéder au cluster | Déploiement |
| `SLACK_WEBHOOK_URL` | Webhook Slack pour les notifications | Notifications (optionnel) |

### Pour Docker Hub (optionnel)

Si vous souhaitez pousser vers Docker Hub au lieu de GitHub Container Registry :

| Secret | Description |
|--------|-------------|
| `DOCKERHUB_USERNAME` | Nom d'utilisateur Docker Hub |
| `DOCKERHUB_TOKEN` | Token d'accès Docker Hub |

## 📝 Configuration des secrets

### 1. Accéder aux paramètres du repository

1. Allez sur votre repository GitHub
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**

### 2. Ajouter un secret

1. Cliquez sur **New repository secret**
2. Entrez le **Name** du secret (ex: `KUBECONFIG`)
3. Entrez la **Value** du secret
4. Cliquez sur **Add secret**

### 3. Exemple : Configurer KUBECONFIG

```bash
# Récupérer le kubeconfig depuis votre cluster
kubectl config view --raw > kubeconfig.yaml

# Encoder en base64 (optionnel, pour le copier)
base64 -i kubeconfig.yaml | pbcopy  # macOS
base64 -i kubeconfig.yaml | xclip   # Linux

# Coller le contenu dans le secret GitHub
```

### 4. Exemple : Configurer Slack Webhook

1. Allez sur https://api.slack.com/messaging/webhooks
2. Créez un nouveau webhook pour votre canal
3. Copiez l'URL du webhook
4. Ajoutez-la comme secret `SLACK_WEBHOOK_URL`

## 🔒 Bonnes pratiques

### Sécurité

- ✅ Utilisez des tokens avec les permissions minimales nécessaires
- ✅ Rotatez régulièrement les secrets
- ✅ Ne commitez jamais de secrets dans le code
- ✅ Utilisez des secrets différents pour chaque environnement

### Gestion

- 📋 Documentez tous les secrets requis
- 🔄 Testez les secrets après modification
- 📊 Auditez régulièrement les secrets utilisés
- 🗑️ Supprimez les secrets inutilisés

## 🧪 Tester les secrets

### Tester localement avec act

```bash
# Installer act
brew install act  # macOS
# ou
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Créer un fichier .secrets
cat > .secrets <<EOF
KUBECONFIG=your-kubeconfig-content
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
EOF

# Lancer le workflow localement
act -s KUBECONFIG -s SLACK_WEBHOOK_URL
```

### Tester en PR

1. Créez une branche de test
2. Modifiez le workflow pour tester sur PR
3. Vérifiez les logs dans l'onglet Actions

## 📚 Ressources

- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Kubernetes Authentication](https://kubernetes.io/docs/reference/access-authn-authz/)
- [Slack Webhooks](https://api.slack.com/messaging/webhooks)
- [Docker Hub Access Tokens](https://docs.docker.com/docker-hub/access-tokens/)
