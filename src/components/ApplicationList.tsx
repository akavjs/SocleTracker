import { Application, MigrationStatus } from '../data/applications';

interface Props {
  applications: Application[];
  onSelect: (app: Application) => void;
  selectedId?: string;
}

const statusConfig: Record<MigrationStatus, { label: string; color: string; bg: string }> = {
  not_started: { label: 'Non démarré', color: 'text-gray-600', bg: 'bg-gray-100' },
  planned: { label: 'Planifié', color: 'text-amber-600', bg: 'bg-amber-50' },
  in_progress: { label: 'En cours', color: 'text-blue-600', bg: 'bg-blue-50' },
  completed: { label: 'Terminé', color: 'text-green-600', bg: 'bg-green-50' },
  blocked: { label: 'Bloqué', color: 'text-red-600', bg: 'bg-red-50' },
};

export default function ApplicationList({ applications, onSelect, selectedId }: Props) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <i className="fas fa-list text-indigo-500"></i>
        Applications ({applications.length})
      </h2>
      <div className="space-y-2">
        {applications.map(app => {
          const status = statusConfig[app.migrationStatus];
          return (
            <div
              key={app.id}
              onClick={() => onSelect(app)}
              className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${
                selectedId === app.id
                  ? 'border-indigo-300 bg-indigo-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-indigo-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{app.name}</h3>
                    {app.criticality === 'high' && (
                      <span className="text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded font-medium">CRIT</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{app.description}</p>
                  <p className="text-xs text-gray-400 mt-1">Équipe : {app.team}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${status.color} ${status.bg}`}>
                  {status.label}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                  <span>Migration</span>
                  <span>{app.migrationProgress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      app.migrationStatus === 'blocked' ? 'bg-red-500' :
                      app.migrationStatus === 'completed' ? 'bg-green-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${app.migrationProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <i className="fas fa-arrow-right text-indigo-400"></i>
                  {app.sourceSocle.split(' ')[0]} → {app.targetSocle.split(' ')[0]}
                </span>
                <span className="flex items-center gap-1">
                  <i className="fas fa-calendar text-gray-400"></i>
                  {app.estimatedCompletion}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
