export type ReleaseStatus = 'planned' | 'in_progress' | 'deploying' | 'released' | 'rolled_back' | 'cancelled';
export type DeploymentStatus = 'pending' | 'deploying' | 'success' | 'failed' | 'rolled_back';
export type Environment = 'dev' | 'staging' | 'preprod' | 'prod';
export type Priority = 'critical' | 'high' | 'medium' | 'low';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface Release {
  id: string;
  version: string;
  name: string;
  description: string;
  status: ReleaseStatus;
  priority: Priority;
  releaseManager: string;
  teams: string[];
  plannedDate: string;
  deployedDate?: string;
  environments: Environment[];
  features: string[];
  fixes: string[];
  breakingChanges: string[];
  approvals: Approval[];
  deployments: Deployment[];
  changelog: string;
  jiraTickets: string[];
  gitTag?: string;
  rollbackVersion?: string;
  riskLevel: 'low' | 'medium' | 'high';
  estimatedDuration: number; // minutes
  actualDuration?: number;
}

export interface Approval {
  id: string;
  approver: string;
  role: string;
  status: ApprovalStatus;
  date?: string;
  comment?: string;
}

export interface Deployment {
  id: string;
  environment: Environment;
  status: DeploymentStatus;
  deployedBy: string;
  deployedAt?: string;
  duration?: number;
  artifacts: string[];
  rollbackAvailable: boolean;
  healthCheck: 'passing' | 'failing' | 'unknown';
  pods: { total: number; ready: number };
}

export interface Service {
  id: string;
  name: string;
  team: string;
  repository: string;
  currentVersion: Record<Environment, string>;
  lastDeployed: Record<Environment, string>;
  health: 'healthy' | 'degraded' | 'down';
  dependencies: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'release_manager' | 'dev_lead' | 'qa_lead' | 'ops_lead' | 'developer' | 'qa' | 'ops';
  team: string;
  avatar?: string;
  onCall?: boolean;
}

export interface ReleaseCalendar {
  id: string;
  title: string;
  releaseId: string;
  date: string;
  environment: Environment;
  type: 'release' | 'hotfix' | 'maintenance' | 'rollback';
  duration: number;
  teams: string[];
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
}

