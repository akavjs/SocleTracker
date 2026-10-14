import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function MyGitConfig() {
  const { currentUser, addUserGitConfig, updateUserGitConfig, deleteUserGitConfig } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newConfig, setNewConfig] = useState({
    provider: 'gitlab' as 'gitlab' | 'github',
    url: '',
    token: '',
    organization: ''
  });

  if (!currentUser) return null;

  const handleAdd = () => {
    if (!newConfig.url || !newConfig.token || !newConfig.organization) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    addUserGitConfig({
      id: `git-${Date.now()}`,
      ...newConfig,
      status: 'disconnected',
      lastSync: 'Jamais'
    });

    setNewConfig({ provider: 'gitlab', url: '', token: '', organization: '' });
    setShowAddForm(false);
  };

  const handleTest = (configId: string) => {
    updateUserGitConfig(configId, { status: 'connected', lastSync: new Date().toLocaleString('fr-FR') });
  };

  const handleDisconnect = (configId: string) => {
    updateUserGitConfig(configId, { status: 'disconnected' });
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-code-branch" style={{ marginRight: '8px' }}></i>
          Mes connexions Git
        </h1>
        <p style={{ color: '#6b7280' }}>
          Configurez vos repositories GitLab et GitHub personnels
        </p>
      </div>

      {/* User's Git Configs */}
      {currentUser.gitConfigs.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px'
        }}>
          <i className="fas fa-code-branch" style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }}></i>
          <p style={{ color: '#6b7280', marginBottom: '8px' }}>Aucune connexion Git configurée</p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Ajoutez une connexion pour accéder à vos charts Helm</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {currentUser.gitConfigs.map(config => (
            <div key={config.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: config.provider === 'gitlab' ? '#fc6d26' : '#24292e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className={`fab fa-${config.provider}`} style={{ color: 'white', fontSize: '24px' }}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>
                      {config.provider === 'gitlab' ? 'GitLab' : 'GitHub'}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '13px' }}>{config.url}</p>
                  </div>
                </div>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 500,
                  background: config.status === 'connected' ? '#d1fae5' : '#f3f4f6',
                  color: config.status === 'connected' ? '#065f46' : '#6b7280'
                }}>
                  {config.status === 'connected' ? '● Connecté' : '○ Déconnecté'}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Organisation</p>
                  <p style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{config.organization}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Dernière sync</p>
                  <p style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{config.lastSync}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Token</p>
                  <p style={{ fontSize: '14px', color: '#111827', fontWeight: 500, fontFamily: 'monospace' }}>
                    {config.token.substring(0, 8)}{'••••••'}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleTest(config.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#10b981',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <i className="fas fa-sync-alt"></i>
                  Tester
                </button>
                {config.status === 'connected' && (
                  <button
                    onClick={() => handleDisconnect(config.id)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1px solid #fecaca',
                      background: 'white',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontSize: '13px'
                    }}
                  >
                    Déconnecter
                  </button>
                )}
                <button
                  onClick={() => deleteUserGitConfig(config.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #fecaca',
                    background: 'white',
                    color: '#ef4444',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '13px',
                    marginLeft: 'auto'
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Form */}
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
          Ajouter une connexion Git
        </button>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
            Nouvelle connexion
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Provider</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setNewConfig({ ...newConfig, provider: 'gitlab' })}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: newConfig.provider === 'gitlab' ? '2px solid #fc6d26' : '1px solid #d1d5db',
                    background: newConfig.provider === 'gitlab' ? '#fff7ed' : 'white',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <i className="fab fa-gitlab" style={{ color: '#fc6d26', marginRight: '8px' }}></i>
                  GitLab
                </button>
                <button
                  onClick={() => setNewConfig({ ...newConfig, provider: 'github' })}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: newConfig.provider === 'github' ? '2px solid #24292e' : '1px solid #d1d5db',
                    background: newConfig.provider === 'github' ? '#f3f4f6' : 'white',
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '14px'
                  }}
                >
                  <i className="fab fa-github" style={{ color: '#24292e', marginRight: '8px' }}></i>
                  GitHub
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>URL</label>
              <input
                type="url"
                value={newConfig.url}
                onChange={(e) => setNewConfig({ ...newConfig, url: e.target.value })}
                placeholder={newConfig.provider === 'gitlab' ? 'https://gitlab.example.com' : 'https://github.com'}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Token d'accès</label>
              <input
                type="password"
                value={newConfig.token}
                onChange={(e) => setNewConfig({ ...newConfig, token: e.target.value })}
                placeholder="glpat-xxxxxxxxxxxx"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', fontFamily: 'monospace' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Organisation / Groupe</label>
              <input
                type="text"
                value={newConfig.organization}
                onChange={(e) => setNewConfig({ ...newConfig, organization: e.target.value })}
                placeholder="my-organization"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAdd}
                style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}
              >
                Ajouter
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #d1d5db', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}
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
