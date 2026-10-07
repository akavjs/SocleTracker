export type Environment = 'dev' | 'staging' | 'prod' | 'preprod';
export type MigrationStatus = 'not_started' | 'in_progress' | 'completed' | 'blocked' | 'planned';
export type HelmStatus = 'valid' | 'missing_resources' | 'outdated' | 'error';

export interface DeploymentInfo {
  environment: Environment;
  version: string;
  lastDeployed: string;
  status: 'running' | 'pending' | 'failed' | 'deploying';
  replicas: number;
  pods: { name: string; status: 'running' | 'pending' | 'crashloop' }[];
}

export interface HelmResource {
  name: string;
  type: string;
  status: 'present' | 'missing' | 'error';
}

export interface Application {
  id: string;
  name: string;
  description: string;
  team: string;
  sourceSocle: string;
  targetSocle: string;
  migrationStatus: MigrationStatus;
  migrationProgress: number;
  deployments: DeploymentInfo[];
  helmChart: {
    repository: string;
    path: string;
    lastChecked: string;
    status: HelmStatus;
    resources: HelmResource[];
  };
  history: { date: string; event: string; environment: Environment }[];
  criticality: 'high' | 'medium' | 'low';
  estimatedCompletion: string;
}

export const applications: Application[] = [
  {
    id: '1',
    name: 'api-gateway',
    description: 'API Gateway principal - routage et authentification',
    team: 'Platform',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    migrationStatus: 'in_progress',
    migrationProgress: 72,
    deployments: [
      { environment: 'dev', version: '2.4.1-migration', lastDeployed: '2026-01-15T10:30:00', status: 'running', replicas: 2, pods: [{ name: 'api-gateway-7d9f8b6c4-x2k1n', status: 'running' }, { name: 'api-gateway-7d9f8b6c4-m3p5q', status: 'running' }] },
      { environment: 'staging', version: '2.4.0-migration', lastDeployed: '2026-01-14T14:20:00', status: 'running', replicas: 2, pods: [{ name: 'api-gateway-5c8e7a3d2-r4t6w', status: 'running' }, { name: 'api-gateway-5c8e7a3d2-y8u2i', status: 'running' }] },
      { environment: 'preprod', version: '2.3.8', lastDeployed: '2026-01-10T09:00:00', status: 'running', replicas: 3, pods: [{ name: 'api-gateway-4b7d6a2c1-p9o3q', status: 'running' }, { name: 'api-gateway-4b7d6a2c1-w5e8r', status: 'running' }, { name: 'api-gateway-4b7d6a2c1-t7y1u', status: 'running' }] },
      { environment: 'prod', version: '2.3.8', lastDeployed: '2026-01-08T16:45:00', status: 'running', replicas: 4, pods: [{ name: 'api-gateway-3a6c5b1d0-a2s4d', status: 'running' }, { name: 'api-gateway-3a6c5b1d0-f6g8h', status: 'running' }, { name: 'api-gateway-3a6c5b1d0-j1k3l', status: 'running' }, { name: 'api-gateway-3a6c5b1d0-z5x7c', status: 'running' }] },
    ],
    helmChart: {
      repository: 'gitlab.internal/platform/helm-charts',
      path: '/charts/api-gateway',
      lastChecked: '2026-01-15T11:00:00',
      status: 'valid',
      resources: [
        { name: 'deployment.yaml', type: 'Deployment', status: 'present' },
        { name: 'service.yaml', type: 'Service', status: 'present' },
        { name: 'ingress.yaml', type: 'Ingress', status: 'present' },
        { name: 'configmap.yaml', type: 'ConfigMap', status: 'present' },
        { name: 'secret.yaml', type: 'Secret', status: 'present' },
        { name: 'hpa.yaml', type: 'HorizontalPodAutoscaler', status: 'present' },
        { name: 'pdb.yaml', type: 'PodDisruptionBudget', status: 'present' },
      ]
    },
    history: [
      { date: '2026-01-15', event: 'Déploiement v2.4.1-migration sur DEV', environment: 'dev' },
      { date: '2026-01-14', event: 'Déploiement v2.4.0-migration sur STAGING', environment: 'staging' },
      { date: '2026-01-10', event: 'Validation des tests de migration', environment: 'dev' },
      { date: '2026-01-05', event: 'Début de la migration', environment: 'dev' },
    ],
    criticality: 'high',
    estimatedCompletion: '2026-02-01',
  },
  {
    id: '2',
    name: 'user-service',
    description: 'Service de gestion des utilisateurs et authentification',
    team: 'Identity',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    migrationStatus: 'completed',
    migrationProgress: 100,
    deployments: [
      { environment: 'dev', version: '3.1.0', lastDeployed: '2026-01-12T08:00:00', status: 'running', replicas: 2, pods: [{ name: 'user-service-8e7f6d5c4-a1b2c', status: 'running' }, { name: 'user-service-8e7f6d5c4-d3e4f', status: 'running' }] },
      { environment: 'staging', version: '3.1.0', lastDeployed: '2026-01-11T15:30:00', status: 'running', replicas: 2, pods: [{ name: 'user-service-7d6e5f4a3-g5h6i', status: 'running' }, { name: 'user-service-7d6e5f4a3-j7k8l', status: 'running' }] },
      { environment: 'preprod', version: '3.1.0', lastDeployed: '2026-01-10T12:00:00', status: 'running', replicas: 3, pods: [{ name: 'user-service-6c5d4e3b2-m9n0o', status: 'running' }, { name: 'user-service-6c5d4e3b2-p1q2r', status: 'running' }, { name: 'user-service-6c5d4e3b2-s3t4u', status: 'running' }] },
      { environment: 'prod', version: '3.1.0', lastDeployed: '2026-01-09T10:00:00', status: 'running', replicas: 4, pods: [{ name: 'user-service-5b4c3d2a1-v5w6x', status: 'running' }, { name: 'user-service-5b4c3d2a1-y7z8a', status: 'running' }, { name: 'user-service-5b4c3d2a1-b9c0d', status: 'running' }, { name: 'user-service-5b4c3d2a1-e1f2g', status: 'running' }] },
    ],
    helmChart: {
      repository: 'gitlab.internal/identity/helm-charts',
      path: '/charts/user-service',
      lastChecked: '2026-01-15T11:00:00',
      status: 'valid',
      resources: [
        { name: 'deployment.yaml', type: 'Deployment', status: 'present' },
        { name: 'service.yaml', type: 'Service', status: 'present' },
        { name: 'ingress.yaml', type: 'Ingress', status: 'present' },
        { name: 'configmap.yaml', type: 'ConfigMap', status: 'present' },
        { name: 'secret.yaml', type: 'Secret', status: 'present' },
      ]
    },
    history: [
      { date: '2026-01-09', event: 'Migration PROD terminée', environment: 'prod' },
      { date: '2026-01-05', event: 'Migration PREPROD terminée', environment: 'preprod' },
      { date: '2025-12-28', event: 'Migration STAGING terminée', environment: 'staging' },
      { date: '2025-12-20', event: 'Migration DEV terminée', environment: 'dev' },
    ],
    criticality: 'high',
    estimatedCompletion: '2026-01-09',
  },
  {
    id: '3',
    name: 'payment-processor',
    description: 'Traitement des paiements et intégration bancaires',
    team: 'Payments',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    migrationStatus: 'blocked',
    migrationProgress: 35,
    deployments: [
      { environment: 'dev', version: '1.8.2-migration', lastDeployed: '2026-01-13T09:15:00', status: 'failed', replicas: 1, pods: [{ name: 'payment-proc-9f8e7d6c5-h3i4j', status: 'crashloop' }] },
      { environment: 'staging', version: '1.8.0', lastDeployed: '2026-01-05T11:00:00', status: 'running', replicas: 2, pods: [{ name: 'payment-proc-8e7d6c5b4-k5l6m', status: 'running' }, { name: 'payment-proc-8e7d6c5b4-n7o8p', status: 'running' }] },
      { environment: 'prod', version: '1.8.0', lastDeployed: '2025-12-20T14:00:00', status: 'running', replicas: 4, pods: [{ name: 'payment-proc-7d6c5b4a3-q9r0s', status: 'running' }, { name: 'payment-proc-7d6c5b4a3-t1u2v', status: 'running' }, { name: 'payment-proc-7d6c5b4a3-w3x4y', status: 'running' }, { name: 'payment-proc-7d6c5b4a3-z5a6b', status: 'running' }] },
    ],
    helmChart: {
      repository: 'gitlab.internal/payments/helm-charts',
      path: '/charts/payment-processor',
      lastChecked: '2026-01-15T11:00:00',
      status: 'missing_resources',
      resources: [
        { name: 'deployment.yaml', type: 'Deployment', status: 'present' },
        { name: 'service.yaml', type: 'Service', status: 'present' },
        { name: 'ingress.yaml', type: 'Ingress', status: 'present' },
        { name: 'configmap.yaml', type: 'ConfigMap', status: 'present' },
        { name: 'secret.yaml', type: 'Secret', status: 'present' },
        { name: 'networkpolicy.yaml', type: 'NetworkPolicy', status: 'missing' },
        { name: 'servicemonitor.yaml', type: 'ServiceMonitor', status: 'missing' },
      ]
    },
    history: [
      { date: '2026-01-13', event: 'Échec déploiement DEV - incompatibilité NetworkPolicy', environment: 'dev' },
      { date: '2026-01-10', event: 'Tests DEV - problèmes de connectivité', environment: 'dev' },
      { date: '2026-01-03', event: 'Début de la migration', environment: 'dev' },
    ],
    criticality: 'high',
    estimatedCompletion: '2026-02-15',
  },
  {
    id: '4',
    name: 'notification-service',
    description: 'Service de notifications (email, SMS, push)',
    team: 'Communication',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    migrationStatus: 'in_progress',
    migrationProgress: 55,
    deployments: [
      { environment: 'dev', version: '2.0.1-migration', lastDeployed: '2026-01-14T16:00:00', status: 'running', replicas: 1, pods: [{ name: 'notif-svc-4c3d2e1f0-c7d8e', status: 'running' }] },
      { environment: 'staging', version: '2.0.0-migration', lastDeployed: '2026-01-13T10:30:00', status: 'running', replicas: 2, pods: [{ name: 'notif-svc-3b2c1d0e9-f9g0h', status: 'running' }, { name: 'notif-svc-3b2c1d0e9-i1j2k', status: 'running' }] },
      { environment: 'prod', version: '1.9.5', lastDeployed: '2025-12-15T09:00:00', status: 'running', replicas: 3, pods: [{ name: 'notif-svc-2a1b0c9d8-l3m4n', status: 'running' }, { name: 'notif-svc-2a1b0c9d8-o5p6q', status: 'running' }, { name: 'notif-svc-2a1b0c9d8-r7s8t', status: 'running' }] },
    ],
    helmChart: {
      repository: 'gitlab.internal/communication/helm-charts',
      path: '/charts/notification-service',
      lastChecked: '2026-01-15T11:00:00',
      status: 'outdated',
      resources: [
        { name: 'deployment.yaml', type: 'Deployment', status: 'present' },
        { name: 'service.yaml', type: 'Service', status: 'present' },
        { name: 'ingress.yaml', type: 'Ingress', status: 'present' },
        { name: 'configmap.yaml', type: 'ConfigMap', status: 'present' },
        { name: 'secret.yaml', type: 'Secret', status: 'present' },
        { name: 'cronjob.yaml', type: 'CronJob', status: 'error' },
      ]
    },
    history: [
      { date: '2026-01-14', event: 'Déploiement DEV réussi', environment: 'dev' },
      { date: '2026-01-13', event: 'Déploiement STAGING en cours', environment: 'staging' },
      { date: '2026-01-08', event: 'Début de la migration', environment: 'dev' },
    ],
    criticality: 'medium',
    estimatedCompletion: '2026-01-25',
  },
  {
    id: '5',
    name: 'data-pipeline',
    description: 'Pipeline de traitement de données ETL',
    team: 'Data',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    migrationStatus: 'planned',
    migrationProgress: 5,
    deployments: [
      { environment: 'prod', version: '4.2.1', lastDeployed: '2025-12-01T08:00:00', status: 'running', replicas: 2, pods: [{ name: 'data-pipe-1z0y9x8w7-u9v0w', status: 'running' }, { name: 'data-pipe-1z0y9x8w7-x1y2z', status: 'running' }] },
    ],
    helmChart: {
      repository: 'gitlab.internal/data/helm-charts',
      path: '/charts/data-pipeline',
      lastChecked: '2026-01-15T11:00:00',
      status: 'error',
      resources: [
        { name: 'deployment.yaml', type: 'Deployment', status: 'present' },
        { name: 'service.yaml', type: 'Service', status: 'present' },
        { name: 'configmap.yaml', type: 'ConfigMap', status: 'present' },
        { name: 'statefulset.yaml', type: 'StatefulSet', status: 'error' },
        { name: 'pvc.yaml', type: 'PersistentVolumeClaim', status: 'error' },
      ]
    },
    history: [
      { date: '2026-01-10', event: 'Planification de la migration', environment: 'dev' },
    ],
    criticality: 'medium',
    estimatedCompletion: '2026-03-01',
  },
  {
    id: '6',
    name: 'monitoring-agent',
    description: 'Agent de monitoring et collecte de métriques',
    team: 'Platform',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    migrationStatus: 'in_progress',
    migrationProgress: 88,
    deployments: [
      { environment: 'dev', version: '1.5.0', lastDeployed: '2026-01-14T07:00:00', status: 'running', replicas: 3, pods: [{ name: 'mon-agent-6a5b4c3d2-a3b4c', status: 'running' }, { name: 'mon-agent-6a5b4c3d2-d5e6f', status: 'running' }, { name: 'mon-agent-6a5b4c3d2-g7h8i', status: 'running' }] },
      { environment: 'staging', version: '1.5.0', lastDeployed: '2026-01-13T12:00:00', status: 'running', replicas: 3, pods: [{ name: 'mon-agent-5z4y3x2w1-j9k0l', status: 'running' }, { name: 'mon-agent-5z4y3x2w1-m1n2o', status: 'running' }, { name: 'mon-agent-5z4y3x2w1-p3q4r', status: 'running' }] },
      { environment: 'preprod', version: '1.5.0-rc1', lastDeployed: '2026-01-12T15:00:00', status: 'running', replicas: 3, pods: [{ name: 'mon-agent-4w3v2u1t0-s5t6u', status: 'running' }, { name: 'mon-agent-4w3v2u1t0-v7w8x', status: 'running' }, { name: 'mon-agent-4w3v2u1t0-y9z0a', status: 'running' }] },
      { environment: 'prod', version: '1.4.8', lastDeployed: '2025-12-10T10:00:00', status: 'running', replicas: 5, pods: [{ name: 'mon-agent-3r2q1p0o9-b1c2d', status: 'running' }, { name: 'mon-agent-3r2q1p0o9-e3f4g', status: 'running' }, { name: 'mon-agent-3r2q1p0o9-h5i6j', status: 'running' }, { name: 'mon-agent-3r2q1p0o9-k7l8m', status: 'running' }, { name: 'mon-agent-3r2q1p0o9-n9o0p', status: 'running' }] },
    ],
    helmChart: {
      repository: 'gitlab.internal/platform/helm-charts',
      path: '/charts/monitoring-agent',
      lastChecked: '2026-01-15T11:00:00',
      status: 'valid',
      resources: [
        { name: 'daemonset.yaml', type: 'DaemonSet', status: 'present' },
        { name: 'service.yaml', type: 'Service', status: 'present' },
        { name: 'configmap.yaml', type: 'ConfigMap', status: 'present' },
        { name: 'serviceaccount.yaml', type: 'ServiceAccount', status: 'present' },
        { name: 'clusterrole.yaml', type: 'ClusterRole', status: 'present' },
        { name: 'clusterrolebinding.yaml', type: 'ClusterRoleBinding', status: 'present' },
      ]
    },
    history: [
      { date: '2026-01-14', event: 'Validation finale PREPROD', environment: 'preprod' },
      { date: '2026-01-12', event: 'Déploiement PREPROD', environment: 'preprod' },
      { date: '2026-01-08', event: 'Déploiement STAGING', environment: 'staging' },
      { date: '2026-01-02', event: 'Début de la migration', environment: 'dev' },
    ],
    criticality: 'high',
    estimatedCompletion: '2026-01-20',
  },
  {
    id: '7',
    name: 'cms-frontend',
    description: 'Interface de gestion de contenu',
    team: 'Content',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    migrationStatus: 'not_started',
    migrationProgress: 0,
    deployments: [
      { environment: 'prod', version: '5.1.2', lastDeployed: '2025-11-20T14:00:00', status: 'running', replicas: 3, pods: [{ name: 'cms-front-2s1r0q9p8-q1r2s', status: 'running' }, { name: 'cms-front-2s1r0q9p8-t3u4v', status: 'running' }, { name: 'cms-front-2s1r0q9p8-w5x6y', status: 'running' }] },
    ],
    helmChart: {
      repository: 'gitlab.internal/content/helm-charts',
      path: '/charts/cms-frontend',
      lastChecked: '2026-01-15T11:00:00',
      status: 'valid',
      resources: [
        { name: 'deployment.yaml', type: 'Deployment', status: 'present' },
        { name: 'service.yaml', type: 'Service', status: 'present' },
        { name: 'ingress.yaml', type: 'Ingress', status: 'present' },
        { name: 'configmap.yaml', type: 'ConfigMap', status: 'present' },
      ]
    },
    history: [],
    criticality: 'low',
    estimatedCompletion: '2026-03-15',
  },
];

