import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ApplicationList from './components/ApplicationList';
import ApplicationDetail from './components/ApplicationDetail';
import EnvironmentMonitor from './components/EnvironmentMonitor';
import MigrationProgress from './components/MigrationProgress';
import LLMChat from './components/LLMChat';
import { applications, Application } from './data/applications';

type View = 'dashboard' | 'applications' | 'environments' | 'progress' | 'assistant';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navItems = [
    { id: 'dashboard' as View, label: 'Tableau de bord', icon: 'fa-th-large' },
    { id: 'applications' as View, label: 'Applications', icon: 'fa-cubes' },
    { id: 'environments' as View, label: 'Environnements', icon: 'fa-server' },
    { id: 'progress' as View, label: 'Progression', icon: 'fa-chart-line' },
    { id: 'assistant' as View, label: 'Assistant IA', icon: 'fa-robot' },
  ];

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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shrink-0">
              <i className="fas fa-exchange-alt text-white text-sm"></i>
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-gray-900 text-sm">SocleTracker</h1>
                <p className="text-xs text-gray-500">Migration Monitor</p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setCurrentView(item.id); setSelectedApp(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentView === item.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <i className={`fas ${item.icon} w-5 text-center ${currentView === item.id ? 'text-indigo-600' : 'text-gray-400'}`}></i>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-gray-100">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3">
              <p className="text-xs font-medium text-indigo-700">Migration OCP 4.14</p>
              <p className="text-xs text-gray-500 mt-1">Q1 2026</p>
              <div className="mt-2 w-full bg-white/50 rounded-full h-1.5">
                <div className="h-1.5 rounded-full bg-indigo-500" style={{ width: '51%' }}></div>
              </div>
              <p className="text-xs text-indigo-600 font-medium mt-1">51% complété</p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <i className="fas fa-bars text-gray-600"></i>
            </button>
            <div>
              <h2 className="font-semibold text-gray-900">
                {navItems.find(i => i.id === currentView)?.label}
              </h2>
              <p className="text-xs text-gray-500">
                {currentView === 'dashboard' && "Vue d'ensemble de la migration"}
                {currentView === 'applications' && (selectedApp ? selectedApp.name : 'Gestion des applications')}
                {currentView === 'environments' && 'Monitoring en temps réel'}
                {currentView === 'progress' && "Suivi de l'avancement"}
                {currentView === 'assistant' && 'Assistant intelligent'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <i className="fas fa-bell text-gray-400 text-sm"></i>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                <i className="fas fa-user text-indigo-600 text-xs"></i>
              </div>
              {sidebarOpen && <span className="text-sm text-gray-700">Admin</span>}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
