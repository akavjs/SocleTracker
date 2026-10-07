import { applications } from '../data/applications';

export default function Dashboard() {
  const totalApps = applications.length;
  const completed = applications.filter(a => a.migrationStatus === 'completed').length;
  const inProgress = applications.filter(a => a.migrationStatus === 'in_progress').length;
  const blocked = applications.filter(a => a.migrationStatus === 'blocked').length;
  const planned = applications.filter(a => a.migrationStatus === 'planned' || a.migrationStatus === 'not_started').length;
  const avgProgress = Math.round(applications.reduce((acc, a) => acc + a.migrationProgress, 0) / totalApps);

  const criticalApps = applications.filter(a => a.criticality === 'high');
  const helmIssues = applications.filter(a => a.helmChart.status !== 'valid');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-500 mt-1">Vue d'ensemble de la migration des socles</p>
        </div>
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-700 font-medium">Monitoring actif</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalApps}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-cubes text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Terminées</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{completed}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-check-circle text-green-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">En cours</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{inProgress}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-spinner text-blue-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Bloquées</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{blocked}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-exclamation-triangle text-red-500 text-xl"></i>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Planifiées</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{planned}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-calendar text-amber-500 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Progression globale</h2>
          <span className="text-2xl font-bold text-indigo-600">{avgProgress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
            style={{ width: `${avgProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>0%</span>
          <span>Objectif : 100% migration vers OCP 4.14</span>
          <span>100%</span>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Critical Apps */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fas fa-shield-alt text-red-500"></i>
            Applications critiques
          </h2>
          <div className="space-y-3">
            {criticalApps.map(app => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.team}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        app.migrationProgress === 100 ? 'bg-green-500' :
                        app.migrationStatus === 'blocked' ? 'bg-red-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${app.migrationProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{app.migrationProgress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Helm Issues */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i className="fas fa-helm text-amber-500"></i>
            <i className="fas fa-exclamation-circle text-amber-500"></i>
            Alertes Charts Helm
          </h2>
          <div className="space-y-3">
            {helmIssues.map(app => (
              <div key={app.id} className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900">{app.name}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    app.helmChart.status === 'missing_resources' ? 'bg-amber-100 text-amber-700' :
                    app.helmChart.status === 'outdated' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {app.helmChart.status === 'missing_resources' ? 'Ressources manquantes' :
                     app.helmChart.status === 'outdated' ? 'Obsolète' : 'Erreur'}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {app.helmChart.resources.filter(r => r.status !== 'present').map(r => r.name).join(', ')}
                </p>
              </div>
            ))}
            {helmIssues.length === 0 && (
              <p className="text-gray-500 text-center py-4">Tous les charts Helm sont valides ✅</p>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <i className="fas fa-history text-indigo-500"></i>
          Activité récente
        </h2>
        <div className="space-y-2">
          {applications
            .flatMap(app => app.history.map(h => ({ ...h, appName: app.name })))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 8)
            .map((event, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full ${
                  event.environment === 'prod' ? 'bg-red-500' :
                  event.environment === 'preprod' ? 'bg-purple-500' :
                  event.environment === 'staging' ? 'bg-amber-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <span className="font-medium text-gray-900 text-sm">{event.appName}</span>
                  <span className="text-gray-500 text-sm ml-2">— {event.event}</span>
                </div>
                <span className="text-xs text-gray-400">{event.date}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  event.environment === 'prod' ? 'bg-red-50 text-red-600' :
                  event.environment === 'preprod' ? 'bg-purple-50 text-purple-600' :
                  event.environment === 'staging' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                }`}>{event.environment}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
