import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Application } from '../data/applications';

export default function MyApplications() {
  const { currentUser, addUserApplication, deleteUserApplication } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newApp, setNewApp] = useState({
    name: '',
    description: '',
    team: '',
    sourceSocle: 'Kubernetes 1.24 (Legacy)',
    targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
    criticality: 'medium' as 'high' | 'medium' | 'low'
  });

  if (!currentUser) return null;

  const handleAdd = () => {
    if (!newApp.name || !newApp.description) {
      alert('Veuillez remplir le nom et la description');
      return;
    }

    const app: Application = {
      id: `app-${Date.now()}`,
      name: newApp.name,
      description: newApp.description,
      team: newApp.team || currentUser.team,
      sourceSocle: newApp.sourceSocle,
      targetSocle: newApp.targetSocle,
      migrationStatus: 'not_started',
      migrationProgress: 0,
      deployments: [],
      helmChart: {
        repository: '',
        path: '',
        lastChecked: new Date().toISOString(),
        status: 'valid',
        resources: []
      },
      history: [],
      criticality: newApp.criticality,
      estimatedCompletion: ''
    };

    addUserApplication(app);
    setNewApp({
      name: '',
      description: '',
      team: '',
      sourceSocle: 'Kubernetes 1.24 (Legacy)',
      targetSocle: 'Kubernetes 1.28 (OCP 4.14)',
      criticality: 'medium'
    });
    setShowAddForm(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-cubes" style={{ marginRight: '8px' }}></i>
          Mes applications
        </h1>
        <p style={{ color: '#6b7280' }}>
          Gérez vos applications personnelles à migrer
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#eef2ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-cubes" style={{ color: '#4f46e5' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{currentUser.applications.length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Total</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-check" style={{ color: '#10b981' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                {currentUser.applications.filter(a => a.migrationStatus === 'completed').length}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Terminées</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-spinner" style={{ color: '#3b82f6' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                {currentUser.applications.filter(a => a.migrationStatus === 'in_progress').length}
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>En cours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Applications List */}
      {currentUser.applications.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px'
        }}>
          <i className="fas fa-cubes" style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }}></i>
          <p style={{ color: '#6b7280', marginBottom: '8px' }}>Aucune application personnelle</p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Ajoutez vos applications pour suivre leur migration</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          {currentUser.applications.map(app => (
            <div key={app.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827' }}>{app.name}</h3>
                    {app.criticality === 'high' && (
                      <span style={{ padding: '2px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, background: '#fee2e2', color: '#991b1b' }}>
                        CRITIQUE
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>{app.description}</p>
                </div>
                <button
                  onClick={() => deleteUserApplication(app.id)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: '#ef4444',
                    cursor: 'pointer'
                  }}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>

              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280' }}>
                <span><i className="fas fa-users" style={{ marginRight: '4px' }}></i>{app.team}</span>
                <span><i className="fas fa-arrow-right" style={{ marginRight: '4px' }}></i>{app.sourceSocle.split(' ')[0]} → {app.targetSocle.split(' ')[0]}</span>
              </div>

              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                  <span>Progression</span>
                  <span>{app.migrationProgress}%</span>
                </div>
                <div style={{ background: '#e5e7eb', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    borderRadius: '3px',
                    background: app.migrationStatus === 'completed' ? '#10b981' : app.migrationStatus === 'blocked' ? '#ef4444' : '#4f46e5',
                    width: `${app.migrationProgress}%`
                  }}></div>
                </div>
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
          Ajouter une application
        </button>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
            Nouvelle application
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Nom *</label>
              <input
                type="text"
                value={newApp.name}
                onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                placeholder="mon-application"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Description *</label>
              <textarea
                value={newApp.description}
                onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                placeholder="Description de l'application..."
                rows={3}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Équipe</label>
              <input
                type="text"
                value={newApp.team}
                onChange={(e) => setNewApp({ ...newApp, team: e.target.value })}
                placeholder={currentUser.team}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Criticité</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {(['low', 'medium', 'high'] as const).map(level => (
                  <button
                    key={level}
                    onClick={() => setNewApp({ ...newApp, criticality: level })}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: newApp.criticality === level ? '2px solid #4f46e5' : '1px solid #d1d5db',
                      background: newApp.criticality === level ? '#eef2ff' : 'white',
                      cursor: 'pointer',
                      fontWeight: 500,
                      fontSize: '14px',
                      color: newApp.criticality === level ? '#4f46e5' : '#374151'
                    }}
                  >
                    {level === 'low' ? '🟢 Basse' : level === 'medium' ? '🟡 Moyenne' : '🔴 Haute'}
                  </button>
                ))}
              </div>
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
