import { useState } from 'react';
import { useUser } from '../context/UserContext';

interface WebhookConfig {
  id: string;
  name: string;
  type: 'slack' | 'teams' | 'email' | 'custom';
  url: string;
  events: string[];
  active: boolean;
  lastTriggered?: string;
}

export default function Notifications() {
  const { currentUser } = useUser();
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: '1',
      name: 'Alertes équipe Platform',
      type: 'slack',
      url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXX',
      events: ['app_blocked', 'migration_completed'],
      active: true,
      lastTriggered: '2026-01-15 14:30'
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWebhook, setNewWebhook] = useState<Partial<WebhookConfig>>({
    name: '',
    type: 'slack',
    url: '',
    events: [],
    active: true
  });

  const availableEvents = [
    { id: 'app_blocked', label: 'Application bloquée', icon: '🔴' },
    { id: 'app_completed', label: 'Migration terminée', icon: '✅' },
    { id: 'app_progress', label: 'Progression > 50%', icon: '📊' },
    { id: 'helm_error', label: 'Erreur chart Helm', icon: '⚠️' },
    { id: 'pod_failure', label: 'Échec de pod', icon: '❌' },
    { id: 'deadline_approaching', label: 'Échéance proche', icon: '⏰' },
    { id: 'daily_summary', label: 'Résumé quotidien', icon: '📋' },
    { id: 'weekly_report', label: 'Rapport hebdomadaire', icon: '📈' }
  ];

  const handleAdd = () => {
    if (!newWebhook.name || !newWebhook.url) {
      alert('Veuillez remplir le nom et l\'URL');
      return;
    }

    const webhook: WebhookConfig = {
      id: `wh-${Date.now()}`,
      name: newWebhook.name!,
      type: newWebhook.type as any,
      url: newWebhook.url!,
      events: newWebhook.events || [],
      active: newWebhook.active!,
      lastTriggered: 'Jamais'
    };

    setWebhooks([...webhooks, webhook]);
    setNewWebhook({ name: '', type: 'slack', url: '', events: [], active: true });
    setShowAddForm(false);
  };

  const handleTest = (webhookId: string) => {
    alert(`Test envoyé à ${webhooks.find(w => w.id === webhookId)?.name}`);
    setWebhooks(webhooks.map(w => 
      w.id === webhookId ? { ...w, lastTriggered: new Date().toLocaleString('fr-FR') } : w
    ));
  };

  const handleToggle = (webhookId: string) => {
    setWebhooks(webhooks.map(w => 
      w.id === webhookId ? { ...w, active: !w.active } : w
    ));
  };

  const handleDelete = (webhookId: string) => {
    if (confirm('Supprimer cette notification ?')) {
      setWebhooks(webhooks.filter(w => w.id !== webhookId));
    }
  };

  const toggleEvent = (eventId: string) => {
    const events = newWebhook.events || [];
    if (events.includes(eventId)) {
      setNewWebhook({ ...newWebhook, events: events.filter(e => e !== eventId) });
    } else {
      setNewWebhook({ ...newWebhook, events: [...events, eventId] });
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          Notifications
        </h1>
        <p style={{ color: '#6b7280' }}>
          Configurez les alertes et notifications pour votre équipe
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-bell" style={{ color: '#3b82f6' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{webhooks.length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Notifications actives</p>
            </div>
          </div>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{webhooks.filter(w => w.active).length}</p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Activées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Webhooks List */}
      {webhooks.length === 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px'
        }}>
          <i className="fas fa-bell-slash" style={{ fontSize: '48px', color: '#d1d5db', marginBottom: '16px' }}></i>
          <p style={{ color: '#6b7280', marginBottom: '8px' }}>Aucune notification configurée</p>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>Ajoutez des webhooks pour recevoir des alertes</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          {webhooks.map(webhook => (
            <div key={webhook.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              opacity: webhook.active ? 1 : 0.6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: webhook.type === 'slack' ? '#4a154b' : webhook.type === 'teams' ? '#6264a7' : webhook.type === 'email' ? '#ea4335' : '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className={`fab fa-${webhook.type === 'slack' || webhook.type === 'teams' ? webhook.type : 'envelope'}`} style={{ color: 'white', fontSize: '20px' }}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{webhook.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '13px', fontFamily: 'monospace' }}>{webhook.url.substring(0, 50)}...</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(webhook.id)}
                  style={{
                    width: '48px',
                    height: '24px',
                    borderRadius: '12px',
                    border: 'none',
                    background: webhook.active ? '#10b981' : '#d1d5db',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: webhook.active ? '26px' : '2px',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                  }}></div>
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {webhook.events.map(eventId => {
                  const event = availableEvents.find(e => e.id === eventId);
                  return event ? (
                    <span key={eventId} style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      background: '#f3f4f6',
                      color: '#374151'
                    }}>
                      {event.icon} {event.label}
                    </span>
                  ) : null;
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#6b7280' }}>
                <span>Dernière notification : {webhook.lastTriggered}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleTest(webhook.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: '#3b82f6',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                  >
                    <i className="fas fa-paper-plane" style={{ marginRight: '4px' }}></i>
                    Tester
                  </button>
                  <button
                    onClick={() => handleDelete(webhook.id)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: '1px solid #fecaca',
                      background: 'white',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 500
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
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
          Ajouter une notification
        </button>
      ) : (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
            Nouvelle notification
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Type</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                {(['slack', 'teams', 'email', 'custom'] as const).map(type => (
                  <button
                    key={type}
                    onClick={() => setNewWebhook({ ...newWebhook, type })}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: newWebhook.type === type ? '2px solid #4f46e5' : '1px solid #d1d5db',
                      background: newWebhook.type === type ? '#eef2ff' : 'white',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    <i className={`fab fa-${type === 'slack' || type === 'teams' ? type : 'envelope'}`} style={{ fontSize: '20px', color: newWebhook.type === type ? '#4f46e5' : '#6b7280', marginBottom: '4px', display: 'block' }}></i>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: '#374151' }}>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Nom</label>
              <input
                type="text"
                value={newWebhook.name}
                onChange={(e) => setNewWebhook({ ...newWebhook, name: e.target.value })}
                placeholder="Alertes équipe Platform"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                {newWebhook.type === 'email' ? 'Adresse email' : 'URL du webhook'}
              </label>
              <input
                type={newWebhook.type === 'email' ? 'email' : 'url'}
                value={newWebhook.url}
                onChange={(e) => setNewWebhook({ ...newWebhook, url: e.target.value })}
                placeholder={newWebhook.type === 'slack' ? 'https://hooks.slack.com/...' : newWebhook.type === 'teams' ? 'https://outlook.office.com/webhook/...' : 'https://...'}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', fontFamily: 'monospace' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Événements</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                {availableEvents.map(event => (
                  <button
                    key={event.id}
                    onClick={() => toggleEvent(event.id)}
                    style={{
                      padding: '10px',
                      borderRadius: '8px',
                      border: (newWebhook.events || []).includes(event.id) ? '2px solid #4f46e5' : '1px solid #d1d5db',
                      background: (newWebhook.events || []).includes(event.id) ? '#eef2ff' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '13px',
                      color: '#374151'
                    }}
                  >
                    {event.icon} {event.label}
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
