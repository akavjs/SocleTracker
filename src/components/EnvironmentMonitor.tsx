import { useState, useEffect } from 'react';
import { applications, Environment } from '../data/applications';

export default function EnvironmentMonitor() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedEnv, setSelectedEnv] = useState<Environment | 'all'>('all');

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const environments: Environment[] = ['dev', 'staging', 'preprod', 'prod'];

  const envConfig: Record<Environment, { label: string; headerBg: string; headerBorder: string; headerText: string; iconColor: string; dot: string; icon: string }> = {
    dev: { label: 'DEV', headerBg: 'bg-blue-50', headerBorder: 'border-blue-100', headerText: 'text-blue-700', iconColor: 'text-blue-500', dot: 'bg-blue-500', icon: 'fa-flask' },
    staging: { label: 'STAGING', headerBg: 'bg-amber-50', headerBorder: 'border-amber-100', headerText: 'text-amber-700', iconColor: 'text-amber-500', dot: 'bg-amber-500', icon: 'fa-vial' },
    preprod: { label: 'PREPROD', headerBg: 'bg-purple-50', headerBorder: 'border-purple-100', headerText: 'text-purple-700', iconColor: 'text-purple-500', dot: 'bg-purple-500', icon: 'fa-clipboard-check' },
    prod: { label: 'PROD', headerBg: 'bg-red-50', headerBorder: 'border-red-100', headerText: 'text-red-700', iconColor: 'text-red-500', dot: 'bg-red-500', icon: 'fa-globe' },
  };

  const btnColors: Record<Environment, string> = {
    dev: 'bg-blue-600',
    staging: 'bg-amber-600',
    preprod: 'bg-purple-600',
    prod: 'bg-red-600',
  };

  const getDeploymentsForEnv = (env: Environment) => {
    return applications.flatMap(app =>
      app.deployments
        .filter(d => d.environment === env)
        .map(d => ({ ...d, appName: app.name, team: app.team, migrationStatus: app.migrationStatus }))
    );
  };

  const allDeployments = selectedEnv === 'all'
    ? environments.flatMap(env => getDeploymentsForEnv(env).map(d => ({ ...d, env })))
    : getDeploymentsForEnv(selectedEnv).map(d => ({ ...d, env: selectedEnv }));

  const totalPods = allDeployments.reduce((acc, d) => acc + d.pods.length, 0);
  const healthyPods = allDeployments.reduce((acc, d) => acc + d.pods.filter(p => p.status === 'running').length, 0);
  const failedApps = allDeployments.filter(d => d.status === 'failed').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monitoring Environnements</h1>
          <p className="text-gray-500 mt-1">État en temps réel des déploiements</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-mono text-gray-700">{currentTime.toLocaleTimeString('fr-FR')}</p>
            <p className="text-xs text-gray-500">{currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-700 font-medium">LIVE</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-server text-blue-500"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{allDeployments.length}</p>
              <p className="text-xs text-gray-500">Déploiements actifs</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-check text-green-500"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{healthyPods}/{totalPods}</p>
              <p className="text-xs text-gray-500">Pods sains</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-times text-red-500"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{failedApps}</p>
              <p className="text-xs text-gray-500">Déploiements en échec</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-percentage text-indigo-500"></i>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">{totalPods > 0 ? Math.round((healthyPods / totalPods) * 100) : 0}%</p>
              <p className="text-xs text-gray-500">Disponibilité</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Filter */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedEnv('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedEnv === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-200'
          }`}
        >
          Tous
        </button>
        {environments.map(env => {
          const config = envConfig[env];
          const deployments = getDeploymentsForEnv(env);
          const hasFailed = deployments.some(d => d.status === 'failed');
          return (
            <button
              key={env}
              onClick={() => setSelectedEnv(env)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                selectedEnv === env ? `${btnColors[env]} text-white shadow-md` : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-200'
              }`}
            >
              <i className={`fas ${config.icon}`}></i>
              {config.label}
              {hasFailed && <span className="w-2 h-2 bg-white rounded-full"></span>}
              <span className="text-xs opacity-70">({deployments.length})</span>
            </button>
          );
        })}
      </div>

      {/* Environment Cards */}
      {(selectedEnv === 'all' ? environments : [selectedEnv]).map(env => {
        const config = envConfig[env];
        const deployments = getDeploymentsForEnv(env);
        if (deployments.length === 0) return null;

        return (
          <div key={env} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className={`px-6 py-3 ${config.headerBg} border-b ${config.headerBorder} flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <i className={`fas ${config.icon} ${config.iconColor}`}></i>
                <h3 className={`font-bold ${config.headerText}`}>{config.label}</h3>
                <span className="text-sm text-gray-500">{deployments.length} application(s)</span>
              </div>
              <div className="flex items-center gap-2">
                {deployments.every(d => d.status === 'running') ? (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Tous opérationnels
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-red-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    Incident détecté
                  </span>
                )}
              </div>
            </div>
            <div className="p-4 space-y-3">
              {deployments.map(deploy => (
                <div key={deploy.appName} className={`flex items-center justify-between p-3 rounded-lg border ${
                  deploy.status === 'failed' ? 'bg-red-50 border-red-100' :
                  deploy.status === 'deploying' ? 'bg-blue-50 border-blue-100' :
                  'bg-gray-50 border-gray-100'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${
                      deploy.status === 'running' ? '🟢' :
                      deploy.status === 'failed' ? '🔴' :
                      deploy.status === 'deploying' ? '🔄' : '🟡'
                    }`}></span>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{deploy.appName}</p>
                      <p className="text-xs text-gray-500">v{deploy.version} • {deploy.team}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {deploy.pods.filter(p => p.status === 'running').length}/{deploy.pods.length} pods
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(deploy.lastDeployed).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className={`w-16 h-1.5 rounded-full overflow-hidden ${
                      deploy.status === 'failed' ? 'bg-red-200' : 'bg-gray-200'
                    }`}>
                      <div
                        className={`h-full rounded-full ${
                          deploy.status === 'running' ? 'bg-green-500' :
                          deploy.status === 'failed' ? 'bg-red-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${(deploy.pods.filter(p => p.status === 'running').length / deploy.pods.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
