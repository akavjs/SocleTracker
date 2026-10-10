import { useState } from 'react';
import { Application } from '../data/applications';

interface Props {
  application: Application;
  onBack: () => void;
}

export default function ApplicationDetail({ application, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<'environments' | 'helm' | 'history'>('environments');
  const [helmRefreshing, setHelmRefreshing] = useState(false);

  const refreshHelm = () => {
    setHelmRefreshing(true);
    setTimeout(() => setHelmRefreshing(false), 2000);
  };

  const envColors = {
    dev: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', dot: 'bg-blue-500' },
    staging: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' },
    preprod: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', dot: 'bg-purple-500' },
    prod: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500' },
  };

  const statusIcons = {
    running: '✅',
    pending: '⏳',
    failed: '❌',
    deploying: '🔄',
  };

  const podStatusIcons = {
    running: '🟢',
    pending: '🟡',
    crashloop: '🔴',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <i className="fas fa-arrow-left text-gray-600"></i>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{application.name}</h1>
            {application.criticality === 'high' && (
              <span className="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full font-medium">Critique</span>
            )}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
              application.migrationStatus === 'completed' ? 'bg-green-100 text-green-700' :
              application.migrationStatus === 'in_progress' ? 'bg-blue-100 text-blue-700' :
              application.migrationStatus === 'blocked' ? 'bg-red-100 text-red-700' :
              application.migrationStatus === 'planned' ? 'bg-amber-100 text-amber-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {application.migrationStatus === 'completed' ? '✅ Terminé' :
               application.migrationStatus === 'in_progress' ? '🔄 En cours' :
               application.migrationStatus === 'blocked' ? '🔴 Bloqué' :
               application.migrationStatus === 'planned' ? '📋 Planifié' : '⏳ Non démarré'}
            </span>
          </div>
          <p className="text-gray-500 mt-1">{application.description}</p>
        </div>
      </div>

      {/* Migration Progress */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">Progression de la migration</h3>
          <span className="text-lg font-bold text-indigo-600">{application.migrationProgress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              application.migrationStatus === 'blocked' ? 'bg-red-500' :
              application.migrationStatus === 'completed' ? 'bg-green-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'
            }`}
            style={{ width: `${application.migrationProgress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Source :</span>
            <span className="font-medium text-gray-700">{application.sourceSocle}</span>
          </div>
          <i className="fas fa-arrow-right text-indigo-400"></i>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Cible :</span>
            <span className="font-medium text-gray-700">{application.targetSocle}</span>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Échéance estimée : <span className="font-medium">{application.estimatedCompletion}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('environments')}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
            activeTab === 'environments' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="fas fa-server mr-2"></i>Environnements
        </button>
        <button
          onClick={() => setActiveTab('helm')}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
            activeTab === 'helm' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="fas fa-chart-bar mr-2"></i>Charts Helm
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
            activeTab === 'history' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <i className="fas fa-history mr-2"></i>Historique
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'environments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Déploiements en temps réel</h3>
            <div className="flex items-center gap-2 text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Temps réel
            </div>
          </div>
          {application.deployments.map(deploy => {
            const colors = envColors[deploy.environment];
            return (
              <div key={deploy.environment} className={`rounded-xl border ${colors.border} ${colors.bg} p-5`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${colors.dot}`}></div>
                    <h4 className={`font-bold uppercase text-sm ${colors.text}`}>{deploy.environment}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      deploy.status === 'running' ? 'bg-green-100 text-green-700' :
                      deploy.status === 'failed' ? 'bg-red-100 text-red-700' :
                      deploy.status === 'deploying' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {statusIcons[deploy.status]} {deploy.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">v{deploy.version}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(deploy.lastDeployed).toLocaleDateString('fr-FR')} à {new Date(deploy.lastDeployed).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span><i className="fas fa-copy mr-1"></i>{deploy.replicas} replicas</span>
                  <span><i className="fas fa-pod mr-1"></i>{deploy.pods.filter(p => p.status === 'running').length}/{deploy.pods.length} pods actifs</span>
                </div>
                <div className="mt-3 space-y-1">
                  {deploy.pods.map(pod => (
                    <div key={pod.name} className="flex items-center gap-2 text-xs bg-white/60 rounded px-2 py-1">
                      <span>{podStatusIcons[pod.status]}</span>
                      <span className="font-mono text-gray-600 truncate">{pod.name}</span>
                      <span className={`ml-auto px-1.5 py-0.5 rounded text-xs ${
                        pod.status === 'running' ? 'bg-green-100 text-green-700' :
                        pod.status === 'crashloop' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{pod.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'helm' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Chart Helm - GitLab</h3>
            <button
              onClick={refreshHelm}
              disabled={helmRefreshing}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50"
            >
              <i className={`fas fa-sync-alt ${helmRefreshing ? 'animate-spin' : ''}`}></i>
              {helmRefreshing ? 'Vérification...' : 'Rafraîchir'}
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <i className="fab fa-gitlab text-orange-500 text-xl"></i>
              <div>
                <p className="font-medium text-gray-900">{application.helmChart.repository}</p>
                <p className="text-sm text-gray-500">{application.helmChart.path}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${
                application.helmChart.status === 'valid' ? 'bg-green-100 text-green-700' :
                application.helmChart.status === 'missing_resources' ? 'bg-amber-100 text-amber-700' :
                application.helmChart.status === 'outdated' ? 'bg-orange-100 text-orange-700' :
                'bg-red-100 text-red-700'
              }`}>
                {application.helmChart.status === 'valid' ? '✅ Valide' :
                 application.helmChart.status === 'missing_resources' ? '⚠️ Ressources manquantes' :
                 application.helmChart.status === 'outdated' ? '🔶 Obsolète' : '❌ Erreur'}
              </span>
              <span className="text-gray-500">
                Dernière vérification : {new Date(application.helmChart.lastChecked).toLocaleDateString('fr-FR')} à {new Date(application.helmChart.lastChecked).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <h4 className="font-medium text-gray-900 mb-3">Ressources Kubernetes</h4>
            <div className="space-y-2">
              {application.helmChart.resources.map((resource, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      resource.status === 'present' ? 'bg-green-500' :
                      resource.status === 'missing' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></span>
                    <span className="font-mono text-sm text-gray-700">{resource.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">{resource.type}</span>
                    <span className={`text-xs font-medium ${
                      resource.status === 'present' ? 'text-green-600' :
                      resource.status === 'missing' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {resource.status === 'present' ? 'Présent' :
                       resource.status === 'missing' ? 'Manquant' : 'Erreur'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Historique des événements</h3>
          {application.history.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucun événement enregistré</p>
          ) : (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {application.history.map((event, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 pl-10">
                    <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 border-white ${
                      event.environment === 'prod' ? 'bg-red-500' :
                      event.environment === 'preprod' ? 'bg-purple-500' :
                      event.environment === 'staging' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.event}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500">{event.date}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          event.environment === 'prod' ? 'bg-red-50 text-red-600' :
                          event.environment === 'preprod' ? 'bg-purple-50 text-purple-600' :
                          event.environment === 'staging' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                        }`}>{event.environment}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
