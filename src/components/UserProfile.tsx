import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function UserProfile() {
  const { currentUser, updateUser } = useUser();
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences'>('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    team: currentUser?.team || ''
  });

  if (!currentUser) return null;

  const handleSave = () => {
    updateUser(currentUser.id, formData);
    setEditMode(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px'
          }}>
            <i className="fas fa-user"></i>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
              {currentUser.name}
            </h1>
            <p style={{ opacity: 0.9 }}>{currentUser.email}</p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.2)'
              }}>
                {currentUser.role === 'admin' ? '👑 Admin' : '👤 User'}
              </span>
              <span style={{
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 500,
                background: 'rgba(255,255,255,0.2)'
              }}>
                Équipe: {currentUser.team}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', background: '#f3f4f6', padding: '4px', borderRadius: '12px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'profile' ? 'white' : 'transparent',
            color: activeTab === 'profile' ? '#4f46e5' : '#6b7280',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            boxShadow: activeTab === 'profile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <i className="fas fa-user" style={{ marginRight: '8px' }}></i>
          Profil
        </button>
        <button
          onClick={() => setActiveTab('preferences')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            background: activeTab === 'preferences' ? 'white' : 'transparent',
            color: activeTab === 'preferences' ? '#4f46e5' : '#6b7280',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            boxShadow: activeTab === 'preferences' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
          }}
        >
          <i className="fas fa-cog" style={{ marginRight: '8px' }}></i>
          Préférences
        </button>
      </div>

      {activeTab === 'profile' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
              Informations personnelles
            </h2>
            <button
              onClick={() => setEditMode(!editMode)}
              style={{
                padding: '8px 16px',
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
              <i className={`fas ${editMode ? 'fa-times' : 'fa-edit'}`}></i>
              {editMode ? 'Annuler' : 'Modifier'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Nom complet
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px'
                  }}
                />
              ) : (
                <p style={{ fontSize: '14px', color: '#111827', padding: '10px', background: '#f9fafb', borderRadius: '8px' }}>
                  {currentUser.name}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Email
              </label>
              {editMode ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px'
                  }}
                />
              ) : (
                <p style={{ fontSize: '14px', color: '#111827', padding: '10px', background: '#f9fafb', borderRadius: '8px' }}>
                  {currentUser.email}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Équipe
              </label>
              {editMode ? (
                <input
                  type="text"
                  value={formData.team}
                  onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px'
                  }}
                />
              ) : (
                <p style={{ fontSize: '14px', color: '#111827', padding: '10px', background: '#f9fafb', borderRadius: '8px' }}>
                  {currentUser.team}
                </p>
              )}
            </div>

            {editMode && (
              <button
                onClick={handleSave}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#4f46e5',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                  alignSelf: 'flex-start',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <i className="fas fa-save"></i>
                Sauvegarder
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'preferences' && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
            Préférences
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Thème
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => updateUser(currentUser.id, { preferences: { ...currentUser.preferences, theme: 'light' } })}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '8px',
                    border: currentUser.preferences.theme === 'light' ? '2px solid #4f46e5' : '1px solid #d1d5db',
                    background: currentUser.preferences.theme === 'light' ? '#eef2ff' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <i className="fas fa-sun" style={{ fontSize: '24px', color: '#f59e0b', marginBottom: '8px' }}></i>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>Clair</p>
                </button>
                <button
                  onClick={() => updateUser(currentUser.id, { preferences: { ...currentUser.preferences, theme: 'dark' } })}
                  style={{
                    flex: 1,
                    padding: '16px',
                    borderRadius: '8px',
                    border: currentUser.preferences.theme === 'dark' ? '2px solid #4f46e5' : '1px solid #d1d5db',
                    background: currentUser.preferences.theme === 'dark' ? '#eef2ff' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center'
                  }}
                >
                  <i className="fas fa-moon" style={{ fontSize: '24px', color: '#6366f1', marginBottom: '8px' }}></i>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>Sombre</p>
                </button>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Langue
              </label>
              <select
                value={currentUser.preferences.language}
                onChange={(e) => updateUser(currentUser.id, { preferences: { ...currentUser.preferences, language: e.target.value as 'fr' | 'en' } })}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  fontSize: '14px'
                }}
              >
                <option value="fr">🇫🇷 Français</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>Notifications</p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Recevoir des alertes sur les changements</p>
              </div>
              <button
                onClick={() => updateUser(currentUser.id, { preferences: { ...currentUser.preferences, notifications: !currentUser.preferences.notifications } })}
                style={{
                  width: '48px',
                  height: '24px',
                  borderRadius: '12px',
                  border: 'none',
                  background: currentUser.preferences.notifications ? '#4f46e5' : '#d1d5db',
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
                  left: currentUser.preferences.notifications ? '26px' : '2px',
                  transition: 'left 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