export const releases: Release[] = [
  {
    id: 'rel-001',
    version: 'v2.5.0',
    name: 'Release Janvier 2026',
    description: 'Release majeure avec nouvelles fonctionnalités de monitoring et corrections de sécurité',
    status: 'released',
    priority: 'high',
    releaseManager: 'Jean Dupont',
    teams: ['Platform', 'Identity', 'Security'],
    plannedDate: '2026-01-15',
    deployedDate: '2026-01-15',
    environments: ['dev', 'staging', 'preprod', 'prod'],
    features: [
      'Dashboard de monitoring unifié',
      'Authentification SSO améliorée',
      'Export PDF des rapports',
      'Notifications Slack/Teams'
    ],
    fixes: [
      'Correction fuite mémoire API Gateway',
      'Fix timeout sur payment-processor',
      'Correction affichage mobile'
    ],
    breakingChanges: ['API v1 dépréciée - migration vers v2 obligatoire'],
    approvals: [
      { id: '1', approver: 'Marie Martin', role: 'Tech Lead', status: 'approved', date: '2026-01-14', comment: 'LGTM' },
      { id: '2', approver: 'Pierre Bernard', role: 'QA Lead', status: 'approved', date: '2026-01-14' },
      { id: '3', approver: 'Sophie Dubois', role: 'Ops Lead', status: 'approved', date: '2026-01-15' },
    ],
    deployments: [
      { id: 'd1', environment: 'dev', status: 'success', deployedBy: 'Jean Dupont', deployedAt: '2026-01-13T10:00:00', duration: 5, artifacts: ['api-gateway:2.5.0', 'user-service:3.2.0'], rollbackAvailable: true, healthCheck: 'passing', pods: { total: 10, ready: 10 } },
      { id: 'd2', environment: 'staging', status: 'success', deployedBy: 'Jean Dupont', deployedAt: '2026-01-14T14:00:00', duration: 8, artifacts: ['api-gateway:2.5.0', 'user-service:3.2.0'], rollbackAvailable: true, healthCheck: 'passing', pods: { total: 15, ready: 15 } },
      { id: 'd3', environment: 'preprod', status: 'success', deployedBy: 'Luc Moreau', deployedAt: '2026-01-15T08:00:00', duration: 12, artifacts: ['api-gateway:2.5.0', 'user-service:3.2.0'], rollbackAvailable: true, healthCheck: 'passing', pods: { total: 20, ready: 20 } },
      { id: 'd4', environment: 'prod', status: 'success', deployedBy: 'Luc Moreau', deployedAt: '2026-01-15T22:00:00', duration: 15, artifacts: ['api-gateway:2.5.0', 'user-service:3.2.0'], rollbackAvailable: true, healthCheck: 'passing', pods: { total: 40, ready: 40 } },
    ],
    changelog: '## v2.5.0\n\n### Features\n- Dashboard monitoring unifié\n- SSO amélioré\n- Export PDF\n- Notifications Slack/Teams\n\n### Fixes\n- Fuite mémoire API Gateway\n- Timeout payment-processor\n- Affichage mobile\n\n### Breaking Changes\n- API v1 dépréciée',
    jiraTickets: ['MIGRATION-123', 'MIGRATION-124', 'MIGRATION-125', 'BUG-456', 'BUG-457'],
    gitTag: 'v2.5.0',
    riskLevel: 'high',
    estimatedDuration: 45,
    actualDuration: 40,
  },
  {
    id: 'rel-002',
    version: 'v2.6.0',
    name: 'Release Février 2026',
    description: 'Migration des services restants et amélioration des performances',
    status: 'in_progress',
    priority: 'critical',
    releaseManager: 'Jean Dupont',
    teams: ['Platform', 'Payments', 'Data'],
    plannedDate: '2026-02-01',
    environments: ['dev', 'staging', 'preprod', 'prod'],
    features: [
      'Migration payment-processor vers OCP 4.14',
      'Optimisation des requêtes data-pipeline',
      'Nouveau système de cache Redis'
    ],
    fixes: [
      'Correction race condition sur les notifications',
      'Fix memory leak sur le monitoring agent'
    ],
    breakingChanges: [],
    approvals: [
      { id: '4', approver: 'Marie Martin', role: 'Tech Lead', status: 'approved', date: '2026-01-20' },
      { id: '5', approver: 'Pierre Bernard', role: 'QA Lead', status: 'pending' },
      { id: '6', approver: 'Sophie Dubois', role: 'Ops Lead', status: 'pending' },
    ],
    deployments: [
      { id: 'd5', environment: 'dev', status: 'success', deployedBy: 'Jean Dupont', deployedAt: '2026-01-22T09:00:00', duration: 6, artifacts: ['payment-processor:1.9.0', 'data-pipeline:4.3.0'], rollbackAvailable: true, healthCheck: 'passing', pods: { total: 8, ready: 8 } },
      { id: 'd6', environment: 'staging', status: 'deploying', deployedBy: 'Jean Dupont', artifacts: ['payment-processor:1.9.0', 'data-pipeline:4.3.0'], rollbackAvailable: true, healthCheck: 'unknown', pods: { total: 12, ready: 6 } },
    ],
    changelog: '## v2.6.0\n\n### Features\n- Migration payment-processor\n- Optimisation data-pipeline\n- Cache Redis\n\n### Fixes\n- Race condition notifications\n- Memory leak monitoring',
    jiraTickets: ['MIGRATION-130', 'MIGRATION-131', 'PERF-001'],
    riskLevel: 'high',
    estimatedDuration: 60,
  },
  {
    id: 'rel-003',
    version: 'v2.5.1',
    name: 'Hotfix - Critical Security Patch',
    description: 'Correction critique de sécurité sur l\'authentification',
    status: 'deploying',
    priority: 'critical',
    releaseManager: 'Luc Moreau',
    teams: ['Security', 'Identity'],
    plannedDate: '2026-01-18',
    environments: ['prod'],
    features: [],
    fixes: [
      'CVE-2026-001 - Vulnérabilité authentification JWT',
      'CVE-2026-002 - Injection SQL sur endpoint API'
    ],
    breakingChanges: [],
    approvals: [
      { id: '7', approver: 'Marie Martin', role: 'Tech Lead', status: 'approved', date: '2026-01-18' },
      { id: '8', approver: 'Sophie Dubois', role: 'Ops Lead', status: 'approved', date: '2026-01-18' },
    ],
    deployments: [
      { id: 'd7', environment: 'prod', status: 'deploying', deployedBy: 'Luc Moreau', artifacts: ['user-service:3.1.1', 'api-gateway:2.5.1'], rollbackAvailable: true, healthCheck: 'unknown', pods: { total: 40, ready: 20 } },
    ],
    changelog: '## v2.5.1 - HOTFIX\n\n### Security\n- CVE-2026-001 - Fix JWT auth\n- CVE-2026-002 - Fix SQL injection',
    jiraTickets: ['SEC-001', 'SEC-002'],
    gitTag: 'v2.5.1',
    riskLevel: 'critical' as any,
    estimatedDuration: 20,
  },
];

