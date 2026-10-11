import { useState } from 'react';
import { UserProvider, useUser } from './context/UserContext';
import Dashboard from './components/Dashboard';
import MyApplications from './components/MyApplications';
import EnvironmentMonitor from './components/EnvironmentMonitor';
import MigrationProgress from './components/MigrationProgress';
import LLMChat from './components/LLMChat';
import ImportExport from './components/ImportExport';
import AdminDashboard from './components/AdminDashboard';
import MyGitConfig from './components/MyGitConfig';
import MyLLMConfig from './components/MyLLMConfig';
import UserProfile from './components/UserProfile';
import Notifications from './components/Notifications';
import Reports from './components/Reports';
import MigrationCalendar from './components/MigrationCalendar';
import AIPredictions from './components/AIPredictions';
import JiraIntegration from './components/JiraIntegration';
import ReleaseDashboard from './components/ReleaseDashboard';
import ReleasesList from './components/ReleasesList';
import ServicesRegistry from './components/ServicesRegistry';
import ReleaseCalendarView from './components/ReleaseCalendarView';
import TeamsManagement from './components/TeamsManagement';

type View = 'dashboard' | 'my-apps' | 'environments' | 'progress' | 'assistant' | 'import-export' | 'admin' | 'my-git' | 'my-llm' | 'profile' | 'notifications' | 'reports' | 'calendar' | 'predictions' | 'jira' | 'release-dashboard' | 'releases' | 'services' | 'release-calendar' | 'teams';

