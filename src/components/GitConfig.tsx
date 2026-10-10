import { useState } from 'react';

interface GitConfig {
  provider: 'gitlab' | 'github';
  url: string;
  token: string;
  organization: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
}

export default function GitConfig() {
  const [configs, setConfigs] = useState<GitConfig[]>([
    {
      provider: 'gitlab',
      url: 'https://gitlab.internal.company.com',
      token: 'glpat-xxxxxxxxxxxxxxxxxxxx',
      organization: 'platform-team',
      status: 'connected',
      lastSync: '2026-01-15 11:30'
    },
    {
      provider: 'github',
      url: 'https://github.com',
      token: 'ghp_xxxxxxxxxxxxxxxxxxxx',
      organization: 'company-org',
      status: 'disconnected',
      lastSync: 'Jamais'
    }
  ]);

  const [editingConfig, setEditingConfig] = useState<GitConfig | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newConfig, setNewConfig] = useState<Partial<GitConfig>>({
    provider: 'gitlab',
    url: '',
    token: '',
    organization: ''
  });

  const handleSave = () => {
    if (editingConfig) {
      setConfigs(configs.map(c => c.provider === editingConfig.provider ? editingConfig : c));
      setEditingConfig(null);
    }
  };

  const handleAdd = () => {
    if (newConfig.url && newConfig.token && newConfig.organization) {
      setConfigs([...configs, {
        ...newConfig as GitConfig,
        status: 'disconnected',
        lastSync: 'Jamais'
      }]);
      setNewConfig({ provider: 'gitlab', url: '', token: '', organization: '' });
      setShowAddForm(false);
    }
  };

  const handleTest = (provider: string) => {
    alert(`Test de connexion ${provider} en cours...`);
    // Simulate test
    setTimeout(() => {
      alert(`Connexion ${provider} réussie !`);
    }, 1500);
  };

  const handleDisconnect = (provider: string) => {
    setConfigs(configs.map(c => 
      c.provider === provider ? { ...c, status: 'disconnected' as const } : c
    ));
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Configuration Git
        </h1>
        <p style={{ color: '#6b7280' }}>
          Configurez les connexions à vos repositories GitLab et GitHub
        </p>
      </div>

      {/* Existing Configs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '24px' }}>
        {configs.map(config => (
          <div key={config.provider} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: config.provider === 'gitlab' ? '#fc6d26' : '#24292e',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className={`fab fa-${config.provider}`} style={{ color: 'white', fontSize: '28px' }}></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                    {config.provider === 'gitlab' ? 'GitLab' : 'GitHub'}
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>{config.url}</p>
                </div>
              </div>
              <span style={{
                padding: '6px 16px',
                borderRadius: '16px',
                fontSize: '12px',
                fontWeight: 500,
                background: config.status === 'connected' ? '#d1fae5' : config.status === 'error' ? '#fee2e2' : '#f3f4f6',
                color: config.status === 'connected' ? '#065f46' : config.status === 'error' ? '#991b1b' : '#6b7280'
              }}>
                {config.status === 'connected' ? '● Connecté' : config.status === 'error' ? '● Erreur' : '○ Déconnecté'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Organisation</p>
                <p style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{config.organization}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Dernière synchronisation</p>
                <p style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{config.lastSync}</p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Token</p>
                <p style={{ fontSize: '14px', color: '#111827', fontWeight: 500, fontFamily: 'monospace' }}>
                  {config.token.substring(0, 10)}{'•'.repeat(10)}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => handleTest(config.provider)}
                disabled={config.status !== 'connected'}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: config.status === 'connected' ? '#10b981' : '#e5e7eb',
                  color: config.status === 'connected' ? 'white' : '#9ca3af',
                  cursor: config.status === 'connected' ? 'pointer' : 'not-allowed',
                  fontWeight: 500,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-sync-alt"></i>
                Tester la connexion
              </button>
              <button
                onClick={() => setEditingConfig(config)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-edit"></i>
                Modifier
              </button>
              {config.status === 'connected' && (
                <button
                  onClick={() => handleDisconnect(config.provider)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: '1px solid #fecaca',
                    background: 'white',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <i className="fas fa-unlink"></i>
                  Déconnecter
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Config */}
      {!showAddForm ? (
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: '12px',
            border: '2px dashed #d1d5db',
            background: 'white',
            color: '#6b7280',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <i className="fas fa-plus"></i>
          Ajouter une nouvelle connexion
        </button>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
            Nouvelle connexion Git
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Provider
              </label>
              <select
                value={newConfig.provider}
                onChange={(e) => setNewConfig({ ...newConfig, provider: e.target.value as 'gitlab' | 'github' })}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px'
                }}
              >
                <option value="gitlab">GitLab</option>
                <option value="github">GitHub</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                URL
              </label>
              <input
                type="url"
                value={newConfig.url}
                onChange={(e) => setNewConfig({ ...newConfig, url: e.target.value })}
                placeholder="https://gitlab.example.com"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Token d'accès
              </label>
              <input
                type="password"
                value={newConfig.token}
                onChange={(e) => setNewConfig({ ...newConfig, token: e.target.value })}
                placeholder="glpat-xxxxxxxxxxxx"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px',
                  fontFamily: 'monospace'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Organisation / Groupe
              </label>
              <input
                type="text"
                value={newConfig.organization}
                onChange={(e) => setNewConfig({ ...newConfig, organization: e.target.value })}
                placeholder="my-organization"
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px'
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={handleAdd}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#4f46e5',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px'
                }}
              >
                Ajouter
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewConfig({ provider: 'gitlab', url: '', token: '', organization: '' });
                }}
                style={{
                  padding: '12px 24px',
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
      )}
    </div>
  );
}