export const services: Service[] = [
  { id: '1', name: 'api-gateway', team: 'Platform', repository: 'gitlab.internal/platform/api-gateway', currentVersion: { dev: '2.6.0', staging: '2.5.0', preprod: '2.5.0', prod: '2.5.1' }, lastDeployed: { dev: '2026-01-22', staging: '2026-01-14', preprod: '2026-01-15', prod: '2026-01-18' }, health: 'healthy', dependencies: ['user-service', 'notification-service'] },
  { id: '2', name: 'user-service', team: 'Identity', repository: 'gitlab.internal/identity/user-service', currentVersion: { dev: '3.2.0', staging: '3.2.0', preprod: '3.2.0', prod: '3.1.1' }, lastDeployed: { dev: '2026-01-22', staging: '2026-01-14', preprod: '2026-01-15', prod: '2026-01-18' }, health: 'healthy', dependencies: ['notification-service'] },
  { id: '3', name: 'payment-processor', team: 'Payments', repository: 'gitlab.internal/payments/payment-processor', currentVersion: { dev: '1.9.0', staging: '1.9.0', preprod: '1.8.0', prod: '1.8.0' }, lastDeployed: { dev: '2026-01-22', staging: '2026-01-22', preprod: '2026-01-10', prod: '2025-12-20' }, health: 'degraded', dependencies: ['api-gateway', 'notification-service'] },
  { id: '4', name: 'notification-service', team: 'Communication', repository: 'gitlab.internal/communication/notification-service', currentVersion: { dev: '2.0.1', staging: '2.0.0', preprod: '1.9.5', prod: '1.9.5' }, lastDeployed: { dev: '2026-01-14', staging: '2026-01-13', preprod: '2026-01-05', prod: '2025-12-15' }, health: 'healthy', dependencies: [] },
  { id: '5', name: 'data-pipeline', team: 'Data', repository: 'gitlab.internal/data/data-pipeline', currentVersion: { dev: '4.3.0', staging: '4.2.1', preprod: '4.2.1', prod: '4.2.1' }, lastDeployed: { dev: '2026-01-22', staging: '2026-01-10', preprod: '2026-01-05', prod: '2025-12-01' }, health: 'healthy', dependencies: ['api-gateway'] },
  { id: '6', name: 'monitoring-agent', team: 'Platform', repository: 'gitlab.internal/platform/monitoring-agent', currentVersion: { dev: '1.5.0', staging: '1.5.0', preprod: '1.5.0', prod: '1.4.8' }, lastDeployed: { dev: '2026-01-14', staging: '2026-01-13', preprod: '2026-01-12', prod: '2025-12-10' }, health: 'healthy', dependencies: [] },
  { id: '7', name: 'cms-frontend', team: 'Content', repository: 'gitlab.internal/content/cms-frontend', currentVersion: { dev: '5.1.2', staging: '5.1.2', preprod: '5.1.2', prod: '5.1.2' }, lastDeployed: { dev: '2026-01-05', staging: '2026-01-03', preprod: '2025-12-28', prod: '2025-11-20' }, health: 'healthy', dependencies: ['api-gateway'] },
];