function AppContent() {
  const { currentUser, users, setCurrentUser } = useUser();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navItems = [
    { id: 'release-dashboard' as View, label: 'Release Hub', icon: 'fa-rocket', section: 'release', highlight: true },
    { id: 'releases' as View, label: 'Releases', icon: 'fa-box', section: 'release' },
    { id: 'services' as View, label: 'Registry Versions', icon: 'fa-server', section: 'release' },
    { id: 'release-calendar' as View, label: 'Calendrier', icon: 'fa-calendar-alt', section: 'release' },
    { id: 'teams' as View, label: 'Équipes', icon: 'fa-users', section: 'release' },
    { id: 'dashboard' as View, label: 'Tableau de bord', icon: 'fa-th-large', section: 'general' },
    { id: 'my-apps' as View, label: 'Mes applications', icon: 'fa-cubes', section: 'general' },
    { id: 'environments' as View, label: 'Environnements', icon: 'fa-server', section: 'general' },
    { id: 'progress' as View, label: 'Progression', icon: 'fa-chart-line', section: 'general' },
    { id: 'calendar' as View, label: 'Calendrier Migration', icon: 'fa-calendar', section: 'general' },
    { id: 'assistant' as View, label: 'Assistant IA', icon: 'fa-robot', section: 'general' },
    { id: 'predictions' as View, label: 'Prédictions IA', icon: 'fa-magic', section: 'general' },
    { id: 'import-export' as View, label: 'Import/Export', icon: 'fa-file-import', section: 'general' },
    { id: 'reports' as View, label: 'Rapports', icon: 'fa-file-alt', section: 'general' },
    { id: 'notifications' as View, label: 'Notifications', icon: 'fa-bell', section: 'general' },
    { id: 'jira' as View, label: 'Jira', icon: 'fa-tasks', section: 'general' },
    { id: 'profile' as View, label: 'Mon profil', icon: 'fa-user-circle', section: 'personal' },
    { id: 'my-git' as View, label: 'Mes connexions Git', icon: 'fa-code-branch', section: 'personal' },
    { id: 'my-llm' as View, label: 'Mon assistant IA', icon: 'fa-brain', section: 'personal' },
    { id: 'admin' as View, label: 'Administration', icon: 'fa-user-shield', section: 'admin', adminOnly: true },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (item.adminOnly && currentUser?.role !== 'admin') return false;
    return true;
  });

  const releaseItems = filteredNavItems.filter(i => i.section === 'release');
  const generalItems = filteredNavItems.filter(i => i.section === 'general');
  const personalItems = filteredNavItems.filter(i => i.section === 'personal');
  const adminItems = filteredNavItems.filter(i => i.section === 'admin');

  const renderContent = () => {
    switch (currentView) {
      case 'release-dashboard': return <ReleaseDashboard />;
      case 'releases': return <ReleasesList />;
      case 'services': return <ServicesRegistry />;
      case 'release-calendar': return <ReleaseCalendarView />;
      case 'teams': return <TeamsManagement />;
      case 'dashboard': return <Dashboard />;
      case 'my-apps': return <MyApplications />;
      case 'environments': return <EnvironmentMonitor />;
      case 'progress': return <MigrationProgress />;
      case 'calendar': return <MigrationCalendar />;
      case 'assistant': return <LLMChat />;
      case 'predictions': return <AIPredictions />;
      case 'import-export': return <ImportExport />;
      case 'reports': return <Reports />;
      case 'notifications': return <Notifications />;
      case 'jira': return <JiraIntegration />;
      case 'profile': return <UserProfile />;
      case 'my-git': return <MyGitConfig />;
      case 'my-llm': return <MyLLMConfig />;
      case 'admin': return currentUser?.role === 'admin' ? <AdminDashboard /> : <div>Accès refusé</div>;
      default: return <ReleaseDashboard />;
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
              Choisissez votre profil pour continuer
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => setCurrentUser(user)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  border: currentUser?.id === user.id ? '2px solid #4f46e5' : '1px solid #d1d5db',
                  background: currentUser?.id === user.id ? '#eef2ff' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  textAlign: 'left'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: user.role === 'admin' ? '#fef3c7' : '#e0e7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-user" style={{ color: user.role === 'admin' ? '#f59e0b' : '#4f46e5' }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: '#111827', fontSize: '14px' }}>{user.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>{user.email}</p>
                </div>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: 500,
                  background: user.role === 'admin' ? '#fef3c7' : '#dbeafe',
                  color: user.role === 'admin' ? '#92400e' : '#1e40af'
                }}>
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsLoggedIn(true)}
            disabled={!currentUser}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: currentUser ? '#4f46e5' : '#e5e7eb',
              color: currentUser ? 'white' : '#9ca3af',
              cursor: currentUser ? 'pointer' : 'not-allowed',
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
          {/* Release Section */}
          {sidebarOpen && (
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', padding: '8px 12px 4px', letterSpacing: '0.05em' }}>
              🚀 Release Manager
            </p>
          )}
          {releaseItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: item.highlight ? 600 : 500,
                border: 'none',
                cursor: 'pointer',
                background: currentView === item.id ? '#eef2ff' : item.highlight ? '#f0f9ff' : 'transparent',
                color: currentView === item.id ? '#4f46e5' : item.highlight ? '#0284c7' : '#4b5563',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <i className={`fas ${item.icon}`} style={{ width: '20px', textAlign: 'center' }}></i>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}

          {/* General Section */}
          {sidebarOpen && (
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', padding: '16px 12px 4px', letterSpacing: '0.05em' }}>
              Migration
            </p>
          )}
          {!sidebarOpen && <div style={{ height: '16px' }}></div>}
          {generalItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
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

          {/* Personal Section */}
          {sidebarOpen && (
            <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', padding: '16px 12px 4px', letterSpacing: '0.05em' }}>
              Personnel
            </p>
          )}
          {!sidebarOpen && <div style={{ height: '16px' }}></div>}
          {personalItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
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

          {/* Admin Section */}
          {adminItems.length > 0 && (
            <>
              {sidebarOpen && (
                <p style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', padding: '16px 12px 4px', letterSpacing: '0.05em' }}>
                  Administration
                </p>
              )}
              {!sidebarOpen && <div style={{ height: '16px' }}></div>}
              {adminItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
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
            </>
          )}
        </nav>

        {sidebarOpen && currentUser && (
          <div style={{ padding: '16px', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: currentUser.role === 'admin' ? '#fef3c7' : '#e0e7ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <i className="fas fa-user" style={{ color: currentUser.role === 'admin' ? '#f59e0b' : '#4f46e5', fontSize: '12px' }}></i>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{currentUser.name}</p>
                  <p style={{ fontSize: '11px', color: '#6b7280' }}>{currentUser.role === 'admin' ? 'Administrateur' : 'Utilisateur'}</p>
                </div>
              </div>
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
                {currentView === 'release-dashboard' && 'Centre de commande des releases'}
                {currentView === 'releases' && 'Gestion complète des releases'}
                {currentView === 'services' && 'Versions installées par environnement'}
                {currentView === 'release-calendar' && 'Planification des déploiements'}
                {currentView === 'teams' && 'Équipes et responsabilités'}
                {currentView === 'dashboard' && "Vue d'ensemble"}
                {currentView === 'my-apps' && 'Vos applications personnelles'}
                {currentView === 'environments' && 'Monitoring en temps réel'}
                {currentView === 'progress' && "Suivi de l'avancement"}
                {currentView === 'calendar' && 'Planification des migrations'}
                {currentView === 'assistant' && 'Assistant intelligent partagé'}
                {currentView === 'predictions' && 'Estimation IA de la durée'}
                {currentView === 'import-export' && 'Importez et exportez vos données'}
                {currentView === 'reports' && 'Générez des rapports détaillés'}
                {currentView === 'notifications' && 'Configurez vos alertes'}
                {currentView === 'jira' && 'Synchronisation avec Jira'}
                {currentView === 'profile' && 'Gérez votre profil'}
                {currentView === 'my-git' && 'Vos connexions GitLab/GitHub'}
                {currentView === 'my-llm' && 'Configurez votre assistant IA'}
                {currentView === 'admin' && 'Gestion des utilisateurs'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => setCurrentView('profile')}
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
              <i className="fas fa-user-circle"></i>
              {sidebarOpen && currentUser?.name}
            </button>
            <button
              onClick={() => { setIsLoggedIn(false); setCurrentUser(null); }}
              style={{
                padding: '8px 16px',
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

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}
