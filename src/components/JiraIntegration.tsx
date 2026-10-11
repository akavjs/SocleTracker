import { useState } from 'react';

interface JiraConfig {
  url: string;
  projectKey: string;
  email: string;
  apiToken: string;
  connected: boolean;
}

interface JiraTicket {
  id: string;
  key: string;
  summary: string;
  status: string;
  priority: string;
  assignee: string;
  linkedApp?: string;
}

export default function JiraIntegration() {
  const [config, setConfig] = useState<JiraConfig>({
    url: 'https://your-company.atlassian.net',
    projectKey: 'MIGRATION',
    email: 'admin@company.com',
    apiToken: '',
    connected: false
  });

  const [tickets, setTickets] = useState<JiraTicket[]>([
    {
      id: '1',
      key: 'MIGRATION-123',
      summary: 'Migration api-gateway vers OCP 4.14',
      status: 'In Progress',
      priority: 'High',
      assignee: 'Jean Dupont',
      linkedApp: 'api-gateway'
    },
    {
      id: '2',
      key: 'MIGRATION-124',
      summary: 'Corriger NetworkPolicy pour payment-processor',
      status: 'To Do',
      priority: 'Critical',
      assignee: 'Marie Martin',
      linkedApp: 'payment-processor'
    },
    {
      id: '3',
      key: 'MIGRATION-125',
      summary: 'Tests de validation user-service en PROD',
      status: 'Done',
      priority: 'Medium',
      assignee: 'Pierre Bernard',
      linkedApp: 'user-service'
    }
  ]);

  const [showConfig, setShowConfig] = useState(!config.connected);
  const [syncing, setSyncing] = useState(false);

  const handleConnect = () => {
    if (!config.url || !config.projectKey || !config.email || !config.apiToken) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    
    setConfig({ ...config, connected: true });
    setShowConfig(false);
    alert('Connexion à Jira établie avec succès !');
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('Synchronisation terminée !');
    }, 2000);
  };

  const handleCreateTicket = () => {
    alert('Formulaire de création de ticket Jira (à implémenter)');
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'done': return '#10b981';
      case 'in progress': return '#3b82f6';
      case 'to do': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical': return '#ef4444';
      case 'high': return '#f59e0b';
      case 'medium': return '#3b82f6';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Intégration Jira
        </h1>
        <p style={{ color: '#6b7280' }}>
          Synchronisez vos tickets Jira avec les migrations d'applications
        </p>
      </div>

      {/* Configuration */}
      {showConfig ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
            Configuration Jira
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                URL Jira
              </label>
              <input
                type="url"
                value={config.url}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                placeholder="https://your-company.atlassian.net"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Clé du projet
              </label>
              <input
                type="text"
                value={config.projectKey}
                onChange={(e) => setConfig({ ...config, projectKey: e.target.value })}
                placeholder="MIGRATION"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', fontFamily: 'monospace' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Email
              </label>
              <input
                type="email"
                value={config.email}
                onChange={(e) => setConfig({ ...config, email: e.target.value })}
                placeholder="admin@company.com"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Token API
              </label>
              <input
                type="password"
                value={config.apiToken}
                onChange={(e) => setConfig({ ...config, apiToken: e.target.value })}
                placeholder="Votre token API Jira"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', fontFamily: 'monospace' }}
              />
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                Générez un token sur <a href="https://id.atlassian.com/manage-profile/security/api-tokens" target="_blank" style={{ color: '#4f46e5' }}>id.atlassian.com</a>
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleConnect}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#4f46e5',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                <i className="fas fa-plug" style={{ marginRight: '8px' }}></i>
                Connecter
              </button>
              <button
                onClick={() => setShowConfig(false)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#0052CC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 .98.02 1.95.25 2.9.2.85.55 1.7.95 2.45.4.75.95 1.45 1.55 2.05.6.6 1.3 1.1 2.05 1.5.75.4 1.6.7 2.45.9.95.2 1.95.25 2.9.25H28V2c0-1.1-.9-2-2-2H11.53zM2 11.53v14.47c0 1.1.9 2 2 2h14.47c0-2.4-1.97-4.35-4.35-4.35h-1.78v-1.7c0-.98-.02-1.95-.25-2.9-.2-.85-.55-1.7-.95-2.45-.4-.75-.95-1.45-1.55-2.05-.6-.6-1.3-1.1-2.05-1.5-.75-.4-1.6-.7-2.45-.9-.95-.2-1.95-.25-2.9-.25H2z"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                Jira Connecté
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>
                {config.url} • Projet: {config.projectKey}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSync}
              disabled={syncing}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: syncing ? '#9ca3af' : '#3b82f6',
                color: 'white',
                cursor: syncing ? 'not-allowed' : 'pointer',
                fontWeight: 500,
                fontSize: '13px'
              }}
            >
              <i className={`fas ${syncing ? 'fa-spinner fa-spin' : 'fa-sync-alt'}`} style={{ marginRight: '6px' }}></i>
              {syncing ? 'Sync...' : 'Synchroniser'}
            </button>
            <button
              onClick={() => setShowConfig(true)}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                background: 'white',
                color: '#374151',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '13px'
              }}
            >
              <i className="fas fa-cog" style={{ marginRight: '6px' }}></i>
              Config
            </button>
          </div>
        </div>
      )}

      {/* Tickets */}
      {!showConfig && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
              Tickets liés aux migrations
            </h2>
            <button
              onClick={handleCreateTicket}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                background: '#4f46e5',
                color: 'white',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '13px'
              }}
            >
              <i className="fas fa-plus" style={{ marginRight: '6px' }}></i>
              Créer un ticket
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tickets.map(ticket => (
              <div key={ticket.id} style={{
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                background: '#f9fafb'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ 
                        fontFamily: 'monospace', 
                        fontSize: '12px', 
                        color: '#4f46e5',
                        fontWeight: 600
                      }}>
                        {ticket.key}
                      </span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 500,
                        background: getPriorityColor(ticket.priority) + '20',
                        color: getPriorityColor(ticket.priority)
                      }}>
                        {ticket.priority}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
                      {ticket.summary}
                    </h3>
                  </div>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 500,
                    background: getStatusColor(ticket.status) + '20',
                    color: getStatusColor(ticket.status)
                  }}>
                    {ticket.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#6b7280' }}>
                  <span>
                    <i className="fas fa-user" style={{ marginRight: '4px' }}></i>
                    {ticket.assignee}
                  </span>
                  {ticket.linkedApp && (
                    <span>
                      <i className="fas fa-link" style={{ marginRight: '4px' }}></i>
                      {ticket.linkedApp}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
