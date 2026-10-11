import { useState } from 'react';
import { applications } from '../data/applications';

export default function Reports() {
  const [reportType, setReportType] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [dateRange, setDateRange] = useState({ start: '2026-01-01', end: '2026-01-31' });
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert(`Rapport ${reportType.toUpperCase()} généré avec succès !`);
    }, 2000);
  };

  const totalApps = applications.length;
  const completed = applications.filter(a => a.migrationStatus === 'completed').length;
  const inProgress = applications.filter(a => a.migrationStatus === 'in_progress').length;
  const blocked = applications.filter(a => a.migrationStatus === 'blocked').length;
  const avgProgress = Math.round(applications.reduce((acc, a) => acc + a.migrationProgress, 0) / totalApps);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-file-alt" style={{ marginRight: '8px' }}></i>
          Rapports et Analyses
        </h1>
        <p style={{ color: '#6b7280' }}>
          Générez des rapports détaillés sur la migration
        </p>
      </div>

      {/* Preview */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
          Aperçu du rapport
        </h2>

        <div style={{ background: '#f9fafb', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px' }}>
            Rapport de Migration - Janvier 2026
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Total Applications</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{totalApps}</p>
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Terminées</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{completed}</p>
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>En cours</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6' }}>{inProgress}</p>
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Bloquées</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>{blocked}</p>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
              Progression globale
            </h4>
            <div style={{ background: '#e5e7eb', height: '24px', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{
                width: `${avgProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #4f46e5, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 600
              }}>
                {avgProgress}%
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
              Détail par application
            </h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#6b7280', fontWeight: 600 }}>Application</th>
                  <th style={{ padding: '8px', textAlign: 'left', color: '#6b7280', fontWeight: 600 }}>Équipe</th>
                  <th style={{ padding: '8px', textAlign: 'center', color: '#6b7280', fontWeight: 600 }}>Statut</th>
                  <th style={{ padding: '8px', textAlign: 'right', color: '#6b7280', fontWeight: 600 }}>Progression</th>
                </tr>
              </thead>
              <tbody>
                {applications.slice(0, 5).map(app => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '8px', color: '#111827' }}>{app.name}</td>
                    <td style={{ padding: '8px', color: '#6b7280' }}>{app.team}</td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        fontWeight: 500,
                        background: app.migrationStatus === 'completed' ? '#d1fae5' : app.migrationStatus === 'blocked' ? '#fee2e2' : '#dbeafe',
                        color: app.migrationStatus === 'completed' ? '#065f46' : app.migrationStatus === 'blocked' ? '#991b1b' : '#1e40af'
                      }}>
                        {app.migrationStatus === 'completed' ? '✅ Terminé' : app.migrationStatus === 'blocked' ? '🔴 Bloqué' : '🔄 En cours'}
                      </span>
                    </td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#111827', fontWeight: 600 }}>{app.migrationProgress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>
          Générer un rapport
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
              Format du rapport
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setReportType('pdf')}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '8px',
                  border: reportType === 'pdf' ? '2px solid #ef4444' : '1px solid #d1d5db',
                  background: reportType === 'pdf' ? '#fef2f2' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <i className="fas fa-file-pdf" style={{ fontSize: '24px', color: '#ef4444', marginBottom: '8px', display: 'block' }}></i>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>PDF</p>
              </button>
              <button
                onClick={() => setReportType('excel')}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '8px',
                  border: reportType === 'excel' ? '2px solid #10b981' : '1px solid #d1d5db',
                  background: reportType === 'excel' ? '#ecfdf5' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <i className="fas fa-file-excel" style={{ fontSize: '24px', color: '#10b981', marginBottom: '8px', display: 'block' }}></i>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>Excel</p>
              </button>
              <button
                onClick={() => setReportType('csv')}
                style={{
                  flex: 1,
                  padding: '16px',
                  borderRadius: '8px',
                  border: reportType === 'csv' ? '2px solid #3b82f6' : '1px solid #d1d5db',
                  background: reportType === 'csv' ? '#eff6ff' : 'white',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <i className="fas fa-file-csv" style={{ fontSize: '24px', color: '#3b82f6', marginBottom: '8px', display: 'block' }}></i>
                <p style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>CSV</p>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Date de début
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>
                Date de fin
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: generating ? '#9ca3af' : '#4f46e5',
              color: 'white',
              cursor: generating ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <i className={`fas ${generating ? 'fa-spinner fa-spin' : 'fa-download'}`}></i>
            {generating ? 'Génération en cours...' : `Générer le rapport ${reportType.toUpperCase()}`}
          </button>
        </div>
      </div>
    </div>
  );
}
