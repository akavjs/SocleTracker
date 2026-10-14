import { services, Environment } from '../data/releases';

export default function ServicesRegistry() {
  const environments: Environment[] = ['dev', 'staging', 'preprod', 'prod'];

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return { bg: '#d1fae5', text: '#065f46', icon: '🟢' };
      case 'degraded': return { bg: '#fef3c7', text: '#92400e', icon: '🟡' };
      case 'down': return { bg: '#fee2e2', text: '#991b1b', icon: '🔴' };
      default: return { bg: '#f3f4f6', text: '#6b7280', icon: '⚪' };
    }
  };

  return (
    <div style={{ padding: '24px', width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          📊 Registry des Versions
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Vue d'ensemble de toutes les versions installées par environnement
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-server" style={{ color: '#3b82f6' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{services.length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Services totaux</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{services.filter(s => s.health === 'healthy').length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Services sains</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#fef3c7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-exclamation-triangle" style={{ color: '#f59e0b' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{services.filter(s => s.health === 'degraded').length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Services dégradés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827' }}>
            Versions par environnement
          </h2>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Service</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Équipe</th>
                {environments.map(env => (
                  <th key={env} style={{ padding: '12px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    {env.toUpperCase()}
                  </th>
                ))}
                <th style={{ padding: '12px 24px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Santé</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => {
                const healthColor = getHealthColor(service.health);
                return (
                  <tr key={service.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '16px 24px' }}>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{service.name}</p>
                        <p style={{ fontSize: '12px', color: '#9ca3af', fontFamily: 'monospace' }}>{service.repository}</p>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ padding: '4px 12px', background: '#ede9fe', color: '#6d28d9', borderRadius: '6px', fontSize: '12px', fontWeight: '500' }}>
                        {service.team}
                      </span>
                    </td>
                    {environments.map(env => {
                      const version = service.currentVersion[env];
                      const lastDeployed = service.lastDeployed[env];
                      const isLatest = version === service.currentVersion.dev;
                      
                      return (
                        <td key={env} style={{ padding: '16px 24px', textAlign: 'center' }}>
                          <div>
                            <p style={{ 
                              fontSize: '14px', 
                              fontWeight: '600', 
                              color: isLatest ? '#10b981' : '#111827',
                              fontFamily: 'monospace'
                            }}>
                              {version}
                            </p>
                            <p style={{ fontSize: '11px', color: '#9ca3af' }}>
                              {lastDeployed}
                            </p>
                          </div>
                        </td>
                      );
                    })}
                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        background: healthColor.bg,
                        color: healthColor.text
                      }}>
                        {healthColor.icon} {service.health}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dependencies Graph */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', marginTop: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginBottom: '20px' }}>
          <i className="fas fa-project-diagram" style={{ color: '#8b5cf6', marginRight: '8px' }}></i>
          Dépendances entre services
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {services.filter(s => s.dependencies.length > 0).map(service => (
            <div key={service.id} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                {service.name}
              </h3>
              <div style={{ fontSize: '13px', color: '#6b7280' }}>
                <p style={{ marginBottom: '8px' }}><i className="fas fa-arrow-right" style={{ marginRight: '8px', color: '#8b5cf6' }}></i>Dépend de :</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginLeft: '20px' }}>
                  {service.dependencies.map(dep => (
                    <span key={dep} style={{ padding: '4px 10px', background: '#e0e7ff', color: '#3730a3', borderRadius: '6px', fontSize: '12px' }}>
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