export const socles = [
  { id: 'legacy', name: 'Kubernetes 1.24 (Legacy)', description: 'Ancien socle - fin de vie prévue Q2 2026' },
  { id: 'ocp414', name: 'Kubernetes 1.28 (OCP 4.14)', description: 'Nouveau socle OpenShift 4.14' },
];

export const llmResponses: Record<string, string> = {
  'migration': `## État de la migration

**Progression globale : 50.7%**

| Application | Progression | Statut |
|---|---|---|
| monitoring-agent | 88% | ✅ En cours (avancé) |
| api-gateway | 72% | ✅ En cours |
| notification-service | 55% | ✅ En cours |
| payment-processor | 35% | 🔴 Bloqué |
| data-pipeline | 5% | 📋 Planifié |
| user-service | 100% | ✅ Terminé |
| cms-frontend | 0% | ⏳ Non démarré |

**Point d'attention :** Le payment-processor est bloqué depuis le 13/01 en raison d'une incompatibilité NetworkPolicy sur le nouveau socle.`,
  'bloqué': `## Applications bloquées

**payment-processor** (35% complété)
- **Blocage :** Incompatibilité NetworkPolicy avec OCP 4.14
- **Dernier événement :** Échec déploiement DEV - incompatibilité NetworkPolicy (13/01)
- **Ressources Helm manquantes :** NetworkPolicy, ServiceMonitor
- **Recommandation :** 
  1. Mettre à jour le chart Helm pour inclure les NetworkPolicy compatibles OCP
  2. Ajouter le ServiceMonitor pour la supervision
  3. Tester en DEV avant de relancer le pipeline CI/CD

**Impact :** Ce service est critique (traitement des paiements). Le retard pourrait impacter la roadmap Q1.`,
  'environnement': `## État des environnements en temps réel

### DEV
- 🟢 api-gateway v2.4.1-migration (2/2 pods)
- 🟢 user-service v3.1.0 (2/2 pods)
- 🔴 payment-processor v1.8.2-migration (0/1 pods - CrashLoopBackOff)
- 🟢 notification-service v2.0.1-migration (1/1 pods)
- 🟢 monitoring-agent v1.5.0 (3/3 pods)

### STAGING
- 🟢 api-gateway v2.4.0-migration (2/2 pods)
- 🟢 user-service v3.1.0 (2/2 pods)
- 🟢 payment-processor v1.8.0 (2/2 pods) - *ancien socle*
- 🟢 notification-service v2.0.0-migration (2/2 pods)
- 🟢 monitoring-agent v1.5.0 (3/3 pods)

### PREPROD
- 🟢 api-gateway v2.3.8 (3/3 pods) - *ancien socle*
- 🟢 user-service v3.1.0 (3/3 pods)
- 🟢 notification-service - *non déployé*
- 🟢 monitoring-agent v1.5.0-rc1 (3/3 pods)

### PROD
- 🟢 Toutes les applications opérationnelles sur l'ancien socle`,
  'helm': `## État des Charts Helm (GitLab)

| Application | Repository | Statut | Problèmes |
|---|---|---|---|
| api-gateway | platform/helm-charts | ✅ Valide | Aucun |
| user-service | identity/helm-charts | ✅ Valide | Aucun |
| payment-processor | payments/helm-charts | ⚠️ Ressources manquantes | NetworkPolicy, ServiceMonitor |
| notification-service | communication/helm-charts | ⚠️ Obsolète | CronJob en erreur |
| data-pipeline | data/helm-charts | 🔴 Erreur | StatefulSet, PVC en erreur |
| monitoring-agent | platform/helm-charts | ✅ Valide | Aucun |
| cms-frontend | content/helm-charts | ✅ Valide | Aucun |

**Actions requises :**
1. payment-processor : Ajouter NetworkPolicy et ServiceMonitor au chart
2. notification-service : Corriger le CronJob (API deprecated)
3. data-pipeline : Résoudre les erreurs StatefulSet/PVC avant migration`,
  'default': `Je suis votre assistant de suivi de migration. Voici ce que je peux faire :

- **migration** : État global de la migration
- **bloqué** : Applications en difficulté
- **environnement** : État des déploiements par environnement
- **helm** : État des charts Helm sur GitLab

Posez-moi une question sur la migration, les environnements, les charts Helm ou les blocages.`
};
