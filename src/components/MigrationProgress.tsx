import { applications } from '../data/applications';

export default function MigrationProgress() {
  const sortedApps = [...applications].sort((a, b) => b.migrationProgress - a.migrationProgress);
  const totalProgress = Math.round(applications.reduce((acc, a) => acc + a.migrationProgress, 0) / applications.length);

  const phases = [
    { name: 'Analyse', icon: 'fa-search', description: 'Inventaire et analyse des dépendances' },
    { name: 'Préparation', icon: 'fa-tools', description: 'Adaptation des charts Helm' },
    { name: 'DEV', icon: 'fa-flask', description: 'Déploiement et tests en DEV' },
    { name: 'STAGING', icon: 'fa-vial', description: 'Validation en environnement de staging' },
    { name: 'PREPROD', icon: 'fa-clipboard-check', description: 'Tests finaux en pré-production' },
    { name: 'PROD', icon: 'fa-rocket', description: 'Mise en production' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Progression de la migration</h1>
        <p className="text-gray-500 mt-1">Suivi détaillé de l'avancement par application</p>
      </div>

      {/* Global Progress */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Progression globale</h2>
            <p className="text-white/70 text-sm">Kubernetes 1.24 → OCP 4.14</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold">{totalProgress}%</p>
            <p className="text-white/70 text-sm">{applications.filter(a => a.migrationStatus === 'completed').length}/{applications.length} terminées</p>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-white transition-all duration-1000"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{applications.filter(a => a.migrationStatus === 'completed').length}</p>
            <p className="text-xs text-white/70">Terminées</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{applications.filter(a => a.migrationStatus === 'in_progress').length}</p>
            <p className="text-xs text-white/70">En cours</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{applications.filter(a => a.migrationStatus === 'blocked').length}</p>
            <p className="text-xs text-white/70">Bloquées</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <p className="text-2xl font-bold">{applications.filter(a => a.migrationStatus === 'planned' || a.migrationStatus === 'not_started').length}</p>
            <p className="text-xs text-white/70">À faire</p>
          </div>
        </div>
      </div>

      {/* Migration Pipeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Pipeline de migration</h2>
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
          {phases.map((phase, idx) => {
            const appsInPhase = applications.filter(a => {
              if (idx === 0) return a.migrationProgress >= 0;
              if (idx === 1) return a.migrationProgress >= 10;
              if (idx === 2) return a.migrationProgress >= 20;
              if (idx === 3) return a.migrationProgress >= 50;
              if (idx === 4) return a.migrationProgress >= 75;
              return a.migrationProgress >= 100;
            }).length;

            return (
              <div key={phase.name} className="relative flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  appsInPhase > 0 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-400'
                }`}>
                  <i className={`fas ${phase.icon} text-sm`}></i>
                </div>
                <p className="text-xs font-medium text-gray-700 mt-2">{phase.name}</p>
                <p className="text-xs text-gray-400">{appsInPhase} apps</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Application Progress Bars */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Détail par application</h2>
        <div className="space-y-4">
          {sortedApps.map(app => (
            <div key={app.id} className="group">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 text-sm">{app.name}</span>
                  {app.migrationStatus === 'blocked' && <span className="text-xs text-red-500">🔴</span>}
                  {app.migrationStatus === 'completed' && <span className="text-xs text-green-500">✅</span>}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">{app.team}</span>
                  <span className="text-sm font-bold text-gray-700">{app.migrationProgress}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    app.migrationStatus === 'blocked' ? 'bg-red-500' :
                    app.migrationStatus === 'completed' ? 'bg-green-500' :
                    app.migrationProgress > 60 ? 'bg-indigo-500' :
                    app.migrationProgress > 30 ? 'bg-blue-400' : 'bg-gray-400'
                  }`}
                  style={{ width: `${app.migrationProgress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-400">{app.sourceSocle.split('(')[0].trim()}</span>
                <span className="text-xs text-gray-400">Échéance : {app.estimatedCompletion}</span>
                <span className="text-xs text-gray-400">{app.targetSocle.split('(')[0].trim()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Calendrier prévisionnel</h2>
        <div className="relative overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Month headers */}
            <div className="flex border-b border-gray-200 pb-2 mb-4">
              {['Jan', 'Fév', 'Mar', 'Avr'].map(month => (
                <div key={month} className="flex-1 text-center text-sm font-medium text-gray-500">{month} 2026</div>
              ))}
            </div>
            {/* App bars */}
            {sortedApps.map(app => {
              const startDate = new Date('2025-12-20');
              const endDate = new Date(app.estimatedCompletion);
              const totalRange = new Date('2026-04-30').getTime() - startDate.getTime();
              const left = Math.max(0, ((new Date('2026-01-01').getTime() - startDate.getTime()) / totalRange) * 100);
              const width = Math.min(100 - left, ((endDate.getTime() - new Date('2026-01-01').getTime()) / totalRange) * 100);

              return (
                <div key={app.id} className="flex items-center gap-3 mb-3">
                  <div className="w-32 text-sm text-gray-700 font-medium truncate">{app.name}</div>
                  <div className="flex-1 relative h-6 bg-gray-50 rounded">
                    <div
                      className={`absolute top-0 h-6 rounded flex items-center justify-center text-xs text-white font-medium ${
                        app.migrationStatus === 'blocked' ? 'bg-red-400' :
                        app.migrationStatus === 'completed' ? 'bg-green-400' :
                        'bg-indigo-400'
                      }`}
                      style={{ left: `${left}%`, width: `${Math.max(width, 5)}%` }}
                    >
                      {app.migrationProgress}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