export const teamMembers: TeamMember[] = [
  { id: '1', name: 'Jean Dupont', email: 'jean.dupont@company.com', role: 'release_manager', team: 'Platform', onCall: true },
  { id: '2', name: 'Marie Martin', email: 'marie.martin@company.com', role: 'dev_lead', team: 'Identity' },
  { id: '3', name: 'Pierre Bernard', email: 'pierre.bernard@company.com', role: 'qa_lead', team: 'Payments' },
  { id: '4', name: 'Sophie Dubois', email: 'sophie.dubois@company.com', role: 'ops_lead', team: 'Platform', onCall: true },
  { id: '5', name: 'Luc Moreau', email: 'luc.moreau@company.com', role: 'release_manager', team: 'Platform' },
  { id: '6', name: 'Emma Petit', email: 'emma.petit@company.com', role: 'developer', team: 'Communication' },
  { id: '7', name: 'Thomas Roux', email: 'thomas.roux@company.com', role: 'qa', team: 'Data' },
  { id: '8', name: 'Julie Simon', email: 'julie.simon@company.com', role: 'ops', team: 'Platform' },
];

export const releaseCalendar: ReleaseCalendar[] = [
  { id: 'cal-1', title: 'Release v2.5.0 - PROD', releaseId: 'rel-001', date: '2026-01-15', environment: 'prod', type: 'release', duration: 45, teams: ['Platform', 'Identity'], status: 'completed' },
  { id: 'cal-2', title: 'Hotfix v2.5.1 - Security', releaseId: 'rel-003', date: '2026-01-18', environment: 'prod', type: 'hotfix', duration: 20, teams: ['Security', 'Identity'], status: 'in_progress' },
  { id: 'cal-3', title: 'Release v2.6.0 - DEV', releaseId: 'rel-002', date: '2026-01-22', environment: 'dev', type: 'release', duration: 30, teams: ['Platform', 'Payments'], status: 'completed' },
  { id: 'cal-4', title: 'Release v2.6.0 - STAGING', releaseId: 'rel-002', date: '2026-01-25', environment: 'staging', type: 'release', duration: 45, teams: ['Platform', 'Payments'], status: 'scheduled' },
  { id: 'cal-5', title: 'Release v2.6.0 - PREPROD', releaseId: 'rel-002', date: '2026-01-28', environment: 'preprod', type: 'release', duration: 60, teams: ['Platform', 'Payments'], status: 'scheduled' },
  { id: 'cal-6', title: 'Release v2.6.0 - PROD', releaseId: 'rel-002', date: '2026-02-01', environment: 'prod', type: 'release', duration: 90, teams: ['Platform', 'Payments', 'Data'], status: 'scheduled' },
  { id: 'cal-7', title: 'Maintenance - Redis Upgrade', releaseId: '', date: '2026-02-05', environment: 'prod', type: 'maintenance', duration: 120, teams: ['Platform'], status: 'scheduled' },
];

export const kpiMetrics = {
  totalReleases: 47,
  successfulReleases: 44,
  failedReleases: 2,
  rolledBack: 1,
  avgDeploymentTime: 18, // minutes
  avgReleaseFrequency: 7.2, // days
  mttr: 25, // minutes - Mean Time To Recovery
  changeFailureRate: 4.3, // percentage
  deploymentFrequency: 'weekly',
  leadTimeForChanges: 3.2, // days
};
