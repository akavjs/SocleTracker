import { releases, services, teamMembers, releaseCalendar, kpiMetrics } from '../data/releases';

export default function ReleaseDashboard() {
  const activeReleases = releases.filter(r => r.status === 'in_progress' || r.status === 'deploying');
  const upcomingDeployments = releaseCalendar.filter(c => c.status === 'scheduled').slice(0, 5);
  const onCallTeam = teamMembers.filter(m => m.onCall);

  return (
    <div style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          🚀 Release Command Center
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Vue d'ensemble de toutes les releases, déploiements et équipes
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#dbeafe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-rocket" style={{ color: '#3b82f6', fontSize: '20px' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Releases ce mois</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{kpiMetrics.totalReleases}</p>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>
            <i className="fas fa-arrow-up"></i> +12% vs mois dernier
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#d1fae5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-check-circle" style={{ color: '#10b981', fontSize: '20px' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Taux de succès</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{((kpiMetrics.successfulReleases / kpiMetrics.totalReleases) * 100).toFixed(1)}%</p>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>
            <i className="fas fa-arrow-up"></i> +2.3% vs mois dernier
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#fef3c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-clock" style={{ color: '#f59e0b', fontSize: '20px' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Temps moyen déploiement</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{kpiMetrics.avgDeploymentTime} min</p>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>
            <i className="fas fa-arrow-down"></i> -3 min vs mois dernier
          </div>
        </div>

        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#fee2e2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#ef4444', fontSize: '20px' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>Taux d'échec</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827' }}>{kpiMetrics.changeFailureRate}%</p>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>
            <i className="fas fa-arrow-down"></i> -1.2% vs mois dernier
          </div>
        </div>
      </div>

      {/* Active Releases & On-Call Team */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Active Releases */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
              <i className="fas fa-bolt" style={{ color: '#f59e0b', marginRight: '8px' }}></i>
              Releases en cours
            </h2>
            <span style={{ background: '#fef3c7', color: '#92400e', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>
              {activeReleases.length} actives
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {activeReleases.map(release => (
              <div key={release.id} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>{release.version}</h3>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                        background: release.priority === 'critical' ? '#fee2e2' : release.priority === 'high' ? '#fef3c7' : '#dbeafe',
                        color: release.priority === 'critical' ? '#991b1b' : release.priority === 'high' ? '#92400e' : '#1e40af'
                      }}>
                        {release.priority.toUpperCase()}
                      </span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#6b7280' }}>{release.name}</p>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '600',
                    background: release.status === 'deploying' ? '#dbeafe' : '#fef3c7',
                    color: release.status === 'deploying' ? '#1e40af' : '#92400e'
                  }}>
                    {release.status === 'deploying' ? '🚀 Déploiement' : '⚙️ En cours'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
                  <span><i className="fas fa-user" style={{ marginRight: '4px' }}></i>{release.releaseManager}</span>
                  <span><i className="fas fa-calendar" style={{ marginRight: '4px' }}></i>Prévu: {release.plannedDate}</span>
                  <span><i className="fas fa-layer-group" style={{ marginRight: '4px' }}></i>{release.environments.length} env.</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* On-Call Team */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
            <i className="fas fa-phone-alt" style={{ color: '#10b981', marginRight: '8px' }}></i>
            Équipe On-Call
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {onCallTeam.map(member => (
              <div key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{member.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{member.team}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>● En ligne</p>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Deployments & Service Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Upcoming Deployments */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
            <i className="fas fa-calendar-alt" style={{ color: '#8b5cf6', marginRight: '8px' }}></i>
            Prochains déploiements
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingDeployments.map(deployment => (
              <div key={deployment.id} style={{ padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{deployment.title}</h3>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    background: deployment.environment === 'prod' ? '#fee2e2' : deployment.environment === 'preprod' ? '#fef3c7' : '#dbeafe',
                    color: deployment.environment === 'prod' ? '#991b1b' : deployment.environment === 'preprod' ? '#92400e' : '#1e40af'
                  }}>
                    {deployment.environment.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
                  <span><i className="fas fa-calendar" style={{ marginRight: '4px' }}></i>{deployment.date}</span>
                  <span><i className="fas fa-clock" style={{ marginRight: '4px' }}></i>{deployment.duration} min</span>
                  <span><i className="fas fa-users" style={{ marginRight: '4px' }}></i>{deployment.teams.length} équipes</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Health */}
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
            <i className="fas fa-heartbeat" style={{ color: '#ef4444', marginRight: '8px' }}></i>
            Santé des services
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {services.slice(0, 5).map(service => (
              <div key={service.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f9fafb', borderRadius: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: service.health === 'healthy' ? '#10b981' : service.health === 'degraded' ? '#f59e0b' : '#ef4444'
                }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{service.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{service.team}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>PROD: {service.currentVersion.prod}</p>
                  <p style={{ fontSize: '11px', color: '#9ca3af' }}>Dernier: {service.lastDeployed.prod}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
