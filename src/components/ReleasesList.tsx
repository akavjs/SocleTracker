import { useState } from 'react';
import { releases, Release, ReleaseStatus } from '../data/releases';

export default function ReleasesList() {
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const [filterStatus, setFilterStatus] = useState<ReleaseStatus | 'all'>('all');

  const filteredReleases = filterStatus === 'all' 
    ? releases 
    : releases.filter(r => r.status === filterStatus);

  const getStatusColor = (status: ReleaseStatus) => {
    switch (status) {
      case 'released': return { bg: '#d1fae5', text: '#065f46', icon: '✅' };
      case 'in_progress': return { bg: '#dbeafe', text: '#1e40af', icon: '⚙️' };
      case 'deploying': return { bg: '#fef3c7', text: '#92400e', icon: '🚀' };
      case 'rolled_back': return { bg: '#fee2e2', text: '#991b1b', icon: '↩️' };
      case 'cancelled': return { bg: '#f3f4f6', text: '#6b7280', icon: '❌' };
      default: return { bg: '#f3f4f6', text: '#6b7280', icon: '📋' };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return { bg: '#fee2e2', text: '#991b1b' };
      case 'high': return { bg: '#fef3c7', text: '#92400e' };
      case 'medium': return { bg: '#dbeafe', text: '#1e40af' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  if (selectedRelease) {
    const statusColor = getStatusColor(selectedRelease.status);
    const priorityColor = getPriorityColor(selectedRelease.priority);

    return (
      <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
        <button
          onClick={() => setSelectedRelease(null)}
          style={{ marginBottom: '20px', padding: '8px 16px', background: '#f3f4f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
        >
          <i className="fas fa-arrow-left" style={{ marginRight: '8px' }}></i>
          Retour à la liste
        </button>

        {/* Header */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{selectedRelease.version}</h1>
                <span style={{ padding: '6px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', background: statusColor.bg, color: statusColor.text }}>
                  {statusColor.icon} {selectedRelease.status}
                </span>
                <span style={{ padding: '6px 16px', borderRadius: '12px', fontSize: '14px', fontWeight: '600', background: priorityColor.bg, color: priorityColor.text }}>
                  {selectedRelease.priority.toUpperCase()}
                </span>
              </div>
              <h2 style={{ fontSize: '20px', color: '#6b7280', marginBottom: '8px' }}>{selectedRelease.name}</h2>
              <p style={{ fontSize: '14px', color: '#9ca3af' }}>{selectedRelease.description}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>Release Manager</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{selectedRelease.releaseManager}</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', padding: '20px', background: '#f9fafb', borderRadius: '8px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Date prévue</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedRelease.plannedDate}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Date déploiement</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedRelease.deployedDate || 'Non déployé'}</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Durée estimée</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{selectedRelease.estimatedDuration} min</p>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Niveau de risque</p>
              <p style={{ fontSize: '14px', fontWeight: '600', color: selectedRelease.riskLevel === 'high' ? '#ef4444' : selectedRelease.riskLevel === 'medium' ? '#f59e0b' : '#10b981' }}>
                {selectedRelease.riskLevel.toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        {/* Deployments Pipeline */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
            <i className="fas fa-stream" style={{ color: '#3b82f6', marginRight: '8px' }}></i>
            Pipeline de déploiement
          </h2>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}>
            {selectedRelease.deployments.map((deployment, idx) => (
              <div key={deployment.id} style={{ flex: '0 0 250px', padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                    {deployment.environment.toUpperCase()}
                  </h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: deployment.status === 'success' ? '#d1fae5' : deployment.status === 'failed' ? '#fee2e2' : deployment.status === 'deploying' ? '#dbeafe' : '#f3f4f6',
                    color: deployment.status === 'success' ? '#065f46' : deployment.status === 'failed' ? '#991b1b' : deployment.status === 'deploying' ? '#1e40af' : '#6b7280'
                  }}>
                    {deployment.status}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>
                  <p><i className="fas fa-user" style={{ marginRight: '6px' }}></i>{deployment.deployedBy}</p>
                  {deployment.deployedAt && <p><i className="fas fa-clock" style={{ marginRight: '6px' }}></i>{new Date(deployment.deployedAt).toLocaleString('fr-FR')}</p>}
                  {deployment.duration && <p><i className="fas fa-hourglass-half" style={{ marginRight: '6px' }}></i>{deployment.duration} min</p>}
                </div>
                <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                  <p><i className="fas fa-cube" style={{ marginRight: '6px' }}></i>{deployment.pods.ready}/{deployment.pods.total} pods</p>
                  <p><i className="fas fa-heartbeat" style={{ marginRight: '6px' }}></i>{deployment.healthCheck}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
          {/* Features & Fixes */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              <i className="fas fa-star" style={{ color: '#f59e0b', marginRight: '8px' }}></i>
              Nouvelles fonctionnalités
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {selectedRelease.features.map((feature, idx) => (
                <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#374151' }}>
                  <i className="fas fa-check-circle" style={{ color: '#10b981', marginRight: '8px' }}></i>
                  {feature}
                </li>
              ))}
            </ul>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '16px' }}>
              <i className="fas fa-bug" style={{ color: '#ef4444', marginRight: '8px' }}></i>
              Corrections
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {selectedRelease.fixes.map((fix, idx) => (
                <li key={idx} style={{ padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '14px', color: '#374151' }}>
                  <i className="fas fa-wrench" style={{ color: '#3b82f6', marginRight: '8px' }}></i>
                  {fix}
                </li>
              ))}
            </ul>
          </div>

          {/* Approvals & Teams */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
              <i className="fas fa-check-double" style={{ color: '#10b981', marginRight: '8px' }}></i>
              Approbations
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedRelease.approvals.map(approval => (
                <div key={approval.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600' }}>
                    {approval.approver.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{approval.approver}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280' }}>{approval.role}</p>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: approval.status === 'approved' ? '#d1fae5' : approval.status === 'rejected' ? '#fee2e2' : '#fef3c7',
                    color: approval.status === 'approved' ? '#065f46' : approval.status === 'rejected' ? '#991b1b' : '#92400e'
                  }}>
                    {approval.status}
                  </span>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '16px' }}>
              <i className="fas fa-users" style={{ color: '#8b5cf6', marginRight: '8px' }}></i>
              Équipes impliquées
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedRelease.teams.map(team => (
                <span key={team} style={{ padding: '6px 12px', background: '#ede9fe', color: '#6d28d9', borderRadius: '8px', fontSize: '13px', fontWeight: '500' }}>
                  {team}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Breaking Changes & Jira */}
        {selectedRelease.breakingChanges.length > 0 && (
          <div style={{ background: '#fef2f2', borderRadius: '12px', padding: '24px', border: '1px solid #fecaca', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#991b1b', marginBottom: '16px' }}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
              Breaking Changes
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {selectedRelease.breakingChanges.map((change, idx) => (
                <li key={idx} style={{ padding: '8px 0', fontSize: '14px', color: '#7f1d1d' }}>
                  <i className="fas fa-times-circle" style={{ color: '#ef4444', marginRight: '8px' }}></i>
                  {change}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
            <i className="fab fa-jira" style={{ color: '#0052cc', marginRight: '8px' }}></i>
            Tickets Jira liés
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedRelease.jiraTickets.map(ticket => (
              <a
                key={ticket}
                href={`https://jira.company.com/browse/${ticket}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ padding: '6px 12px', background: '#e0e7ff', color: '#3730a3', borderRadius: '8px', fontSize: '13px', fontWeight: '500', textDecoration: 'none' }}
              >
                {ticket}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          📦 Gestion des Releases
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Suivi complet de toutes les releases et leur cycle de vie
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setFilterStatus('all')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: filterStatus === 'all' ? '#4f46e5' : '#f3f4f6',
            color: filterStatus === 'all' ? 'white' : '#374151',
            cursor: 'pointer',
            fontWeight: '500'
          }}
        >
          Toutes ({releases.length})
        </button>
        {(['released', 'in_progress', 'deploying', 'rolled_back', 'cancelled'] as ReleaseStatus[]).map(status => {
          const count = releases.filter(r => r.status === status).length;
          if (count === 0) return null;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: filterStatus === status ? '#4f46e5' : '#f3f4f6',
                color: filterStatus === status ? 'white' : '#374151',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              {getStatusColor(status).icon} {status} ({count})
            </button>
          );
        })}
      </div>

      {/* Releases List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredReleases.map(release => {
          const statusColor = getStatusColor(release.status);
          const priorityColor = getPriorityColor(release.priority);

          return (
            <div
              key={release.id}
              onClick={() => setSelectedRelease(release)}
              style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{release.version}</h2>
                    <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', background: statusColor.bg, color: statusColor.text }}>
                      {statusColor.icon} {release.status}
                    </span>
                    <span style={{ padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', background: priorityColor.bg, color: priorityColor.text }}>
                      {release.priority.toUpperCase()}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '16px', color: '#6b7280', marginBottom: '4px' }}>{release.name}</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af' }}>{release.description}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>Release Manager</p>
                  <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{release.releaseManager}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#6b7280', marginBottom: '16px' }}>
                <span><i className="fas fa-calendar" style={{ marginRight: '6px' }}></i>Prévu: {release.plannedDate}</span>
                <span><i className="fas fa-layer-group" style={{ marginRight: '6px' }}></i>{release.environments.length} environnements</span>
                <span><i className="fas fa-star" style={{ marginRight: '6px' }}></i>{release.features.length} features</span>
                <span><i className="fas fa-bug" style={{ marginRight: '6px' }}></i>{release.fixes.length} fixes</span>
              </div>

              {/* Deployment Progress */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {release.deployments.map(deployment => (
                  <div
                    key={deployment.id}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: '6px',
                      background: deployment.status === 'success' ? '#d1fae5' : deployment.status === 'failed' ? '#fee2e2' : deployment.status === 'deploying' ? '#dbeafe' : '#f3f4f6',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: deployment.status === 'success' ? '#065f46' : deployment.status === 'failed' ? '#991b1b' : deployment.status === 'deploying' ? '#1e40af' : '#6b7280'
                    }}
                  >
                    {deployment.environment.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
