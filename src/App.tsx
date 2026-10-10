import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ApplicationList from './components/ApplicationList';
import ApplicationDetail from './components/ApplicationDetail';
import EnvironmentMonitor from './components/EnvironmentMonitor';
import MigrationProgress from './components/MigrationProgress';
import LLMChat from './components/LLMChat';
import ImportExport from './components/ImportExport';
import AdminDashboard from './components/AdminDashboard';
import GitConfig from './components/GitConfig';
import LLMConfig from './components/LLMConfig';
import { applications, Application } from './data/applications';

type View = 'dashboard' | 'applications' | 'environments' | 'progress' | 'assistant' | 'import-export' | 'admin' | 'git-config' | 'llm-config';
type UserRole = 'admin' | 'user';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navItems = [
    { id: 'dashboard' as View, label: 'Tableau de bord', icon: 'fa-th-large', roles: ['admin', 'user'] as UserRole[] },
    { id: 'applications' as View, label: 'Applications', icon: 'fa-cubes', roles: ['admin', 'user'] as UserRole[] },
    { id: 'environments' as View, label: 'Environnements', icon: 'fa-server', roles: ['admin', 'user'] as UserRole[] },
    { id: 'progress' as View, label: 'Progression', icon: 'fa-chart-line', roles: ['admin', 'user'] as UserRole[] },
    { id: 'assistant' as View, label: 'Assistant IA', icon: 'fa-robot', roles: ['admin', 'user'] as UserRole[] },
    { id: 'import-export' as View, label: 'Import/Export', icon: 'fa-file-import', roles: ['admin', 'user'] as UserRole[] },
    { id: 'admin' as View, label: 'Administration', icon: 'fa-user-shield', roles: ['admin'] as UserRole[] },
    { id: 'git-config' as View, label: 'Configuration Git', icon: 'fa-code-branch', roles: ['admin'] as UserRole[] },
    { id: 'llm-config' as View, label: 'Configuration IA', icon: 'fa-cogs', roles: ['admin'] as UserRole[] },
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  const renderContent = () => {
    if (currentView === 'applications' && selectedApp) {
      return (
        <ApplicationDetail
          application={selectedApp}
          onBack={() => setSelectedApp(null)}
        />
      );
    }

    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'applications':
        return (
          <ApplicationList
            applications={applications}
            onSelect={setSelectedApp}
            selectedId={selectedApp?.id}
          />
        );
      case 'environments':
        return <EnvironmentMonitor />;
      case 'progress':
        return <MigrationProgress />;
      case 'assistant':
        return <LLMChat />;
      case 'import-export':
        return <ImportExport />;
      case 'admin':
        return userRole === 'admin' ? <AdminDashboard /> : <div>Accès refusé</div>;
      case 'git-config':
        return userRole === 'admin' ? <GitConfig /> : <div>Accès refusé</div>;
      case 'llm-config':
        return userRole === 'admin' ? <LLMConfig /> : <div>Accès refusé</div>;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          maxWidth: '400px',
          width: '100%'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <i className="fas fa-exchange-alt" style={{ color: 'white', fontSize: '28px' }}></i>
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
              SocleTracker
            </h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>
              Connectez-vous pour continuer
            </p>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Rôle
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setUserRole('admin')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: userRole === 'admin' ? '2px solid #4f46e5' : '1px solid #d1d5db',
                  background: userRole === 'admin' ? '#eef2ff' : 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: userRole === 'admin' ? '#4f46e5' : '#374151'
                }}
              >
                👑 Administrateur
              </button>
              <button
                onClick={() => setUserRole('user')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: userRole === 'user' ? '2px solid #4f46e5' : '1px solid #d1d5db',
                  background: userRole === 'user' ? '#eef2ff' : 'white',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: userRole === 'user' ? '#4f46e5' : '#374151'
                }}
              >
                👤 Utilisateur
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsLoggedIn(true)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: '#4f46e5',
              color: 'white',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f9fafb', overflow: 'hidden' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: sidebarOpen ? '256px' : '80px', 
        background: 'white', 
        borderRight: '1px solid #e5e7eb', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'width 0.3s',
        flexShrink: 0
      }}>
        <div style={{ padding: '16px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <i className="fas fa-exchange-alt" style={{ color: 'white', fontSize: '14px' }}></i>
            </div>
            {sidebarOpen && (
              <div>
                <h1 style={{ fontWeight: 'bold', color: '#111827', fontSize: '14px' }}>SocleTracker</h1>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>Migration Monitor</p>
              </div>
            )}
          </div>
        </div>

        <nav style={{ flex: 1, padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          {filteredNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentView(item.id); setSelectedApp(null); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                border: 'none',
                cursor: 'pointer',
                background: currentView === item.id ? '#eef2ff' : 'transparent',
                color: currentView === item.id ? '#4f46e5' : '#4b5563',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <i className={`fas ${item.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ background: 'linear-gradient(135deg, #eef2ff, #f5f3ff)', borderRadius: '8px', padding: '12px', marginBottom: '12px' }}>
              <p style={{ fontSize: '12px', fontWeight: 500, color: '#4338ca' }}>Migration OCP 4.14</p>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Q1 2026</p>
              <div style={{ marginTop: '8px', width: '100%', background: 'rgba(255,255,255,0.5)', borderRadius: '4px', height: '6px' }}>
                <div style={{ height: '6px', borderRadius: '4px', background: '#6366f1', width: '51%' }}></div>
              </div>
              <p style={{ fontSize: '12px', color: '#4f46e5', fontWeight: 500, marginTop: '4px' }}>51% complété</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <header style={{ 
          background: 'white', 
          borderBottom: '1px solid #e5e7eb', 
          padding: '12px 24px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ padding: '8px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
            >
              <i className="fas fa-bars" style={{ color: '#4b5563' }}></i>
            </button>
            <div>
              <h2 style={{ fontWeight: 600, color: '#111827' }}>
                {navItems.find(i => i.id === currentView)?.label}
              </h2>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>
                {currentView === 'dashboard' && "Vue d'ensemble de la migration"}
                {currentView === 'applications' && (selectedApp ? selectedApp.name : 'Gestion des applications')}
                {currentView === 'environments' && 'Monitoring en temps réel'}
                {currentView === 'progress' && "Suivi de l'avancement"}
                {currentView === 'assistant' && 'Assistant intelligent'}
                {currentView === 'import-export' && 'Importez et exportez vos données'}
                {currentView === 'admin' && 'Gestion des utilisateurs'}
                {currentView === 'git-config' && 'Connexions GitLab/GitHub'}
                {currentView === 'llm-config' && 'Configuration du modèle IA'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', borderRadius: '8px', padding: '8px 12px' }}>
              <i className="fas fa-bell" style={{ color: '#9ca3af', fontSize: '14px' }}></i>
              <span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f9fafb', borderRadius: '8px', padding: '8px 12px' }}>
              <div style={{ width: '28px', height: '28px', background: userRole === 'admin' ? '#fef3c7' : '#e0e7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-user" style={{ color: userRole === 'admin' ? '#f59e0b' : '#4f46e5', fontSize: '12px' }}></i>
              </div>
              {sidebarOpen && (
                <div>
                  <span style={{ fontSize: '14px', color: '#374151', fontWeight: 500 }}>
                    {userRole === 'admin' ? 'Admin' : 'User'}
                  </span>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as UserRole)}
                    style={{
                      marginLeft: '8px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      border: '1px solid #d1d5db',
                      fontSize: '12px',
                      background: 'white'
                    }}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsLoggedIn(false)}
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
              <i className="fas fa-sign-out-alt"></i>
              {sidebarOpen && 'Déconnexion'}
            </button>
          </div>
        </header>

        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
