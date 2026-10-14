import { useState } from 'react';
import { applications } from '../data/applications';

interface Prediction {
  appId: string;
  appName: string;
  currentProgress: number;
  estimatedDays: number;
  confidence: number;
  factors: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export default function AIPredictions() {
  const [analyzing, setAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const analyzeMigrations = () => {
    setAnalyzing(true);
    
    // Simulation d'analyse IA
    setTimeout(() => {
      const preds: Prediction[] = applications.map(app => {
        // Calcul simulé basé sur la progression actuelle et la complexité
        const remainingProgress = 100 - app.migrationProgress;
        const baseDays = remainingProgress * 0.5; // 0.5 jour par % restant
        
        // Facteurs d'ajustement
        const factors: string[] = [];
        let adjustment = 1;
        
        if (app.criticality === 'high') {
          factors.push('Application critique - tests approfondis requis');
          adjustment *= 1.3;
        }
        
        if (app.migrationStatus === 'blocked') {
          factors.push('Migration bloquée - résolution nécessaire');
          adjustment *= 2;
        }
        
        if (app.deployments.length > 3) {
          factors.push('Multi-environnements - déploiement complexe');
          adjustment *= 1.2;
        }
        
        if (app.helmChart.status !== 'valid') {
          factors.push('Chart Helm à corriger');
          adjustment *= 1.4;
        }
        
        if (app.team === 'Platform') {
          factors.push('Équipe expérimentée');
          adjustment *= 0.8;
        }
        
        const estimatedDays = Math.round(baseDays * adjustment);
        const confidence = Math.max(50, 95 - (factors.length * 10));
        
        let riskLevel: 'low' | 'medium' | 'high' = 'low';
        if (factors.length >= 3 || app.migrationStatus === 'blocked') {
          riskLevel = 'high';
        } else if (factors.length >= 2) {
          riskLevel = 'medium';
        }
        
        return {
          appId: app.id,
          appName: app.name,
          currentProgress: app.migrationProgress,
          estimatedDays,
          confidence,
          factors,
          riskLevel
        };
      });
      
      setPredictions(preds.sort((a, b) => b.estimatedDays - a.estimatedDays));
      setAnalyzing(false);
    }, 2000);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      default: return '#10b981';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'high': return 'Élevé';
      case 'medium': return 'Moyen';
      default: return 'Faible';
    }
  };

  const totalDays = predictions.reduce((sum, p) => sum + p.estimatedDays, 0);
  const avgConfidence = predictions.length > 0 
    ? Math.round(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length)
    : 0;
  const highRiskCount = predictions.filter(p => p.riskLevel === 'high').length;

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 'bold', color: '#111827', marginBottom: '8px' }}>
          <i className="fas fa-brain" style={{ marginRight: '8px' }}></i>
          Prédiction IA - Durée de Migration
        </h1>
        <p style={{ color: '#6b7280' }}>
          Estimation intelligente de la durée restante basée sur l'historique et les facteurs de risque
        </p>
      </div>

      {/* Analyze Button */}
      {predictions.length === 0 && (
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: '24px'
        }}>
          <i className="fas fa-brain" style={{ fontSize: '64px', color: '#4f46e5', marginBottom: '20px' }}></i>
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>
            Analyse Prédictive
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Notre IA analyse vos applications pour estimer la durée restante de migration en tenant compte 
            de la complexité, des dépendances et des blocages actuels.
          </p>
          <button
            onClick={analyzeMigrations}
            disabled={analyzing}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: 'none',
              background: analyzing ? '#9ca3af' : '#4f46e5',
              color: 'white',
              cursor: analyzing ? 'not-allowed' : 'pointer',
              fontWeight: 500,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              margin: '0 auto'
            }}
          >
            <i className={`fas ${analyzing ? 'fa-spinner fa-spin' : 'fa-magic'}`}></i>
            {analyzing ? 'Analyse en cours...' : 'Lancer l\'analyse'}
          </button>
        </div>
      )}

      {/* Results */}
      {predictions.length > 0 && (
        <>
          {/* Summary Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#dbeafe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-calendar-check" style={{ color: '#3b82f6' }}></i>
                </div>
                <div>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{totalDays}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Jours estimés (total)</p>
                </div>
              </div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#d1fae5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-percentage" style={{ color: '#10b981' }}></i>
                </div>
                <div>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{avgConfidence}%</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Confiance moyenne</p>
                </div>
              </div>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#fee2e2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-exclamation-triangle" style={{ color: '#ef4444' }}></i>
                </div>
                <div>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{highRiskCount}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Risques élevés</p>
                </div>
              </div>
            </div>
          </div>

          {/* Predictions List */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
                Détails par application
              </h2>
              <button
                onClick={analyzeMigrations}
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  border: '1px solid #d1d5db',
                  background: 'white',
                  color: '#374151',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '13px'
                }}
              >
                <i className="fas fa-sync-alt" style={{ marginRight: '6px' }}></i>
                Rafraîchir
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {predictions.map(pred => (
                <div key={pred.appId} style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  background: '#f9fafb'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>
                        {pred.appName}
                      </h3>
                      <p style={{ fontSize: '13px', color: '#6b7280' }}>
                        Progression actuelle : {pred.currentProgress}%
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                        {pred.estimatedDays}j
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7280' }}>
                        estimé restant
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px', marginBottom: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
                        <span>Confiance</span>
                        <span>{pred.confidence}%</span>
                      </div>
                      <div style={{ background: '#e5e7eb', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${pred.confidence}%`,
                          height: '100%',
                          background: pred.confidence > 80 ? '#10b981' : pred.confidence > 60 ? '#f59e0b' : '#ef4444'
                        }}></div>
                      </div>
                    </div>
                    <div>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 500,
                        background: getRiskColor(pred.riskLevel) + '20',
                        color: getRiskColor(pred.riskLevel)
                      }}>
                        Risque {getRiskLabel(pred.riskLevel)}
                      </span>
                    </div>
                  </div>

                  {pred.factors.length > 0 && (
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                        Facteurs identifiés :
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {pred.factors.map((factor, idx) => (
                          <span key={idx} style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            background: 'white',
                            color: '#374151',
                            border: '1px solid #d1d5db'
                          }}>
                            {factor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
